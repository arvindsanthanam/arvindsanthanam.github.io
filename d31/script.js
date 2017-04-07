angular
.module('MyApp', ['ngMaterial'])
.controller('AppCtrl', function($scope, $timeout, $q, $log) {
	$scope.chartType = "lineChart";
	$scope.dataSetChoice = 'Total Primary Energy';
	$scope.scatter_dataSetChoice = 'Total Primary Energy'
	$scope.scatter2_dataSetChoice = 'Total Primary Energy'
	$scope.variableChoice = null;
	$scope.scatter_variableChoice = null;
	$scope.scatter2_variableChoice = null;
	$scope.from=[];
	$scope.to=[];
	$scope.fromEntered=false;
	$scope.graphChoice=1
	$scope.makeScatterPlot=true;
	$scope.makeScatterPlot2=true;
	$scope.compareVariables=false;

	for(i=1980;i<=2012;++i)$scope.from.push(i);
	$scope.changeTo = function(){
		$scope.fromEntered=true;
		$scope.to=[]
		for(i=$scope.fromDate;i<=2012;++i)$scope.to.push(i);
	}
	
	$scope.scatter = function(){
		$scope.makeScatterPlot2=!$scope.makeScatterPlot2;
		$scope.scatterGraph();
	}
	$scope.dataTypeChange = function(){
		d3.select("#variableSelector").selectAll("option").remove();
		if($scope.dataSetChoice=="Energy-Related CO2 Emisions"){
			d3.select("#variableSelector").selectAll("option")
			.data(['Emission'])
			.enter()
			.append("option")
			.text(function(d){ return d; })
			.attr("value",function(d){return d;});
			// d3.select("#variableSelector").attr("disabled",true);
		}
		else{
			d3.select("#variableSelector").selectAll("option")
			.data(['Production','Consumption'])
			.enter()
			.append("option")
			.text(function(d){return d; })
			.attr("value",function(d){return d; });
		}
	}

	$scope.scatter_dataTypeChange = function(){
		d3.select("#scatter_variableSelector").selectAll("option").remove();
		if($scope.scatter_dataSetChoice=="Energy-Related CO2 Emisions"){
			d3.select("#scatter_variableSelector").selectAll("option")
			.data(['Emission'])
			.enter()
			.append("option")
			.text(function(d){ return d; })
			.attr("value",function(d){return d;});
			// d3.select("#variableSelector").attr("disabled",true);
		}
		else{
			d3.select("#scatter_variableSelector").selectAll("option")
			.data(['Production','Consumption'])
			.enter()
			.append("option")
			.text(function(d){return d; })
			.attr("value",function(d){return d; });
		}
	}

	$scope.scatter2_dataTypeChange = function(){
		d3.select("#scatter2_variableSelector").selectAll("option").remove();
		if($scope.scatter2_dataSetChoice=="Energy-Related CO2 Emisions"){
			d3.select("#scatter2_variableSelector").selectAll("option")
			.data(['Emission'])
			.enter()
			.append("option")
			.text(function(d){ return d; })
			.attr("value",function(d){return d;});
			// d3.select("#variableSelector").attr("disabled",true);
		}
		else{
			d3.select("#scatter2_variableSelector").selectAll("option")
			.data(['Production','Consumption'])
			.enter()
			.append("option")
			.text(function(d){return d; })
			.attr("value",function(d){return d; });
		}
	}

	$scope.graphChange = function(){
		d3.select("#svg"+($scope.graphChoice-1)).select("rect")
			.style("stroke", "#AAAAAA")
			.style("fill", "none")
			.style("stroke-width", 5);   

		d3.select("#svg"+boundary_memory).select("rect")
			.style("stroke", "none")
			.style("fill", "none")
			.style("stroke-width", "none");
		boundary_memory=$scope.graphChoice-1;
	}

	$scope.clearGraph = function(){
		var svg = document.getElementById('graphSelector');
		svg = svg.options[svg.selectedIndex].value;
		// clear the contents of the chart
		d3.select("#svg"+(svg-1)).selectAll('g').remove();
		d3.select("#label"+(svg-1)).text("");
		bar_chart_counter=0;
	};


	$scope.createGraph = function(){
		no_of_svgs++;
		svg_height++;
		svg_list.push(no_of_svgs)
		console.log("goig to ears"+boundary_memory)
		d3.select("body").append("svg")
		    .attr("width", 850)
		    .attr("height", 250)
		    .attr("id","svg"+no_of_svgs)
		    .style("top",220*svg_height)	
		    .append("text")
		    .attr("id","label"+no_of_svgs)
		    .attr('x',10)
		    .attr('y',50);

		d3.select("#svg"+no_of_svgs).append("rect")
			.attr("x", 2)
			.attr("y", 22)
			.attr("height", 220)
			.attr("width", 835)
			.style("stroke", "#AAAAAA")
			.style("fill", "none")
			.style("stroke-width", 5);   

		d3.select("#svg"+boundary_memory).select("rect")
			.style("stroke", "none")
			.style("fill", "none")
			.style("stroke-width", "none");

		boundary_memory=no_of_svgs;
		d3.select('#graphSelector').append('option')
			.attr('id', "graph"+no_of_svgs)
			.attr('value', (no_of_svgs+1))
			.attr('selected',true)
			.text('Graph'+(no_of_svgs+1))
			

		d3.select("#graphCreator").style("top", ((svg_height+1)*220)+60+"px");

		// d3.select("body").append("button")
		// 	.attr("ng-hide","compareVariables")
		//     .attr("id", "graphRemover"+no_of_svgs)
		//     .attr("onClick","removeGraph(this.value)")
  //   		.attr("value",no_of_svgs)
		//     .style("top", ((svg_height)*220)+30+"px")
		//     .style("left",(chartWidth/2+320)+"px")
		//     .style("position","absolute")
		//     .text("Delete"+(no_of_svgs+1));

		if($scope.makeScatterPlot==true)
		$scope.changeGraph()
		else
		$scope.scatterGraph()

		window.scrollTo(0,document.body.scrollHeight);
	}

	$scope.compareGraph = function(){
		$scope.addGraph()
		$scope.compareVariables=!$scope.compareVariables;
	}
	$scope.addGraph = function(){
		if(!$scope.compareVariables) return;

		var graph = document.getElementById('graphSelector');
		graph = graph.options[graph.selectedIndex].value-1;
		var temp=memory[graph]
		var localityName = document.getElementById('localitySelector');
		localityName = localityName.options[localityName.selectedIndex].value;
		var variable = document.getElementById('variableSelector');
		switch(variable.options[variable.selectedIndex].value){
			case 'Production': 	variable="production";break;
			case 'Consumption': variable="consumption";break;
			case 'Emission': 	variable="co2Emission";break;   
		}
		if(temp[3]=="co2Emission")
			var graphVariableByLocality	 = localities[localityName][variable];
		else
			var graphVariableByLocality	 = localities[localityName][temp[1]][variable];
		
		maximum_production[graph]<d3.max(graphVariableByLocality)?
		maximum_production[graph]=d3.max(graphVariableByLocality):maximum_production[graph]
		$scope.clearGraph();
		switch(temp[6]){
			case 'lineChart': 	{
								drawLineChart(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],graph,'#67a9cf', maximum_production[graph]);
								drawLineChart(localityName,temp[1],temp[2],variable,temp[4],temp[5],graph, '#fc8d59', maximum_production[graph],temp[0],temp[3]);
								//temp0 and temp3 will change 
								break;}
			case 'barChart': 	{
								bar_chart_counter++
								drawBarChart(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],graph,'#67a9cf',maximum_production[graph]);
								bar_chart_counter++;
								drawBarChart(localityName,temp[1],temp[2],variable,temp[4],temp[5],graph, '#fc8d59',maximum_production[graph],temp[0],temp[3]);
								break;}	
			case 'scatterPlot': {
								drawScatterPlot(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],graph,'#67a9cf', maximum_production[graph]);
								drawScatterPlot(localityName,temp[1],temp[2],variable,temp[4],temp[5],graph, '#fc8d59', maximum_production[graph],temp[0],temp[3]);
								//temp0 and temp3 will change 
								break;}
		}
	}
	$scope.remGraph = function(){
		var svg = document.getElementById('graphSelector');
		event = svg.options[svg.selectedIndex].value-1;
		var index = svg_list.indexOf(parseInt(event));
		svg_list.splice(index, 1);
		svg_height--;
		d3.select("#svg"+event).remove();
		d3.select("#graphRemover"+event).remove();
		for(i=index;i<=svg_list.length;i++){
			d3.select("#svg"+svg_list[i])
				.style("top",220*(i));
			d3.select("#graphRemover"+svg_list[i])
				.style("top",220*(i-1)+30)
				.text("changed"+(svg_list[i]+1));
		}   
		d3.select("#graphCreator").style("top", ((svg_height+1)*280)+30+"px");
		d3.select('#graph'+(event)).remove();
                var svg = document.getElementById('graphSelector');
		event = svg.options[svg.selectedIndex].value-1;
                try{d3.select("#svg"+(event)).select("rect")
			.style("stroke", "#AAAAAA")
			.style("fill", "none")
			.style("stroke-width", 5);
                    boundary_memory=event;
			}
		catch(err){
			
		}
	};
	$scope.drawGraph = function(){
		bar_chart_counter++;
		if($scope.fromDate==null)$scope.fromDate=1980;
		else $scope.fromEntered=true;
		if($scope.toDate==null)$scope.toDate=2012;
		
		// figure out the newly selected locality
		var localityName = document.getElementById('localitySelector');
		localityName = localityName.options[localityName.selectedIndex].value;
		
		var svg = document.getElementById('graphSelector');
		svg = svg.options[svg.selectedIndex].value;
		var sel = document.getElementById('dataSetSelect');
		var name = sel.options[sel.selectedIndex].value;
		
		switch(name){
			case 'Total Primary Energy': sel="energy";break;
			case 'Total Electricity': sel="electricity";break;
			case 'Renewable Electricity': sel="renewableElectricity";break;
			case 'Renewable Biofuels': sel="renewableBiofuel";break;
			case 'Petroleum': sel="petroleum";break;
			case 'Coal': sel="coal";break;
			case 'Energy-Related CO2 Emissions': sel="co2Emission";
		}
		var variable = document.getElementById('variableSelector');
		switch(variable.options[variable.selectedIndex].value){
			case 'Production': 	variable="production";break;
			case 'Consumption': variable="consumption";break;
			case 'Emission': 	variable="co2Emission";break;   
		}
		maximum_production[svg-1]=null
		switch(d3.select('input[name="chartType"]:checked').node().value){
			case 'barChart': 	{memory[svg-1]=[localityName,sel,name,variable,$scope.fromDate,$scope.toDate,"barChart"]
								drawBarChart(localityName,sel,name,variable,$scope.fromDate,$scope.toDate,(svg-1),'#67a9cf'); 
								break;}
			case 'lineChart': 	{memory[svg-1]=[localityName,sel,name,variable,$scope.fromDate,$scope.toDate,"lineChart"]
								drawLineChart(localityName,sel,name,variable,$scope.fromDate,$scope.toDate,(svg-1),'#67a9cf'); 
								break;}
		}
	}

	$scope.changeGraph = function(){
		$scope.makeScatterPlot=true
		$scope.makeScatterPlot2=true
		$scope.clearGraph();
		$scope.drawGraph();
	};
	$scope.scatterGraph = function(){
		$scope.makeScatterPlot=false
		$scope.clearGraph();

		if($scope.fromDate==null)$scope.fromDate=1980;
		else $scope.fromEntered=true;
		if($scope.toDate==null)$scope.toDate=2012;
		
		// figure out the newly selected locality
		var localityName = document.getElementById('localitySelector');
		localityName = localityName.options[localityName.selectedIndex].value;
		
		var svg = document.getElementById('graphSelector');
		svg = svg.options[svg.selectedIndex].value;
		var sel = document.getElementById('dataSetSelect');
		var name = sel.options[sel.selectedIndex].value;
		
		switch(name){
			case 'Total Primary Energy': sel="energy";break;
			case 'Total Electricity': sel="electricity";break;
			case 'Renewable Electricity': sel="renewableElectricity";break;
			case 'Renewable Biofuels': sel="renewableBiofuel";break;
			case 'Petroleum': sel="petroleum";break;
			case 'Coal': sel="coal";break;
			case 'Energy-Related CO2 Emissions': sel="co2Emission";
		}
		var variable = document.getElementById('variableSelector');
		switch(variable.options[variable.selectedIndex].value){
			case 'Production': 	variable="production";break;
			case 'Consumption': variable="consumption";break;
			case 'Emission': 	variable="co2Emission";break;   
		}

		// figure out the newly selected locality
		var scatter_localityName = document.getElementById('scatter_localitySelector');
		scatter_localityName = scatter_localityName.options[scatter_localityName.selectedIndex].value;
		
		var scatter_sel = document.getElementById('scatter_dataSetSelect');
		var scatter_name = scatter_sel.options[scatter_sel.selectedIndex].value;
		
		switch(scatter_name){
			case 'Total Primary Energy': scatter_sel="energy";break;
			case 'Total Electricity': scatter_sel="electricity";break;
			case 'Renewable Electricity': scatter_sel="renewableElectricity";break;
			case 'Renewable Biofuels': scatter_sel="renewableBiofuel";break;
			case 'Petroleum': scatter_sel="petroleum";break;
			case 'Coal': scatter_sel="coal";break;
			case 'Energy-Related CO2 Emissions': scatter_sel="co2Emission";
		}
		var scatter_variable = document.getElementById('scatter_variableSelector');
		switch(scatter_variable.options[scatter_variable.selectedIndex].value){
			case 'Production': 	scatter_variable="production";break;
			case 'Consumption': scatter_variable="consumption";break;
			case 'Emission': 	scatter_variable="co2Emission";break;   
		}
		if($scope.makeScatterPlot2==false){
			var scatter2_localityName = document.getElementById('scatter2_localitySelector');
			scatter2_localityName = scatter2_localityName.options[scatter2_localityName.selectedIndex].value;
			
			var scatter2_sel = document.getElementById('scatter2_dataSetSelect');
			var scatter2_name = scatter2_sel.options[scatter2_sel.selectedIndex].value;
			
			switch(scatter2_name){
				case 'Total Primary Energy': scatter2_sel="energy";break;
				case 'Total Electricity': scatter2_sel="electricity";break;
				case 'Renewable Electricity': scatter2_sel="renewableElectricity";break;
				case 'Renewable Biofuels': scatter2_sel="renewableBiofuel";break;
				case 'Petroleum': scatter2_sel="petroleum";break;
				case 'Coal': scatter2_sel="coal";break;
				case 'Energy-Related CO2 Emissions': scatter2_sel="co2Emission";
			}
			var scatter2_variable = document.getElementById('scatter2_variableSelector');
			switch(scatter2_variable.options[scatter2_variable.selectedIndex].value){
				case 'Production': 	scatter2_variable="production";break;
				case 'Consumption': scatter2_variable="consumption";break;
				case 'Emission': 	scatter2_variable="co2Emission";break;   
			}
			drawScatterPlot(localityName,sel,name,variable,$scope.fromDate,$scope.toDate,(svg-1),'#67a9cf',
			scatter_localityName,scatter_sel,scatter_name,scatter_variable,
			scatter2_localityName,scatter2_sel,scatter2_name,scatter2_variable); 
		}
		else
			drawScatterPlot(localityName,sel,name,variable,$scope.fromDate,$scope.toDate,(svg-1),'#67a9cf',
			scatter_localityName,scatter_sel,scatter_name,scatter_variable); 
		}
});


removeGraph = function(event){
		var index = svg_list.indexOf(parseInt(event));
		svg_list.splice(index, 1);
		svg_height--;
		d3.select("#svg"+event).remove();
		d3.select("#graphRemover"+event).remove();
		for(i=index;i<=svg_list.length;i++){
			d3.select("#svg"+svg_list[i])
				.style("top",220*(i));
			d3.select("#graphRemover"+svg_list[i])
				.style("top",220*(i-1)+30)
				.text("changed"+(svg_list[i]+1));
		}
		d3.select("#graphCreator").style("top", ((svg_height+1)*280)+30+"px");
		d3.select('#graph'+(event)).remove();
		//need to remove from memory, need to draw the select border
	};