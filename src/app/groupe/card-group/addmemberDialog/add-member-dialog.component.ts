import { GroupeService } from '../../../shared/groupe.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../login/user.model';
import { StudentService } from '../../../shared/user.service';
import { MailService } from '../../../shared/mail.service';
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
    selectedStudentsMail: { [key: string]: boolean } = {};
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
        private studentService: StudentService, private groupeService: GroupeService, private mailService: MailService) {
        console.log('groupe' + this.data.group.nom);

        this.titre = this.data.group.nom;
    }

    ngOnInit() {
        this.getStudentNotInGroupsFromService(this.page, this.limit, this.data.group._id, this.filtre);
    }

    onPageChange(event: any) {
        this.page = event.pageIndex + 1; // pageIndex commence à 0, donc nous ajoutons 1
        this.limit = event.pageSize;
        this.getStudentNotInGroupsFromService(this.page, this.limit, this.data.group._id, this.filtre);
    }

    applyFilters(): void {
        this.getStudentNotInGroupsFromService(this.page, this.limit, this.data.group._id, this.filtre);
    }

    selectAllStudents(event: any) {
        this.selectAll = event.checked;
        this.students.forEach(student => {
            this.selectedStudents[student._id] = this.selectAll;
            this.selectedStudentsMail[student.username] = this.selectAll;
        });
    }

    updateStudentSelection(student: User, event: any) {
        this.selectedStudents[student._id] = event.checked;
        this.selectedStudentsMail[student.username] = event.checked;
    }

    getStudentNotInGroupsFromService(page: number, limit: number, groupId: string, filtre: string) {
        this.loadingStudents = true;
        this.studentService.getStudentNotInGroups(page, limit, groupId, filtre).subscribe((data) => {
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
        const selectedStudentIds = Object.keys(this.selectedStudents).filter(id => this.selectedStudents[id]); // Filtrer les étudiants sélectionnés
        const selectesStudentMails = Object.keys(this.selectedStudentsMail).filter(username => this.selectedStudentsMail[username]);

        if (selectedStudentIds.length === 0) {
            console.log('Aucun étudiant sélectionné.');
            return;
        }

        const payload = {
            groupId: this.data.group._id,
            studentIds: selectedStudentIds
        };

        console.log(payload);
        console.log(selectesStudentMails)
        var pourmails = selectesStudentMails.join(",");

        const emailData = {
            from: "Assignment App",
            to: pourmails,
            subject: "Ajout dans un groupe sur Assignment App",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #083880; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">Assignment App</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h2 style="color: #083880;">Bonjour,</h2>
                        <p style="font-size: 16px;">Vous avez été ajouté dans le groupe <strong>${this.data.group.nom}</strong> dans Assignment App.</p>
                        <p style="font-size: 16px;">Merci de vérifier votre compte pour plus de détails.</p>
                        <div style="margin: 20px 0; text-align: center;">
                            <a href="https://assignementangularfront.onrender.com" style="background-color: #083880; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accéder à Assignment App</a>
                        </div>
                    </div>
                    <div style="background-color: #f7f7f7; color: #777; padding: 20px; text-align: center;">
                        <p style="margin: 0;">Cordialement,<br>L'équipe Assignment App</p>
                    </div>
                </div>
            `
        };
        

        console.log(emailData)

        this.groupeService.addUsertoGroup(payload).subscribe((reponse) => {
            console.log("result ajout :" + reponse.message);
            this.addingMembers = false;
            this.mailService.sendMail(emailData).subscribe((error) => {
                console.log(error)
            });
            this.dialogRef.close(true);
            this.addingMembers = true;
        });
    }
}
