<script lang='ts'>
  interface Army {
		id: number;
		name: string;
		PlatoonName: string;
		PlatoonSubName: string;
		Units: Unit[];
	}

	interface Unit {
    SectionName: string;
    UnitItems: UnitItem[];
    UnitSkill: 'Inexperienced' | 'Regular' | 'Veteran';
    movement: number;
  }

  interface UnitItem {
    IsVehicle: 'false' | 'true';
    ItemName: string;
    ItemPEN: 'HE' | ' ' | 'n/a' | '+1'
    ItemQuantity: number;
    ItemROF: string;
  }

  interface Model {
    name: string;
    movement: number;
    damageValue: number;
    skill: 'Inexperienced' | 'Regular' | 'Veteran';
  }

  interface Weapon {
    name: string;
    pen: number;
    rof: number;
    range: number;
  }
  
  interface Shot {
    name: string;
    pen: number;
    range: number;
  }

  let init = true;

  let army: Army;
  let units: Unit[];
  let models: Model[];
  let weapons: Weapon[];
  let shots: Shots[];
  let penetration: number[];
  
  function importArmy(event: any): void {
		const formData = new FormData(event.target);
		const url = formData.get('url');
		
		fetch('http://www.philippesimpson.dk/armylist.php?url=' + url, {
			method: 'GET',
		})
		.then(response => {
			if (!response.ok) {
			  throw new Error(response.statusText);
      }
      
			return response.json();
		})
		.then(response => {
      army = response;
      // From platoons flatten down to units: 
      units = response.Platoons.flatMap(platoon => platoon.Units);

      // From units flatten down to models:
      models = getModels(units);

      // From units (TODO from models?) flatten down to weapons:
      weapons = getWeapons(units);
      
      // From weapons flatten down to shots:
      shots = getShots(weapons);
      
			init = false;
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
    });
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
    if(typeof range === 'string') {
      // Expected value format: 12, 12", 12"-60", or 60"(30-72).
      return Number( range.slice(-3, -1) );
    }

    return Number(range);
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
      return Number(unit.UnitItems[0].ItemDamageValue.slice(0, -1));
    }
  }

  function mapToModel(item: UnitItem, unit: Unit): Model[] {
    return {
      name: item.ItemName,
      movement: getMobility(unit),
      damageValue: getDamageValue(unit),
      skill: unit.UnitSkill,
    }
  }

  function getModelItems(unit: Unit): UnitItem[] {
    // HQ units & Infantry:
    if (
      unit.SectionName.includes('Infantry') ||
      unit.SectionName.includes('Officer')
    ) {
      // Filter down to UnitItems with a quantity value, and transform to Model items.
      return unit
        .UnitItems
        .filter(currentItem => !!currentItem.ItemQuantity)
        // transform from quantity to items array:
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
        .map((item) => mapToModel(item, unit));
    }
 
    if (
      unit.SectionName.includes('Armoured Cars') || 
      unit.SectionName.includes('Tanks and SP Guns')
    ) {
      return unit
        .UnitItems
        .filter(currentItem => currentItem.IsVehicle === 'true')
        // map to Model model:
        .map((item) => mapToModel(item, unit));
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

<main>
	{#if init}
	<form on:submit|preventDefault={importArmy}>
		<label for='url'>Import army:</label>
		<input type="url" name="url">
		<button type="submit">Submit</button>
	</form>
  {:else}
  <div class="flow">
    <h1>
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
    </div>
  
    <div>
      <h3>Shots pr. turn (rate of fire)</h3>
      <div class="table">
        <div>Total</div>
        <div>{shots.length}</div>
        <div></div>
        
        <div>Avg. pr. weapon</div>
        <div>{(shots.length / weapons.length).toFixed(2)}</div>
        <div></div>

        <div>Small-arms</div>
        <div>{shots.filter(shot => shot.pen === 0).length}</div>
        <div class="bg-grey" style="width: {shots.filter(shot => shot.pen === 0).length}%"></div>
        
        <div>Pen 1</div>
        <div>{shots.filter(shot => shot.pen === 1).length}</div>
        <div class="bg-grey" style="width: {shots.filter(shot => shot.pen === 1).length}%"></div>
        
        <div>Pen 2</div>
        <div>{shots.filter(shot => shot.pen === 2).length}</div>
        <div class="bg-grey" style="width: {shots.filter(shot => shot.pen === 2).length}%"></div>
        
        <div>Pen 3</div>
        <div>{shots.filter(shot => shot.pen === 3).length}</div>
        <div class="bg-grey" style="width: {shots.filter(shot => shot.pen === 3).length}%"></div>
        
        <div>Pen 4</div>
        <div>{shots.filter(shot => shot.pen === 4).length}</div>
        <div class="bg-grey" style="width: {shots.filter(shot => shot.pen === 4).length}%"></div>
        
        <div>Pen 5</div>
        <div>{shots.filter(shot => shot.pen === 5).length}</div>
        <div class="bg-grey" style="width: {shots.filter(shot => shot.pen === 5).length}%"></div>
        
        <div>Pen 6</div>
        <div>{shots.filter(shot => shot.pen === 6).length}</div>
        <div class="bg-grey" style="width: {shots.filter(shot => shot.pen === 6).length}%"></div>
        
      </div>
    </div>

    <!-- Weapons range -->
    <div>
      <h3>Weapons Range</h3>
      <div class="table">
        <div>6"</div>
        <div>{weapons.filter(weapon => weapon.range === 6).length}</div>
        <div class="bg-grey" style="width: {weapons.filter(weapon => weapon.range === 6).length}%"></div>
        
        <div>12"</div>
        <div>{weapons.filter(weapon => weapon.range === 12).length}</div>
        <div class="bg-grey" style="width: {weapons.filter(weapon => weapon.range === 12).length}%"></div>
        
        <div>24"</div>
        <div>{weapons.filter(weapon => weapon.range === 24).length}</div>
        <div class="bg-grey" style="width: {weapons.filter(weapon => weapon.range === 24).length}%"></div>
        
        <div>36"</div>
        <div>{weapons.filter(weapon => weapon.range === 36).length}</div>
        <div class="bg-grey" style="width: {weapons.filter(weapon => weapon.range === 36).length}%"></div>
        
        <div>48"</div>
        <div>{weapons.filter(weapon => weapon.range === 48).length}</div>
        <div class="bg-grey" style="width: {weapons.filter(weapon => weapon.range === 48).length}%"></div>
        
        <div>60"</div>
        <div>{weapons.filter(weapon => weapon.range === 60).length}</div>
        <div class="bg-grey" style="width: {weapons.filter(weapon => weapon.range === 60).length}%"></div>
      </div>
    </div>

    <!-- Mobility -->
    <div>
      <h3>Units Mobility (Run speed)</h3>
      <div class="table">
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
      </div>
    </div>
    
    <!-- Units Damage Values -->
    <div>
      <h3>Units Damage Value</h3>
      <div class="table">
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
        
      </div>
    </div>
    
    <!-- Experiency -->
    <div>
      <h3>Units Experience</h3>
      <div class="table">
        <div>Inexperienced</div>
        <div>{units.filter(unit => unit.UnitSkill === 'Inexperienced').length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => unit.UnitSkill === 'Inexperienced').length}%"></div>
        
        <div>Regular</div>
        <div>{units.filter(unit => unit.UnitSkill === 'Regular').length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => unit.UnitSkill === 'Regular').length}%"></div>
        
        <div>Veteran</div>
        <div>{units.filter(unit => unit.UnitSkill === 'Veteran').length}</div>
        <div class="bg-grey" style="width: {units.filter(unit => unit.UnitSkill === 'Veteran').length}%"></div>
      </div>
    </div>

  </div>

	{/if}
</main>

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
