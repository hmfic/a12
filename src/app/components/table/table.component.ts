import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableDataSource } from './table-datasource';
import { TrimModule } from "../../shared/trim.module";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'summary', 'sev', 'score', 'time', 'info'];
   

  public violationIcon (icon) {
    let vIcon:any=[];
    vIcon["filetype"]="insert_drive_file";
    vIcon["size"]="photo_size_select_small";
    vIcon["encryption"]="lock";
    vIcon["time"]="access_time";
    vIcon["integrity"]="broken_image";
    vIcon["content"]="description";
    return vIcon[icon];

  }

    public violationTip (tip) {
      let vTip:any=[];
      vTip["filetype"]="file type violation";
      vTip["size"]="unusual file size";
      vTip["encryption"]="uncrypted file violation";
      vTip["time"]="time of day violation";
      vTip["integrity"]="compromised file";
      vTip["content"]="content violation";
      return vTip[tip];

    }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paginator, this.sort); 
  }
}
