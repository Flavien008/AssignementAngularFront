
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

import { Router } from '@angular/router';

@Component({
    selector: 'app-add-group-dialog',
    templateUrl: './add-matiere-dialog.component.html',
    standalone: true,
    imports: [MatSpinner, MatPaginator, MatFormFieldModule, MatInputModule, MatFormField, MatLabel, MatButton, CommonModule, FormsModule, MatDialogContent, MatDialogActions, MatCheckbox],
    styleUrls: ['./add-matiere-dialog.component.css']
})
export class AddMatiereDialogComponent implements OnInit {
    nom = '';
    addingGroupe: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AddMatiereDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router:Router) {
    }
    ngOnInit(): void {
        
    }

    addMatiere() {
    }
}

