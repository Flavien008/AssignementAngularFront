import { Component } from '@angular/core';
import { MatCard,MatCardContent } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Groupe } from '../goupe.model';
import { GroupeService } from '../../shared/groupe.service';
import { MatDivider } from '@angular/material/divider';
import { MatList,MatListItem } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-card-group',
  standalone: true,
  imports: [MatPaginatorModule,RouterLink,MatCard,MatCardContent,MatCardModule,MatGridListModule,MatIcon,CommonModule,MatDivider,MatListItem,MatList,MatProgressSpinnerModule],
  templateUrl: './card-group.component.html',
  styleUrl: './card-group.component.css'
})
export class CardGroupComponent {
  groupes:Groupe[] = [];
  isLoading = true;

  searchTerm = '';
  page = 1;
  limit = 2;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  constructor(private groupeservice:GroupeService){}
  ngOnInit() {
    // this.getGroupeFromService(); 
    this.getGroupeFromServicePaginate();
  }

  getGroupeFromServicePaginate() {
    this.groupeservice
    .getGroupesPagines(this.page, this.limit,this.searchTerm)
    .subscribe((data) => {
      // les données arrivent ici au bout d'un certain temps
      console.log('Données arrivées');
      this.groupes = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
      this.isLoading = false;
    });
  console.log('Requête envoyée');
  }

  getGroupeFromService() {
    this.groupeservice.getGroupe()
    .subscribe((grp) => {
      console.log('Données arrivées atoo');
      console.log(grp);
      this.groupes = grp;
      this.isLoading = false;
    });
    console.log('Requête envoyée');
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getGroupeFromServicePaginate();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getGroupeFromServicePaginate();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getGroupeFromServicePaginate();
  }

  premierePage() {
    this.page = 1;
    this.getGroupeFromServicePaginate();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getGroupeFromServicePaginate();
  }


}
