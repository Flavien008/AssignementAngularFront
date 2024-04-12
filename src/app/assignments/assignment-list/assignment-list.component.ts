import { User } from './../../login/user.model';
import { GroupeService } from './../../shared/groupe.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { ViewChild, NgZone } from '@angular/core';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOption } from '@angular/material/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AssignementEditComponent } from '../assignement-edit/assignement-edit.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Groupe } from '../../groupe/goupe.model';
import { StudentService } from '../../shared/user.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-assignment-list',
    standalone: true,
    imports: [MatPaginator, MatTabsModule, MatSpinner, MatDialogClose, MatOption, MatInputModule, MatFormFieldModule, FormsModule, MatIcon, MatFormField, CommonModule, RouterLink,
        MatButtonModule, MatCardModule, MatCheckboxModule, CdkVirtualScrollViewport, ScrollingModule, MatListModule],
    templateUrl: './assignment-list.component.html',
    styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent implements OnInit {
    assignments: Assignment[] = [];
    filtreEdudiant = '';
    students: User[] = [];
    assignmentTransmis!: Assignment | undefined;
    titrefiltre = '';
    matierefiltre = '';
    groupeid = '';
    groupe!: Groupe | undefined;
    page = 1;
    limit = 10;
    totalDocs!: number;
    totalPages!: number;
    nextPage!: number;
    prevPage!: number;
    hasNextPage!: boolean;
    hasPrevPage!: boolean;
    // etudiants
    pageEtudiant = 1;
    limitEtudiant = 10;
    totalDocsEtudiant!: number;
    totalPagesEtudiant!: number;
    nextPageEtudiant!: number;
    prevPageEtudiant!: number;
    hasNextPageEtudiant!: boolean;
    hasPrevPageEtudiant!: boolean;

    isLoadingAssignments: boolean = false;
    isLoadingStudents: boolean = false;

    @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

    constructor(private assignmentsService: AssignmentsService,
        private groupeService: GroupeService,
        private userService: StudentService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router, private ngZone: NgZone,
        public dialog: MatDialog) { }

    openDialog(assignement: Assignment) {
        const dialogEditref = this.dialog.open(AssignementEditComponent, {
            data: { assignement }
        });

        dialogEditref.afterClosed().subscribe(result => {
            console.log("confirmation : " + result);
            if (result) {
                this.getAssignmentsFromService();
            }
        });
    }

    onPageChange(event: any) {
        this.pageEtudiant = event.pageIndex + 1; // pageIndex commence à 0, donc nous ajoutons 1
        this.limitEtudiant = event.pageSize;
        this.getStudentsFromService(this.groupeid);
    }

    ngOnInit() {
        // Recuperation des query params (ce qui suit le ? dans l'url)
        console.log(this.route.snapshot.queryParams);
        // Recuperation des fragment (ce qui suit le # dans l'url)
        console.log(this.route.snapshot.fragment);

        // On recupere l'id de l'assignment dans l'URL à l'aide de ActivatedRoute
        const id = this.route.snapshot.params['id'];
        this.groupeid = id ? id : '';
        this.getAssignmentsFromService();
        if (id) {
            this.getGoupeByIdFromService(id);
            this.getStudentsFromService(id);
        }
    }

    getGoupeByIdFromService(id: string) {
        this.groupeService.getGroupeById(id)
            .subscribe((data: Groupe) => {
                this.groupe = data;
            });
    }

    getStudentsFromService(id: string) {
        this.isLoadingStudents = true;
        this.userService.getStudentInGroups(this.pageEtudiant, this.limitEtudiant, id, this.filtreEdudiant)
            .subscribe((data: any) => {
                this.students = data.docs;
                this.totalDocsEtudiant = data.totalDocs;
                this.totalPagesEtudiant = data.totalPages;
                this.nextPageEtudiant = data.nextPage;
                this.prevPageEtudiant = data.prevPage;
                this.hasNextPageEtudiant = data.hasNextPage;
                this.hasPrevPageEtudiant = data.hasPrevPage;
                this.isLoadingStudents = false;
            });
    }

    applyFilters(): void {
        this.getAssignmentsFromService();
    }

    applyFiltersStudents(): void {
        this.getStudentsFromService(this.groupeid);
    }


    getAssignmentsFromService() {
        // on récupère les assignments depuis le service
        this.isLoadingAssignments = true;
        this.assignmentsService
            .getAssignmentsPaginesListe(this.page, this.limit, this.titrefiltre, this.matierefiltre, this.groupeid)
            .subscribe((data) => {
                // les données arrivent ici au bout d'un certain temps
                this.assignments = data.docs;
                this.totalDocs = data.totalDocs;
                this.totalPages = data.totalPages;
                this.nextPage = data.nextPage;
                this.prevPage = data.prevPage;
                this.hasNextPage = data.hasNextPage;
                this.hasPrevPage = data.hasPrevPage;
                this.isLoadingAssignments = false;
            });
        console.log('Requête envoyée');
    }


    ngAfterViewInit() {
        console.log(' ----- after view init ----');

        if (!this.scroller) return;

        // on s'abonne à l'évènement scroll du virtual scroller
        this.scroller
            .elementScrolled()
            .pipe(
                tap(() => {
                    //const dist = this.scroller.measureScrollOffset('bottom');
                    /*console.log(
                      'dans le tap, distance par rapport au bas de la fenêtre = ' + dist
                    );*/
                }),
                map((event) => {
                    return this.scroller.measureScrollOffset('bottom');
                }),
                pairwise(),
                filter(([y1, y2]) => {
                    return y2 < y1 && y2 < 100;
                }),
                // Pour n'envoyer des requêtes que toutes les 200ms
                throttleTime(200)
            )
            .subscribe(() => {
                // On ne rentre que si on scrolle vers le bas, que si
                // la distance de la scrollbar est < 100 pixels et que
                // toutes les 200 ms
                console.log('On demande de nouveaux assignments');
                // on va faire une requête pour demander les assignments suivants
                // et on va concatener le resultat au tableau des assignments courants
                console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
                this.ngZone.run(() => {
                    if (!this.hasNextPage) return;
                    console.log("next page" + this.nextPage);
                    this.page = this.nextPage;
                    this.getAssignmentsFromServicePourScrollInfini();
                });
            });
    }

    getAssignmentsFromServicePourScrollInfini() {
        // on récupère les assignments depuis le service
        this.assignmentsService
            .getAssignmentsPaginesListe(this.page, this.limit, this.titrefiltre, this.matierefiltre, this.groupeid)
            .subscribe((data) => {
                // les données arrivent ici au bout d'un certain temps
                console.log('Données arrivées scroll');
                this.assignments = [...this.assignments, ...data.docs];
                this.totalDocs = data.totalDocs;
                this.totalPages = data.totalPages;
                this.nextPage = data.nextPage;
                this.prevPage = data.prevPage;
                this.hasNextPage = data.hasNextPage;
                this.hasPrevPage = data.hasPrevPage;
            });
        console.log('Requête envoyée');
    }

    onAssignmentRendu() {
        // on a cliqué sur la checkbox, on change le statut de l'assignment
        if (this.assignmentTransmis) {
            // this.assignmentTransmis.rendu = true;
            this.assignmentsService.updateAssignment(this.assignmentTransmis)
                .subscribe(message => {
                    console.log(message);
                    // on navigue vers la liste des assignments
                    this.router.navigate(['/home']);
                });
        }
    }

    onDelete() {
        // on va directement utiliser le service
        if (this.assignmentTransmis) {
            this.assignmentsService.deleteAssignment(this.assignmentTransmis)
                .subscribe(message => {
                    console.log(message);
                    // on va cacher la vue de detail en mettant assignmentTransmis à undefined
                    this.assignmentTransmis = undefined;
                    // on navigue vers la liste des assignments
                    this.router.navigate(['/home']);
                });
        }
    }

    confirmDelete(assignment: any): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px',
            data: { assignment: assignment }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.confirmed) { // Vérifiez si la confirmation est vraie
                console.log(result.assignment); // Ceci vous donne accès à l'assignment sélectionné
                this.assignmentsService.deleteAssignment(result.assignment).subscribe(message => {
                    console.log(message);
                    this.getAssignmentsFromService();
                });
            }
        });
    }

    confirmRemoveStudent(user: any): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px',
            data: { user: user, groupe: this.groupe }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.confirmed) { // Vérifiez si la confirmation est vraie
                console.log(result.groupe); // Ceci vous donne accès à l'assignment sélectionné
                this.isLoadingStudents = true;
                this.groupeService.removeStudent(result.groupe, result.user).subscribe(message => {
                    console.log(message);
                    this.getStudentsFromService(this.groupeid);
                    this.getGoupeByIdFromService(this.groupeid);
                    

                });
            }
        });
    }



    isAdmin() {
        return this.authService.loggedIn;
    }
}
