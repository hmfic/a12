import { Component, OnInit } from '@angular/core';
import { Globals } from "../globals";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	constructor() {}
	subcards=[
		    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019"},
		    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019"},
		    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019"},
		    {"name":"Anomalous zone transfer","icon":"warning","level":"Warning","date":"1/1/2019"},
		    {"name":"Geographical zone movement","icon":"info","level":"Informational","date":"1/1/2019"}
		    ];
	maincards = [
			{
				"title":"Data Risk in DMZ Zone Movement",
			 	"tip":"This is sensitive data moving across DMZ Zones",
			 	"id":1,
			 	"subcards":[
				    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019"},
				    {"name":"Anomalous zone transfer","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"Geographical zone movement","icon":"info","level":"Informational","date":"1/1/2019"}
				    ]
			 },
			 {
				"title":"Top Riskiest Country Destinations",
			 	"tip":"This is sensitive data moving across processes shown in a force directed graph",
			 	"id":2,
			 	"subcards":[
				    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019"}
				    ]
			 },
			 {
				"title":"Top Sensitive Unencrypted Lambda Transfers",
			 	"tip":"This is sensitive data moving across processes shown in a force directed graph",
			 	"id":3,
			 	"subcards":[
				    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019"},
				    {"name":"Anomalous zone transfer","icon":"warning","level":"Warning","date":"1/1/2019"},
				    {"name":"Geographical zone movement","icon":"info","level":"Informational","date":"1/1/2019"}
				    ]
			 }
		];

	ngOnInit() {}

	maindrop(event: CdkDragDrop<string[]>) {
				//console.log("in cdk drop");
				moveItemInArray(this.maincards, event.previousIndex, event.currentIndex);
			}
	}