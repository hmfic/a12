import { Component, OnInit, Inject } from '@angular/core';
// import {MAT_DIALOG_DATA,  MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-config-modal',
  templateUrl: './alert-config-modal.component.html',
  styleUrls: ['./alert-config-modal.component.scss']
})
export class AlertConfigModalComponent implements OnInit {

  constructor(
  	
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialogRef: MatDialogRef<AlertConfigModalComponent>
  	) { }
  matdata:any;

  ngOnInit() {
  	this.matdata=this.data;
    //console.log("thisdata=",this.data);
  }

    close() {
    this.dialogRef.close();
  }

}
