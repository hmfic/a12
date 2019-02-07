
import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-force10',
  templateUrl: './force10.component.html',
  styleUrls: ['./force10.component.scss'],
  encapsulation: ViewEncapsulation.None
})

  export class Force10Component implements OnInit, AfterViewInit {
    @ViewChild('force10DirectedChartContainer') chartContainer: ElementRef;
    hostElement: any;
    width:number;
    height:number;
    // this is the emitter for sending to sankey1
      @Output() eventHover = new EventEmitter<Event>();

  constructor(
        private globals: Globals,
        private elementRef:ElementRef,
        ) {  }

    ngAfterViewInit() {
      console.log("force; after view element host height=",this.chartContainer.nativeElement.offsetHeight);
      this.width=this.chartContainer.nativeElement.offsetWidth -50;
      this.height=this.chartContainer.nativeElement.offsetHeight -50;
    }

    ngOnInit() {

      this.hostElement = this.chartContainer.nativeElement;
      //console.log("element host =",this.hostElement);

      this.width=this.hostElement.offsetWidth -30;
      this.height=this.hostElement.offsetHeight -30;
      console.log("in nginit; force; width:height",this.width,":",this.height);

      var zoom = d3.zoom()
         .scaleExtent([.2,10])
         .on("zoom",zoomed);

      const div2 = d3.select("body").append('div2')
          .attr('class', 'tooltip')
          .style('opacity', 0);

      let svg = d3.select(this.hostElement)
        .append('svg')
        .attr('width',"100%")
        .attr('height',"100vh")
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
            return 'Sensitive Content Use Case'}); 

      var defs = svg.append("defs");
      var filter = defs.append("filter")
              .attr("id", "drop-shadow")
              .attr("height", "200%")
              .attr("width", "200%");
          // SourceAlpha refers to opacity of graphic that this filter will be applied to
          // convolve that with a Gaussian with standard deviation 3 and store result
          // in blur
      filter.append("feGaussianBlur")
          .attr("in", "SourceAlpha")
          .attr("stdDeviation", 2)
          .attr("result", "blur");
      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
      filter.append("feOffset")
          .attr("in", "blur")
          .attr("dx", 1)
          .attr("dy", 1)
          .attr("result", "offsetBlur");
      // overlay original SourceGraphic over translated blurred opacity by using
      // feMerge filter. Order of specifying inputs is important!
      var feMerge = filter.append("feMerge");

      feMerge.append("feMergeNode")
          .attr("in", "offsetBlur")
      feMerge.append("feMergeNode")
          .attr("in", "SourceGraphic");

      var nodes:any=
       		[
		        {"id": "Myriel", "name": 1},
		        {"id": "Napoleon", "name": 2},
		        {"id": "Mlle.Baptistine", "name": 3},
		        {"id": "CountessdeLo", "name": 4},
		        {"id": "Geborand", "name": 5}
		      ];

      var links:any=
      		[
		        {"source": "Napoleon", "target": "Myriel"},
		        {"source": "Mlle.Baptistine", "target": "Myriel"},
		        {"source": "CountessdeLo", "target": "Myriel"},
		        {"source": "Geborand", "target": "Myriel"}
		    ];
      var holdem=0;

      var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d:any) {return d.id; }))
        .force('charge', d3.forceManyBody().strength(-1000))
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))
        .force('collision', d3.forceCollide().radius(25));

      var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr("stroke","gray")
        .attr("opacity",.5)
        .attr('stroke-width', "1px");

      var nodex = svg.append('g')
            .attr('class', 'nodes');

      var node = nodex.selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr('class', 'node');

      //node.append('circle')
      var circle = node.append("circle")
        .attr("cx",0)
        .attr("cy", 0)
        .attr('r', 15)
        .attr('fill', function(d) {
          //console.log("in node svg append;d=",d);
          if (d.type == "user") 
            {return "lightgray"} else 
            { if (d.completed == true) {
              return "green"} else return "orange"}
            })
        .style("filter", function(d) {
          if(d.type=="user") { return "url(#drop-shadow)"} else {return "none"}
          });

      var text= node.append('text')
        .attr("dx",1)             
        .attr("dy", 20)
        .attr('class','label')
        .attr('text-anchor','middle')
        .text( 
          function (d) {
            return d.id
          })

      var icon=node.append('svg:foreignObject')
          .attr('class', 'icons')
            .attr("x",-10)             
            .attr("y", -10)
            .attr('height', '20')
            .attr('width', '20')
            .html( function(d) { 
                  return '<i class="material-icons" style="font-size:1.3rem;cursor: pointer;">list</i>'
              }); 

      var transcircle = node.append("circle")
        .attr("cx",0)
        .attr("cy", 0)
        .attr('r', 15)
        .attr('fill',"transparent")
        .call(d3.drag()
             .on("start", dragstarted)
             .on("drag", dragged)
             .on("end", dragended))
        .on('mouseover', (d) => {
          // send info to emitter
          this.eventHover.emit(d);
          // end emitter section
              //console.log("in transcircle mouseover;d=",d);
              div2.transition()
                 .duration(200)
                 .style('opacity', .9);
              div2 .html(
                function() {
                    if(d.type=="todo") {
                        return d.title + "<br/>Completed: " + d.completed
                      }
                      else {
                        //console.log("in mouseover;d=",d);
                        return d.name + "</br/>" + d.email + "</br/>" + d.company; 
                      }
                    }
                    )
                 .style('left', (d3.event.pageX) + 'px')
                 .style('top', (d3.event.pageY - 28) + 'px');
                })
          .on('mouseout', (d) => {
              div2.transition()
                 .duration(200)
                 .style('opacity', 0);
                });

      simulation.nodes(nodes).on('tick', ticked);
      //simulation.force("link").links(links);
      simulation.force<d3.ForceLink<any, any>>('link').links(links);


	  function ticked() {
		    link
          .attr('x1', function(d: any) { return d.source.x; })
          .attr('y1', function(d: any) { return d.source.y; })
          .attr('x2', function(d: any) { return d.target.x; })
          .attr('y2', function(d: any) { return d.target.y; });

        node.attr('transform', function (d) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        });

        //  .attr('y', function(d: any) { return d.y -10; });

		  } // end ticked


    function dragstarted(d) {
          if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
          //d.fx = d.x;
          //d.fy = d.y;
          d.fy=null;
          d.fx=null;
          //d3.select(this).classed("fixed", d.fixed = true);
        }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      //console.log("this=",this);
      if (!d3.event.active) { simulation.alphaTarget(0); }
      if(typeof this.node != "undefined") {
        this.node.fx = null;
        this.node.fy = null;
      }
    }

    function zoomed() {
        svg.attr("transform", d3.event.transform);
      };

   }  // end nginit

    findGender(name) {
        name=name.split(" ")[0];
        return this.globals.genderhash[name];
      }
} // end  export class ForceComponent
