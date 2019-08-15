import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-riskcentral',
  templateUrl: './riskcentral.component.html',
  styleUrls: ['./riskcentral.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RiskcentralComponent implements OnInit {

	cards = [
		{
			"title":"IOT Content Movement",
		 	"tip":"This is sensitive data moving across processes shown in a tree",
		 	"id":1
		 },
		 {
			"title":"IOT Content Force Directed",
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
