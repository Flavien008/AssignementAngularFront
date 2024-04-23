import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMatiereDialogComponent } from './addmatiereDialog/add-matiere-dialog.component';
import { Matiere } from './matiere.model';


@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule, FormsModule, MatLabel, MatFormField, MatPaginatorModule, RouterLink, MatCard, MatCardContent, MatCardModule, MatGridListModule, MatIcon, CommonModule, MatDivider, MatListItem, MatList, MatProgressSpinnerModule],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css'
})
export class MatiereComponent {
  searchTerm = '';
  matieres: Matiere[] = [];
  page = 1;
  limit = 9;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  isLoadingMatieres: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  onSearchTermChange() {

  }

  isProf() {
    return this.authService.isProf();
  }

  openDialogAdd() {
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1; // pageIndex commence à 0, donc nous ajoutons 
    this.limit = event.pageSize;
    // this.fetchData();
}

  openAddMatiereDialog() {
    const dialogRef = this.dialog.open(AddMatiereDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {

      }
    });
  }


}
