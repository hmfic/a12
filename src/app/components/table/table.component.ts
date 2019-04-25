import { Component, OnInit, ViewChild, Pipe, PipeTransform , ViewEncapsulation} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TableDataSource } from './table-datasource';
import { TrimModule } from "../../shared/trim.module";
import { RiskinfomodalComponent } from "../riskinfomodal/riskinfomodal.component";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { Globals } from '../globals';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private dialog: MatDialog,
      private globals: Globals
      ) { }

  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'summary', 'sev', 'score', 'time', 'info'];

  openInfoDialog(sev,summary, descr, score, time, source, dest, sensors):void {
        const dialogConfig = new MatDialogConfig();
//        dialogConfig.disableClose = true;
        dialogConfig.width= '700px';
        dialogConfig.minWidth='60vw';
        dialogConfig.maxWidth="60vw !important"
        dialogConfig.autoFocus = false;
        dialogConfig.data = {
              summary: summary,
              sev: sev,
              descr: descr,
              score:score,
              time: time,
              source:source,
              dest:dest,
              sensors:sensors
          };
        this.dialog.open(RiskinfomodalComponent, dialogConfig);
    } 

  ngOnInit() {
    this.dataSource = new TableDataSource(this.paginator, this.sort); 
  }
}

