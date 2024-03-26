import { AssignmentsService } from './../../shared/assignments.service';
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
import {  Router } from '@angular/router';



@Component({
  selector: 'app-assignement-edit',
  standalone: true,
  imports: [MatInput,ReactiveFormsModule,MatFormField,MatButton,MatDialogActions,MatDialogTitle, MatDialogContent,MatDialogClose],
  templateUrl: './assignement-edit.component.html',
  styleUrl: './assignement-edit.component.css'
})

export class AssignementEditComponent {
  assignmentForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AssignementEditComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder,private assignmentsService:AssignmentsService,private router: Router,)
  {
    this.assignmentForm = this.formBuilder.group({
      _id : [data.assignement._id],
      titre: [data.assignement?.titre || ''],
      description: [data.assignement?.description || ''],
      dateLimite: [data.assignement?.dateLimite || ''],
      matiere: [data.assignement?.matiere || ''],
      lien: [data.assignement?.lien || '']
    });
  }

  saveChanges() {
    const modifiedAssignment = this.assignmentForm.value;
    this.assignmentsService
        .updateAssignment(modifiedAssignment)
        .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
    this.dialogRef.close(modifiedAssignment);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
