import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input } from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadarComponent implements OnInit {

	@ViewChild('radar') private chartContainer: ElementRef;
	private hostElement:any;

	@Input ('selectedCurve') public selectedCurve: number;

	@Input ('selectedRadarData') public selectedRadarData: number;

	private data1 = [
				{ name: 'CurrentRisk',
					axes: [
						{axis: 'Content', value: .42},
						{axis: 'File type', value: .20},
						{axis: 'File size', value: .69},
						{axis: 'Time of day', value: .26},
						{axis: 'Source', value: .35},
						{axis: 'Destination', value: .20}
					]
				},
				{ name: '1hourRisk',
					axes: [
						{axis: 'Content', value: .79},
						{axis: 'File type', value: .49},
						{axis: 'File size', value: .30},
						{axis: 'Time of day', value: .30},
						{axis: 'Source', value: .15},
						{axis: 'Destination', value: .44}
					]
				}
			];

	private data2 = [
				{ name: 'CurrentRisk',
					axes: [
						{axis: 'Content', value: .42},
						{axis: 'File type', value: .20},
						{axis: 'File size', value: .69},
						{axis: 'Time of day', value: .26},
						{axis: 'Source', value: .35},
						{axis: 'Destination', value: .20}
					]
				},
				{ name: '1dayRisk',
					axes: [
						{axis: 'Content', value: .50},
						{axis: 'File type', value: .87},
						{axis: 'File size', value: .30},
						{axis: 'Time of day', value: .450},
						{axis: 'Source', value: .25},
						{axis: 'Destination', value: .23}
					]
				}
			];
	private data3 = [
				{ name: 'CurrentRisk',
					axes: [
						{axis: 'Content', value: .42},
						{axis: 'File type', value: .20},
						{axis: 'File size', value: .69},
						{axis: 'Time of day', value: .26},
						{axis: 'Source', value: .35},
						{axis: 'Destination', value: .20}
					]
				},
				{ name: '1weekRisk',
					axes: [
						{axis: 'Content', value: .45},
						{axis: 'File type', value: .35},
						{axis: 'File size', value: .37},
						{axis: 'Time of day', value: .29},
						{axis: 'Source', value: .75},
						{axis: 'Destination', value: .33}
					]
				}
			];

  constructor() { }

  ngOnInit() {
  	//console.log("about to draw; radar data=",this.selectedRadarData);
  	var data=[];
  	if(this.selectedRadarData == 1) {
  			data = this.data1;
  		} else if (this.selectedRadarData == 2) {
  			data = this.data2;
  		} else {
  			data = this.data3;
  		}
  		this.drawChart(data);
  }
  drawChart(data) {
  	setTimeout(() => {
  		this.hostElement = this.chartContainer.nativeElement;

        const max = Math.max;
		const sin = Math.sin;
		const cos = Math.cos;
		const HALF_PI = Math.PI / 2;
		var strokes=false;

		//console.log("in drawchart; radar data=",this.selectedRadarData);

		if(this.selectedCurve == 1) {
        		strokes=true;
        	}

		var radarChartOptions = {
			  w: this.hostElement.offsetWidth-30,
			  h: 270,
			  margin: { top: 10, right: 20, bottom: 20, left: 20 },
			  levels: 5,
			  maxValue: 1,
			  roundStrokes: strokes,
			  color: d3.scaleOrdinal().range(["#ec864f","#00A0B0"]),
			  format: '.3f'
			};

		let svg_radar1 = RadarChart(this.hostElement, data, radarChartOptions);

        function RadarChart(parent_selector, data, options) {

			const cfg = {
				 w: 0,				//Width of the circle
				 h: 0,				//Height of the circle
				 margin: {top: 30, right: 20, bottom: 20, left: 20}, //The margins of the SVG
				 levels: 3,				//How many levels or inner circles should there be drawn
				 maxValue: 0, 			//What is the value that the biggest circle will represent
				 labelFactor: 1.2, 	//How much farther than the radius of the outer circle should the labels be placed
				 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
				 opacityArea: 0.35, 	//The opacity of the area of the blob
				 dotRadius: 4, 			//The size of the colored circles of each blog
				 opacityCircles: 0.1, 	//The opacity of the circles of each blob
				 strokeWidth: 2, 		//The width of the stroke around each blob
				 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
				 color: d3.scaleOrdinal(d3.schemeCategory10),	//Color function,
				 format: '.2%',
				 unit: ''
			};

			//Put all of the options into a variable called cfg
			if('undefined' !== typeof options){
			  for(var i in options){
				if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
			  }//for i
			}//if

			//If the supplied maxValue is smaller than the actual one, replace by the max in the data
			// var maxValue = max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
			let maxValue = 0;
			for (let j=0; j < data.length; j++) {
				for (let i = 0; i < data[j].axes.length; i++) {
					data[j].axes[i]['id'] = data[j].name;
					if (data[j].axes[i]['value'] > maxValue) {
						maxValue = data[j].axes[i]['value'];
					}
				}
			}
			maxValue = max(cfg.maxValue, maxValue);

			const allAxis = data[0].axes.map((i, j) => i.axis),	//Names of each axis
				total = allAxis.length,					//The number of different axes
				radius = Math.min(cfg.w/2-20, cfg.h/2-20), 	//Radius of the outermost circle
				Format = d3.format(cfg.format),			 	//Formatting
				angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

			//Scale for the radius
			const rScale = d3.scaleLinear()
				.range([0, radius])
				.domain([0, maxValue]);

			/////////////////////////////////////////////////////////
			//////////// Create the container SVG and g /////////////
			/////////////////////////////////////////////////////////
			const parent = d3.select(parent_selector);

			//Remove whatever chart with the same id/class was present before
			parent.select("svg").remove();

			//Initiate the radar chart SVG
			let svg = parent.append("svg")
					.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
					.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
					.attr("class", "radar");

			//Append a g element
			let g = svg.append("g")
					.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left ) + "," + (cfg.h/2 + cfg.margin.top) + ")");

			var div = d3.select("body").append("div")
		        .attr("class", "tooltip") 
		        .style("opacity", 0);

			/////////////////////////////////////////////////////////
			////////// Glow filter for some extra pizzazz ///////////
			/////////////////////////////////////////////////////////

			//Filter for the outside glow
			let filter = g.append('defs').append('filter').attr('id','glow'),
				feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
				feMerge = filter.append('feMerge'),
				feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
				feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

			/////////////////////////////////////////////////////////
			/////////////// Draw the Circular grid //////////////////
			/////////////////////////////////////////////////////////

			//Wrapper for the grid & axes
			let axisGrid = g.append("g").attr("class", "axisWrapper");

			//Draw the background circles
			axisGrid.selectAll(".levels")
			   .data(d3.range(1,(cfg.levels+1)).reverse())
			   .enter()
				.append("circle")
				.attr("class", "gridCircle")
				.attr("r", d => radius / cfg.levels * d)
				.style("fill", "#CDCDCD")
				.style("stroke", "#CDCDCD")
				.style("fill-opacity", cfg.opacityCircles)
				.style("filter" , "url(#glow)");

			//Text indicating at what % each level is
			axisGrid.selectAll(".axisLabel")
			   .data(d3.range(1,(cfg.levels+1)).reverse())
			   .enter().append("text")
			   .attr("class", "axisLabel")
			   .attr("x", 4)
			   .attr("y", d => -d * radius / cfg.levels)
			   .attr("dy", "0.4em")
			   .style("font-size", "10px")
			   .attr("fill", "#737373")
			   .text(d => Format(maxValue * d / cfg.levels) + cfg.unit);

			/////////////////////////////////////////////////////////
			//////////////////// Draw the axes //////////////////////
			/////////////////////////////////////////////////////////

			//Create the straight lines radiating outward from the center
			var axis = axisGrid.selectAll(".axis")
				.data(allAxis)
				.enter()
				.append("g")
				.attr("class", "axis");
			//Append the lines
			axis.append("line")
				.attr("x1", 0)
				.attr("y1", 0)
				.attr("x2", (d, i) => rScale(maxValue *1.1) * cos(angleSlice * i - HALF_PI))
				.attr("y2", (d, i) => rScale(maxValue* 1.1) * sin(angleSlice * i - HALF_PI))
				.attr("class", "line")
				.style("stroke", "white")
				.style("stroke-width", "2px");

			//Append the labels at each axis
			axis.append("text")
				.attr("class", "legend")
				.style("font-size", "11px")
				.attr("text-anchor", "middle")
				.attr("dy", "0.35em")
				.attr("x", (d,i) => rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI))
				.attr("y", (d,i) => rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI))
				.text(d => d)
				//.call(wrap, cfg.wrapWidth);

			/////////////////////////////////////////////////////////
			///////////// Draw the radar chart blobs ////////////////
			/////////////////////////////////////////////////////////

			//The radial line function
			const radarLine = d3.radialLine()
				.curve(d3.curveLinearClosed)
				.radius(d => rScale(d.value))
				.angle((d,i) => i * angleSlice);

			if(cfg.roundStrokes) {
				radarLine.curve(d3.curveCardinalClosed)
			}

			//Create a wrapper for the blobs
			const blobWrapper = g.selectAll(".radarWrapper")
				.data(data)
				.enter().append("g")
				.attr("class", "radarWrapper");

			//Append the backgrounds
			blobWrapper
				.append("path")
				.attr("class", "radarArea")
				.attr("d", d => radarLine(d.axes))
				.style("fill", (d,i) => cfg.color(i))
				.style("fill-opacity", cfg.opacityArea)
				.on('mouseover', function(d, i) {
					//Dim all blobs
					parent.selectAll(".radarArea")
						.transition().duration(200)
						.style("fill-opacity", 0.1);
					//Bring back the hovered over blob
					d3.select(this)
						.transition().duration(300)
						.style("fill-opacity", 0.8);
					div.transition()
		            	.duration(200)
		            	.style("opacity",.9);
					div .html(
	                    function() {
	                    	return d.name;
	                        })
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
				})
				.on('mousemove', function(d) {
	                div
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
		        	})
				.on('mouseout', () => {
					div.transition()
	                     .duration(200)
	                     .style("opacity",0);
					//Bring back all blobs
					parent.selectAll(".radarArea")
						.transition().duration(200)
						.style("fill-opacity", cfg.opacityArea);
				});

			//Create the outlines
			blobWrapper.append("path")
				.attr("class", "radarStroke")
				.attr("d", function(d,i) { return radarLine(d.axes); })
				.style("stroke-width", cfg.strokeWidth + "px")
				.style("stroke", (d,i) => cfg.color(i))
				.style("fill", "none");

			//Append the circles
			blobWrapper.selectAll(".radarCircle")
				.data(d => d.axes)
				.enter()
				.append("circle")
				.attr("class", "radarCircle")
				.attr("id",function(d,i) { return "point"+ d.id + i})
				.attr("r", cfg.dotRadius)
				.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
				.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
				.style("fill", (d) => cfg.color(d.id))
				.style("fill-opacity", 0.4);

			/////////////////////////////////////////////////////////
			//////// Append invisible circles for tooltip ///////////
			/////////////////////////////////////////////////////////

			//Wrapper for the invisible circles on top
			const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
				.data(data)
				.enter().append("g")
				.attr("class", "radarCircleWrapper");

			//Append a set of invisible circles on top for the mouseover pop-up
			blobCircleWrapper.selectAll(".radarInvisibleCircle")
				.data(d => d.axes)
				.enter().append("circle")
				.attr("class", "radarInvisibleCircle")
				.attr("r", cfg.dotRadius * 1.5)
				.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice*i - HALF_PI))
				.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice*i - HALF_PI))
				.style("fill", "none")
				.style("pointer-events", "all")
				.on("mouseover", function(d,i) {
					//console.log("about to match up=","point"+ d.id + i)
					d3.select("#point"+ d.id + i)
			          .transition()
			          .duration(200)
			          .attr("r", cfg.dotRadius*2)
			          .attr("opacity",.8);
					d3.select(this)
						.transition().duration(200)
						.style("fill-opacity", 0.8);
					div.transition()
		            	.duration(200)
		            	.style("opacity",.9);
		            div .html(
	                    function() {
	                    	return d.axis + " risk: " + d.value;
	                        })
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
				})
				.on("mouseout", function(d,i){
					div.transition()
	                     .duration(200)
	                     .style("opacity",0);
	            	d3.select("#point"+ d.id + i)
			          .transition()
			          .duration(200)
			          .attr("r", cfg.dotRadius)
			          .attr("opacity",.4);
					/*tooltip.transition()
						.style('display', 'none').text(''); */
				});

			const tooltip = g.append("text")
				.attr("class", "tooltip")
				.attr('x', 0)
				.attr('y', 0)
				.style("font-size", "12px")
				.style('display', 'none')
				.attr("text-anchor", "middle")
				.attr("dy", "0.35em");

			} // end radarCHart

  		},10); // end setTimeout

	} // end drawChart
} // end export
