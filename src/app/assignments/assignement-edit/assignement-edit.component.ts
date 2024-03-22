import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-assignement-edit',
  standalone: true,
  imports: [MatInput,ReactiveFormsModule,MatFormField,MatButton,MatDialogActions,MatDialogTitle, MatDialogContent,MatDialogClose],
  templateUrl: './assignement-edit.component.html',
  styleUrl: './assignement-edit.component.css'
})

export class AssignementEditComponent {
  assignmentForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AssignementEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.assignmentForm = this.formBuilder.group({
      titre: [data?.titre || ''],
      description: [data?.description || ''],
      dateLimite: [data?.dateLimite || ''],
      matiere: [data?.matiere || ''],
      lien: [data?.lien || '']
    });
  }

  saveChanges() {
    // Handle saving changes here
    // const modifiedAssignment = this.assignmentForm.value;
    // Send modifiedAssignment to API or update in your application
    // this.dialogRef.close(modifiedAssignment);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
