import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";
import { brush } from 'd3';

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

    @Output() eventHover = new EventEmitter<Event>();
  constructor(
  	    private globals: Globals,
        private elementRef:ElementRef
        ) { }

  ngOnInit() { }

  ngAfterViewInit() {
  	var treeData = 
		  {
		    "name": "Myriel", "type":"person",
		    "children": [
		      {
		        "name": "Mlle.Baptistine",  "type":"computer", "date":"1/1/2019",
		        "children": [
		          {
		            "name": "Valijean", "type":"computer", "date":"1/3/2019",
		          },
              {
                "name": "Cravatte", "type":"computer", "date":"1/4/2019",
              }
		        ]
		      },
		      {
		        "name": "Geborand", "type":"laptop", "date":"1/1/2019",
		      },
          {
            "name": "Napolean", "type":"tablet", "date":"1/1/2019",
          },
          {
            "name": "CountessDeLo", "type":"computer", "date":"1/1/2019",
          }
		    ]
		  };

    var zoom = d3.zoom()
           .scaleExtent([.2,10])
           .on("zoom",zoomed);

    this.hostElement= this.chartContainer.nativeElement;

    let svg = d3.select(this.hostElement)
          .append('svg')
          .attr('width',"100%")
          .attr('height',"60vh")
          .call(zoom)
          .append('g');
          //.attr('transform','translate(100,190)');  // need to translate here since using NodeSize sets x and y to 0,0

    function zoomed() {
          svg.attr("transform", d3.event.transform);
        };

    d3.select("body").append('tips');

    var div1 = d3.select("tips").append('div1')
          .attr('class', 'tooltip')
          .style('opacity', 0);

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

    // d3.select("g.brush").call(brush);

    

     /* svg.append("circle")
          .attr("cx",100)
          .attr("cy",100)
          .attr("r",10)
          .attr("fill","red")
          .on('click',resetBrush); 
          //.on('click',svg.select(".brush").call(brush.move, null));

      function resetBrush() {
          console.log("in resetbrush");
          //if (!d3.event.sourceEvent) return; // Only transition after input.
          //if (!d3.event.selection) return; // Ignore empty selections.
          //if (!d3.event.sourceEvent) return;
          //if(d3.event.sourceEvent.type === "brush") return;
         // svg.select(".brush")
         //     .call(brush.move, null);
         //d3.select(this).call(d3.event.target.move, null);
          svg.select(".brush").call(brush.move, null);
          //brush.move(d3.select("g.brush"), null);
        } */

    setTimeout(() => {
      this.hostElement= this.chartContainer.nativeElement;
      this.width=this.chartContainer.nativeElement.offsetWidth;
      this.height=this.chartContainer.nativeElement.offsetHeight;

      /* function resetBrush() {
          console.log("in resetbrush");
          //if (!d3.event.sourceEvent) return; // Only transition after input.
          //if (!d3.event.selection) return; // Ignore empty selections.
          //if (!d3.event.sourceEvent) return;
          //if(d3.event.sourceEvent.type === "brush") return;
         // svg.select(".brush")
         //     .call(brush.move, null);
         //d3.select(this).call(d3.event.target.move, null);
          svg.select(".brush").call(brush.move, null);
          //brush.move(d3.select("g.brush"), null);
        } */

      // find min and max dates
      let dates = [];
      traverse(treeData);

      function traverse(obj) {
        if(obj != null && typeof obj == "object") {
          Object.entries(obj).forEach(([key,value]) => {
            //console.log("key:value=",key,":",value);
            if(key == "date") {
              //let value1=value;
              //let tmptime = new Date(value);
              dates.push(new Date(value.toString()).getTime());
            }
            traverse(value);
          })
        }
      }

      /* svg.append("circle")
          .attr("cx",100)
          .attr("cy",100)
          .attr("r",10)
          .attr("fill","red")
          .on('click',resetBrush);  */

      let epochstart=Math.min.apply(Math,dates);
      let start=new Date(Math.min.apply(Math,dates));
      let epochend = Math.max.apply(Math,dates);
      let end:any=new Date(epochend+86400*1000);

      // console.log("min:max=",start,":",end);

      var x = d3.scaleTime()
          .domain([start, end - 1])
          .rangeRound([0, this.width]);

      //console.log("xoxoxoxoxooxoxoxo before svg2; tree; width:height",this.width,":",this.height);
      let sliderBoxHeight:number=33;
      let xAxisHeight = sliderBoxHeight-3;
      let xAxisGridHeight = sliderBoxHeight-5;
      //let sliderBoxHeightStr: string =''+sliderBoxHeight;
      let svg2 = d3.select(this.hostElement)
          .append('svg')
          .attr('width',this.width)
          .attr('height',sliderBoxHeight+8)
          .append('g');

      svg2.append("g")
            .attr("class", "axis axis--grid")
            .attr("transform", "translate(0," + xAxisGridHeight + ")")
            .attr("align","center")
            .call(d3.axisBottom(x)
                .ticks(d3.timeHour, 12)
                .tickSize(-40)
                .tickFormat(function() { return null; }))
          .selectAll(".tick")
            .classed("tick--minor", function(d) { return d.getHours(); });

      svg2.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + xAxisHeight + ")")
            .call(d3.axisBottom(x)
                .ticks(d3.timeDay)
                .tickFormat(d3.timeFormat('%b %e'))
                .tickPadding(0)
                .tickSize(10))
            .attr("text-anchor", null)
          .selectAll("text")
            .attr("y",2)
            .attr("x", 6);

      svg2.append("g")
            .attr("class", "brush")
            .call(d3.brushX()
                .extent([[0, 0], [this.width, xAxisGridHeight]])
                .on("end brush", brushed));
                //.on("move", brushmove));

      var i = 0,
          duration = 750,
          root;

      // declares a tree layout and assigns the size
      //console.log("tree10 before treemap; h:w=",this.height,":",this.width);
      var treemap = d3.tree().nodeSize([90,90]); // note nodesize sets x,y to 0,0

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

      function brushed() {
          //console.log("entering brush !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!; !d3.event.sourceEvent=",d3.event.sourceEvent);
          console.log("entering brush !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!; !d3.event.selection=",d3.event.selection);
          if (!d3.event.sourceEvent) return; // Only transition after input.
          // if selecttion is null, then they clicked into the empty space; need to reset the links. etc
          if (!d3.event.selection) {
            console.log("got a single null selection event");
            svg.selectAll("path.link")
              .style("stroke","#ccc");  // reset the links to basic gray
            svg.selectAll("circle.node")
              .style("stroke-width","0px");
            return;
          }
          //if (!d3.event.selection) return; // Ignore empty selections.
          if (d3.event.type == "end") {
            svg.selectAll("path.link")
              .style("stroke","#ccc");  // reset the links to basic gray
            svg.selectAll("circle.node")
              .style("stroke-width","0px");  // reset the links to basic gray
            console.log("********************* in brushed end ******************");
            var d0 = d3.event.selection.map(x.invert),
                d1 = d0.map(d3.timeDay.round);
            // If empty when rounded, use floor & ceil instead.
            if (d1[0] >= d1[1]) {
              d1[0] = d3.timeDay.floor(d0[0]);
              d1[1] = d3.timeDay.offset(d1[0]);
            }
            svg.selectAll('circle.node')
              .style("stroke", function(d) {
                  if(typeof d.data.date === "undefined")
                    return;
                  if(new Date(d.data.date).getTime() == d1[0].getTime()) {
                    console.log("selecting link=","link"+d.id);
                    // select the link to select it
                    svg.select("#link" + d.id)
                      .style("stroke",function(d) {
                        console.log("looking for parent=d.parent=",d.parent);
                        return "black";
                      });
                    //console.log("XXXXxxxxxxxxxxxxxxxxxxxxxxxxx still in d.id=",d.id);
                    //console.log("XXXXxxxxxxxxxxxxxxxxxxxxxxxxx selecting parent;d.parent.id=",d.parent.id);
                    // now select the parent and highlight it
                    svg.select("#node"+d.parent.id)
                      .style("stroke", "black")
                      .style("stroke-width", "4px");
                  return "black";
                  }
                  // } else return "none";
              })
              .style("stroke-width",function(d) {
                if(typeof d.data.date === "undefined")
                    return "4px";
                if(new Date(d.data.date).getTime() == d1[0].getTime()) {
                    return "4px";
                  } else return "4px";
              });
            
            //console.log("brush ended; d1=",d1[0]);
            d3.select(this).transition().call(d3.event.target.move, d1.map(x));
          }
        }  // end brushed

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
              .attr("id",function(d) {return "node" + d.id})
              .attr('r', 1e-6)
              .style("fill", function(d) {
                  if(d.parent == null) return "black"; else { return "orange"}
                })
              .style("filter", function(d) {
                  if(d.parent==null) { return "url(#drop-shadow)"} else {return "none"}
                  })
              .style("stroke-width","0px");

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
                       .duration(500)
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

          // select nodes within the date brush
          nodeUpdate.select('circle.node')
            .attr('r', 25)
            .style("fill", function(d) {
               // console.log("in circle node;d==",d);
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
              .attr('d', function (d) {
                  var o = {x: source.x0, y: source.y0}
                  return diagonal(o, o);
              })
              //.attr("d",diagonal)
              .attr("marker-start","url(#start)");

  // UPDATE
          var linkUpdate = linkEnter.merge(link);

          var linkLabel = link.enter().insert("rect","g")
              .attr("class", "linklabel")
              //.attr("y",function(d){ return (d.x + d.parent.x)/1.5 })
              .attr("id",function(d) {return "link-label" + d.id})
              //.attr("x",function(d){ return (d.y + d.parent.y)/1.5 })
              .attr("dy", 5)
              .attr("height",boxheight)
              .attr("width",boxwidth)
              .attr("rx", 8)
              .attr("ry", 8)
              .attr("fill","#bbb")
              .attr("stroke",function (d) { return "red"})
              .attr("stroke-width",1)
              .style("filter", function(d) { return "url(#drop-shadow)"} );

          linkUpdate.transition()
              .duration(duration)
              .attr('d', function (d) {
                  svg.select("#link-label" + d.id).transition().duration(duration)
                  .attr("y",function(d){ return (d.x + d.parent.x)/2 -(boxheight/2)})
                  .attr("x",function(d){ return (d.y + d.parent.y)/2 - (boxwidth/2)});
                  return diagonal(d, d.parent)
              }); 
          

          var lock = link.enter().insert('svg:foreignObject', 'g')
                .attr("id",function(d) {return "link-label" + d.id})
                .attr('class', 'icons')
                .attr("x",0)             
                .attr("y", -35)
                .attr('height', '28')
                .attr('width', '28')
                .attr('transform', function(d) {
                  return "translate(" + (d.y+d.parent.y)/2 + "," + ((d.x+d.parent.x)/2 +17) + ")";
                  })
                .html( function(d) { 
                      //console.log("in nodenter;d=",d);
                      return '<i class="material-icons" style="font-size:1.1rem;cursor: pointer; color:#888;">lock</i>'
                  });



          var dest = link.enter().insert('svg:foreignObject', 'g')
                .attr("id",function(d) {return "link-label" + d.id})
                .attr('class', 'icons')
                .attr("x",0)             
                .attr("y", -35)
                .attr('height', '28')
                .attr('width', '28')
                .attr('transform', function(d) {
                  return "translate(" + (d.y+d.parent.y)/2 + "," + ((d.x+d.parent.x)/2 +17) + ")";
                  })
                .html( function(d) { 
                      //console.log("in nodenter;d=",d);
                      return '<mat-icon svgIcon="us"></mat-icon>'
                  });

  // now do the circles in the lozenges

          var circleEnter = link.enter().insert('circle', 'g')
              //.attr("id", function(d){ return ("circ" + d.id)})//unique id
              .attr("id",function(d) {return "link-label" + d.id})
              //.attr("class", "clink")
              .attr("cx",function(d) {return (d.y+d.parent.y)/2 + 20})
              .attr("cy", function(d) { return (d.x+d.parent.x)/2})
              .attr('r', 10)
              .attr('fill', "white");

          //var scoresEnter = link.enter().append('text')
          var scoresEnter = link.enter().insert('text', 'g')
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

          var typesEnter = link.enter().insert('text', 'g')
          // var typesEnter = link.enter().append('text')
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

          var arc = d3.symbol().type(d3.symbolTriangle);

          var triangle = link.enter().insert('path', 'g')
                .attr("id",function(d) {return "link-label" + d.id})
                .attr('d', arc)
                .attr('fill', 'red')
                .attr('stroke', '#000')
                .attr('stroke-width', 0)
                .style("filter", function(d) { return "url(#drop-shadow)"} )
                .attr('transform', function(d) {
                  return "translate(" + (d.y+d.parent.y)/2 + "," + ((d.x+d.parent.x)/2 +17) + ")";
                })
                .on('mouseover', (d) => {
                    div1.transition()
                       .duration(200)
                       .style('opacity', .9);
                    div1 .html(
                      function() {
                              //console.log("in div3 hover;d=",d);
                              return "Data was 2 standard deviations above normal size for an Excel spreadsheet."; 
                            }
                          )
                       .style('left', (d3.event.pageX +15) + 'px')
                       .style('top', (d3.event.pageY - 5) + 'px');
                      })
              .on('mouseout', (d) => {
                  div1.transition()
                     .duration(500)
                     .style('opacity', 0);
                    });

  // always make this last so transparents are on top
          var transprect = link.enter().insert("rect","g")
              .attr("class", "linklabel")
              .attr("y",function(d){ return (d.x + d.parent.x)/2 -11})
              .attr("id",function(d) {return "link-label" + d.id})
              .attr("x",function(d){ return (d.y + d.parent.y)/2 -30})
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
                    div1.transition()
                       .duration(200)
                       .style('opacity', .9);
                    div1 .html(
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
                              '<tr><td>Date</td><td>'+d.data.date+'</td></tr>'+
                              '<tr><td>Connection ID</td><td>' + d.id + '</td></tr></table>'; 
                            }
                          )
                       .style('left', (d3.event.pageX +15) + 'px')
                       .style('top', (d3.event.pageY - 5) + 'px');
                      })
              .on('mouseout', (d) => {
                  div1.transition()
                     .duration(500)
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
            } // end click
        }  // end update function

      },10);   // end timeout
    
  }  // end nginit

} // end class
