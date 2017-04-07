function drawBarChart(localityName,dataSet,name,variable,from,to,svg_no,color,maxProd,prev_locality,prev_variable){
	
	if(variable=="co2Emission"){ 
		var graphVariableByLocality	 = localities[localityName][variable];
		var unit="metric tons per capita"
		}
	else{
		var graphVariableByLocality	 = localities[localityName][dataSet][variable];
		var unit = localities[localityName][dataSet].unit;
	}
	var temp=[]
	if(!(from==1980 && to==2012)){
		for(i=(from-1980);i<=(to-1980);i++)	
			temp.push(graphVariableByLocality[i]);
		var graphVariableByLocality=temp;
	}
	// figure out maximum energy production
	if(!maximum_production[svg_no])
		maximum_production[svg_no]=d3.max(graphVariableByLocality)
	else
		(maximum_production[svg_no]<d3.max(graphVariableByLocality))?
			maximum_production[svg_no]=d3.max(graphVariableByLocality):maximum_production[svg_no]

	var maxProd = maximum_production[svg_no]+maximum_production[svg_no]/8;
	// figure out the width of individual bars
	var barWidth = chartWidth / (to-from+1);

	// create a y scale
	var y0 = d3.scale.linear()
	.domain([0, maxProd])
	.range([chartHeight, 0]);

	var y1 = d3.scale.linear()
	.domain([0, maxProd])
	.range([chartHeight, 0]);

	// create a group for the bar chart
	if(!prev_locality && !prev_variable)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+localityName + " " + name + " " + variable + "  ("+unit+")");
	else if(prev_locality!=localityName && prev_variable!=variable)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+ prev_locality + " " + prev_variable + " vs " + localityName + " " + variable + " - " + name + "  ("+unit+")");
	else if(prev_locality!=localityName)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+prev_locality + " vs " + localityName + " - " + name + " " + variable + "  ("+unit+")");
	else if(prev_variable!=variable)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+ localityName+ " - " + name + " " + prev_variable + " VS " + variable + "  ("+unit+")");
	
	var group = d3.select("#svg"+svg_no).append("g")
	.attr("transform", "translate(70, 70)");

	group.selectAll("rect").data(graphVariableByLocality).enter().append('rect')
	.attr("x", function(d, i) { return i*barWidth + 6*(bar_chart_counter-1)})
	.attr('class','bar1')
	.attr("y", function(d, i) { 
		return y0(d);
	})
	.attr("width", barWidth-12*(bar_chart_counter-1))
	.attr("height", function(d) { 
		return chartHeight - y0(d); 
	})
	.style('opacity',.8)
	.style("stroke", "white")
	.style("fill", color);

	// create x axis
	var timeScale = d3.time.scale()
	.domain([new Date(from, 0, 1), new Date(to, 0, 1)])
	.range([barWidth/2, chartWidth-barWidth/2])

	var xAxis = d3.svg.axis()
	.scale(timeScale)
	.ticks(graphVariableByLocality.length/2)
	.orient('bottom');

	// create y axis
	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate(0,' + chartHeight + ')')
	.call(xAxis);

	var yAxis0 = d3.svg.axis()
	.scale(y0)
	.orient('left');

	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate(-2,0)')
	.call(yAxis0);

	var yAxis1 = d3.svg.axis()
	.scale(y1)
	.ticks(3)
	.orient('right');

	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate('+ chartWidth + ',0)')
	.call(yAxis1);

	group.append("text")      // text label for the y axis
        .attr("x", 105 )
        .attr("y",  -chartWidth-30 )
        .style("text-anchor", "middle")
        .text("Value")
        .style("font-size","14px")
        .attr("transform","rotate(90)");


	group.append("text")      // text label for the x axis
        .attr("x", chartWidth/2 )
        .attr("y",  165 )
        .style("text-anchor", "middle")
        .text("Year");
}

function drawLineChart(localityName,dataSet,name,variable,from,to,svg_no,color,maxProd,prev_locality,prev_variable){
	if(variable=="co2Emission"){ 
		var graphVariableByLocality	 = localities[localityName][variable];
		var unit="metric tons per capita"
		}
	else{
		var graphVariableByLocality	 = localities[localityName][dataSet][variable];
		var unit = localities[localityName][dataSet].unit;
	}
	var temp=[]
	if(!(from==1980 && to==2012)){
		for(i=(from-1980);i<=(to-1980);i++){
			temp.push(graphVariableByLocality[i]);}
		var graphVariableByLocality=temp;
	}
	// figure out maximum energy production
	if(!maximum_production[svg_no])
		maximum_production[svg_no]=d3.max(graphVariableByLocality)
	else
		(maximum_production[svg_no]<d3.max(graphVariableByLocality))?
			maximum_production[svg_no]=d3.max(graphVariableByLocality):maximum_production[svg_no]

	var maxProd = maximum_production[svg_no]+maximum_production[svg_no]/8;
	var barWidth = chartWidth / (to-from);

	// create a y scale
	var y0 = d3.scale.linear()
	.domain([0, maxProd])
	.range([chartHeight, 0]);

	var y1 = d3.scale.linear()
	.domain([0, maxProd])
	.range([chartHeight, 0]);

	// create a group for the bar chart
	if(!prev_locality && !prev_variable)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+localityName + " " + name + " " + variable + "  ("+unit+")");
	else if(prev_locality!=localityName && prev_variable!=variable)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+ prev_locality + " " + prev_variable + " vs " + localityName + " " + variable + " - " + name + "  ("+unit+")");
	else if(prev_locality!=localityName)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+prev_locality + " vs " + localityName + " - " + name + " " + variable + "  ("+unit+")");
	else if(prev_variable!=variable)
		d3.select("#label"+svg_no)
			.html((svg_no+1)+") "+ localityName+ " - " + name + " " + prev_variable + " VS " + variable + "  ("+unit+")");

	var group = d3.select("#svg"+svg_no).append("g")
	.attr("transform", "translate(70, 70)");

	// create x axis
	var timeScale = d3.time.scale()
	.domain([new Date(from, 0, 1), new Date(to, 0, 1)])
	.range([0, chartWidth])

	if(!prev_locality && !prev_variable){
	var xAxis = d3.svg.axis()
	.scale(timeScale)
	.orient('bottom')
	.ticks(graphVariableByLocality.length/2)
	.innerTickSize(-chartHeight)
    .outerTickSize(0)
    .tickPadding(10);

	// create y axis
	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate(0,' + chartHeight + ')')
	.call(xAxis);

	
	var yAxis0 = d3.svg.axis()
	.scale(y0)
	.orient('left')
	.innerTickSize(-chartWidth)
    .outerTickSize(0)
    .tickPadding(10);

	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate(-2,0)')
	.call(yAxis0);

	var yAxis1 = d3.svg.axis()
	.scale(y1)
	.ticks(3)
	.orient('right');

	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate('+ chartWidth + ',0)')
	.call(yAxis1);

	group.append("text")      // text label for the x axis
        .attr("x", 105 )
        .attr("y",  -chartWidth-30 )
        .style("text-anchor", "middle")
        .text("Value")
        .style("font-size","14px")
        .attr("transform","rotate(90)");

	group.append("text")      // text label for the x axis
        .attr("x", chartWidth/2 )
        .attr("y",  165 )
        .style("text-anchor", "middle")
        .text("Year");
    }

	
	var line = d3.svg.line()
	.x(function(d, i){ return i*barWidth })
	.y(function(d){ return y0(d) })
	.interpolate("linear");

	var path=group.append("path")
	.attr({d:line(graphVariableByLocality),
	"fill":"none",
	"stroke":color})
	.attr('stroke-width',5)


    group.selectAll(".dot")
			.data(graphVariableByLocality)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", function(d) { return (5); })
			.attr("cx", function(d,i) { return i*barWidth; })
			.attr("cy", function(d) { return y0(d) })
		   .style("fill", function(d) { return color; });
}

function drawScatterPlot(localityName,dataSet,name,variable,from,to,svg_no,color,
	new_localityName,new_dataSet,new_name,new_variable,
	new2_localityName,new2_dataSet,new2_name,new2_variable){
	var chartWidth = 700;
	var chartHeight = 150;
	if(variable=="co2Emission"){ 
		var graphVariableByLocality	 = localities[localityName][variable];
		var unit="metric tons per capita"
		}
	else{
		var graphVariableByLocality	 = localities[localityName][dataSet][variable];
		var unit = localities[localityName][dataSet].unit;
	}

	if(new_variable=="co2Emission"){ 
		var new_graphVariableByLocality	 = localities[new_localityName][new_variable];
		var new_unit="metric tons per capita"
		}
	else{
		var new_graphVariableByLocality	 = localities[new_localityName][new_dataSet][new_variable];
		var new_unit = localities[new_localityName][new_dataSet].unit;
	}

	if(new2_variable!=null){
		console.log("working")
		if(new2_variable=="co2Emission"){ 
			var new2_graphVariableByLocality = localities[new2_localityName][new2_variable];
			var new2_unit="metric tons per capita"
			}
		else{
			var new2_graphVariableByLocality = localities[new2_localityName][new2_dataSet][new2_variable];
			var new2_unit = localities[new2_localityName][new2_dataSet].unit;
		}
		var new2_temp=[]
		if(!(from==1980 && to==2012)){
			for(i=(from-1980);i<=(to-1980);i++)
				new2_temp.push(new2_graphVariableByLocality[i]);
			var new2_graphVariableByLocality=new2_temp;
		}
			var new2_maxProd = d3.max(new2_graphVariableByLocality)
			var new2_minProd = d3.min(new2_graphVariableByLocality)
			console.log("max="+new2_maxProd+"min="+new2_minProd)
			var range=(new2_maxProd-new2_minProd)/12
			var diff=new2_maxProd-new2_minProd
	}
	var color = d3.scale.category10();
	var temp=[]
	var new_temp=[]
	if(!(from==1980 && to==2012)){
		for(i=(from-1980);i<=(to-1980);i++){
			temp.push(graphVariableByLocality[i]);
			new_temp.push(new_graphVariableByLocality[i]);}
		var graphVariableByLocality=temp;
		var new_graphVariableByLocality=new_temp;
	}
	// figure out maximum energy production
	var maxProd = d3.max(graphVariableByLocality) 
	var new_maxProd = d3.max(new_graphVariableByLocality)

	var minProd = d3.min(graphVariableByLocality) 
	var new_minProd = d3.min(new_graphVariableByLocality)
	
	var barWidth = chartWidth / (to-from);

	// create a y scale
	var y0 = d3.scale.linear()
	.domain([new_minProd, new_maxProd])
	.range([chartHeight, 0]);

	var y1 = d3.scale.linear()
	.domain([new_minProd, new_maxProd])
	.range([chartHeight, 0]);
	var data=[]
	if(new2_localityName==null)
		for(i=0;i<graphVariableByLocality.length;i++)
			data.push([graphVariableByLocality[i],new_graphVariableByLocality[i]])
	else{
		var range=(new2_maxProd-new2_minProd)/12
		for(i=0;i<graphVariableByLocality.length;i++){
			var size
			for(j=0;j<12;j++){
				console.log(new2_graphVariableByLocality[i]+" comparing with "+ (new2_minProd+j*range))
				if(new2_graphVariableByLocality[i] <= (new2_minProd+j*range)){
					size=j;
					data.push([graphVariableByLocality[i],new_graphVariableByLocality[i],new2_graphVariableByLocality[i],size])
					break;
				}
			}
		}
	}
	console.log(data)

	// d3.select("#label"+svg_no)
	// 	.html((svg_no+1)+") "+ new_localityName + " " + new_name + " " + new_variable + " vs " + localityName + " " + name+ " " +variable);


	var group = d3.select("#svg"+svg_no).append("g")
	.attr("transform", "translate(70, 40)");

	// create x axis
	var timeScale = d3.scale.linear()
	.domain([minProd, maxProd])
	.range([0, chartWidth]);

	var xAxis = d3.svg.axis()
	.scale(timeScale)
	.orient('bottom')
	.ticks(graphVariableByLocality.length/2)
	.innerTickSize(-chartHeight)
    .outerTickSize(0)
    .tickPadding(10);

	// create y axis
	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate(0,' + chartHeight + ')')
	.call(xAxis);

	
	var yAxis0 = d3.svg.axis()
	.scale(y0)
	.orient('left')
	.innerTickSize(-chartWidth)
    .outerTickSize(0)
    .tickPadding(10);

	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate(-2,0)')
	.call(yAxis0);

	var yAxis1 = d3.svg.axis()
	.scale(y1)
	.ticks(3)
	.orient('right');

	group.append("g")
	.attr('class', 'axis')
	.attr('transform', 'translate('+ chartWidth + ',0)')
	.call(yAxis1);

	group.append("text")      // text label for the x axis
        .attr("x", 80 )
        .attr("y",  -chartWidth-40 )
        .style("text-anchor", "middle")
        .text(new_name)
        .style("font-size","14px")
        .attr("transform","rotate(90)");

 group.append("text")      // text label for the x axis
        .attr("x", chartWidth/2 )
        .attr("y",  185 )
        .style("text-anchor", "middle")
        .text(name);


	if(new2_variable==null)
		group.selectAll(".dot")
			.data(data)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", 4)
			.attr("cx", function(d) { return timeScale(d[0]); })
			.attr("cy", function(d) { return y0(d[1]); })
		   .style("fill", function(d) { return color(name); });
	else{
		var tooltip = d3.select("body").append("div")
		    .attr("class", "tooltip")
		    .style("opacity", 0);

		group.selectAll(".dot")
			.data(data)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", function(d) { return (d[3]); })
			.attr("cx", function(d) { return timeScale(d[0]); })
			.attr("cy", function(d) { return y0(d[1]); })
		   .style("fill", function(d) { return color(name); })
		   .on("mouseover", function(d) {
		          tooltip.transition()
		               .duration(200)
		               .style("opacity", .9);
		          tooltip.html(d[2])
		               .style("left", (d3.event.pageX + 5) + "px")
		               .style("top", (d3.event.pageY - 28) + "px");
		      })
		      .on("mouseout", function(d) {
		          tooltip.transition()
		               .duration(500)
		               .style("opacity", 0);
		      });
	}
}