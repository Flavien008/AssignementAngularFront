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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMatiereDialogComponent } from './addmatiereDialog/add-matiere-dialog.component';


@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule, FormsModule, MatLabel, MatFormField, MatPaginatorModule, RouterLink, MatCard, MatCardContent, MatCardModule, MatGridListModule, MatIcon, CommonModule, MatDivider, MatListItem, MatList, MatProgressSpinnerModule],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css'
})
export class MatiereComponent {
  searchTerm = '';

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  onSearchTermChange() {

  }

  isProf() {
    return this.authService.isProf();
  }

  openDialogAdd() {
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
