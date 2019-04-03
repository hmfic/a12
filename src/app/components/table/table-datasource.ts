import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  tip1:string,
  time:string;
  score:number,
  name: string;
  id: number;
}

const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let todaystr:string='';

let today=new Date();
console.log("date=",today.toLocaleString('en-us',{hour: 'numeric',hour12:true}))
todaystr=(monthNames[today.getMonth()-1] + ' ' + today.getDay() + ', ' + today.getFullYear() + " " + today.toLocaleString('en-us',{hour: 'numeric',minute:'numeric',hour12:true}));

const EVENT_DATA: TableItem[] = [
  {id: 1, name: 'Unusual .exe file detected moving from target1 to source2 that has never been seen before', score:.8, time:todaystr, tip1: 'an unusual event happened on'},
  {id: 2, name: 'Unusual .js file', score:.76, time:todaystr, tip1: 'an unusual event happened'},
  {id: 3, name: 'Unusual .py file', score:.72, time:todaystr, tip1: 'an unusual event happened'},
  {id: 4, name: 'Unusual .java file', score:.69, time:todaystr, tip1: 'an unusual event happened'},
  {id: 5, name: 'Huge .xslx file', score:.66, time:todaystr, tip1: 'an unusual event happened'},
  {id: 6, name: 'Broken .xslx file', score:.66, time:todaystr, tip1: 'an unusual event happened'},
  {id: 7, name: 'Insurance policy content in .pdf file', score:.64, time:todaystr, tip1: 'an unusual event happened'},
  {id: 8, name: 'PII in .pdf file', score:.58, time:todaystr, tip1: 'an unusual event happened'},
  {id: 9, name: 'Prohibited .zip file', score:.58, time:todaystr, tip1: 'an unusual event happened'},
  {id: 10, name: 'Prohibited .zip file', score:.53, time:todaystr, tip1: 'an unusual event happened'},
  {id: 11, name: 'First exposure .py on TCP port', score:.52, time:todaystr, tip1: 'an unusual event happened'},
  {id: 12, name: 'Huge unencrypted .txt file', score:.50, time:todaystr, tip1: 'an unusual event happened'},
  {id: 13, name: 'Embedded .exe in .csv file', score:.49, time:todaystr, tip1: 'an unusual event happened'},
  {id: 14, name: 'Broken .py file', score:.49, time:todaystr, tip1: 'an unusual event happened'},
  {id: 15, name: 'Insurance policy content in .docx file', score:.43, time:todaystr, tip1: 'an unusual event happened'}
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EVENT_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
