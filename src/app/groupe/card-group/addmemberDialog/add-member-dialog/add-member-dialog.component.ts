import { GroupeService } from './../../../../shared/groupe.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../login/user.model';
import { StudentService } from '../../../../shared/user.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Groupe } from '../../../goupe.model';

@Component({
    selector: 'app-add-member-dialog',
    templateUrl: './add-member-dialog.component.html',
    standalone: true,
    imports: [MatSpinner, MatPaginator, MatFormFieldModule, MatInputModule, MatFormField, MatLabel, MatButton, CommonModule, FormsModule, MatDialogContent, MatDialogActions, MatCheckbox],
    styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent implements OnInit {
    students: User[] = [];
    selectedStudents: { [key: string]: boolean } = {};
    selectAll: boolean = false;
    filtre = '';
    page = 1;
    limit = 10;
    titre = '';
    totalDocs!: number;
    totalPages!: number;
    nextPage!: number;
    prevPage!: number;
    hasNextPage!: boolean;
    hasPrevPage!: boolean;
    loadingStudents: boolean = false;
    addingMembers: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<AddMemberDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private studentService: StudentService, private groupeService: GroupeService) {
        console.log('groue' + this.data.group.nom);

        this.titre = this.data.group.nom;
    }

    ngOnInit() {
        this.getStudentInGroupsFromService(this.page, this.limit, this.data.group._id, this.filtre);
    }

    onPageChange(event: any) {
        this.page = event.pageIndex + 1; // pageIndex commence à 0, donc nous ajoutons 1
        this.limit = event.pageSize;
        this.getStudentInGroupsFromService(this.page, this.limit, this.data.group._id, this.filtre);
    }


    applyFilters(): void {
        this.getStudentInGroupsFromService(this.page, this.limit, this.data.group._id, this.filtre);
    }

    selectAllStudents(event: any) {
        this.selectAll = event.checked;
        this.students.forEach(student => {
            this.selectedStudents[student._id] = this.selectAll;
        });
    }


    getStudentInGroupsFromService(page: number, limit: number, groupId: string, filtre: string) {
        this.loadingStudents = true;
        this.studentService.getStudentInGroups(page, limit, groupId, filtre).subscribe((data) => {
            this.students = data.docs;
            console.log('Données des étudiants' + this.students);
            this.totalDocs = data.totalDocs;
            this.totalPages = data.totalPages;
            this.nextPage = data.nextPage;
            this.prevPage = data.prevPage;
            this.hasNextPage = data.hasNextPage;
            this.hasPrevPage = data.hasPrevPage;
            this.loadingStudents = false;

        });
    }

    addMembers() {
        const selectedStudentIds = Object.keys(this.selectedStudents); // Obtenez les clés de l'objet selectedStudents

        if (selectedStudentIds.length === 0) {
            console.log('Aucun étudiant sélectionné.');
            return;
        }

        const payload = {
            groupId: this.data.group._id,
            studentIds: selectedStudentIds
        };

        console.log(payload);
        this.addingMembers = true;
        this.groupeService.addUsertoGroup(payload).subscribe((reponse) => {
            console.log("result ajout :"+reponse.message);
            this.addingMembers = false;
            this.dialogRef.close(true);
        });
    }
}

