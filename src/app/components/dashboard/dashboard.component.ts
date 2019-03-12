import { Component, ViewChildren, QueryList, ViewEncapsulation, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
//import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as shape from 'd3-shape';

// import { single, multi, bubble, generateData, treemap, timelineFilterBarData, fiscalYearReport } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  //encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit{
  //single: any[];
  theme = 'dark';
  chartType: string;
  chartGroups: any[];
  chart: any;
  realTimeData: boolean = false;
  countries: any[];
  //single: any[];
  multi: any[];
  fiscalYearReport: any[];
  dateData: any[];
  dateDataWithRange: any[];
  calendarData: any[];
  statusData: any[];
  sparklineData: any[];
  timelineFilterBarData: any[];
  graph: { links: any[]; nodes: any[] };
  bubble: any;
  linearScale: boolean = false;
  range: boolean = false;

  view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  // options
  animations: boolean = true;
  barPadding = 8;
  gradient = false;
  groupPadding = 16;
  innerPadding = '10%';
  legend=false;
  legendPosition = 'right';
  legendTitle = 'Legend';
  maxRadius = 10;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;
  minRadius = 3;
  roundDomains = false;
  roundEdges: boolean = true;
  showDataLabel = true;
  showGridLines = true;
  showLegend = false;
  showSeriesOnHover = true;
  showXAxis = true;
  showXAxisLabel = false;
  showYAxis = false;
  showYAxisLabel = true;
  tooltipDisabled = false;
  trimXAxisTicks = false;
  trimYAxisTicks = false;
  xAxisLabel = '?';
  xScaleMax: any;
  xScaleMin: any;
  yAxisLabel = '??';
  yScaleMax: number;
  yScaleMin: number;

  colorScheme = {
      // domain: ['#5AA454', '#A10A28', '#C7B42C'], // or whatever colors you want
      //domain: ['#BB7544','#8C7B32','#597C40','#2B755C','#256870','#495670','#63435B','#68353C'],
      domain: ['#144548','#1A5F57','#2C7961','#499365','#6FAC65','#9CC462','#D0DA61'],
  }
  colorScheme2 = {
      domain: ['#d7191c','#fdae61','#abdda4','#2b83b'],
  }

  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear
  }; 

  // line interpolation
  curveType: string = 'Linear';
  curve: any = this.curves[this.curveType];
  interpolationTypes = [
    'Basis',
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  closedCurveType: string = 'Linear Closed';
  closedCurve: any = this.curves[this.closedCurveType];
  closedInterpolationTypes = ['Basis Closed', 'Cardinal Closed', 'Catmull Rom Closed', 'Linear Closed'];

  colorSets: any;
  //colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;

  // Override colors for certain values
  // customColors: any[] = [
  //   {
  //     name: 'Germany',
  //     value: '#0000ff'
  //   }
  // ];

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;

  // line, area
  autoScale = true;
  timeline = false;

  // margin
  margin: boolean = false;
  marginTop: number = 40;
  marginRight: number = 40;
  marginBottom: number = 40;
  marginLeft: number = 40;

  // gauge
  //gaugeMin: number = 0;
  //gaugeMax: number = 100;
  //gaugeLargeSegments: number = 10;
  //gaugeSmallSegments: number = 5;
  //gaugeTextValue: string = '';
  //gaugeUnits: string = 'alerts';
  //gaugeAngleSpan: number = 240;
  //gaugeStartAngle: number = -120;
  //gaugeShowAxis: boolean = true;
  //gaugeValue: number = 50; // linear gauge value
  //gaugePreviousValue: number = 70;

  // heatmap
  heatmapMin: number = 0;
  heatmapMax: number = 50000;

  // Combo Chart
  //barChart: any[] = barChart;
  //lineChartSeries: any[] = lineChartSeries;
  lineChartScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    domain: ['#01579b', '#7aa3e5', '#a8385d', '#00bfa5']
  };

  comboBarScheme = {
    name: 'singleLightBlue',
    selectable: true,
    group: 'Ordinal',
    domain: ['#01579b']
  };

  showRightYAxisLabel: boolean = true;
  yAxisLabelRight: string = 'Utilization';

  // demos
  totalSales = 0;
  salePrice = 100;
  personnelCost = 100;

  mathText = '3 - 1.5*sin(x) + cos(2*x) - 1.5*abs(cos(x))';
  mathFunction: (o: any) => any;

  treemap: any[];
  treemapPath: any[] = [];
  sumBy: string = 'Size';

  // Reference lines
  showRefLines: boolean = true;
  showRefLabels: boolean = true;

  // Supports any number of reference lines.
  refLines = [{ value: 42500, name: 'Maximum' }, { value: 37750, name: 'Average' }, { value: 33000, name: 'Minimum' }];


  

  gaugeType = "full";
  gaugeValue = 28.3;
  gaugeLabel = "Risk";
  gaugeAppendText = "of 100";


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
 

    thresholdConfig = {
      '0':  {color: 'green'},
        '70': {color: 'yellow'},
        '80': {color: 'orange'},
        '95': {color: 'red'}
    };

  get dateDataWithOrWithoutRange() {
    if (this.range) {
      return this.dateDataWithRange;
    } else {
      return this.dateData;
    }
  }


  statusLabelFormat(c): string {
    return `${c.label}<br/><small class="number-card-label">This week</small>`;
  }

  ngOnInit() {
    }

  cards = [
     { title: 'Numbers', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 1","type":"number1"},
    { title: 'Variance Risks', cols: 2, rows: 3,"tip":"This is sensitive data moving across processes shown in 1","type":"line1"},
    { title: 'Risk posture over Time', cols: 3, rows: 3,"tip":"This is sensitive data moving across processes shown in 2","type":"time1"},
    { title: 'Card 5', cols: 1, rows: 6,"tip":"This is sensitive data moving across processes shown in 5","type":"gauge",
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
    { title: 'Card 6', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 2","type":"gauge",
        "subcards":[
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Geographical zone movement from a very long desription to another","icon":"info","level":"Informational",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"}
              ]},
    { title: 'Card7', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 3","type":"gauge",
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
      { title: 'Card8', cols: 1, rows: 3,"tip":"This is sensitive data moving across processes shown in 3","type":"gauge",
        "subcards":[
              {"name":"Risk rising threshold","icon":"warning","level":"Warning",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"},
              {"name":"Geographical zone movement from a very long desription to another","icon":"info","level":"Informational",
                  "date":"1/1/2019","value":Math.floor(Math.random()*(100-80+1)) + 80,
                  "subtext":"this is more stuff at the bottom which is really really long and really really boring"}
              ]},

   ];
   single:any[] = [
     {
        name: 'File Type Risk',
        value: .800
      },
      {
        name: 'Source Risk',
        value: .6745
      },
      {
        name: 'Destination Risk',
        value: .45
      },
      {
        name: 'Time of Day Risk',
        value: .33
      },
      {
        name: 'Content Risk',
        value: .32
      },
      {
        name: 'Content Size RIsk',
        value: .24
      },
      {
        name: 'Device Risk',
        value: .19
      }
    ];

  lineData=  [
  {
    "name": "My risk",
    "series": [
      {
        "name": "2010",
        "value": .2
      },
      {
        "name": "2011",
        "value": .3
      },
      {
        "name": "2012",
        "value": .35
      },
      {
        "name": "2013",
        "value": .33
      },
      {
        "name": "2014",
        "value": .41
      }
    ]
  },

  {
    "name": "Industry benchmark",
    "series": [
      {
        "name": "2010",
        "value": .34
      },
      {
        "name": "2011",
        "value": .55
      },
      {
        "name": "2012",
        "value": .52
      },
      {
        "name": "2013",
        "value": .44
      },
      {
        "name": "2014",
        "value": .39
      }
    ]
  }
]

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

