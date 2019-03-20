import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTable, MatMenuTrigger } from "@angular/material";
import { AlertConfigModalComponent } from '../alert-config-modal/alert-config-modal.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
//import { MatTableModule } from '@angular/material' 


const tileData = [
  {position: 0, 
      name: 'Size Threshold Alert', 
      descr: "This alert is triggered when a transfer exceeds the baseline size by 2 magnitudes.", 
      msg: 'An unusual sized data was transfered on {date} from {source} to {destination} which exceeded 2 standard deviations from the norm.',
      enabled: true},
  {position: 1, 
      name: 'Zone Movement Alert', 
      descr: "When data containing sensitive information moves betwen zones, this event is triggered.", 
      msg: 'Data containing sensitive information moved from zone {zone1} to zone {zone2} on {date} by {source} to {destination}.',
      enabled: true},
  {position: 2, 
      name: 'Encrypted browser Alert', 
      descr: "When a browser never before seen is sending encrypted information for the first time, this event is triggered.", 
      msg: '',
      enabled: false},
  {position: 3, 
      name: 'Source Risk Alert', 
      descr: "When data is sent to a destination flagged by policy as a restricted location, this event is triggered.", 
      msg: '',
      enabled: true},
  {position: 4, 
      name: 'Time of Day Risk Alert', 
      descr: "When data is sent to a destination during a highly unusual time of day this event is triggered.", 
      msg: '',
      enabled: true}
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

  openMenu(position: any): void {
    //console.log("in openmenu; position=", position);
    const dialogConfig = new MatDialogConfig();
        dialogConfig.width= '900px';
        dialogConfig.minWidth='90vw';
        dialogConfig.maxWidth="100vw !important"
        dialogConfig.autoFocus = false;
        dialogConfig.data = {
              id: 1,
              title: 'ALERT',
              name: tileData[position].name,
              descr: tileData[position].descr,
              type: "email",
              sev: '7',
              auth: 'oauth',
              msg: tileData[position].msg
          };
        this.dialog.open(AlertConfigModalComponent, dialogConfig);
  }

}
