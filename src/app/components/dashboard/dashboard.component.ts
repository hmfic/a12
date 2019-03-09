import { Component, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxGaugeModule } from 'ngx-gauge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  entered($event: CdkDragEnter) {
    console.log($event.item.data, $event.container.data);
    moveItemInArray(this.cards, $event.item.data, $event.container.data);
  }
  entered2($event: CdkDragEnter) {
    console.log($event.item.data, $event.container.data);
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
      console.log(this.drops);
    })
  };
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

  cards = [
    { title: 'Overall Content Risk', cols: 2, rows: 2,"tip":"This is sensitive data moving across processes shown in 1"},
    { title: 'Overall Derivative Risk', cols: 1, rows: 1,"tip":"This is sensitive data moving across processes shown in 2"},
    { title: 'Overall Time of Day Risk', cols: 1, rows: 1,"tip":"This is sensitive data moving across processes shown in 3"},
    { title: 'Overall Destination Risk', cols: 1, rows: 1,"tip":"This is sensitive data moving across processes shown in 4"},
    { title: 'Card 5', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 5",
        "subcards":[
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Geographical zone movement from a very long desription to another","icon":"info","level":"Informational",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"}
              ]},
    { title: 'Card 6', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 2",
        "subcards":[
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Geographical zone movement from a very long desription to another","icon":"info","level":"Informational",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"}
              ]},
    { title: 'Card7', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 3",
        "subcards":[
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"New risky behavior detected","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Geographical zone movement from a very long desription to another","icon":"info","level":"Informational",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"}
              ]},
      { title: 'Card8', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 3",
        "subcards":[
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Geographical zone movement from a very long desription to another","icon":"info","level":"Informational",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"}
              ]},

   ];
}

