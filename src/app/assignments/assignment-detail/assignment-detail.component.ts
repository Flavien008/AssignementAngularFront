import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import  {RouterLink} from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import {CdkVirtualScrollViewport,ScrollingModule} from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { ViewChild, NgZone } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-assignment-detail', 
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatCheckboxModule,CdkVirtualScrollViewport,ScrollingModule,MatListModule,MatSelectModule,MatInputModule,MatFormFieldModule,MatIconModule,MatProgressSpinnerModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  titre = 'Details de l\'assignment';
  assignmentTransmis: Assignment|undefined;
  isloading: boolean = false;

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(private assignmentsService:AssignmentsService,
              private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router,private ngZone: NgZone,
              ) { }
              


  ngOnInit(): void {
    this.getAssignmentsFromService();
    console.log(this.assignmentTransmis);
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
  
  

  isAdmin() {
    return this.authService.loggedIn;
  }
}
