import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-riskcentral',
  templateUrl: './riskcentral.component.html',
  styleUrls: ['./riskcentral.component.scss']
})
export class RiskcentralComponent implements OnInit {

	cards = [
		{
			"title":"Sensitive Content Use Case - Tree",
		 	"tip":"This is sensitive data moving across processes shown in a force directed graph",
		 	"id":1
		 },
		 {
			"title":"Size Content Use Case",
		 	"tip":"This is sensitive data moving across processes shown in a force directed graph",
		 	"id":2
		 }
	];

	drop(event: CdkDragDrop<string[]>) {
		//console.log("in cdk drop");
		moveItemInArray(this.cards, event.previousIndex, event.currentIndex);

	}

  constructor() { }

  ngOnInit() {
  }

}
