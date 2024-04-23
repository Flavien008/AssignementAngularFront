
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSpinner } from '@angular/material/progress-spinner';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { Router } from '@angular/router';
import { User } from '../../login/user.model';
import { MatSelectModule } from '@angular/material/select';
import { MatiereService } from '../../shared/matiere.service';

@Component({
    selector: 'app-add-group-dialog',
    templateUrl: './add-matiere-dialog.component.html',
    standalone: true,
    imports: [MatSpinner, MatPaginator, MatFormFieldModule, MatInputModule, MatFormField, MatLabel, MatButton, CommonModule, FormsModule, MatDialogContent, MatDialogActions, MatCheckbox, NgxDropzoneModule, MatSelectModule],
    styleUrls: ['./add-matiere-dialog.component.css']
})
export class AddMatiereDialogComponent implements OnInit {
    nom = '';
    addingGroupe: boolean = false;
    files: File[] = [];
    loading = false;
    error = false;
    base64textString: string = "";
    profs: User[] = [];
    profchamp = '';

    constructor(
        public dialogRef: MatDialogRef<AddMatiereDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private matiereService: MatiereService) {
    }
    ngOnInit(): void {
        this.getProfsFromService();
    }

    addMatiere() {
    }

    onSelect(event: any) {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    onFileChange(event: any) {
        const files = event.addedFiles;
        console.log("miov a eto");
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsDataURL(file);
        }
    }
    _handleReaderLoaded(e: any) {
        const reader = e.target;
        this.base64textString = reader.result;
        console.log(this.base64textString);
    }

    onRemove(event: any) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }


    getProfsFromService() {
        this.matiereService.getProfs()
            .subscribe((data) => {
                console.log('Données arrivées atoo');
                console.log(data);
                this.profs = data;
            });
        console.log('Requête envoyée');
    }

}

