import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Globals } from "../globals";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxGaugeModule } from 'ngx-gauge';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {

	constructor() {}

	gaugeType = "full";
    gaugeValue = 28.3;
    gaugeLabel = "Risk";
    gaugeAppendText = "of 100";

    thresholdConfig = {
    	'0':  {color: 'green'},
        '70': {color: 'yellow'},
        '80': {color: 'orange'},
        '95': {color: 'red'}
    };
	
	maincards = [
			{
				"title":"Data Risk in DMZ Zone Movement",
			 	"tip":"This is sensitive data moving across DMZ Zones",
			 	"id":1,
			 	"flex":"33.3%", //  int range = (max - min) + 1;   return (int)(Math.random() * range) + min;
			 	"subcards":[
				    {"name":"Risk rising threshold","icon":"warning","level":"Warning",
				    		"date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
				    		"subtext":"this is more stuff at the bottom which is really really long and really really boring"},
				    {"name":"New risky behavior detected","icon":"warning","level":"Warning",
				    		"date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
				    		"subtext":"this is more stuff at the bottom which is really really long and really really boring"},
				    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level",
				    		"date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
				    		"subtext":"this is more stuff at the bottom which is really really long and really really boring"},
				    {"name":"Anomalous zone transfer","icon":"warning","level":"Warning","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
				    		"subtext":"this is more stuff at the bottom which is really really long and really really boring"},
				    {"name":"Geographical zone movement from a very long desription to another","icon":"info","level":"Informational","date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
				    		"subtext":"this is more stuff at the bottom which is really really long and really really boring"}
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