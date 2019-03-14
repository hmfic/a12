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
		{name: "This company", values: [
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

		/* Add SVG */
		//var svg = d3.select("#timeline1").append("svg")
		let svg = d3.select(this.hostElement).append("svg")
		  .attr("width", (width)+"px")
		  //.attr("height", (height)+"px")
		  .attr("height", "100vh")
		  .append('g')
		  .attr("transform", `translate(25, 5)`);


		/* Add line into SVG */
		var line = d3.line()
		  .x(d => xScale(d.date))
		  .y(d => yScale(d.score));

		let lines = svg.append('g')
		  .attr('class', 'lines');

		lines.selectAll('.line-group')
		  .data(chartData).enter()
		  .append('g')
		  .attr('class', 'line-group')  
		  .on("mouseover", function(d, i) {
		      svg.append("text")
		        .attr("class", "title-text")
		        .style("fill", color(i))        
		        .text(d.name)
		        .attr("text-anchor", "middle")
		        .attr("x", (width-margin)/2)
		        .attr("y", 25);
		    })
		  .on("mouseout", function(d) {
		      svg.select(".title-text").remove();
		    })
		  .append('path')
		  .attr('class', 'line')  
		  .attr('d', d => line(d.values))
		  .style('stroke', (d, i) => color(i))
		  .style('fill',"none")
		  .style('opacity', lineOpacity)
		  .on("mouseover", function(d) {
		      d3.selectAll('.line')
					.style('opacity', otherLinesOpacityHover);
		      d3.selectAll('.circle')
					.style('opacity', circleOpacityOnLineHover);
		      d3.select(this)
		        .style('opacity', lineOpacityHover)
		        .style("stroke-width", lineStrokeHover)
		        .style("cursor", "pointer");
		    })
		  .on("mouseout", function(d) {
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
