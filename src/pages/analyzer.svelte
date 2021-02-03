<script lang='ts'>
  import { onMount } from 'svelte';

  interface UnitItem {
    IsVehicle: 'false' | 'true';
    ItemName: string;
    ItemPEN: 'HE' | ' ' | 'n/a' | '+1'
    ItemQuantity: number;
    ItemROF: string;
  }
  
  interface Shot {
    name: string;
    pen: number;
    range: number;
  }

  interface Weapon {
    pen: number;
    rof: number;
    range: number;
  }
  interface Model {
    damageValue: number;
    name: string; // e.g. "Second (Junior) Lieutenant"
    weapons: Weapon[];
  }
  interface Unit {
    SectionName: string; // e.g. "Officer"
    UnitName: string; // e.g. "Junior Lieutenant"
    UnitSkill: 'Inexperienced' | 'Regular' | 'Veteran';
    models: Model[];
    movement: number;
  }
  interface Platoon {
    PlatoonName: string;
    PlatoonSubName: string;
    Units: Unit[];
  }
  interface Army {
    Platoons: Platoon[]
    OrderDice: number;
    TotalPoints: number;
  }

  let init = true;

  let army: Army;
  let units: Unit[];
  let models: Model[];
  let weapons: Weapon[];
  let shots: Shots[];
  let penetration: number[];
  
  async function importArmy(event: any): void {
		const formData = new FormData(event.target);
		const url = formData.get('url');
    
    try {
      const response = await fetch('http://www.philippesimpson.dk/armylist.php?url=' + url, {
        method: 'GET',
      });
      
      if (!response.ok) {
			  throw new Error(response.statusText);
      }

      const result = await response.json();

      // army = result;
      console.log('result', result)
      // // From platoons flatten down to units: 
      // units = result.Platoons.flatMap(platoon => platoon.Units);

      // // From units flatten down to models:
      // models = getModels(units);

      // // From units (TODO from models?) flatten down to weapons:
      // weapons = getWeapons(units);
      
      // // From weapons flatten down to shots:
      // shots = getShots(weapons);

      init = false;

      const army2 = mapArmy(result);
      console.log(army2);
    } catch (error) {
      throw error;
    };
  }

  function mapArmy(army: Army) {
    const { OrderDice, TotalPoints } = army;

    const Platoons = army.Platoons.map(platoon => {
      const { PlatoonName, PlatoonSubName } = platoon;
      
      const Units = platoon.Units.map(unit => {
        const { SectionName, UnitSkill, UnitName } = unit;

        return {
          UnitName,
          SectionName,
          UnitSkill,
          damageValue: getDamageValue(unit),
          movement: getMobility(unit),
          models: getModelItems(unit)
        }
      })

      return {
        PlatoonName,
        PlatoonSubName,
        Units,
      }
    });

    return {
      OrderDice,
      TotalPoints,
      Platoons
    }
  }

  function getPen(item: UnitItem): number {
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

  function quantityToItems(item: UnitItem): UnitItem[] {
    return Array.from(Array(item.ItemQuantity)).map(() => item);
  }

  function getMobility(unit: Unit): number {
    if (
      unit.SectionName.includes('Infantry') ||
      unit.SectionName.includes('Officer') ||
      unit.SectionName.includes('Mortar') ||
      unit.SectionName.includes('Anti-tank')
    ) {
      return 12;
    }

    if (
      unit.SectionName.includes('Artillery')
    ) {
      return 6;
    }
    
    if (unit.UnitItems[0].ItemMobility.includes('Wheeled')) {
      return 24;
    }
    
    if (unit.UnitItems[0].ItemMobility.includes('Tracked')) {
      return 18;
    }

    return 0;
  }
  
  function getDamageValue(unit: Unit): number {
    
    if (
      unit.SectionName.includes('Infantry') ||
      unit.SectionName.includes('Officer') ||
      unit.SectionName.includes('Mortar') ||
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
  }

  function mapToModel(item: UnitItem, unit: Unit): Model[] {
    // console.log('mapToModel()', item)
    return {
      name: item.ItemName,
      weapons: [getWeapon(item)]
    }
  }

  function toCrewModels(item: UnitItem, index: number): Model[] {
    // Attach crew weapon to first soldier, rest of crew is unarmed. 
    return {
      name: item.ItemName,
      weapons: index === 0 ? [getWeapon(item)] : []
    }
  }

  function getModelItems(unit: Unit): UnitItem[] {
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
        .flatMap((item) => quantityToItems(item))
        // map to Model model:
        .map((item) => mapToModel(item, unit));
    }

    // Support & Artillery Teams: 
    if (
      unit.SectionName.includes('Mortar') ||
      unit.SectionName.includes('Artillery') ||
      unit.SectionName.includes('Anti-tank')
    ) {
      return unit
        .UnitItems
        .filter(currentItem => !!currentItem.ItemQuantity)
        // map from team size value to quantity:
        .map(item => {
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
        })
        // transform from quantity to items array:
        .flatMap((item) => quantityToItems(item))
        // map to Model model:
        .map(toCrewModels)
        // .map((item) => mapToModel(item, unit));
    }
 
    if (
      unit.SectionName.includes('Armoured Cars') || 
      unit.SectionName.includes('Tanks and SP Guns')
    ) {
      return unit
        .UnitItems
        .filter(currentItem => currentItem.IsVehicle === 'true')
        // for each vehicle model get its associated/mounted weapons:
        .map(vehicle => {
          const weapons = unit.UnitItems.filter(item => item.IsGun === 'true' && (item.ItemLine === vehicle.ItemLine))
          
          return {
            name: vehicle.ItemName,
            weapons: weapons.flatMap(getWeapon)
          }
        })
    }

    // Unknown unit type
    return [];
  }

  function getModels(units): Model[] {
    // Each unit consists of one or more models.
    // Flat each unit to its number of models,
    // then flat all unit models to root level:
    return units.flatMap(getModelItems)
  }

  // filter for weapon-like items:
  function getWeaponItems(unit: Unit): UnitItem[] {
    // filter down to weapons only:
    
    // Officer:
    if (unit.SectionName.includes('Officer')) {
      return unit
        .UnitItems
        .filter(currentItem => !!currentItem.ItemQuantity)
        .map(item => {
          return {
            ...item,
            ItemROF: 2, // assuming SMG or assault rifle. 
            ItemRange: 12, // assuming SMG.
          };
        });
    }

    // Armoured Cars, Tanks and SP Guns:
    if (unit.SectionName.includes('Armoured Cars') || unit.SectionName.includes('Tanks and SP Guns')) {
      return unit
        .UnitItems
        .filter(item => !!item.IsGun)
        .map(item => {
          return {
            ...item,
            ItemQuantity: 1, // normalize: patch in missing prop.
          };
        });
    }
    
    // Infantry:
    return unit
      .UnitItems
      .filter(currentItem => !!currentItem.ItemQuantity && !!Number(currentItem.ItemROF))
  }

  function mapToWeapons(item: UnitItem): Weapon[] {
    // transform quantity to items and map to weapon properties:
    const weapons = Array.from(Array(item.ItemQuantity)).map(() => {
      return {
        name: item.ItemName,
        pen: getPen(item),
        rof: Number(item.ItemROF) || 1,
        range: getRange(item.ItemRange),
      }
    });
    return weapons;
  }

  function getWeapon(item: UnitItem): Weapon[] {
    // console.log('getWeapons2()', item);
    return {
      pen: getPen(item),
      rof: getROF(item.ItemROF),
      range: getRange(item.ItemRange),
    }
  }

  function getWeapons(units: Unit[], type: 's'|'h'): Weapon[] {
    return units
      // filter and flatten down to weapon-like unit items (an item can define multiple weapons, e.g. 8 rifles):
      .flatMap(getWeaponItems)
      // transform quantities to items and map to weapon properties:
      .flatMap(mapToWeapons)
  }

  function weaponsByPen(weapons: Weapon[], pen: number) {
    return weapons.filter(weapon => weapon.pen === pen);
  }

  function getShots(weapons: Weapon[]): Shot[] {
    // flatmap to shots:
    return weapons.flatMap(weapon => {
      // weapons ROF map to shots:
      const shots: Shot[] = Array.from(Array(weapon.rof)).map(() => {
        return {
          name: weapon.name,
          pen: weapon.pen,
          range: Number(weapon.range)
        }
      });
      return shots;
    });
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
    <!-- <h1>
      {army.Platoons[0].PlatoonSubName.replace(/\+/gi, ' ')}
    </h1>
    <div>
      Type: {army.Platoons[0].PlatoonName}
    </div>
    <div>
      Order Dice: {army.OrderDice}
    </div>
    <div>
      Total Points: {army.TotalPoints}
    </div>
    <div>
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
