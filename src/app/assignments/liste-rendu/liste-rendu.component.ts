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
import { MatSelectModule } from '@angular/material/select';
import { MatSpinner } from '@angular/material/progress-spinner';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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
    DatePipe,
    MatSelectModule,
    MatSpinner
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
    if(this.isProf()){
      this.getAllRenduFromServiceByProf();
    }
  }

  getUserData(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  applyFilters(): void {
    if (this.isStudent()) {
      this.getAllRenduFromServiceByStudent();
    }
    if(this.isProf()){
      this.getAllRenduFromServiceByProf();
    }
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

  getAllRenduFromServiceByProf() {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    const id = lastSegment.path;
    this.chargement = true;
    this.assignmentsService
      .getAllRenduPaginesListeByProf(this.page, this.limit, this.filtre)
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
    if (this.isStudent()) {
      this.getAllRenduFromServiceByStudent();
    }
    if(this.isProf()){
      this.getAllRenduFromServiceByProf();
    }
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
        if (this.isStudent()) {
          this.getAllRenduFromServiceByStudent();
        }
        if(this.isProf()){
          this.getAllRenduFromServiceByProf();
        }
      }
    });
  }

  exportToExcel() {
    // Créer une copie des rendus en excluant la colonne matierePhoto
    const rendusWithoutPhoto = this.rendus.map(rendu => {
      const { matierePhoto, ...renduWithoutPhoto } = rendu;
      return renduWithoutPhoto;
    });
  
    // Convertir la liste des rendus sans la colonne matierePhoto en feuille de calcul
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rendusWithoutPhoto);
    
    // Créer le reste du fichier Excel comme avant
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'liste_rendus');
  }
  

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
