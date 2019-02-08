import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-tree10',
  templateUrl: './tree10.component.html',
  styleUrls: ['./tree10.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tree10Component implements OnInit, AfterViewInit {
	@ViewChild('tree10Container') chartContainer: ElementRef;
	hostElement: any;
    width:number;
    height:number;
    // this is the emitter for sending to sankey1
    @Output() eventHover = new EventEmitter<Event>();
  constructor(
  	private globals: Globals,
        private elementRef:ElementRef
        ) { }

  ngAfterViewInit() {
      console.log("tree; after view element host height=",this.chartContainer.nativeElement.offsetHeight);
      this.width=this.chartContainer.nativeElement.offsetWidth -50;
      this.height=this.chartContainer.nativeElement.offsetHeight -50;
    }

  ngOnInit() {
  	console.log("nginit force");

  	var treeData = [
		  {
		    "name": "Top Level",
		    "children": [
		      {
		        "name": "Level 2: A",
		        "children": [
		          {
		            "name": "Son of A",
		          },
		          {
		            "name": "Daughter of A",
		          }
		        ]
		      },
		      {
		        "name": "Level 2: B",
		      }
		    ]
		  }
		];

  	this.hostElement = this.chartContainer.nativeElement;
      //console.log("element host =",this.hostElement);

    this.width=this.hostElement.offsetWidth -30;
    this.height=this.hostElement.offsetHeight -90;
    console.log("in nginit; tree; width:height",this.width,":",this.height);

    var zoom = d3.zoom()
         .scaleExtent([.2,10])
         .on("zoom",zoomed);

    const div2 = d3.select("body").append('div2')
          .attr('class', 'tooltip')
          .style('opacity', 0);

    let svg = d3.select(this.hostElement)
        .append('svg')
        .attr('width',"100%")
        .attr('height',"70vh")
        //.attr('style',"margin-bottom:70px;")
        .call(zoom)
        .append('g');

    svg.append("g")
        .append("text")
        .attr("x", this.width*.5)
        .attr("y", 30)
        .attr("stroke", "black")
        .attr("stroke-width", 0)
        .attr('text-anchor','middle')
        .attr("opacity", ".1")
        .attr('font-size', "2em" )
        //.style("position","absolute")
        .text(function(d){
            return 'Derivative Data Use Case'}); 

    function zoomed() {
        svg.attr("transform", d3.event.transform);
      };
  }  // end nginit

}
