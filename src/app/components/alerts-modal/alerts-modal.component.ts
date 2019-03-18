import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTable, MatMenuTrigger } from "@angular/material";
import { AlertConfigModalComponent } from '../alert-config-modal/alert-config-modal.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
//import { MatTableModule } from '@angular/material' 


const tileData = [
  {position: 1, name: 'Size Threshold Alert', descr: "When a transfer exceeds the baseline size by 2 magnitudes, this even is triggered.", enabled: true},
  {position: 2, name: 'Zone Movement Alert', descr: "When data containing sensitive information moves betwen zones, this event is triggered.", enabled: true},
  {position: 3, name: 'Encrypted browser Alert', descr: "When a browser never before seen is sending encrypted information for the first time, this event is triggered.", enabled: true},
  {position: 4, name: 'Source Risk Alert', descr: "When data is sent to a destination flagged by policy as a restricted location, this event is triggered.", enabled: true},
];


@Component({
  selector: 'app-alerts-modal',
  templateUrl: './alerts-modal.component.html',
  styleUrls: ['./alerts-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AlertsModalComponent implements OnInit {

  constructor(
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialogRef: MatDialogRef<AlertsModalComponent>,
  	private dialog: MatDialog
  	) { }

  dataSource = tileData;

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  openMenu(menu: any): void {
    //console.log("in openmenu");
    const dialogConfig = new MatDialogConfig();
        dialogConfig.width= '900px';
        dialogConfig.minWidth='90vw';
        dialogConfig.maxWidth="100vw !important"
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
              id: 1,
              title: 'ALERT',
              name: tileData[0].name,
              descr: tileData[0].descr,
              type: "syslog",
              sev: '7',
              auth: 'oauth',
              msg: 'An unusual sized data was transfered on {date} from {source} to {destination} which exceeded 2 standard deviations from the norm.'
          };
        this.dialog.open(AlertConfigModalComponent, dialogConfig);
  }

}
