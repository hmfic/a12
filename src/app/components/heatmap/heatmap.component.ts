import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";
import * as topo from 'topojson';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeatmapComponent implements OnInit {
	
	@ViewChild('heatmap') private chartContainer: ElementRef;
	
	private hostElement:any;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 30 };
	private width: number;
	private height: number;
	@Input ('selectedRisk') public selectedDisplay: number;

  constructor() { }

  ngOnInit() {
 		this.drawChart();
  	}

  drawChart() {
  	setTimeout(() => {
  		//console.log("selectedisplay=",this.selectedDisplay);
  		//console.log("in drawchart; heatmap.component");

  		let scores=[];
    	if(this.selectedDisplay == 1) {
    		console.log('setting to #1');
	    	scores['156']=.41;
	    	scores['840']=.101;
	    	scores['792']=.047;
	    	scores['643']=.043;
	    	scores['158']=.037;
	    	scores['076']=.033;
	    	scores['642']=.028;
	    	scores['356']=.023;
	    	scores['380']=.016;
	    	scores['348']=.014;
    	} else {
    		console.log('setting to #2');
    		scores['156']=.61;
	    	scores['840']=.5;
	    	scores['792']=.5;
	    	scores['643']=.5;
	    	scores['158']=.24;
	    	scores['076']=.4;
	    	scores['642']=.3;
	    	scores['356']=.03;
	    	scores['380']=.3;
	    	scores['348']=.02; 
    	} 


  		this.hostElement = this.chartContainer.nativeElement;
        this.width=this.hostElement.offsetWidth;
        this.height=450;

        this.height = this.height - this.margin.top - this.margin.bottom-20;
        this.width = this.width - this.margin.right -20;

        const zoom = d3.zoom()
        	.scaleExtent([1,8])
        	.on('zoom',zoomed);

        let active = d3.select(null)

        let svg = d3.select(this.hostElement)
            .append('svg')
            	.attr('width', this.width + this.margin.left + this.margin.right)
            	.attr('height', this.height)
            	.style("background-color","#EBF4FA");

        var color= d3.scaleOrdinal()
        	.domain([0,1,2,3,4,5])
        	.range(["#bf9d76","#e99450","#d89f59","#f2dfa7","#a5d7c6","#7794b1","#afafaf"]);

        var div = d3.select("body").append("div")
	        .attr("class", "tooltip") 
	        .style("opacity", 0);

		let projection = d3.geoMercator()
			//let projection = d3.geoNaturalEarth1()
		//let projection = d3.geoEquirectangular()
			.scale(95)
			.translate( [this.width / 2, this.height / 1.5]);

		let path = d3.geoPath().projection(projection);
	    let g = svg.append('g')
	    	.attr('class', 'map');
	    //let g2 = svg.append('g')
	    //	.attr('class', 'labels');

	    svg.call(zoom);

	    d3.json("/assets/topo110m.json").then(function(world) {
	   	//console.log("got world");
	   		d3.csv("/assets/world-country-names.csv").then(function(names) {
	   		//console.log("got both");
	   			ready(world,names,scores);
	   		})

	   	});

	   	function zoomed() {
	    	//console.log("in zoom");
    		g.selectAll('path')
    			.attr('transform', d3.event.transform);
    		} // end zoomed

	    function ready(topology, names,scores) {
	    	console.log("in ready");

	    	let countries = topo.feature(topology, topology.objects.countries).features;
			let nameshash=[];
	    	// hash the additional info fields with unique id as the key for quick lookup
	    	for(var i=0;i<names.length;i++) {
	    		//n++;
	    		nameshash[names[i].id]={"name":names[i].name,"alpha3":names[i].alpha3,"subregion":names[i].subregion};
	    	}
	    	for(var i=0;i < countries.length;i++) {
	    		//n++;
	    		//console.log("countries thingy=",nameshash[countries[i].id].name);
	    		if(nameshash[countries[i].id] != null) {
		    		countries[i].name=nameshash[countries[i].id].name;
		    		countries[i].alpha3=nameshash[countries[i].id].alpha3;
					countries[i].subregion=nameshash[countries[i].id].subregion;
				}    		
	    	}

// use hases to lookup scores rather than loops
			for(var i=0;i<countries.length;i++) {
				countries[i].score=0;
				if (countries[i].id in scores) {
					countries[i].score = scores[countries[i].id]
				}
				countries[i].color="#eee";
				countries[i].risk="Unscored";
				if(countries[i].score > .01) {countries[i].color="#f3f0d9";countries[i].risk="Low"};
				if(countries[i].score > .02) {countries[i].color="#fdcc8a";countries[i].risk="Low"};
				if(countries[i].score > .03) {countries[i].color="#fc8d59";countries[i].risk="Low"};
				if(countries[i].score > .1)  {countries[i].color="#e34a33";countries[i].risk="Medium"};
				if(countries[i].score > .4)  {countries[i].color="#b30000";countries[i].risk="High"};
			}

	        g.selectAll('path')
	          	.data(countries)
	         	.enter()
	         	.append('path')
	         	.attr('d', path)
	         	.style("fill",function(d) {
	         		return d.color;
	         	})
	         	//.on('click',clicked)
	         	.on('mouseover', function(d) {
	         		//console.log("in heatmap path mouseover;d=",d);
		          	div.transition()
		            	.duration(200)
		            	.style("opacity",.9);
	                div .html(
	                    function() {
	                    	return '<div style="text-align: left">' +
	                    	'<h2>' + d.name + '</h2>' + 
	                    	'<br/>Industry risk score: ' + d.score +  
	                    	'<br/>Risk level: ' + d.risk +
	                    	"<br/>Alpha code: " + d.alpha3 +
	                    	"<br/>ISO code: " + d.id +
	                    	"<br/>Region: " + d.subregion +
	                            '</div>';
	                        })
	                	.style('left', (d3.event.pageX +15) + 'px')
	                    .style('top', (d3.event.pageY - 3) + 'px');
		        	d3.select(this).style("fill",function(d) {
		        		return d3.rgb(d.color).darker(1);
		        	});	

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
	                d3.select(this).style("fill",function(d) {
		        		return d.color;
		        	});
	         	})

	    	}  // end ready
  	},5); // end setTimeout
  } // end drawchart

}