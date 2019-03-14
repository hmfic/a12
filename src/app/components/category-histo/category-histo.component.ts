import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-category-histo',
  templateUrl: './category-histo.component.html',
  styleUrls: ['./category-histo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryHistoComponent implements OnInit {
	@ViewChild('categoryhisto') private chartContainer: ElementRef;
	private hostElement:any;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
	private width: number;
	private height: number;
	private xScale: any;
	private yScale: any;
	private xAxis: any;
	private yAxis: any;

  constructor() { }

  riskData = [
    {
      name: 'File type', value: .74
    },
    {
      name: 'Time of Day', value: .45
    },
    {
      name: 'Browser', value: .44
    },
    {
      name: 'Content', value: .4
    },
    {
      name: 'Unusual size', value: .34
    },
    {
      name: 'Source', value: .23
    },
    {
      name: 'Destination', value: .14
    },
  ];

  ngOnInit() {
  	this.drawChart(this.riskData);
  }
  drawChart(chartData: Array<any>) {
  	setTimeout(() => {
  		  this.hostElement = this.chartContainer.nativeElement;
        this.width=this.hostElement.offsetWidth;
        console.log("in categoryhisto; height=",this.hostElement.offsetHeight)
        this.height=350;

        this.height = this.height - this.margin.top - this.margin.bottom-20;

          //const svg = d3
          //  .select('.d3-chart')
        let svg = d3.select(this.hostElement)
              .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        const chart = svg
            .append('rect')
            .attr('class', 'chartArea')
            .attr('width', this.width)
            //.attr("height", "100vh")
            .attr('height', this.height - this.margin.left)
            .attr('fill', '#fff')
            .attr('stroke-width', '0')
            .attr('stroke', '#b6aeae');

        d3.select("body").append('tips2');

	      var div1 = d3.select("tips2").append('div1')
	          .attr('class', 'tooltip')
	          .style('opacity', 0);

          // define X & Y domains
        const xDomain = chartData.map(d => d.name);
        const yDomain = [0, d3.max(chartData, d => d.value)];

          // create scales
        this.xScale = d3
            .scaleBand()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([10, this.width-10]);

        this.yScale = d3
            .scaleLinear()
            .domain(yDomain)
            .rangeRound([this.height, 50]);

        if (chartData.length === 0) {
            svg
              .append('text')
              .attr('class', 'noDataMessage')
              .attr('x', this.width / 2 - 70)
              .attr('y', 15)
              .html('No data available');
          } else {
            svg.select('.noDataMessage').remove();
            // x & y axis
            this.xAxis = svg
              .append('g')
              .attr('class', 'axis axis-x')
              .attr('transform', `translate(0, ${this.height - 20})`)
              .style('text-anchor', 'middle')
              .call(d3.axisBottom(this.xScale).tickSize(0));

            this.yAxis = svg
              .append('g')
              .attr('class', 'axis axis-y')
              .attr('transform', `translate(${this.margin.left * 2}, -20)`)
              .call(d3.axisLeft(this.yScale));

            const bar = svg
              .selectAll('.bar')
              .data(chartData)
              .enter().append('g').attr('class', 'bar');

            const rx = 8;
            const ry = 8;

            const colors=d3.scaleOrdinal()
              .range(["#bf9d76","#e99450","#d89f59","#f2dfa7","#a5d7c6","#7794b1","#afafaf"]);

            const x = d3.scaleBand()
                .rangeRound([0, this.width])
                .domain(xDomain)
                .padding(0.4);

            const y = d3.scaleLinear()
                .range([this.height, 0])
                .domain(yDomain)
                .nice();

            bar
               .append("path")
                  .style("fill", function(d,i) {
                    return colors(i)
                  }) 
                  .attr("d", item => `
                    M${x(item.name)},${y(item.value) + ry}
                    a${rx},${ry} 0 0 1 ${rx},${-ry}
                    h${x.bandwidth() - 2 * rx}
                    a${rx},${ry} 0 0 1 ${rx},${ry}
                    v${this.height - y(item.value) - ry -20}
                    h${-(x.bandwidth())}Z
                  `)
                  .on('mouseover', (d) => {
                      //console.log("in nodehover;d3.event.pageX=",d3.event.pageX);
                      //console.log("in nodehover;d3.event.pageY=",d3.event.pageY);
                      div1.transition()
                         .duration(200)
                         .style('opacity', .9);
                      div1 .html(
                        function() {
                        	  //console.log("in categoryhisto hover; d=",d);
                            //console.log("in categoryhisto hover; y=",y(d.value));
                                return d.value; 
                              }
                            )
                         .style('left', (d3.event.pageX -15) + 'px')
                         .style('top', (d3.event.pageY - 25) + 'px');
                        })
                    .on('mousemove',(d) => {
                        div1 .html(
                        function() {
                                return d.value; 
                              }
                            )
                         .style('left', (d3.event.pageX -15) + 'px')
                         .style('top', (d3.event.pageY - 25) + 'px');
                    })
                  	.on('mouseout', (d) => {
                      //console.log("in nodehover;d=",d);
                      div1.transition()
                         .duration(200)
                         .style('opacity', 0)
                    });

            svg.selectAll('.axis .domain').remove();
            svg.selectAll('.axis-y .tick').remove();
          }  // end else
  		 },10); // end setTimeout
  }

}
