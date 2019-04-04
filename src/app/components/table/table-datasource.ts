import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  sev:string[];
  summary:string;
  sevtip:string,
  time:string;
  score:number,
  descr: string;
  id: number;
}


const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
let todaystr:string='';

let today=new Date();
console.log("date=",today.toLocaleString('en-us',{hour: 'numeric',hour12:true}))
todaystr=(monthNames[today.getMonth()-1] + ' ' + today.getDay() + ', ' + today.getFullYear() + " " + today.toLocaleString('en-us',{hour: 'numeric',minute:'numeric',hour12:true}));

const EVENT_DATA: TableItem[] = [
  {id: 1, sev:['filetype'],summary:'Embedded executable .exe', descr: 'Unusual .exe file detected moving from target1 to source2 that has never been seen before', score:.8, time:todaystr, sevtip: 'filetype violation'},
  {id: 2, sev:['filetype','content'],summary:'Javascript .js file with restricted content',descr: 'An unusual javascript file containing PII content was observed', score:.76, time:todaystr, sevtip: 'filetype violation'},
  {id: 3, sev:['filetype'],summary:'Python .py script detected',descr: 'An unusual python script was transferred', score:.72, time:todaystr, sevtip: 'filetype violation'},
  {id: 4, sev:['filetype','time'],summary:'Offhours .java application detected',descr: 'An unusual java application was moved during hours not normally seen.', score:.69, time:todaystr, sevtip: 'filetype and time of day violation'},
  {id: 5, sev:['filetype','size'],summary:'Huge .xsls file',descr: 'An unusually large Excel spreadsheet was moved', score:.66, time:todaystr, sevtip: 'file size and filetype violation'},
  {id: 6, sev:['filetype', 'integrity'],summary:'Broken .xsls files',descr: 'An incomplete Excel spreasheet was interrupted in the middle of the transfer', score:.66, time:todaystr, sevtip: 'filetype and file integrity violation'},
  {id: 7, sev:['filetype', 'contents'],summary:'Insurance PII content',descr: 'Insurance policy content in .pdf file', score:.64, time:todaystr, sevtip: 'filetype and content violation'},
  {id: 8, sev:['filetype', 'encryption'],summary:'PII in unencrypted PDF',descr: 'Personally identifiable information (PII) was found in unencrypted PDF file', score:.58, time:todaystr, sevtip: 'filetype and encryption level violation'},
  {id: 9, sev:['filetype'],summary:'Prohibited ZIP file',descr: 'A zip file which is against policy was detected moving between zones', score:.58, time:todaystr, sevtip: 'filetype violation'},
  {id: 10, sev:['filetype'],summary:'Prohibited ZIP file',descr: 'Prohibited .zip file', score:.53, time:todaystr, sevtip: 'filetype violation'},
  {id: 11, sev:['filetype', 'transport'],summary:'Python script on unusual TCP port',descr: 'A python script moved from TCP port 15001 which has never happened before', score:.52, time:todaystr, sevtip: 'filetype and transport violation'},
  {id: 12, sev:['filetype','size'],summary:'Huge unencrypted text',descr: 'An abnormaly large unencrypted text file moved between zones', score:.50, time:todaystr, sevtip: 'filetype and size violation'},
  {id: 13, sev:['filetype', 'integrity'],summary:'.exe hiding in CSV',descr: 'Embedded .exe in .csv file', score:.49, time:todaystr, sevtip: 'filetype and file integrity violation'},
  {id: 14, sev:['filetype', 'integrity'],summary:'Broken python script',descr: 'A python script was sent which has no trailing "close" to the program', score:.49, time:todaystr, sevtip: 'filetype and file integrity violation'},
  {id: 15, sev:['filetype', 'content'],summary:'Insurance PII detected',descr: 'Potential PII in an insurance policy was moved between zones', score:.43, time:todaystr, sevtip: 'filetype and content violation'}
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
        case 'summary': return compare(a.summary, b.summary, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'sev': return compare(+a.sev, +b.sev, isAsc);
        case 'score': return compare(+a.score, +b.score, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
