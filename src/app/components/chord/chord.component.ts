import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-chord',
  templateUrl: './chord.component.html',
  styleUrls: ['./chord.component.scss']
})
	export class ChordComponent implements OnInit {

	@ViewChild('chord') private chartContainer: ElementRef;
	private hostElement:any;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 30 };
	private width: number;
	private height: number;

	data = [
		  [  0,   .4,   .2,  .16 ],
		  [ .55,   0,  .72,  .44 ],
		  [ .81, .45,    0,   .8 ],
		  [ .35,  .5,  .24,    0 ]
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
			{"name":"Fin Zone"},
			{"name":"Other zone"}
			];

  		this.hostElement = this.chartContainer.nativeElement;
        this.width=this.hostElement.offsetWidth;
        this.height=350;

        this.height = this.height - this.margin.top - this.margin.bottom-20;
        this.width = this.width - this.margin.right -20;

        var outerRadius = Math.min(this.width, this.height) * 0.5 - 30;
        var innerRadius = outerRadius - 15;

        let svg = d3.select(this.hostElement)
            .append('svg')
            	.attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
            	.attr('width', this.width + this.margin.left + this.margin.right)
            	.attr('height', this.height)

    	var chord = d3.chord()
		    .padAngle(0.05)
		    .sortSubgroups(d3.descending);

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
		    .join("g")
		    ;

		group.append("path")
			.attr("id", function(d, i) { return "group" + i; })
	    	.attr("fill", d => color(d.index))
	    	.attr("stroke", d => d3.rgb(color(d.index)).darker())
	    	.attr("d", arc)
	    	;

	    // Add a text label.
		var groupText = group.append("text")
			.attr("x", 12)
			.attr("dy", 13);

		//console.log("in settimeout2; name=",names[0].name);
			 
		groupText.append("textPath")
			.attr("xlink:href", function(d, i) { return "#group" + i; })
			.text(function(d, i) { return names[i].name; });

		svg.append("g")
		      .attr("fill-opacity", 0.9)
		    .selectAll("path")
		    .data(chords)
		    .join("path")
		      .attr("class","chord")
		      .attr("d", ribbon)
		      .attr("fill", d => color(d.target.index))
		      .attr("stroke", d => d3.rgb(color(d.target.index)).darker())
		      .on("mouseover", function(d) {
		    	// console.log("in mouseover;d=",d);
		    	svg.selectAll("path.chord")
			      .transition()
			      .style("fill-opacity", .05);
		    	d3.select(this)
			      .transition()
			          .attr("fill-opacity", 1);
		    })
		    .on("mouseout", function(d) {
		    	console.log("in mouseover");
		    	svg.selectAll("path.chord")
			      .transition()
			      .style("fill-opacity", .9);
		    	//d3.select(this)
			    //  .transition()
			    //      .attr("fill-opacity", .5);
		    });

		function mouseover(d, i) {
			chord.classed("fade", function(p) {
			return p.source.index != i
			&& p.target.index != i;
			});
			}

  	},10); // end setTimeout
  }

}
