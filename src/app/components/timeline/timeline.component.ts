import { Component, ViewChild, OnInit , ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';


import * as d3 from 'd3';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent implements OnInit {

	@ViewChild('timeline1') private chartContainer: ElementRef;

	private _width: number;
  	private _height: number;
  	private hostElement:any;

	lineData = [
		{name: "My company", values: [
	    	{ date: '2010', score: ".3"},
	    	{ date: '2011', score: ".11"},
	    	{ date: '2012', score: ".45"},
	    	{ date: '2013', score: ".24"}
	  		]},
	  	{name: "Industry peer", values: [
	    	{ date: '2010', score: ".2"},
	    	{ date: '2011', score: ".22"},
	    	{ date: '2012', score: ".33"},
	    	{ date: '2013', score: ".21"}
	  		]}
	  	];



  constructor() { }

  ngOnInit(){
    //this.drawChart(this.lineData);
  }

  ngAfterViewInit(){
    this.drawChart(this.lineData);
  }

  drawChart(chartData: Array<any>) {
  	// gridlines in y axis function
	
  	setTimeout(() => {
  		// console.log("in timeout;chartContainer=",this.chartContainer);
  		this.hostElement = this.chartContainer.nativeElement;
        var width=this.hostElement.offsetWidth;
		var height = 330;
		var margin = 20;
		var duration = 250;

		var lineOpacity = "0.5";
		var lineOpacityHover = "0.65";
		var otherLinesOpacityHover = "0.1";
		var lineStroke = "4px";
		var lineStrokeHover = "6px";

		var circleOpacity = '0.85';
		var circleOpacityOnLineHover = "0.75"
		var circleRadius = 4;
		var circleRadiusHover = 8;

		/* Format Data */
		var parseDate = d3.timeParse("%Y");
		chartData.forEach(function(d) { 
		  d.values.forEach(function(d) {
		    d.date = parseDate(d.date);
		    d.score = +d.score;    
		  });
		});


		/* Scale */
		var xScale = d3.scaleTime()
		  .domain(d3.extent(chartData[0].values, d => d.date))
		  .range([0, width-margin-10]);

		var yScale = d3.scaleLinear()
		  //.domain([0, d3.max(chartData[0].values, d => d.score)])
		  .domain([0, 1])
		  .range([height-margin-10, 0]);

		var color = d3.scaleOrdinal(d3.schemeCategory10);

		console.log("color=",color(0));

		/* Add SVG */
		let svg = d3.select(this.hostElement).append("svg")
		  .attr("width", (width)+"px")
		  .attr("height", "100vh")
		  .append('g')
		  .attr("transform", `translate(25, 5)`);

		/* svg.append("text")
			.attr("opacity","0")
			.style("color","green")
			.attr("class","title-text")
			.text("bubba!"); */

		d3.select("body").append('tips3');

	     var div3 = d3.select("tips3").append('div1')
	          .attr('class', 'tooltip')
	          .style('opacity', 0);

		var defs = svg.append("defs");

		var gradient0 = defs.append("linearGradient")
		   .attr("id", "svgGradient0")
		   .attr("x1", "0%")
		   .attr("x2", "100%")
		   .attr("y1", "0%")
		   .attr("y2", "100%");

		gradient0.append("stop")
		   .attr('class', 'start')
		   .attr("offset", "0%")
		   .attr("stop-color", color(0))
		   .attr("stop-opacity", 1);

		gradient0.append("stop")
		   .attr('class', 'end')
		   .attr("offset", "100%")
		   .attr("stop-color", "#fff")
		   .attr("stop-opacity", 1);

		var gradient1 = defs.append("linearGradient")
		   .attr("id", "svgGradient1")
		   .attr("x1", "0%")
		   .attr("x2", "100%")
		   .attr("y1", "0%")
		   .attr("y2", "100%");

		gradient1.append("stop")
		   .attr('class', 'start')
		   .attr("offset", "0%")
		   .attr("stop-color", color(1))
		   .attr("stop-opacity", 1);

		gradient1.append("stop")
		   .attr('class', 'end')
		   .attr("offset", "100%")
		   .attr("stop-color", "#fff");


		/* Add line into SVG */
		var line = d3.line()
		  .x(d => xScale(d.date))
		  .y(d => yScale(d.score));

		var area = d3.area()
			.x(d => xScale(d.date))
			.y0(height-30)
			.y1(d => yScale(d.score));

		let areas = svg.append('g')
		  .attr('class', 'areas');

		let lines = svg.append('g')
		  .attr('class', 'lines');

		areas.selectAll('.area-group')
			.data(chartData).enter()
			.append('g')
			.attr('class', 'area-group')
			.append('path')
				.attr("class",function(d,i) { return 'area'+i})
				.attr('d',d=>area(d.values))
					.style("opacity",".1")
					.style("fill","none");

		lines.selectAll('.line-group')
		  .data(chartData).enter()
		  .append('g')
			  .attr('class', 'line-group')
			  .on("mouseover", function(d, i) {
			  		var mouse_x = d3.mouse(this)[0];
			  		var mouse_y = d3.mouse(this)[1];
                    div3.transition()
                         .duration(200)
                         .style('opacity', .9);
                    div3 .html(
                        function() {
                                return d.name; 
                              } )
                         .style('left', (d3.event.pageX +10) + 'px')
                         .style('top', (d3.event.pageY - 25) + 'px');
                        })

				.on('mousemove',(d) => {
                    div3 
                     .style('left', (d3.event.pageX +10) + 'px')
                     .style('top', (d3.event.pageY - 25) + 'px');
                 })
                       
		  .on("mouseout", function(d) {
		      //svg.select(".title-text").remove();
		      div3.transition()
                 .duration(200)
                 .style('opacity', 0)
		    })
		  .append('path')
			  .attr('class', 'line')  
			  .attr('d', d => line(d.values))
			  .style('stroke', (d, i) => color(i))
			  .style('opacity', lineOpacity)
			  .on("mouseover", function(d,i) {
			  		d3.selectAll('.area'+i)
			  			.style("opacity",".5")
			  			.style("fill", function (d) {
			  				if(i==0) {return "url(#svgGradient0)"} else 
			  				{ return "url(#svgGradient1)"}
			  			})
			    	d3.selectAll('.line')
						.style('opacity', otherLinesOpacityHover)
			    	d3.selectAll('.circle')
						.style('opacity', circleOpacityOnLineHover);
			    	d3.select(this)
				        .style('opacity', lineOpacityHover)
				        .style("stroke-width", lineStrokeHover)
				        .style("cursor", "pointer");
			    })
			  .on("mouseout", function(d,i) {
			  		d3.selectAll('.area'+i)
			  			.style("opacity",".1")
			  			.style("fill","none")
			    	d3.selectAll(".line")
						.style('opacity', lineOpacity);
			    	d3.selectAll('.circle')
						.style('opacity', circleOpacity);
			    	d3.select(this)
			        	.style("stroke-width", lineStroke)
			        	.style("cursor", "none");
			    });
		/* Add circles in the line */
		lines.selectAll("circle-group")
		  .data(chartData).enter()
		  .append("g")
		  .style("fill", (d, i) => color(i))
		  .selectAll("circle")
		  .data(d => d.values).enter()
		  .append("g")
		  .attr("class", "circle")  
		  .on("mouseover", function(d) {
		      d3.select(this)     
		        .style("cursor", "pointer")
		        .append("text")
		        .attr("class", "text")
		        .text(`${d.score}`)
		        .attr("x", d => xScale(d.date) + 5)
		        .attr("y", d => yScale(d.score) - 10);
		    })
		  .on("mouseout", function(d) {
		      d3.select(this)
		        .style("cursor", "none")  
		        .transition()
		        .duration(duration)
		        .selectAll(".text").remove();
		    })
		  .append("circle")
			  .attr("cx", d => xScale(d.date))
			  .attr("cy", d => yScale(d.score))
			  .attr("r", circleRadius)
			  .style('opacity', circleOpacity)
			  .on("mouseover", function(d) {
			        d3.select(this)
			          .transition()
			          .duration(duration)
			          .attr("r", circleRadiusHover);
			      })
			    .on("mouseout", function(d) {
			        d3.select(this) 
			          .transition()
			          .duration(duration)
			          .attr("r", circleRadius);  
			      }); //

		/* Add Axis into SVG */
		var xAxis = d3.axisBottom(xScale).ticks(5);
		var yAxis = d3.axisLeft(yScale).ticks(5);

		svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", `translate(0, ${height-margin-10})`)
		  .call(xAxis);

		svg.append('g')
			.call(yAxis);

		// add the Y gridlines
		  svg.append("g")			
		      .attr("class", "grid")
		      .style("stroke","gray")
		      .call(make_y_gridlines()
		          .tickSize(-width)
		          .tickFormat("")

		      )
		 function make_y_gridlines() {		
			    return d3.axisLeft(yScale)
			        .ticks(5)
			}

  	},10);	 // end settimeout
  }

}
