import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Globals } from "../globals";

@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.component.html',
  styleUrls: ['./sankey.component.scss']
})
export class SankeyComponent implements OnInit {
	@ViewChild('categoryhisto') private chartContainer: ElementRef;
	private hostElement:any;
	private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
	private width: number;
	private height: number;

  constructor() { }

  ngOnInit() {
  	this.drawChart();
  }
  drawChart() {
  	setTimeout(() => {
  		this.hostElement = this.chartContainer.nativeElement;
        this.width=this.hostElement.offsetWidth;
        //console.log("in categoryhisto; height=",this.hostElement.offsetHeight)
        this.height=350;

        this.height = this.height - this.margin.top - this.margin.bottom-20;

          //const svg = d3
          //  .select('.d3-chart')
        let svg = d3.select(this.hostElement)
            .append('svg')
            	.attr('width', this.width)
            	.attr('height', this.height);

  	},10); // end setTimeout
  }

}
