var listOfLocalities = [];
var localities = {};
Papa.parse('./data/total_primary_energy_production.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			// loop through all the rows in file
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];

			// make an object to store data for the current locality
			var locality = {
				name: record.Locality,
				energy: {production:[],consumption:[], unit: "quadrillion BTU"},
				electricity: {production:[],consumption:[], unit: "billion Kilowatt-hours"},
				coal: {production:[],consumption:[], unit: "million short tons"},
				petroleum: {production:[],consumption:[], unit: "thousand barrels per day"},
				renewableElectricity: {production:[],consumption:[], unit: "billion Kilowatt-hours"},
				renewableBiofuel: {production:[],consumption:[], unit: "thousand barrels per day"}
			}

			// loop through all years, from 1980 to 2012
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.energy.production.push( value );
			}

			// add the current locality to an index
			localities[ locality.name] = locality;
			listOfLocalities.push( locality.name );
		}
		

		// make bar chart
		drawLineChart('North America','energy','Total Primary Energy','production',1980,2012, 0, '#67a9cf');

		// populate selection list
		d3.select('#localitySelector').selectAll('option').remove();
		d3.select('#localitySelector').selectAll('option').data(listOfLocalities).enter().append('option')
		.html(function(d) { return d; })
		.attr('value', function(d) { return d; })

		d3.select('#scatter_localitySelector').selectAll('option').remove();
		d3.select('#scatter_localitySelector').selectAll('option').data(listOfLocalities).enter().append('option')
		.html(function(d) { return d; })
		.attr('value', function(d) { return d; })

		d3.select('#scatter2_localitySelector').selectAll('option').remove();
		d3.select('#scatter2_localitySelector').selectAll('option').data(listOfLocalities).enter().append('option')
		.html(function(d) { return d; })
		.attr('value', function(d) { return d; })

		d3.select('#graphSelector').selectAll('option').remove();
		d3.select('#graphSelector').append('option')
		.attr('id',"graph0")
		.attr('value', 1)
		.attr('selected',true)
		.text('Graph1')

		d3.select('#variableSelector').selectAll('option').remove();
		d3.select('#variableSelector').append('option')
			.attr('value', "Production")
			.text('Production')
		d3.select('#variableSelector').append('option')
			.attr('value', "Consumption")
			.text('Consumption')

		d3.select('#scatter_variableSelector').selectAll('option').remove();
		d3.select('#scatter_variableSelector').append('option')
			.attr('value', "Production")
			.text('Production')
		d3.select('#scatter_variableSelector').append('option')
			.attr('value', "Consumption")
			.text('Consumption')

		d3.select('#scatter2_variableSelector').selectAll('option').remove();
		d3.select('#scatter2_variableSelector').append('option')
			.attr('value', "Production")
			.text('Production')
		d3.select('#scatter2_variableSelector').append('option')
			.attr('value', "Consumption")
			.text('Consumption')

	}
});

Papa.parse('./data/total_primary_energy_consumption.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++){
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				energy: {consumption:[]}
			}
			for (var year=1980; year<=2012; year++){
				var value = record[year];
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }
			  locality.energy.consumption.push( value );
			}
			localities[locality.name]['energy']['consumption'] = locality.energy.consumption;
			}
	}});

Papa.parse('./data/total_electricity_generation.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				electricity: {production: []}
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.electricity.production.push( value );
			}
			localities[locality.name]['electricity']['production'] = locality.electricity.production;
			}
	}});

Papa.parse('./data/total_electricity_consumption.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				electricity: {consumption: []}
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.electricity.consumption.push( value );
			}
			localities[locality.name]['electricity']['consumption'] = locality.electricity.consumption;
			}
	}});	

Papa.parse('./data/renewable_electricity_generation.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				renewableElectricity: {production: []}
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.renewableElectricity.production.push( value );
			}
			localities[locality.name]['renewableElectricity']['production'] = locality.renewableElectricity.production;
			}
	}});

Papa.parse('./data/renewable_electricity_consumption.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				renewableElectricity: {consumption: [] }
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.renewableElectricity.consumption.push( value );
			}
			localities[locality.name]['renewableElectricity']['consumption'] = locality.renewableElectricity.consumption;
			}
	}});	

Papa.parse('./data/renewable_electricity_generation.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				renewableElectricity: {production: [] }
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.renewableElectricity.production.push( value );
			}
			localities[locality.name]['renewableElectricity']['production'] = locality.renewableElectricity.production;
			}
	}});

Papa.parse('./data/renewable_biofuel_consumption.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
				if(record.Locality=="")continue;

			var locality = {
				name: record.Locality,
				renewableBiofuel: {consumption: []}
			}
			for (var year=1980; year<=1999; year++) locality.renewableBiofuel.consumption.push( 0 );
			for (var year=2000; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.renewableBiofuel.consumption.push( value );
			}
			localities[locality.name]['renewableBiofuel']['consumption'] = locality.renewableBiofuel.consumption;
			}
	}});

Papa.parse('./data/renewable_biofuel_production.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];

			var locality = {
				name: record.Locality,
				renewableBiofuel: {production: [] }
			}
			for (var year=1980; year<=1999; year++) locality.renewableBiofuel.production.push( 0 );
			for (var year=2000; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }
			  // add record of current energy production
			  locality.renewableBiofuel.production.push( value );
			}

			localities[locality.name]['renewableBiofuel']['production'] = locality.renewableBiofuel.production;
			}
	}});

Papa.parse('./data/petroleum_consumption.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				petroleum: {consumption: []}
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.petroleum.consumption.push( value );
			}
			localities[locality.name]['petroleum']['consumption'] = locality.petroleum.consumption;
			}
	}});

Papa.parse('./data/petroleum_production.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
				if(record.Locality=="Germany (Offshore)" || 
				record.Locality=="Netherlands (Offshore)" || 
				record.Locality=="United Kingdom (Offshore)"||
				record.Locality=="")
					continue;
			var locality = {
				name: record.Locality,
				petroleum: {production: []}
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.petroleum.production.push( value );
			}
			localities[locality.name]['petroleum']['production'] = locality.petroleum.production;
		}
	}});

Papa.parse('./data/coal_production.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				coal: {production: []}
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.coal.production.push( value );
			}
			localities[locality.name]['coal']['production'] = locality.coal.production;
			}
	}});

Papa.parse('./data/coal_consumption.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				coal: {consumption: []}
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.coal.consumption.push( value );
			}
			localities[locality.name]['coal']['consumption'] = locality.coal.consumption;
			}
	}});

Papa.parse('./data/co2_emissions_per_capita.csv', {
      	download: true,
       	header: true,
       	dynamicTyping: true,
       	complete: function(results) 
       	{
			for (var row=0; row < results.data.length; row++)
			{
				var record = results.data[row];
			var locality = {
				name: record.Locality,
				co2Emission: []
			}
			for (var year=1980; year<=2012; year++) 
			{
				var value = record[year];

			  // deal with missing data points
			  if (value === '--') {
			  	value = 0;
			  }
			  else if (value === 'NA') {
			  	value = 0;
			  }
			  else if (value === '(s)') {
			  	value = 0;
			  }
			  else if (value === 'W') {
			  	value = 0;
			  }

			  // add record of current energy production
			  locality.co2Emission.push( value );
			}
			localities[locality.name]['co2Emission'] = locality.co2Emission;
			}
	}});

console.log(localities)

var no_of_svgs=0;
var svg_list=[];
var boundary_memory
var svg_height=0;
var bar_chart_counter=1;
// chart size 
var chartWidth = 700;
var chartHeight = 130;
var chartcolor = ['#67a9cf','#fc8d59']
var chartopacity = [.8,.8]
var memory=[['North America','energy','Total Primary Energy','production',1980,2012,"lineChart"]]
maximum_production={}


var svg = d3.select("body").append("svg")
    .attr("width", 850)
    .attr("height", 250)
    .attr("id","svg"+no_of_svgs)
    .attr("border",1)
    .append("text")
    .attr("id","label"+no_of_svgs)
    .attr('x',10)
    .attr('y',50);

d3.select("#svg"+no_of_svgs).append("rect")
	.attr("x", 2)
	.attr("y", 2)
	.attr("height", 240)
	.attr("width", 835)
	.style("stroke", "#AAAAAA")
	.style("fill", "none")
	.style("stroke-width", 5);   

boundary_memory=no_of_svgs;

svg_list.push(no_of_svgs);

d3.select("body").append("md-button")
    .attr("class", "md-raised md-primary")
    .attr("id", "graphCreator")
    .attr("ng-click","createGraph()")
    .style("top", 280+"px")
    .style("left",(chartWidth/2-20)+"px")
    .attr("ng-hide","compareVariables")
    .text("Create New Graph");


// d3.select("body").append("button")
//     .attr("id", "graphRemover"+no_of_svgs)
//     .attr("onClick","removeGraph(this.value)")
//     .style("top", 30+"px")
//     .attr("value", no_of_svgs)
//     .style("position","absolute")
//     .attr("ng-hide","compareVariables")
//     .style("left",(chartWidth/2+360)+"px")
//     .text("Delete");
