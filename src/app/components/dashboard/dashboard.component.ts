import { Component, OnInit, OnChanges, ViewChildren, Input, ViewEncapsulation, QueryList } from '@angular/core';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxGaugeModule } from 'ngx-gauge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Globals } from "../globals";
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { CategoryHistoComponent } from '../../components/category-histo/category-histo.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  //encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit{
  gaugeType = "full";
  //gaugeValue = 28.3;
  gaugeLabel = "Risk";
  gaugeAppendText = "of 1";
  min="0";
  max="1";
  gaugecap="round";

   thresholdConfig = {
      '0':  {color: 'green'},
      '.70': {color: 'yellow'},
      '.80': {color: 'orange'},
      '.95': {color: 'red'}
    };

  constructor() { }

  ngOnInit(){ }

  entered($event: CdkDragEnter) {
    //console.log($event.item.data, $event.container.data);
    moveItemInArray(this.cards, $event.item.data, $event.container.data);
  }
  entered2($event: CdkDragEnter) {
    //console.log($event.item.data, $event.container.data);
    moveItemInArray(this.cards, $event.item.data, $event.container.data);
  }

  @ViewChildren(CdkDropList) dropsQuery: QueryList<CdkDropList>;

  drops: CdkDropList[];

  ngAfterViewInit() {
    this.dropsQuery.changes.subscribe(() => {
      this.drops = this.dropsQuery.toArray()
    })
    Promise.resolve().then(() => {
      this.drops = this.dropsQuery.toArray();
      //console.log(this.drops);
    })
  };



  cards = [
     { title: 'Important Numbers', cols: 2, rows: 3,"tip":"This is sensitive data moving across processes","type":"number1"},
     { title: 'Risk over Time', cols: 3, rows: 3,"tip":"This is sensitive data moving across processes","type":"time1"},
     { title: 'Risk by Variance Category', cols: 3, rows: 3,"tip":"This is sensitive data moving across processes","type":"bar1"},
     { title: 'Overall risk posture', cols: 2, rows: 3,"tip":"This is sensitive data moving across processes","type":"gauge1"}    
     
   ];
   

number1 = [
  {
    "name": "15 minute Risk",
    "value": .45
  },
  {
    "name": "1 hour Risk",
    "value": .45
  },
  {
    "name": "24 hour Risk",
    "value": .37
  },
  {
    "name": "1 week Risk",
    "value": .39
   },
   {
    "name": "1 month Risk",
    "value": .43
   }
]

}

