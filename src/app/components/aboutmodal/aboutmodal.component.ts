import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-aboutmodal',
  templateUrl: './aboutmodal.component.html',
  styleUrls: ['./aboutmodal.component.scss']
})
export class AboutmodalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
