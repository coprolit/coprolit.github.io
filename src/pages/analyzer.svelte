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
    UnitItems: UnitItem[]
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
			// if (!response.ok) {
			//   throw new Error(response.statusText);
			// }
			return response.json();
		})
		.then(response => {
      army = response;
      // From platoons flatten down to units: 
      units = response.Platoons.flatMap(platoon => platoon.Units);
      // console.log(units)
      // From units flatten down to models:
      models = getModels(units);
      console.log(models)
      // From models
      weapons = getWeapons(units);
      // console.log('weapons', weapons)
      shots = getShots(weapons);
      // console.log('shots', shots)
      
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

  function mapToModels(item: UnitItem): Model[] {
    // transform quantity to items and map to model properties:
    const models: Model[] = Array.from(Array(item.ItemQuantity)).map(() => {
      return {
        name: item.ItemName,
        movement: 6,
        damageValue: 4,
        skill: item.UnitSkill,
      }
    });

    return models;
  }

  function getModelItems(unit: Unit): UnitItem[] {
    console.log('getModelItems', unit);
    // filter down to models only:
    
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

    if(unit.SectionName.includes('Infantry')) {
      return unit
        .UnitItems
        .filter(currentItem => !!currentItem.ItemQuantity)
    }

    /*
    if(unit.SectionName.includes('Mortar')) {
      return unit
        .UnitItems
        .filter(currentItem => !!currentItem.ItemQuantity)
    }
    */

    return [];
  }

  function getModels(units): Model[] {
    return units
      // filter and flatten down to model-like unit items (an item can define multiple models, e.g. 8 infantry men):
      .flatMap(getModelItems)
      // transform quantities to items and map to weapon properties:
      .flatMap(mapToModels)
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
  
  <div class="flow">
    <h3>Shots pr. turn (rate of fire)</h3>
    <div>Total: {shots.length}</div>
    <div>Avg. pr. weapon: {shots.length / weapons.length}</div>
    <ul> 
      Small-arms <li style="width: {shots.filter(shot => shot.pen === 0).length * 10}px">{shots.filter(shot => shot.pen === 0).length}</li>
      Pen 1 <li style="width: {shots.filter(shot => shot.pen === 1).length * 10}px">{shots.filter(shot => shot.pen === 1).length}</li>
      Pen 2 <li style="width: {shots.filter(shot => shot.pen === 2).length * 10}px">{shots.filter(shot => shot.pen === 2).length}</li>
      Pen 3 <li style="width: {shots.filter(shot => shot.pen === 3).length * 10}px">{shots.filter(shot => shot.pen === 3).length}</li>
      Pen 4 <li style="width: {shots.filter(shot => shot.pen === 4).length * 10}px">{shots.filter(shot => shot.pen === 4).length}</li>
      Pen 5 <li style="width: {shots.filter(shot => shot.pen === 5).length * 10}px">{shots.filter(shot => shot.pen === 5).length}</li>
      Pen 6 <li style="width: {shots.filter(shot => shot.pen === 6).length * 10}px">{shots.filter(shot => shot.pen === 6).length}</li>
    </ul>
  </div>

  <!-- <div class="flow">
    <h3>Penetration</h3>
    <ul> 
      <li style="width: {weaponsByPen(weapons, 0).length * 10}px">0 (Small-arms)</li>
      <li style="width: {weaponsByPen(weapons, 1).length * 10}px">1</li>
      <li style="width: {weaponsByPen(weapons, 2).length * 10}px">2</li>
      <li style="width: {weaponsByPen(weapons, 3).length * 10}px">3</li>
      <li style="width: {weaponsByPen(weapons, 4).length * 10}px">4</li>
      <li style="width: {weaponsByPen(weapons, 5).length * 10}px">6</li>
      <li style="width: {weaponsByPen(weapons, 6).length * 10}px">5</li>
      <li style="width: {weaponsByPen(weapons, 7).length * 10}px">7</li>
      <li style="width: {weaponsByPen(weapons, 8).length * 10}px">8</li>
    </ul>
  </div> -->

  <div class="flow">
    <h3>Range</h3>
    <ul>
      6"
      <li style="width: {weapons.filter(weapon => weapon.range === 6).length * 10}px">-</li>
      12"
      <li style="width: {weapons.filter(weapon => weapon.range === 12).length * 10}px">-</li>
      24"
      <li style="width: {weapons.filter(weapon => weapon.range === 24).length * 10}px">-</li>
      36"
      <li style="width: {weapons.filter(weapon => weapon.range === 36).length * 10}px">-</li>
      48"
      <li style="width: {weapons.filter(weapon => weapon.range === 48).length * 10}px">-</li>
      60"
      <li style="width: {weapons.filter(weapon => weapon.range === 60).length * 10}px">-</li>
    </ul>
  </div>

  <!-- Mobility -->

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
</style>
