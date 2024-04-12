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

@Component({
  selector: 'app-noter-rendu',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule, MatDividerModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './noter-rendu.component.html',
  styleUrl: './noter-rendu.component.css'
})
export class NoterRenduComponent {
  @Input() rendu: Rendu | undefined;
  newnote : undefined;

  constructor(private dialogRef: MatDialogRef<AssignmentDetailComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
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


}
