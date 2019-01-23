import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogContent, MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef, MatInputModule, MatSelectModule} from "@angular/material";
import { FormBuilder, Validators, FormGroup, FormsModule, } from "@angular/forms";
import { Globals } from '../globals';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-settingsmodal',
  templateUrl: './settingsmodal.component.html',
  styleUrls: ['./settingsmodal.component.scss']
})
export class SettingsmodalComponent  {

	form: FormGroup;
    name: string;
    modalTitle: string;
    theme: string;
    region: string;

	constructor(
		private formBuilder: FormBuilder,
    	private globals: Globals,
    	private dialogRef: MatDialogRef<SettingsmodalComponent>,
        @Inject(MAT_DIALOG_DATA) data
		) { 
			this.modalTitle = data.title;
		}

  ngOnInit() {
  	this.form = this.formBuilder.group( {
        name: '',email: '', region: ''
      });
  }

}
