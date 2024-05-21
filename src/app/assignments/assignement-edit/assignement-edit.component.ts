import { MatiereService } from './../../shared/matiere.service';
import { MatSpinner } from '@angular/material/progress-spinner';
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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common';
import { Matiere } from '../../matiere/matiere.model';
import { MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
    selector: 'app-assignement-edit',
    standalone: true,
    imports: [MatSelectModule, MatInputModule, MatLabel, MatOption, CommonModule, MatSpinner, MatInput, ReactiveFormsModule, MatFormField, MatButton, MatDialogActions, MatDialogTitle, MatDialogContent, MatDialogClose],
    templateUrl: './assignement-edit.component.html',
    styleUrl: './assignement-edit.component.css'
})

export class AssignementEditComponent {
    assignmentForm: FormGroup;
    isSaving: boolean = false;
    matieres: Matiere[] | undefined;
    isLoading: boolean = false;
    datePipe = new DatePipe('en-US');
    constructor(private dialogRef: MatDialogRef<AssignementEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder, private assignmentsService: AssignmentsService, private matiereService: MatiereService) {
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

    ngOnInit() {
        this.getMatiereFromService();
    }

    getMatiereFromService() {
        this.isLoading = true
        this.matiereService.getMatiere()
            .subscribe((matiere) => {
                this.isLoading = false
                console.log("matiere" + matiere);
                this.matieres = matiere;
            });
        console.log('Requête envoyée pour recuperer matiers');
    }

    saveChanges() {
        this.isSaving = true;
        const modifiedAssignment = this.assignmentForm.value;
        this.assignmentsService
            .updateAssignment(modifiedAssignment)
            .subscribe((message) => {
                console.log(message);
                this.isSaving = false;
                this.dialogRef.close(true);
            });
    }

    closeDialog() {
        this.dialogRef.close(false);
    }
}
