import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTable, MatMenuTrigger } from "@angular/material";
import { TableComponent } from "../table/table.component";
import { Globals } from '../globals';

@Component({
  selector: 'app-riskinfomodal',
  templateUrl: './riskinfomodal.component.html',
  styleUrls: ['./riskinfomodal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RiskinfomodalComponent implements OnInit {

	displayedColumns=['key','value'];

  constructor(
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	private globals: Globals,
  	public dialogRef: MatDialogRef<RiskinfomodalComponent>

  	) { }


  matdata:any;
  ngOnInit() {
  	this.matdata=this.data;
  	
  }

  close() {
    this.dialogRef.close();
  }

}
