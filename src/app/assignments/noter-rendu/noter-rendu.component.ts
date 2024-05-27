import { Component, Inject, Input } from '@angular/core';
import { Rendu } from '../rendu.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentDetailComponent } from '../assignment-detail/assignment-detail.component';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-noter-rendu',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    MatCardModule, MatDividerModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './noter-rendu.component.html',
  styleUrl: './noter-rendu.component.css'
})
export class NoterRenduComponent {
  @Input() rendu: Rendu;
  newnote: undefined;
  newremarque: undefined;

  constructor(private assignmentsService: AssignmentsService, private dialogRef: MatDialogRef<AssignmentDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService,) {
    this.rendu = data.rendu;
    console.log(this.rendu);

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
  closeDialog() {
    this.dialogRef.close(false);
  }

  AddNote() {
    if (this.newnote !== undefined && this.newremarque !== undefined) {
      this.rendu.note = this.newnote;
      this.rendu.remarque = this.newremarque;
    } else {

    }

    console.log(this.rendu);
    this.assignmentsService.updateRendu(this.rendu).subscribe(
      () => {
        console.log("Note envoyé");
      },
      error => {
        console.error('Erreur lors de la connexion:', error);
        // Afficher un message d'erreur approprié à l'utilisateur
      }
    );
  }

  isStudent() {
    return this.authService.isEtudiant();
  }

}
