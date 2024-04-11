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
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-assignement-edit',
    standalone: true,
    imports: [MatInput, ReactiveFormsModule, MatFormField, MatButton, MatDialogActions, MatDialogTitle, MatDialogContent, MatDialogClose],
    templateUrl: './assignement-edit.component.html',
    styleUrl: './assignement-edit.component.css'
})

export class AssignementEditComponent {
    assignmentForm: FormGroup;
    datePipe = new DatePipe('en-US');
    constructor(private dialogRef: MatDialogRef<AssignementEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder, private assignmentsService: AssignmentsService) {
        const dateLimiteValue = data.assignement?.dateLimite ? this.datePipe.transform(new Date(data.assignement?.dateLimite), 'yyyy-MM-dd') : '';
        this.assignmentForm = this.formBuilder.group({
            _id: [data.assignement._id],
            titre: [data.assignement?.titre || ''],
            description: [data.assignement?.description || ''],
            dateLimite: [dateLimiteValue || ''],
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
                this.dialogRef.close(true);
            });
    }

    closeDialog() {
        this.dialogRef.close(false);
    }
}
