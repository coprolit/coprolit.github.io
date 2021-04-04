<script lang='ts'>

  interface Weapon {
    name: string;
    pen: number;
    rof: number;
    range: number;
    type: 'AT'|'HE'|'SA'
  }
  interface Model {
    name: string; // e.g. "Second (Junior) Lieutenant"
    weapons: Weapon[];
  }
  interface Platoon {
    name: string;
    subName: string;
    units: Unit[];
  }
  interface Army {
    platoons: Platoon[]
    orderDice: number;
    points: number;
  }
  interface Unit {
    sectionName: string; // e.g. "Officer"
    name: string; // e.g. "Junior Lieutenant"
    skill: 'Inexperienced' | 'Regular' | 'Veteran';
    damageValue: number;
    models?: Model[];
    weapons?: Weapon[];
    movement: number;
  }
  
  // API response interfaces:
  interface UnitItemAPI {
    IsVehicle: 'false' | 'true';
    ItemName: string;
    ItemPen?: 'HE' | ' ' | 'n/a' | '+1'
    ItemPEN?: 'HE' | ' ' | 'n/a' | '+1'
    ItemQuantity: number;
    ItemROF: string;
    ItemNotes: string;
    ItemMobility: string;
    ItemDamageValue: string;
    ItemRange: string;
    IsGun: 'true' | 'false';
    ItemLine: number;
    
  }
  interface UnitAPI {
    SectionName: string; // e.g. "Officer"
    UnitName: string; // e.g. "Junior Lieutenant"
    UnitSkill: 'Inexperienced' | 'Regular' | 'Veteran';
    UnitItems: UnitItemAPI[];
  }
  interface PlatoonAPI {
    PlatoonName: string;
    PlatoonSubName: string;
    Units: UnitAPI[];
  }
  interface ArmyAPI {
    Platoons: PlatoonAPI[]
    OrderDice: number;
    TotalPoints: number;
  }

  let init = true;

  let army: Army;
  
  async function importArmy(event: any): Promise<void> {
		const formData = new FormData(event.target);
		const url = formData.get('url');
    
    try {
      const response = await fetch('https://www.philippesimpson.dk/armylist.php?url=' + url, {
        method: 'GET',
      });
      
      if (!response.ok) {
			  throw new Error(response.statusText);
      }

      const result: ArmyAPI = await response.json();
      console.log('result', result)

      init = false;

      army = mapArmy(result);
      console.log(army);
    } catch (error) {
      alert('Army list not found.');
      throw error;
    }
  }

  function mapArmy(army: ArmyAPI): Army {
    const platoons: Platoon[] = army.Platoons.map(platoon => {
      const Units: Unit[] = platoon.Units.map(unit => {
        return {
          name: unit.UnitName,
          sectionName: unit.SectionName,
          skill: unit.UnitSkill,
          damageValue: getDamageValue(unit),
          movement: getMobility(unit),
          // models: getUnitItems(unit),
          weapons: getUnitItems(unit)
        }
      })

      return {
        name: platoon.PlatoonName,
        subName: platoon.PlatoonSubName,
        units: Units,
      }
    });

    return {
      orderDice: army.OrderDice,
      points: army.TotalPoints,
      platoons
    }
  }

  function getMobility(unit: UnitAPI): number {
    // console.log('getMobility()', unit);
    // if (
    //   unit.SectionName.includes('Infantry') ||
    //   unit.SectionName.includes('Officer') ||
    //   unit.SectionName.includes('Sniper') ||
    //   unit.SectionName.includes('Mortar') ||
    //   unit.SectionName.includes('Anti-tank')
    // ) {
    //   return 12;
    // }

    if (
      unit.SectionName.includes('Artillery')
    ) {
      return 6;
    }
    
    if (unit.UnitItems[0].ItemMobility) {
      // vehicle
      if (unit.UnitItems[0].ItemMobility.includes('Wheeled')) {
        return 24;
      }
      
      if (unit.UnitItems[0].ItemMobility.includes('Tracked')) {
        return 18;
      }
    }

    // Assume basic infantry:
    return 12;
  }
  
  function getDamageValue(unit: UnitAPI): number {
    
    if (
      unit.SectionName.includes('Infantry') ||
      unit.SectionName.includes('Officer') ||
      unit.SectionName.includes('Mortar') ||
      unit.SectionName.includes('Sniper') ||
      unit.SectionName.includes('Anti-tank') ||
      unit.SectionName.includes('Artillery')
    ) {
      if (unit.UnitSkill === 'Inexperienced') return 3;
      if (unit.UnitSkill === 'Regular') return 4;
      if (unit.UnitSkill === 'Veteran') return 5;
      
      return 4;
    }
    
    if (
      unit.SectionName.includes('Armoured Cars') || 
      unit.SectionName.includes('Tanks and SP Guns')
    ) {
      // e.g. "9+"
      return Number(unit.UnitItems[0].ItemDamageValue.slice(0, -1));
    }

    return 4;
  }

  function getUnitItems(unit: UnitAPI): Weapon[] {
    // UnitItems:
    // An array containing nodes of each type of weapon in unit, and of any unit abilities.
    // Each weapon-type node defines the quantity of the weapon type.
    
    // HQ units & Infantry:
    if (
      unit.SectionName.includes('Infantry') ||
      unit.SectionName.includes('Officer')
    ) {
      // Filter down to UnitItems with a quantity value, and transform to Model items.
      return unit
        .UnitItems
        .filter(currentItem => !!currentItem.ItemQuantity)
        // For each UnitItem type array:
        // - transform from quantity to items array (an item for each weapon/model)
        // - then flatten
        .flatMap(quantityToItems)
        // map to Model model:
        // .map(item => mapToWeapon(item, unit));
        .map(getWeapon);
    }

    // Support & Artillery Teams: 
    if (
      unit.SectionName.includes('Mortar') ||
      unit.SectionName.includes('Artillery') ||
      unit.SectionName.includes('Sniper') ||
      unit.SectionName.includes('Machine Gun') ||
      unit.SectionName.includes('Anti-tank')
    ) {
      return unit
        .UnitItems
        .filter(currentItem => !!currentItem.ItemQuantity)
        // map from ItemNotes team size value to quantity:
        /* .map(item => {
          let men = 0;
          
          const isSpotter = item.ItemNotes.includes('Spotter');
          if (isSpotter) {
            men = 1;
          }

          // e.g. "Team (3 men), Fixed, Indirect fire, HE (2")"
          const regex = /[0-9]/; // match a single character in the range between 0 and 9.
          const isTeam = item.ItemNotes.search(regex);
          
          if (isTeam > -1) {
            men = Number(item.ItemNotes.slice(isTeam, isTeam+1));
          }
          
          return {
            ...item,
            ItemQuantity: men,
          };
        }) */
        // transform from quantity to items array:
        .flatMap((item) => quantityToItems(item))
        // map to Model model:
        // .map(toCrewModel)
        .map(getWeapon)
    }

    // unit.SectionName.includes('Sniper') ||

    /*
      USSR sniper:
      0:
        IsVehicle: "false"
        ItemLine: 1
        ItemName: "Sniper team"
        ItemNotes: "Team (2 men), Sniper"
        ItemPEN: "n/a"
        ItemQuantity: 1
        ItemROF: "1"
        ItemRange: "36""
        ItemSequence: 1

      US sniper:
      0:
        IsVehicle: "false"
        ItemLine: 1
        ItemName: "Sniper team"
        ItemNotes: "Team (2 men), Sniper (Sniper with rifle & pistol- Spotter with pistol)"
        ItemPEN: "n/a"
        ItemQuantity: 1
        ItemROF: "1"
        ItemRange: "36""
        ItemSequence: 1
      1:
        IsVehicle: "false"
        ItemLine: 2
        ItemName: "with Pistol"
        ItemNotes: "Assault"
        ItemPen: "n/a"
        ItemROF: "1"
        ItemRange: "6""
        ItemSequence: 2
      2:
        IsVehicle: "false"
        ItemLine: 3
        ItemName: "with Pistol replaced by Submachine gun"
        ItemNotes: "Assault"
        ItemPEN: "n/a"
        ItemQuantity: 1
        ItemROF: "2"
        ItemRange: "12""
        ItemSequence: 3
    */
 
    if (
      unit.SectionName.includes('Armoured Cars') || 
      unit.SectionName.includes('Tanks and SP Guns')
    ) {
      return unit
        .UnitItems
        // .filter(currentItem => currentItem.IsVehicle === 'true')
        // // for each vehicle model get its associated/mounted weapons:
        // .map(vehicle => {
        //   const weapons = unit.UnitItems.filter(item => item.IsGun === 'true' && (item.ItemLine === vehicle.ItemLine))
          
        //   return {
        //     name: vehicle.ItemName,
        //     weapons: weapons.flatMap(getWeapon)
        //   }
        // })
        // .flatMap(weapons = weapons.flatMap(getWeapon))
        .filter(currentItem => currentItem.IsGun === 'true')
        .map(getWeapon)
    }

    // Unknown unit type
    return [];
  }

  function quantityToItems(item: UnitItemAPI): UnitItemAPI[] {
    return Array.from(Array(item.ItemQuantity)).map(() => item);
  }

  function getPen(item: UnitItemAPI): number {
    function getPenFromNotes(notes: string): number {
      const regex = /HE \(/g; // e.g. HE (2")
      // get inch (= Pen), convert to number:
      return Number(notes.charAt(notes.search(regex) + 4));
    }

    return Number(item.ItemPEN)
      || Number(item.ItemPen)
      || ((item.ItemPen === 'HE' || item.ItemPEN === 'HE') ? getPenFromNotes(item.ItemNotes) : 0)
      || 0;
  }
  function getRange(range: string): number {
    // console.log('getRange', range, Number(range), typeof range === 'string')
    // Expected value format: 12, 12", 12"-60", or 60"(30-72).

    if(typeof range === 'string') {
      if(range.length === 0) {
        // if value === " ", assume an SMG.
        return 12;
      }
      // Expected value format: 12", 12"-60", or 60"(30-72).  
      return Number( range.slice(-3, -1) );
    }

    // Expected value format: 12.
    return Number(range) || 12;
  }
  function getROF(itemROF: string): number {
    
    if (Number(itemROF)) {
      return Number(itemROF);
    }

    // if value === "D6", assume an flamethrower.
    if (itemROF.includes('D6')) {
      return 1;
    }
    // if value === "-", assume 'equipped as modelled', so an SMG.
    if (itemROF.includes('-')) {
      return 2;
    }

    // if value === " ", assume an SMG.
    return 2;
  }

  function getWeapon(item: UnitItemAPI): Weapon {
    return {
      pen: getPen(item),
      rof: getROF(item.ItemROF),
      range: getRange(item.ItemRange),
      type: getType(item)
    }
  }

  function getType(item: UnitItemAPI): 'AT'|'HE'|'SA' {
    if (Number(item.ItemPEN) || Number(item.ItemPen)) {
      return 'AT';
    }
    if (item.ItemPen === 'HE' || item.ItemPEN === 'HE') {
      return 'HE';
    }
    return 'SA'; // Small-Arms
  }
</script>

	{#if init}
	<form on:submit|preventDefault={importArmy}>
		<label for='url'>Import army:</label>
		<input type="url" name="url">
		<button type="submit">Submit</button>
	</form>
  {:else}
  <div class="flow">
    <div>
      Order Dice: {army.orderDice}
    </div>
    <div>
      Total Points: {army.points}
    </div>
    {#each army.platoons as platoon}
    <div>
      {platoon.name}
    </div>
    <h3>
      {platoon.subName}
    </h3>
    <div>
      <pre>
        {JSON.stringify(platoon,null,2)}
      </pre>
    </div>
    {/each}
    <!-- <div>
      Model count (bodies): {models.length}
    </div> -->
  
    <!-- Shots pr. turn -->
    <div>
      <!-- <h3>Shots pr. turn (rate of fire)</h3>
      <div class="table">
        <div>Total number of Shots</div>
        <div>{shots.length}</div>
        <div></div>
        
        <div>Avg. shots pr. weapon</div>
        <div>{(shots.length / weapons.length).toFixed(2)}</div>
        <div></div>
      </div> -->
    </div>

    <!-- Weapons range -->
    <div>
      <!-- <h3>Weapons Range distribution</h3>
      <div class="table">
        <div>Number of Weapons</div>
        <div>{weapons.length}</div>
        <div></div>
      </div> -->
    </div>

    <!-- Mobility -->
    <div>
      <!-- <h3>Units Mobility (Run speed) distribution</h3>
      <div class="table">
        <div>Total number of Units</div>
        <div>{units.length}</div>
        <div></div>
        
        <div>6"</div>
        <div>{units.filter(unit => getMobility(unit) === 6).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getMobility(unit) === 6).length}%"></div>
        
        <div>12"</div>
        <div>{units.filter(unit => getMobility(unit) === 12).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getMobility(unit) === 12).length}%"></div>
        
        <div>18"</div>
        <div>{units.filter(unit => getMobility(unit) === 18).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getMobility(unit) === 18).length}%"></div>
        
        <div>24"</div>
        <div>{units.filter(unit => getMobility(unit) === 24).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getMobility(unit) === 24).length}%"></div>
      </div> -->
    </div>
    
    <!-- Units Damage Values -->
    <div>
      <!-- <h3>Units Damage Value distribution</h3>
      <div class="table">
        <div>Total number of Units</div>
        <div>{units.length}</div>
        <div></div>

        <div>3</div>
        <div>{units.filter(unit => getDamageValue(unit) === 3).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getDamageValue(unit) === 3).length}%"></div>
        
        <div>4</div>
        <div>{units.filter(unit => getDamageValue(unit) === 4).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getDamageValue(unit) === 4).length}%"></div>
        
        <div>5</div>
        <div>{units.filter(unit => getDamageValue(unit) === 5).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getDamageValue(unit) === 5).length}%"></div>
        
        <div>6</div>
        <div>{units.filter(unit => getDamageValue(unit) === 6).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getDamageValue(unit) === 6).length}%"></div>
        
        <div>7</div>
        <div>{units.filter(unit => getDamageValue(unit) === 7).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getDamageValue(unit) === 7).length}%"></div>
        
        <div>8</div>
        <div>{units.filter(unit => getDamageValue(unit) === 8).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getDamageValue(unit) === 8).length}%"></div>
        
        <div>9</div>
        <div>{units.filter(unit => getDamageValue(unit) === 9).length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => getDamageValue(unit) === 9).length}%"></div>
        
      </div> -->
    </div>
    
    <!-- Experiency -->
    <div>
      <!-- <h3>Units Experience distribution</h3>
      <div class="table">
        <div>Total number of Units</div>
        <div>{units.length}</div>
        <div></div>
      </div>
      <div class="is-half">
        <canvas id="expChart"></canvas>
      </div> -->
    </div>

  </div>

	{/if}


<style>
  table {
    border-collapse: collapse;
  }
  table td, table th {
    border: 1px solid #c9c9c9;
    padding: 8px;
    text-align: left;
  }
  li {
    /* display: inline-block; */
    background-color: green;
    list-style-type: none; /* Remove bullets */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
  }

  .table {
    display: grid;
    grid-template-columns: 15% 5% 80%;
    gap: var(--spacing-small);
  }
</style>
