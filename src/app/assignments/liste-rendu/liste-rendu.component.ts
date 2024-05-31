import { Component, NgZone } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Rendu } from '../rendu.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-liste-rendu',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatTable,
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
  styleUrl: './liste-rendu.component.css'
})
export class ListeRenduComponent {
  rendus: Rendu[] = [];
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

  constructor(private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router, private ngZone: NgZone,
    public dialog: MatDialog
  ) { }





  ngOnInit(): void {
    this.userData = this.getUserData();
    if (this.isStudent()) {
      this.getAllRenduFromServiceByStudent()
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
    this.chargement = true
    this.assignmentsService
      .getAllRenduPaginesListeByStudent(this.page, this.limit, this.filtre, this.userData._id)
      .subscribe((data) => {
        console.log('Données arrivées rendu');
        this.rendus = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.chargement = false
      });
    console.log('Requête envoyée');
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1; // pageIndex commence à 0, donc nous ajoutons 
    this.limit = event.pageSize;
    this. getAllRenduFromServiceByStudent();
  }


  isProf() {
    return this.authService.isProf();
  }

  isStudent() {
    return this.authService.isEtudiant();
  }
}
