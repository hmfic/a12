import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'

@Component({
  selector: 'app-alert-config-modal',
  templateUrl: './alert-config-modal.component.html',
  styleUrls: ['./alert-config-modal.component.scss']
})
export class AlertConfigModalComponent implements OnInit {

  constructor(
  	@Inject(MAT_DIALOG_DATA) public data: any
  	) { }
  matdata:any;

  ngOnInit() {
  	this.matdata=this.data;
    //console.log("thisdata=",this.data);
  }

}
