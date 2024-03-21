import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import  {RouterLink} from '@angular/router';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent {

}
