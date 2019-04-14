import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { Globals } from '../globals';
import * as d3 from 'd3';
import * as topo from 'topojson';

@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Map2Component implements OnInit {

	//lat: number = 51.678418;
	//lon: number = 7.809007;

	@ViewChild('map2') private chartContainer: ElementRef;

  	private hostElement:any;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 30 };
	private width: number;
	private height: number;
	

  constructor(
  	private globals: Globals
  	) { }

  ngOnInit() {
  	this.drawChart();
  }

  drawChart() {
  	setTimeout(() => {
  		this.hostElement = this.chartContainer.nativeElement;
        this.width=this.hostElement.offsetWidth;
        this.height=450;

        this.height = this.height - this.margin.top - this.margin.bottom-20;
        this.width = this.width - this.margin.right -20;

        var dotsize = 4;

        const zoom = d3.zoom()
        	.scaleExtent([1,8])
        	.on('zoom',zoomed);

        function zoomed() {
	    	//console.log("in zoom");
    		g.selectAll('circle')
    			.attr('transform', d3.event.transform);
    		g.selectAll('path')
    			.attr('transform', d3.event.transform);

    		 } // end zoomed

        let svg = d3.select(this.hostElement)
            .append('svg')
            	.attr('width', this.width + this.margin.left + this.margin.right)
            	.attr('height', this.height)
            	.style("background-color","#EBF4FA");

 //       var path = d3.geo.path()
//		    .projection(projection);
		var g = svg.append("g");

        svg.call(zoom);

    	let projection = d3.geoMercator()
			.scale(95)
			.translate( [this.width / 2, this.height / 1.5]);

		var div = d3.select("body").append("div")
	        .attr("class", "tooltip") 
	        .style("opacity", 0);

		let path = d3.geoPath().projection(projection);
	    //let g = svg.append('g')
	    //	.attr('class', 'map');

		let sensors = [
			{
				"name":"Equinix SJ",
				"descr":"Secure cage Cisco 2550, rack 16",
				"lat":"37.380186",
				"lon":"-121.997724",
				"url":"/assets/alpha-s-circle.png"
			},
			{
				"name":"Equinix Dallas",
				"descr":"Opendaylight instance",
				"lat":"32.801539",
				"lon":"-96.819523",
				"url":"/assets/alpha-s-circle.png"
			},
			{
				"name":"London",
				"descr":"Docker instance for PROD",
				"lat":"51.533826",
				"lon":"-.257974",
				"url":"/assets/alpha-s-circle.png"
			}];

		let destinations = [
			{
				"name":"High risk destination - NK",
				"lat":"39.041084",
				"lon":"125.762729",
				"url":"/assets/archive.svg"
			},
			{
				"name":"High risk destination - Shanghai",
				"lat":"31.245494",
				"lon":"121.247622",
				"url":"/assets/archive.svg"
			},
			{
				"name":"High risk destination - Bucharest",
				"lat":"44.431771",
				"lon":"26.094622",
				"url":"/assets/archive.svg"
			},
			{
				"name":"High risk destination - Guadalajara",
				"lat":"20.659635",
				"lon":"-103.349153",
				"url":"/assets/archive.svg"
			}];
		let me = [];
		//console.log("in map2; globals=",this.globals);
		if(this.globals.myinfo == undefined) {
			//console.log("setting to default; myinfo not set");
			me = [
				{
				"name":"me",
				"lat":51.678418,
				"lon":7.809007,
				"url":"/assets/archive.svg"
				}
				];
				} else {
			//console.log("setting mylat and lon; myinfo set");
			me = [
				{
				"name":"me",
				"lat":this.globals.myinfo.lat,
				"lon":this.globals.myinfo.lon,
				"isp":this.globals.myinfo.isp,
				"city":this.globals.myinfo.city,
				"country":this.globals.myinfo.country,
				"timezone":this.globals.myinfo.timezone,
				"query":this.globals.myinfo.query,
				"url":"/assets/archive.svg"
				}
			]
		}; 

		//console.log("myinfo=",this.globals.myinfo);


		d3.json("/assets/topo110m.json").then(function(world) {
	   	//console.log("got world");
	   		d3.csv("/assets/world-country-names.csv").then(function(names) {
	   		//console.log("got both");
	   			ready(world,names,sensors);
	   		})
	   	});


	   	

	   	function ready(topology, names,sensors) {
	    	//console.log("in ready");

	    	let countries = topo.feature(topology, topology.objects.countries).features;
	    	let nameshash=[];
	    	// hash the additional info fields with unique id as the key for quick lookup
	    	for(var i=0;i<names.length;i++) {
	    		//n++;
	    		nameshash[names[i].id]={"name":names[i].name,"alpha3":names[i].alpha3,"subregion":names[i].subregion};
	    	}
	    	for(var i=0;i < countries.length;i++) {
	    		//n++
	    		if(nameshash[countries[i].id] != null) {
	    			//console.log("countries thingy=",nameshash[countries[i].id].name);
		    		countries[i].name=nameshash[countries[i].id].name;
		    		countries[i].alpha3=nameshash[countries[i].id].alpha3;
					countries[i].subregion=nameshash[countries[i].id].subregion;
				}    		
	    	}

	    	var top = g.append('g');

	        top.selectAll('path')
	          	.data(countries)
	         	.enter()
	         	.append('path')
	         	.attr('d', path)
	         	.attr("class","country")
	         	.on('mouseover', function(d) {
	         		//console.log("in heatmap path mouseover;d=",d);
		          	div.transition()
		            	.duration(200)
		            	.style("opacity",.9);
	                div .html(
	                    function() {
	                    	return '<div style="text-align: left">' +
	                    	'<h2>' + d.name + '</h2>' + 
	                    	'Code: ' + d.alpha3 + '<br/>' + 
	                    	'Subregion: ' + d.subregion + '</div>';
	                        })
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
		        	d3.select(this)
		        		.attr("class","countryhover");	

		       	})
	         	.on('mousemove', function(d) {
	                div
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
		        	})
	         	.on('mouseout', function(d) {
		          	div.transition()
	                     .duration(200)
	                     .style("opacity",0);
	                d3.select(this)
	                	.attr("class","country");
	         	})

	        top.selectAll('circle1')
				  .data(sensors)
				  	.enter()
				  .append("circle")
				  .attr('d', sensors)
				  .attr("class","sensordot")
				  .attr("r", dotsize)
				  .attr("cx", function(d) {
			               return projection([d.lon, d.lat])[0];
			       })
			       .attr("cy", function(d) {
			               return projection([d.lon, d.lat])[1];
			       })
				  //.attr("transform", function(d) {
				  	//console.log("in map2 sensors; d=",d);
				//	return "translate(" + projection([d.lon,d.lat]) + ")";
				  //})
				  .on('mouseover', function(d) {
				  	div.transition()
		            	.duration(200)
		            	.style("opacity",.9);
	         		//console.log("in map2 path mouseover;d=",d);
	                div .html(
	                    function() {
	                    	return '<div style="text-align: left">' +
	                    	'<h2>' + d.name + '</h2>' +
	                    	d.descr+ '<br/>' +
	                    	'Location: [' + d.lat+ ', ' + d.lon + ']<br/>';
	                        })
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
		        	d3.select(this)
		        		.transition()
		            	.duration(200)
		        		.attr("r",dotsize*1.7)
		        		.attr("class","sensordothover");	

		       		})
	         	.on('mouseout', function(d) {
		          	div.transition()
	                     .duration(200)
	                     
	                    //.attr("stroke",'black')
	                     .style("opacity",0);
	                d3.select(this)
	                	.attr("r", dotsize)
	                	.attr("class","sensordot")
	            });

	        top.selectAll('circle2')
				  .data(destinations)
				  	.enter()
				  	.append("circle")
				  	.attr("class","destdot")
				  	.attr("r", dotsize)
				  	.attr('d', destinations)
				 	.attr("cx", function(d) {
				 			// console.log('in destinaton circle;d=',d)
			               return projection([d.lon, d.lat])[0];
			       		})
			       	.attr("cy", function(d) {
			               return projection([d.lon, d.lat])[1];
			       })
				  .on('mouseover', function(d) {
				  	div.transition()
		            	.duration(200)
		            	.style("opacity",.9);
	         		//console.log("in map2 path mouseover;d=",d);
	                div .html(
	                    function() {
	                    	return '<div style="text-align: left">' +
	                    	'<h2>' + d.name + '</h2>' +
	                    	'Location: [' + d.lat+ ', ' + d.lon + ']<br/>';
	                        })
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
		        	d3.select(this)
		        		.transition()
		            	.duration(200)
		        		.attr("r",dotsize*1.7)
		        		.attr("class","destdothover");	
		       	})
	         	.on('mouseout', function(d) {
		          	div.transition()
	                     .duration(200)
	                     
	                    //.attr("stroke",'black')
	                     .style("opacity",0);
	                d3.select(this)
	                	.attr("r", dotsize)
	                	.attr("class","destdot")
	                	//.style("fill",function(d) {
		        		//	return dotcolor;
		        	//});
	            });

	        top.selectAll('circle3')
				  	.data(me)
				  	.enter()
				  	.append("circle")
				  	.attr("class","medot")
				  	.attr("r", dotsize)
				  	.attr("cx", function(d) {
			        	return projection([d.lon, d.lat])[0];
			       		})
			       	.attr("cy", function(d) {
			            return projection([d.lon, d.lat])[1];
			       		})
					.on('mouseover', function(d) {
					  	div.transition()
			            	.duration(200)
			            	.style("opacity",.9);
		         		//console.log("in map2 path mouseover;d=",d);
		                div .html(
		                    function() {
		                    	//console.log("in dest hover;d=",d)
		                    	return '<div style="text-align: left">' +
		                    	'<h2>' + d.name + '</h2>' +
		                    	'City: ' + d.city + '<br/>' +
		                    	'Country: ' + d.country + '<br/>' +
		                    	'ISP: ' + d.isp + '<br/>' +
		                    	'IP: ' + d.query + '<br/>' +
		                    	'Timezone: ' + d.timezone + '<br/>' +
		                    	'Location: [' + d.lat + ', ' + d.lon + ']<br/>';
		                        })
		                	.style('left', (d3.event.pageX +15) + 'px')
		                    .style('top', (d3.event.pageY - 3) + 'px');
			        	d3.select(this)
			        		.transition()
			            	.duration(200)
			        		.attr("r",dotsize*1.7)
			        		.attr("class","medothover");	

			       		})
		         	.on('mouseout', function(d) {
			          	div.transition()
		                     .duration(200)
		                     .style("opacity",0);
		                d3.select(this)
		                	.attr("r", dotsize)
		                	.attr("class","medot")
		            	}); 


	    	} // end ready

  	},5); // end setTimeout
  } // end drawchart

}
