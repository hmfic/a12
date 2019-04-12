import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.scss'],
  encapsulation: ViewEncapsulation.None
})
	export class ChordComponent implements OnInit {

	@ViewChild('chord') private chartContainer: ElementRef;
	private hostElement:any;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 30 };
	private width: number;
	private height: number;

	data = [
		  [  0,   .4,   .2,  .16 ],
		  [ .15,   0,  .22,  .44 ],
		  [ .28, .35,    0,  .28 ],
		  [ .75,  .2,  .05,    0 ]
		]

  constructor() { }

  ngOnInit() {
  	this.drawChart();
  }
  drawChart() {
  	setTimeout(() => {

  		var names = [
			{"name":"DMZ"},
			{"name":"Mfg Zone"},
			{"name":"Finance Zone"},
			{"name":"Other zone"}
			];

		function formatnum(num) { return d3.format(".4f")(num)};

  		this.hostElement = this.chartContainer.nativeElement;
  		var parent=this.hostElement
        this.width=this.hostElement.offsetWidth;
        this.height=370;

        this.height = this.height - this.margin.top - this.margin.bottom-10;
        this.width = this.width - this.margin.right -20;

        var outerRadius = Math.min(this.width, this.height) * 0.5 - 30;
        var innerRadius = outerRadius - 15;

        //d3.select("body").append('tips2');

	    //var div1 = d3.select("tips2").append('div1')

	   	var div = d3.select("body").append('div')
	          .attr('class', 'tooltip')
	          .style('opacity', 0);

        let svg = d3.select(this.hostElement)
            .append('svg')
            	.attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
            	.attr('width', this.width + this.margin.right)
            	.attr('height', this.height)

    	var chord = d3.chord()
		    .padAngle(0.05)
		    .sortChords(d3.descending);

		const chords = chord(this.data);

		var formatValue = d3.format(".3f")

    	var color = d3.scaleOrdinal()
		    .domain(d3.range(4))
		    .range(["#a5d7c6", "#FFDD89", "#957244", "#F26223"]);

		var ribbon = d3.ribbon()
    		.radius(innerRadius);

    	var arc = d3.arc()
		    .innerRadius(innerRadius)
		    .outerRadius(outerRadius)

    	const group = svg.append("g")
		    .selectAll("g")
		    .data(chords.groups)
		    .join("g");

		group.append("path")
			.attr("id", function(d, i) { return "group" + i; })
			.attr("class","bogus")
	    	.attr("fill", d => color(d.index))
	    	.attr("stroke", d => d3.rgb(color(d.index)))
	    	.attr("d", arc)

	    // Add a text label.
		var groupText = group.append("text")
			.attr("x", 12)
			.attr("dy", 13);

		//console.log("in settimeout2; name=",names[0].name);
			 
		groupText.append("textPath")
			.attr("xlink:href", function(d, i) { return "#group" + i; })
			.text(function(d, i) { return names[i].name; });

	// transparent hover
		group.append("path")
	    	.attr("fill", "transparent")
	    	.attr("stroke", "transparent")
	    	.attr("d", arc)
	    	.on('mouseover', (d,i) => {
                div.transition()
                     .duration(200)
                     .style('opacity', .9);
                d3.selectAll("#group"+i)
				      .transition().duration(200)
				      //.attr("fill-opacity", .3)
				      .attr("stroke","#444");
                div .html(
                    function() {
                            return names[i].name + " risk score: " + formatnum(d.value); 
                          } )
                     .style('left', (d3.event.pageX +12) + 'px')
                     .style('top', (d3.event.pageY - 20) + 'px');
                    })
            .on('mousemove',(d) => {
            	div 
                 .style('left', (d3.event.pageX +12) + 'px')
                 .style('top', (d3.event.pageY - 20) + 'px');
                })
            .on('mouseout', (d) => {
                  //console.log("in nodehover;d=",d);
                  d3.selectAll(".bogus")
				      .transition().duration(200)
				      .attr("fill-opacity", 1)
				      .attr("stroke",d => d3.rgb(color(d.index)));
                  div.transition()
                     .duration(200)
                     .style('opacity', 0)
                });

		svg.append("g")
		      .attr("fill-opacity", 0.9)
		    .selectAll("path")
		    .data(chords)
		    .join("path")
		      .attr("class","chord")
		      .attr("id", function(d, i) { return "group" + i; })
		      .attr("d", ribbon)
		      .attr("fill", d => color(d.target.index))
		      .style("stroke", d => d3.rgb(color(d.target.index)).darker())
		      .on("mouseover", function(d,i) {
			    	//console.log("in chord mouseover;d=",d);
			    	svg.selectAll("path.chord")
				      .transition().duration(200)
				      .style("fill-opacity", .05);
			    	d3.select(this)
				      .transition().duration(200)
				          .attr("fill-opacity", 1);
					div.transition()
	                     .duration(200)
	                     .style('opacity', .9);
	                div .html(
	                    function() {
	                            return "Risk score from " + d.source.value + " to " + d.target.value; 
	                          } )
	                     .style('left', (d3.event.pageX +12) + 'px')
	                     .style('top', (d3.event.pageY - 20) + 'px');
	                    //})
		    	})
		    .on('mousemove',(d) => {
                    div 
                     .style('left', (d3.event.pageX +12) + 'px')
                     .style('top', (d3.event.pageY - 20) + 'px');
                })
		    .on("mouseout", function(d) {
		    	//console.log("in mouseover");
		    	svg.selectAll("path.chord")
			      .transition()
			      .style("fill-opacity", .9);
			    div.transition()
                     .duration(200)
                     .style('opacity', 0)
		    	//d3.select(this)
			    //  .transition()
			    //      .attr("fill-opacity", .5);
		    	});



  	},10); // end setTimeout
  }

}
