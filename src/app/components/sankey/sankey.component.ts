import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";
import * as d3Sankey from 'd3-sankey';

@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.component.html',
  styleUrls: ['./sankey.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SankeyComponent implements OnInit {
	@ViewChild('sankey') private chartContainer: ElementRef;
	private hostElement:any;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 30 };
	private width: number;
	private height: number;

	data= {
		"nodes": [
			{"name":"DMZ","node":0},
			{"name":"Fin zone","node":1},
			{"name":"Mfg zone","node":2},
			{"name":"Mrktg zone","node":3},
			{"name":"Other","node":4}
			],
		"links": [
			{"source":0,"value":.6,"target":1},
			{"source":0,"value":.1,"target":2},
			{"source":0,"value":.1,"target":3},
			{"source":0,"value":.2,"target":4}
		]
	}

  constructor() { }

  ngOnInit() {
  	this.drawChart();
  }
  drawChart() {
  	setTimeout(() => {
  		this.hostElement = this.chartContainer.nativeElement;
        this.width=this.hostElement.offsetWidth;
        this.height=350;

        this.height = this.height - this.margin.top - this.margin.bottom-20;
        this.width = this.width - this.margin.right -20;

        let svg = d3.select(this.hostElement)
            .append('svg')
            	.attr('width', this.width + this.margin.left + this.margin.right)
            	.attr('height', this.height);

        var color= d3.scaleOrdinal()
        	.domain([0,1,2,3,4,5])
        	.range(["#bf9d76","#e99450","#d89f59","#f2dfa7","#a5d7c6","#7794b1","#afafaf"]);

        var div = d3.select("body").append("div")
	        .attr("class", "tooltip") 
	        .style("opacity", 0);

        var sankey = d3Sankey.sankey()
        	.nodeWidth(15)
        	.nodePadding(10)
        	.size([this.width,this.height])
        	//.extent([1,1],[this.width-1,this.height-6]);

        var node = svg.append('g')
        	.attr("class","nodes")
        	.attr("font-size",10)
        	.selectAll('g');

        var link = svg.append("g")
	        .attr("class", "links")
	        .attr("fill", "none")
	        .attr("stroke", "#000")
	        .attr("stroke-opacity", 0.2)
	        .selectAll("path");

    	//console.log("before sankey;color=",color);

        var graph = sankey(this.data);

        link = link
    		.data(this.data.links)
    		.enter()
    		.append('path')
    			.attr("d", d3Sankey.sankeyLinkHorizontal())
    			.attr("stroke-width",function(d:any) {return Math.max(1,d.width);});

    	link.on("mouseover", function(d) {    
            // console.log("link.on hover;d=",d);  
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html("<b> Data moving between " + d['source'].name + " and "  + d['target'].name + " risk is " + d['value'])  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");
        	d3.select(this).style("stroke-opacity",.7);
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0); 
        	d3.select(this).style("stroke-opacity",.3);  
        })
        .on("mousemove", function(d) {       
            div.style("left", (d3.event.pageX) + "px");     
            div.style("top", (d3.event.pageY - 28) + "px");   
        });

        node = node
	        .data(this.data.nodes)
	        .enter().append("g")
	        .attr("class","node");

        node.append('rect')
        	.attr("x", function(d:any) { return d.x0; })
        	.attr("y", function(d:any) { return d.y0;})
        	.attr("stroke-width","0")
        	.attr("height", function (d: any) { return d.y1 - d.y0; })
        	.attr("width", function (d: any) { return d.x1 - d.x0; })
        	.attr("fill", function (d: any, i) { return color(d.node) });

    	node.append("text")
		    .attr("x", function (d: any) { return d.x0 +15; })
		    .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
		    .attr("dx", "0em")
		    .attr("dy", "0.35em")
		    .text(function (d: any) { 
		    		return d.name })
		    //.filter(function (d: any) { return d.x0 < this.width / 2; })
		    .attr("x", function (d: any) { return d.x1 + 3; })
		    .attr("text-anchor", "start");
  	},10); // end setTimeout
  }

}
