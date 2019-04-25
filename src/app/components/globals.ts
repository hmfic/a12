import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  theme: string = 'default-theme';
  title: string = 'Acuity';
  name: string = 'Steve Giles';
  region: string = 'Region unset';
  email: string = 'Email unset';
  users:any;
  comments:any;
  myinfo:any;
  weatherhash:any;
  genderhash:any;
  force10:any;
  nodes:any;
  links:any;
  vIcon:any;

  dashboards=[
        { id:1,
          name: 'EU dashboard',
          description: 'My dashboard for EU work',
          author: 'joe blow',
          dateCreated: '1/2/2019',
          totalColumns:8,
          maxRows: 9,
          icon: 'alarm',
          route: 'eu',
          cards: [
            {
              card: 'Content Risk', 
              value: .42,
              columns: 2,
              rows: 4,
              component: ''
            },
            {
              card: 'File type Risk', 
              value: .20,
              columns: 4,
              rows:4,
              component: ''
            },
            {
              card: 'File size Risk', 
              value: .69,
              columns: 2,
              rows:4,
              component: ''
            },
            {
              card: 'Time of day Risk', 
              value: .26,
              columns: 3,
              rows:4,
              component: ''
            }
          ]
        },
        { id:2,
          name: 'NorCal Dashboard',
          description: 'my dashboard for NorCal work',
          author: 'joe blow',
          dateCreated: '1/2/2019',
          totalColumns:8,
          maxRows: 9,
          icon: 'alarm',
          route: 'norcal',
          cards: [
            {
              card: 'File size Risk', 
              value: .69,
              columns: 2,
              rows:4,
              component: ''
            },
            {
              card: 'Time of day Risk', 
              value: .26,
              columns: 3,
              rows:4,
              component: ''
            }
          ]
        }
      ];
}