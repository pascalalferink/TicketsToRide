<template>
<div id="app">
	<div class="container-fluid">
		<div class="row">
			<div class="col-12 col-sm-6">
				<div class="map border d-inline-block w-100">
					<img class="img-fluid w-100 map" src="../Map_Europe_alliances_1914-de.svg"/>
					<div class="routes">
						<MapItem 
							v-for="inventory in list" 
							:inventory="inventory" 
							@delete="onDeleteItem"
							:key="inventory.id" 
						/>
					</div>
					<div class="routes">

						<PrelistMapItem 
							v-for="prelist in prelist" 
							:prelist="prelist" 
							@delete="onDeleteItem"
							:key="prelist.id" 
						/>

					</div>
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="row">
					<div class="col">
						<div class="inventory mb-2">
							<div class="row inventory-total">
								<div class="col-12">
									<div class="w-100 d-flex justify-content-between py-1 px-2 inventory-item">
										<strong>{{list.length}} Routes</strong>
										<strong>Points: {{routeTotalPoints}}</strong>
									</div>
								</div>
							</div>
							<div id="inventory-items">
								<InventoryItem 
									v-for="inventory in list" 
									:inventory="inventory" 
									@delete="onDeleteItem"
									:key="inventory.id" 
								/>
							</div>
							<h3 class="mt-2 text-center d-block"  v-if="this.prelist.length > 0">Nieuwe tickets</h3>
							<div id="prelist-items">
								
								<PrelistItem 
									v-for="prelist in prelist" 
									:prelist="prelist" 
									@delete="onDeleteItem"
									:key="prelist.id" 
								/>
								<div class="d-block text-center">
								<button v-if="this.prelist.length > 0" v-on:click="addToList()" class="btn btn-primary mt-2 text-center">selecteer tickets</button>
								</div>
							</div>
						</div>		
					</div>
				</div>
				<div class="row">
					<div class="col text-center">
						<button v-if="this.prelist.length == 0"  v-on:click="generatePaths()" class="btn btn-primary">New cards</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>
</template>

<script>
import PrelistItem from './components/Prelistitem.vue';
import InventoryItem from './components/InventoryItem.vue';
import MapItem from './components/Mapitem.vue';
import PrelistMapItem from './components/PrelistMapItem.vue';

export default {
	name: 'inventory',
	components: {
	InventoryItem,MapItem,PrelistItem, PrelistMapItem
	},
	data() {
		return {
		prelist: [
			
		],
		list: [
			
		],
		stations: [
			"Amsterdam", "Angora", "Athína", "Barcelona", "Berlin", "Brest", "Brindisi", "Bruxelles", "Bucuresti", "Budapest", "Cádiz", "Constantinople", "Danzig", "Dieppe", "Edinburgh", "Erzurum", "Essen", "Frankfurt", "Kharkov", "Kyïv", "København", "Lisboa", "London", "Madrid", "Marseille", "Moskva", "München", "Palermo", "Pamplona", "Paris", "Petrograd", "Riga", "Roma", "Rostov", "Sarajevo", "Sevastopol", "Smolensk", "Smyrna", "Sochi", "Sofia", "Stockholm", "Venezia", "Warszawa", "Wien", "Wilno", "Zágráb", "Zürich"
		],
		routes: [
			[ 0, -1, -1, -1, -1, -1, -1,	1, -1, -1, -1, -1, -1, -1, -1, -1,	3,	2, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,	0, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1,	2, -1,	3, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2,	4, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1,	2,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4,	3, -1, -1, -1],
			[-1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,	4, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ 1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1,	2, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1,	0,	4, -1,	3, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1,	4,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1,	6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1,	1, -1,	2, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1,	2, -1, -1, -1, -1, -1, -1,	3, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1,	2, -1,	3, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1,	2, -1,	2, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1,	1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1],
			[ 3, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0,	2, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ 2, -1, -1, -1,	3, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1,	2,	0, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0,	4, -1, -1, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1,	4,	6, -1, -1, -1, -1, -1, -1, -1, -1,	4,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1,	4, -1,	2, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[ 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2,	4, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,	2, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1,	0, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1,	4,	4, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1,	4, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1,	3, -1, -1,	2],
			[-1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1,	4, -1, -1, -1, -1,	6, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1,	2, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3,	4, -1, -1, -1,	0,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1,	3, -1,	2, -1, -1, -1, -1, -1,	1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1,	4,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1, -1,	0,	4, -1, -1, -1, -1, -1, -1, -1, -1,	8, -1, -1, -1,	4, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1],
			[-1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1,	4, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1,	4, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,	4, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1,	3, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1,	4, -1, -1,	4, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4, -1,	0, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1],
			[-1,	3,	2, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	6, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1,	2, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1,	3, -1, -1, -1, -1, -1,	2, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1,	8, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1,	0, -1, -1, -1,	2,	2],
			[-1, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1,	4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	0,	4,	3, -1, -1],
			[-1, -1, -1, -1,	3, -1, -1, -1, -1,	1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4,	0, -1,	2, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	4,	4, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1,	3, -1,	0, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	3, -1, -1, -1, -1, -1, -1,	2, -1,	2, -1,	0, -1],
			[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1,	2, -1, -1,	3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,	2, -1, -1, -1, -1,	0]
		]

		}
	},
	methods: {

		findShortestPaths(stations, routes) {
		var table = [];
		var tickets = [];

		function addOptions(station, distance)
		{
			for(var k = 0; k < routes[station].length; k++)
			{
				if(routes[station][k] > 0 && distances[k] == -1 && (options[k] == -1 || routes[station][k] + distance < options[k]))
				{
					options[k] = routes[station][k] + distance;
				}
			}
		}

		for(var i = 0; i < routes.length; i++)
		{
			var options = routes[i].slice();
			var distances = [];
			for(var j = 0; j < stations.length; j++) { distances[j] = -1; }
			var go = true;

			while(go)
			{
				var len = 1000;
				var pick = -1;

				for(var k = 0; k < options.length; k++)
				{
					if(options[k] > 0 && options[k] < len)
					{
						pick = k;
						len = options[k]
					}
				}

				if(pick != -1)
				{
					distances[pick] = len;
					options[pick] = -1;
					addOptions(pick, len);
				}
				else
				{
					go = false;
				}
			}

			table.push(distances);
		}

		for(i = 0; i < table.length; i++)
		{
			for(j = 0; j < table[i].length; j++)
			{
				if(routes[i][j] <= 0 && i < j && j < table[i].length) { tickets.push([stations[i], stations[j], Number(table[i][j])]); }
			}
		}

		return tickets;
	},

		createNewInventoryItem() {
		//validate inventory
		if (!this.inventory){
			alert("Please enter a inventory!");
			return
		}
		const newId = Math.max.apply(null, this.prelist.map(t => t.id)) + 1;
		this.prelist.push({ id: newId, text: this.inventory});
		this.inventory = '';
		},
		onDeleteItem(inventory){
		this.list = this.list.filter(item => item !== inventory);
		},
		

		getPaths(t, nr, min, max, target) {
		var div = target == 'main' ? 'col1' : target;

		for(var j = 0; j < t.length; j++)
		{
			if(t[j][2] < min || t[j][2] > max) { t.splice(j--, 1); }
		}

		if(t.length < nr)
		{
			document.getElementById('inventory-items').innerHTML += 'Not enough tickets matched your criteria.';
		}
		else
		{
			for(var i = 0; i < nr; i++)
			{
				if(div == 'col1' && i >= nr / 2) { div = 'col2'; }

				var pick = t.splice(Math.floor(Math.random() * t.length), 1);

				//let newId = Math.max.apply(null, this.list.map(t => t.id)) + 1;

				this.prelist.push({start: pick[0][0], end: pick[0][1], points: pick[0][2], checked: false});

				//document.getElementById('inventory-items').innerHTML += '<div class="ticket ' + target + '">' + (i+1) + ': ' + pick[0][0] + '-' + pick[0][1] + ' (' + pick[0][2]	+ ')</div>';
			}
			//document.getElementById('inventory-items').innerHTML += '</div>';
		}
	},
	generatePaths() {
		this.getPaths((this.findShortestPaths(this.stations, this.routes)).slice(), 4,1,40, 'main');
	},
	addToList() {

		let selectedprelist = this.prelist.filter(item =>item.checked);
		console.log(selectedprelist);

		if((selectedprelist.length < 2) && (this.list.length == 0)) {
			alert('selecteer meer dan 2 tickets');
		}
		else if(selectedprelist.length < 1) {
			alert('selecteer minimaal 1 ticket');
		}
		else {
		console.log(selectedprelist);
		this.list.push.apply(this.list, selectedprelist);
		this.prelist = [];
		}
	}
		
	},
	computed: {
			routeTotalPoints: function () {
			if(this.list.length > 0) {
				return this.list.map(item => item.points).reduce((total, amount) => total + amount);
			}
			else {
				return '';
			}
			}
	}
}
</script>

<style lang="css">
@import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
@import '../style.css';
@import url('https://fonts.googleapis.com/css?family=Eagle+Lake&display=swap');

</style>