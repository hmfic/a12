import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Globals } from "../globals";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GaugecircleComponent } from '../gaugecircle/gaugecircle.component';
import { GaugeModule } from 'angular-gauge';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',

  styles: [
    `
    .gauges-container {
      display: flex;
    }
    mwl-gauge {
      flex: 1;
      display: block;
      /* padding: 10px; */
      /* margin: 7px; */
      border-radius: 3px;
    }
    mwl-gauge > .gauge > .dial {
      stroke: #334455;
      stroke-width: 10;
      fill: rgba(0,0,0,0);
    }
    mwl-gauge > .gauge > .value {
      stroke: rgb(47, 227, 255);
      stroke-width: 10;
      fill: rgba(0,0,0,0);
    }
    mwl-gauge > .gauge > .value-text {
     	fill: #666;
    	font-family: sans-serif;
    	font-size: 1.2em;
    } 

    mwl-gauge.three {
    }
    mwl-gauge.three > .gauge > .dial {
      stroke: #333;
      stroke-width: 6;
    }
    mwl-gauge.three.three > .gauge > .value {
      stroke: orange;
      stroke-width: 12;
    }
    mwl-gauge.three > .gauge > .value-text {
      fill: #555;
    }
  `
  ],




  //styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

	constructor() {}
	
	maincards = [
			{
				"title":"Data Risk in DMZ Zone Movement",
			 	"tip":"This is sensitive data moving across DMZ Zones",
			 	"id":1,
			 	"flex":"33.3%", //  int range = (max - min) + 1;   return (int)(Math.random() * range) + min;
			 	"subcards":[
				    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"Anomalous zone transfer","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"Geographical zone movement","icon":"info","level":"Informational","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80}
				    ]
			 },
			 {
				"title":"Top Riskiest Country Destinations",
			 	"tip":"This is sensitive data moving across processes shown in a force directed graph",
			 	"id":2,
			 	"flex":"33.3%",
			 	"subcards":[
				    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80}
				    ]
			 },
			 {
				"title":"Top Sensitive Unencrypted Lambda Transfers",
			 	"tip":"This is sensitive data moving across processes shown in a force directed graph",
			 	"id":3,
			 	"flex":"33.3%",
			 	"subcards":[
				    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"Anomalous zone transfer","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80},
				    {"name":"Geographical zone movement","icon":"info","level":"Informational","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80}
				    ]
			 }
		];

	ngOnInit() {}

	maindrop(event: CdkDragDrop<string[]>) {
				//console.log("in cdk drop");
				moveItemInArray(this.maincards, event.previousIndex, event.currentIndex);
			}
	}