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
		        "name": "Mlle.Baptistine",  "type":"computer",
		        "children": [
		          {
		            "name": "Valijean", "type":"computer"
		          }
		        ]
		      },
		      {
		        "name": "Geborand", "type":"laptop"
		      },
          {
            "name": "Napolean", "type":"tablet"
          },
          {
            "name": "CountessDeLo", "type":"computer"
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

    const div1 = d3.select("body").append('div1')
          .attr('class', 'tooltip')
          .style('opacity', 0);

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

    /* svg.append("g").append("text")
        .attr("x", this.width*.5)
        .attr("y", 30)
        .attr("stroke", "black")
        .attr("stroke-width", 0)
        .attr('text-anchor','middle')
        .attr("opacity", ".1")
        .attr('font-size', "2em" )
        .text(function(d){
            return 'Sensitive content use case'});  */

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


    svg.append("svg:defs").selectAll("marker")
      .data(["end"])
        .enter().append("svg:marker")
        .attr("id",String)
        .attr("viewBox","0 -5 10 10")
        .attr("refX",15)
        .attr("refY",-1.5)
        .attr("markerWidth",6)
        .attr("markerHeight",6)
        .attr("orient","auto")
        .append("svg:path")
        .attr("d","M0,-5L10,0L0,5");

    svg.select("defs").append("marker")
        .attr("id","start")
        .attr("viewBox","0 -5 10 10")
        .attr("refX",-5)
        .attr("refY",0)
        .attr("markerWidth",6)
        .attr("markerHeight",6)
        .attr("orient","auto")
        .attr("class","arrow")
        .append("svg:path")
          .attr("d","M0,0L10,-5L10,5");

    var i = 0,
        duration = 750,
        root;

    // declares a tree layout and assigns the size
    console.log("before treemap; h:w=",this.height,":",this.width);
    var treemap = d3.tree().size([200, this.width]).nodeSize([80,80]); 

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
          nodes.forEach(function(d){ d.y = d.depth * 300});

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
                  //console.log("in nodeenter circle;d=",d);
                  //console.log("in nodeenter circle;d.parent=",d.parent);
                  //console.log("in nodeenter circle;d.parent[0]=",d.parent[0]);
                  if(d.parent == null) return "black"; else { return "orange"}
                  //return d.parent ? "black" : "orange";
                })
              .style("filter", function(d) {
                  if(d.parent==null) { return "url(#drop-shadow)"} else {return "none"}
                  });

          // Add labels for the nodes
          nodeEnter.append('text')
              .attr("dy", ".35em")
              .attr("x", function(d) {
                  return d.children || d._children ? -28 : 28;
              })
              .attr("text-anchor", function(d) {
                  return d.children || d._children ? "end" : "start";
              })
              .text(function(d) { return d.data.name; });

          nodeEnter.append('svg:foreignObject')
              .attr('class', 'icons')
                .attr("x",-15)             
                .attr("y", -15)
                .attr('height', '28')
                .attr('width', '28')
                .html( function(d) { 
                      //console.log("in nodenter;d=",d);
                      return '<i class="material-icons" style="font-size:1.9rem;cursor: pointer;">' + d.data.type + '</i>'
                  }); 

          nodeEnter.append('circle')
                .attr("class", "linklabel")
                .attr("id",function(d) {return "link-label" + d.id})
                .attr("fill","transparent")
                .attr("stroke",function (d) { return "transparent"})
                .attr("stroke-width",0)
                .attr("dx",-50)
                .attr("r",25)
                .on('mouseover', (d) => {
                      //console.log("in nodehover;d=",d);
                      div1.transition()
                         .duration(200)
                         .style('opacity', .9);
                      div1 .html(
                        function() {
                                return d.id + " (" + d.data.name + ")"; 
                              }
                            )
                         .style('left', (d3.event.pageX -15) + 'px')
                         .style('top', (d3.event.pageY - 35) + 'px');
                        })
                .on('mouseout', (d) => {
                    div1.transition()
                       .duration(200)
                       .style('opacity', 0);
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
            .attr('r', 25)
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
// Create the links...
          var link = svg.selectAll('path.link')
              .data(links, function (d) {
                  return d.id;
              });

              // Enter any new links at the parent's previous position.
          var linkEnter = link.enter().insert('path', 'g')
              .attr("id", function(d){ return ("link" + d.id)})//unique id
              .attr("class", "link")
              //.attr('d', function (d) {
                  //var o = {x: source.x0, y: source.y0}
                  //return diagonal(o, o);
              //})
              .attr("d",diagonal)
              .attr("marker-start","url(#start)");

// UPDATE
          var linkUpdate = linkEnter.merge(link);

          var linkLabel = link.enter().insert("rect","g")
              .attr("class", "linklabel")
              .attr("y",function(d){ return (d.x + d.parent.x)/2 })
              .attr("id",function(d) {return "link-label" + d.id})
              .attr("x",function(d){ return (d.y + d.parent.y)/2 })
              .attr("dy", 5)
              .attr("height",boxheight)
              .attr("width",boxwidth)
              .attr("rx", 8)
              .attr("ry", 8)
              .attr("fill","#bbb")
              .attr("stroke",function (d) { return "red"})
              .attr("stroke-width",1)
              .style("filter", function(d) { return "url(#drop-shadow)"} 
                  );

              // Transition back to the parent element position
           linkUpdate.transition()
              .duration(duration)
              .attr('d', function (d) {
                  svg.select("#link-label" + d.id).transition().duration(duration)
                  .attr("y",function(d){ return (d.x + d.parent.x)/2 -(boxheight/2)})
                  .attr("x",function(d){ return (d.y + d.parent.y)/2 - (boxwidth/2)});
                  return diagonal(d, d.parent)
              }); 

// now do the circles in the lozenges

          var circles = svg.selectAll('link')
              .data(links, function (d) {
                  console.log("in circles;d=",d);
                  return d.id;
              });

          var circleEnter = circles.enter().insert('circle', 'g')
              //.attr("id", function(d){ return ("circ" + d.id)})//unique id
              .attr("id",function(d) {return "link-label" + d.id})
              //.attr("class", "clink")
              .attr("cx",function(d) {return (d.y+d.parent.y)/2 + 20})
              .attr("cy", function(d) { return (d.x+d.parent.x)/2})
              .attr('r', 10)
              .attr('fill', "white");

          var scores = svg.selectAll('link','g')
              .data(links, function (d) {
                  console.log("in scores;d=",d);
                  return d.id;
              });

          var scoresEnter = scores.enter().append('text')
              .attr("id",function(d) {return "link-label" + d.id})
              //.attr("id", function(d){ return ("score" + d.id)})//unique id
              .attr("x",function(d) {return (d.y+d.parent.y)/2 + 20})
              .attr("y", function(d) { return (d.x+d.parent.x)/2})
              .style("font-size","10px")
              .attr("dx","-8px")
              .attr("dy","3px")
              .text(function(d) {
                return ".03"
              });

          var types = svg.selectAll('link','g')
              .data(links, function (d) {
                  console.log("in scores;d=",d);
                  return d.id;
              });

          var typesEnter = types.enter().append('text')
              .attr("id",function(d) {return "link-label" + d.id})
              //.attr("id", function(d){ return ("score" + d.id)})//unique id
              .attr("x",function(d) {return (d.y+d.parent.y)/2 + 20})
              .attr("y", function(d) { return (d.x+d.parent.x)/2})
              .style("font-size","10px")
              .attr("dx","-42px")
              .attr("dy","3px")
              .text(function(d) {
                return ".xsls"
              });

// always make this last so transparents are on top
          var transprect = link.enter().insert("rect","g")
              .attr("class", "linklabel")
              .attr("y",function(d){ return (d.x + d.parent.x)/2 -11})
              .attr("id",function(d) {return "link-label" + d.id})
              .attr("x",function(d){ return (d.y + d.parent.y)/2 -29})
              //.attr("dy", 0)
              .attr("height",boxheight+2)
              .attr("width",boxwidth+2)
              .attr("rx", 8)
              .attr("ry", 8)
              .attr("fill","transparent")
              .attr("stroke",function (d) { return "transparent"})
              .attr("stroke-width",0)
              .on('mouseover', (d) => {
          // send info to emitter
                    //this.eventHover.emit(d);
                    div2.transition()
                       .duration(200)
                       .style('opacity', .9);
                    div2 .html(
                      function() {
                              //console.log("in tranparent hover;d=",d);
                              return "<table><tr><td colspan='2'><span class='tooltip-header'>Data movement between " + d.parent.data.name + " and " + d.data.name + "</span></td></tr>" +
                              '<tr><td>Score</td><td>.03</td></tr><tr>' +
                              '<td>Size risk</td><td>nominal</td></tr>'+
                              '<tr><td>Destination risk</td><td>nominal</td></tr>'+
                              '<tr><td>Source risk</td><td>nominal</td></tr>'+
                              '<tr><td>Content risk</td><td style="color:red;">Risky</td></tr>'+
                              '<tr><td>Time of day/week/month risk</td><td>nominal</td></tr>'+
                              '<tr><td>Data type risk</td><td>Nominal</td></tr>'+
                              '<tr><td>Data type</td><td>Excel Spreadsheet</td></tr>'+
                              '<tr><td>Content protection</td><td>Unencrypted</td></tr>'+
                              '<tr><td>Data protocol</td><td>HTTP(80)</td></tr>'+
                              '<tr><td>Connection ID</td><td>' + d.id + '</td></tr></table>'; 
                            }
                          )
                       .style('left', (d3.event.pageX +15) + 'px')
                       .style('top', (d3.event.pageY - 5) + 'px');
                      })
              .on('mouseout', (d) => {
                  div2.transition()
                     .duration(200)
                     .style('opacity', 0);
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
              var path = `M ${s.y-19} ${s.x}
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
