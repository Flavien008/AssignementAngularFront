import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { ViewChild, NgZone } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { Rendu } from '../rendu.model';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { NoterRenduComponent } from '../noter-rendu/noter-rendu.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule, MatCardModule, CdkVirtualScrollViewport, ScrollingModule, MatListModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  titre = 'Details de l\'assignment';
  assignmentTransmis: Assignment | undefined;
  isloading: boolean = false;
  repositoryUrl: string = '';
  description: string = '';
  userData: any;
  message = '';
  filtre: string = 'all';
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  rendus: Rendu[] = [];
  rendusetu: Rendu[] = [];
  dejarendu: boolean = false;
  chargement: boolean = false;


  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router, private ngZone: NgZone,
    public dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.getAssignmentsFromService();
    this.userData = this.getUserData();
    this.getRenduFromService();
    if (this.isStudent()) {
      this.getRenduFromServiceByStudent()
      if (this.rendusetu.length > 0) {
        this.dejarendu = true;
      }
    }

    console.log("kle,l,o,eo", this.getRenduFromServiceByStudent())
    console.log("Frrrrr", this.dejarendu)
  }

  openDialog(rendu: Rendu) {
    console.log(rendu);
    const dialogNoteref = this.dialog.open(NoterRenduComponent, {
      data: { rendu }
    });

    dialogNoteref.afterClosed().subscribe(result => {
      console.log("confirmation : " + result);
      if (result) {
        this.getRenduFromService();
      }
    });
  }


  getAssignmentsFromService() {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    const id = lastSegment.path;
    console.log('ID de l\'assignment:', id);

    this.assignmentsService.getAssignment(id).subscribe((data) => {
      this.assignmentTransmis = data;
      console.log('Assignment récupéré:', this.assignmentTransmis);
      // Mettez ici le code qui utilise this.assignmentTransmis
    });
  }

  envoyerRendu() {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    const id = lastSegment.path;
    this.isloading = true;

    let nouvelRendu = new Rendu();
    nouvelRendu.auteur = this.userData.name;
    nouvelRendu.dateRendu = this.assignmentsService.getdateNow();
    nouvelRendu.description = this.description;
    nouvelRendu.file = this.repositoryUrl;
    nouvelRendu.idAssignment = id;
    nouvelRendu.idEtudiant = this.userData._id;
    nouvelRendu.matricule = this.userData.matricule;
    if(this.assignmentTransmis){
      nouvelRendu.titreAssignment = this.assignmentTransmis.titre;
      if(this.assignmentTransmis.matiere != undefined){
        nouvelRendu.nomMatiere = this.assignmentTransmis.matiere;
      }
      nouvelRendu.nomMatiere = this.assignmentTransmis.matiere;
      if(this.assignmentTransmis.matierePhoto != undefined)
      nouvelRendu.matierePhoto = this.assignmentTransmis.matierePhoto;
    }
    console.log(nouvelRendu);

    this.assignmentsService.addRendu(nouvelRendu)
      .subscribe(
        () => {
          this.isloading = false;
          console.log('Rendu envoyé avec succes');
          this.message = "Rendu envoyé avec succes !";
          this.getRenduFromServiceByStudent()
        },
        error => {
          console.error('Erreur lors de la connexion:', error);
          // Afficher un message d'erreur approprié à l'utilisateur
          this.isloading = false;
          this.message = "Il y a eu un problème !";
        }
      );
    
    console.log(this.rendusetu);
    this.dejarendu = true;
  }

  getUserData(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  applyFilters(): void {
    this.getRenduFromService();
  }

  getRenduFromService() {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    const id = lastSegment.path;
    // on récupère les rendus depuis le service
    this.assignmentsService
      .getRenduPaginesListe(this.page, this.limit, id, this.filtre, this.userData._id)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        this.rendus = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  copyLinkToClipboard() {
    const linkElement = document.getElementById('gitLink');
    if (linkElement) {
      const range = document.createRange();
      range.selectNode(linkElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
    }
  }

  getRenduFromServicePourScrollInfini() {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    const id = lastSegment.path;
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getRenduPaginesListe(this.page, this.limit, id, this.filtre, this.userData._id)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées scroll');
        this.rendus = [...this.rendus, ...data.docs];
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
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
        console.log('On demande de nouveaux rendu');
        // on va faire une requête pour demander les assignments suivants
        // et on va concatener le resultat au tableau des assignments courants
        console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
        this.ngZone.run(() => {
          if (!this.hasNextPage) return;
          console.log("next page" + this.nextPage);
          this.page = this.nextPage;
          this.getRenduFromServicePourScrollInfini();
        });
      });
  }


  isLate() {
    if (this.assignmentTransmis) {
      if (new Date(this.assignmentTransmis.dateLimite) < new Date()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false; 
    }
  }
  

  isAdmin() {
    return this.authService.loggedIn;
  }

  isProf() {
    return this.authService.isProf();
  }

  isStudent() {
    return this.authService.isEtudiant();
  }

  getRenduFromServiceByStudent() {
    const url = this.route.snapshot.url;
    const lastSegment = url[url.length - 1];
    const id = lastSegment.path;
    this.chargement = true
    this.assignmentsService
      .getRenduPaginesListeByStudent(this.page, this.limit, id, this.filtre, this.userData._id)
      .subscribe((data) => {
        console.log('Données arrivées rendu');
        this.rendusetu = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        if (data.docs.length > 0) {
          this.dejarendu = true;
        }
        this.chargement=false
      });
    console.log('Requête envoyée');
  }
}
