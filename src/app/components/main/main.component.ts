import { Component, OnInit } from '@angular/core';
import { Globals } from "../globals";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	constructor() {}
	data:any;
	ngOnInit() {
		this.data=[
		    {"name":"Risk rising threshold","icon":"warning","level":"Warning","date":"1/1/2019"},
		    {"name":"New risky behavior detected","icon":"warning","level":"Warning","date":"1/1/2019"},
		    {"name":"Persistent risk above threshold","icon":"error","level":"Critical risk level","date":"1/1/2019"},
		    {"name":"Anomalous zone transfer","icon":"warning","level":"Warning","date":"1/1/2019"},
		    {"name":"Geographical zone movement","icon":"info","level":"Informational","date":"1/1/2019"}
		    ];
		}
	}