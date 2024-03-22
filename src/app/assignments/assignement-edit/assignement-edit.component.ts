import { Component, Inject } from '@angular/core';
import {
  MatDialogClose,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-assignement-edit',
  standalone: true,
  imports: [MatDialogActions,MatDialogTitle, MatDialogContent,MatDialogClose],
  templateUrl: './assignement-edit.component.html',
  styleUrl: './assignement-edit.component.css'
})

export class AssignementEditComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
