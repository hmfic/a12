import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-tree10',
  templateUrl: './tree10.component.html',
  styleUrls: ['./tree10.component.scss'],
  encapsulation: ViewEncapsulation.None
  //
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

  ngOnInit() {
      console.log("tree; after view element host height=",this.chartContainer.nativeElement.offsetHeight);
      this.width=this.chartContainer.nativeElement.offsetWidth -50;
      this.height=this.chartContainer.nativeElement.offsetHeight -50;
    }

  ngAfterViewInit() {

  	var treeData = 
		  {
		    "name": "Myriel", "type":"person",
		    "children": [
		      {
		        "name": "Mlle.Baptistine",  "type":"person",
		        "children": [
		          {
		            "name": "Valijean", "type":"person"
		          }
		        ]
		      },
		      {
		        "name": "Geborand", "type":"person"
		      },
          {
            "name": "Napolean", "type":"person"
          },
          {
            "name": "CountessDeLo", "type":"person"
          }
		    ]
		  };

  	this.hostElement = this.chartContainer.nativeElement;
      //console.log("element host =",this.hostElement);

    this.width=this.hostElement.offsetWidth -30;
    this.height=this.chartContainer.nativeElement.offsetHeight;
    console.log("in nginit; tree; width:height",this.chartContainer.nativeElement.offsetHeight,":",this.height);

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

    var i = 0,
        duration = 750,
        root;

    // declares a tree layout and assigns the size
    console.log("before treemap; h:w=",this.height,":",this.width);
    var treemap = d3.tree().size([200, this.width]); 

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function(d) { return d.children; });
    root.x0 = this.height / 2;
    root.y0 = 0;

    // Collapse after the second level
    root.children.forEach(collapse);

    update(root);

    function collapse(d) {
        if(d.children) {
          d._children = d.children
          d._children.forEach(collapse)
          d.children = null
        }
      }

    function update(source) {
// Assigns the x and y position for the nodes
          var treeData = treemap(root);

          // Compute the new tree layout.
          var nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);

          var boxwidth=60;
          var boxheight=20;

          // Normalize for fixed-depth.
          nodes.forEach(function(d){ d.y = d.depth * 150});

          // ****************** Nodes section ***************************

          // Update the nodes...
          var node = svg.selectAll('g.node')
              .data(nodes, function(d) {return d.id || (d.id = ++i); });

          // Enter any new modes at the parent's previous position.
          var nodeEnter = node
              .enter()
              .append('g')
              .attr('class', 'node')
              .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click);

          // Add Circle for the nodes
          nodeEnter.append('circle')
              .attr('class', 'node')
              .attr('r', 1e-6)
              .style("fill", function(d) {
                  return d._children ? "black" : "orange";
              });

          // Add labels for the nodes
          nodeEnter.append('text')
              .attr("dy", ".35em")
              .attr("x", function(d) {
                  return d.children || d._children ? -20 : 20;
              })
              .attr("text-anchor", function(d) {
                  return d.children || d._children ? "end" : "start";
              })
              .text(function(d) { return d.data.name; });

          nodeEnter.append('svg:foreignObject')
              .attr('class', 'icons')
                .attr("x",-16)             
                .attr("y", -16)
                .attr('height', '28')
                .attr('width', '28')
                .html( function(d) { 
                      //console.log("in nodenter;d=",d);
                      return '<i class="material-icons" style="font-size:2rem;cursor: pointer;">' + d.data.type + '</i>'
                  }); 

          // UPDATE
          var nodeUpdate = nodeEnter.merge(node);

          // Transition to the proper position for the node
          nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) { 
                return "translate(" + d.y + "," + d.x + ")";
             });

          // Update the node attributes and style
          nodeUpdate.select('circle.node')
            .attr('r', 20)
            .style("fill", function(d) {
                return d._children ? "darkgray" : "orange";
            })
            .attr('cursor', 'pointer');


          // Remove any exiting nodes
          var nodeExit = node.exit().transition()
              .duration(duration)
              .attr("transform", function(d) {
                  return "translate(" + source.y + "," + source.x + ")";
              })
              .remove();

          // On exit reduce the node circles size to 0
          nodeExit.select('circle')
            .attr('r', 1e-6);

          // On exit reduce the opacity of text labels
          nodeExit.select('text')
            .style('fill-opacity', 1e-6);

          // ****************** links section ***************************

// Update the links...
          var link = svg.selectAll('path.link')
              .data(links, function (d) {
                  return d.id;
              });

              // Enter any new links at the parent's previous position.
          var linkEnter = link.enter().insert('path', 'g')
              .attr("id", function(d){ return ("link" + d.id)})//unique id
              .attr("class", "link")
              .attr('d', function (d) {
                  var o = {x: source.x0, y: source.y0}
                  return diagonal(o, o);
              });

              // UPDATE
          var linkUpdate = linkEnter.merge(link);

          var linkLabel = link.enter().insert("text","g")
              .attr("class", "link2")
              .attr("id", function(d){ return ("link-label" + d.id)})//unique id
              .attr("dx",function(d){ return (d.parent.x + d.x)/2 })
              .attr("dy",function(d){ return (d.parent.y + d.y)/2 })
              .text(function(d) {
                  if (d.data.label === "Yes") {
                      this.setAttribute("x",-30);
                  } else {
                      this.setAttribute("x",10);
                  }
                  // return d.data.label;
                  return "yes"
              });

          linkUpdate.merge(linkLabel);

              // Transition back to the parent element position
          linkUpdate.transition()
              .duration(duration)
              .attr('d', function (d) {
                  svg.select("#link-label" + d.id).transition().duration(duration).attr("dx",function(d){ return (d.parent.x + d.x)/2 })
                  .attr("dy",function(d){ return (d.parent.y + d.y)/2});
                  return diagonal(d, d.parent)
              });

              // Remove any exiting links
          var linkExit = link.exit().transition()
              .duration(duration)
              .attr('d', function (d) {
                  var o = {x: source.x, y: source.y};
                  svg.selectAll("#link-label" + d.id).remove();
                  return diagonal(o, o)
              })
              .remove();

              // Store the old positions for transition.
              nodes.forEach(function (d) {
                  d.x0 = d.x;
                  d.y0 = d.y;
              });

          // Creates a curved (diagonal) path from parent to the child nodes
          function diagonal(s, d) {
              var path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`

              return path
            }

          function click(d) {
              if (d.children) {
                  d._children = d.children;
                  d.children = null;
                } else {
                  d.children = d._children;
                  d._children = null;
                }
              update(d);
            }
      }

    function zoomed() {
        svg.attr("transform", d3.event.transform);
      };
  }  // end nginit

}
