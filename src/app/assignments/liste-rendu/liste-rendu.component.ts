import { Component, NgZone, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Rendu } from '../rendu.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/auth.service';
import { CommonModule, DatePipe } from '@angular/common'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { NoterRenduComponent } from '../noter-rendu/noter-rendu.component';

@Component({
  selector: 'app-liste-rendu',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './liste-rendu.component.html',
  styleUrls: ['./liste-rendu.component.css']
})
export class ListeRenduComponent implements OnInit {
  rendus: Rendu[] = [];
  dataSource = new MatTableDataSource<Rendu>(this.rendus);
  displayedColumns: string[] = ['matierePhoto', 'nomMatiere', 'titreAssignment', 'dateRendu', 'description','details'];
  page = 1;
  limit = 9;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  isLoadingRendu: boolean = false;
  userData: any;
  filtre: string = 'all';
  chargement: boolean = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userData = this.getUserData();
    if (this.isStudent()) {
      this.getAllRenduFromServiceByStudent();
    }
  }

  getUserData(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  applyFilters(): void {
    this.getAllRenduFromServiceByStudent();
  }

  getAllRenduFromServiceByStudent() {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    const id = lastSegment.path;
    this.chargement = true;
    this.assignmentsService
      .getAllRenduPaginesListeByStudent(this.page, this.limit, this.filtre, this.userData._id)
      .subscribe((data) => {
        console.log('Données arrivées rendu');
        this.rendus = data.docs;
        this.dataSource.data = this.rendus;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.chargement = false;
      });
    console.log('Requête envoyée');
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1; // pageIndex commence à 0, donc nous ajoutons 1
    this.limit = event.pageSize;
    this.getAllRenduFromServiceByStudent();
  }

  isProf() {
    return this.authService.isProf();
  }

  isStudent() {
    return this.authService.isEtudiant();
  }

  openDialog(rendu: Rendu) {
    console.log(rendu);
    const dialogNoteref = this.dialog.open(NoterRenduComponent, {
      data: { rendu }
    });

    dialogNoteref.afterClosed().subscribe(result => {
      console.log("confirmation : " + result);
      if (result) {
        this.getAllRenduFromServiceByStudent();
      }
    });
  }
}
