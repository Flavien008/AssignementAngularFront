import { GroupeService } from '../../../shared/groupe.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../login/user.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Groupe } from '../../goupe.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-group-dialog',
    templateUrl: './add-group-dialog.component.html',
    standalone: true,
    imports: [MatSpinner, MatPaginator, MatFormFieldModule, MatInputModule, MatFormField, MatLabel, MatButton, CommonModule, FormsModule, MatDialogContent, MatDialogActions, MatCheckbox],
    styleUrls: ['./add-group-dialog.component.css']
})
export class AddGroupDialogComponent implements OnInit {
    nom = '';
    addingGroupe: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AddGroupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private groupeService: GroupeService,
        private router:Router) {
    }
    ngOnInit(): void {
        
    }


    addGroupe() {
        this.addingGroupe = true;
        if(this.nom == '') return;
        let nouveauGrp = new Groupe();
        nouveauGrp.nom = this.nom;
        this.groupeService.addGroupe(nouveauGrp).subscribe((reponse) => {
            console.log(reponse);
            this.addingGroupe = false;
            this.dialogRef.close(true);
        });
    }
}

