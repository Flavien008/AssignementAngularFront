import { MatiereService } from './../../shared/matiere.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Matiere } from '../../matiere/matiere.model';
import { Groupe } from '../../groupe/Groupe';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    DragDropModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;
  matieres:Matiere[] = [];
  selectedStudentGroups: string[] = [];
  studentGroups: Groupe[] = [];
  selectedFile: File | undefined;

  constructor(private assignmentsService: AssignmentsService,
    private matiereService: MatiereService,
              private router:Router) {}

    ngOnInit() {
        this.getMatiereFromService();
        this.studentGroups = [
          {
            nom:"PROM13"
          },
          {
            nom:"PROM14"
          },
          {
            nom:"PROM15"
          }
        ];
    }

    getMatiereFromService() {
        this.matiereService.getMatiere()
        .subscribe((matiere) => {
          // les données arrivent ici au bout d'un certain temps
          console.log('Données arrivées');
          this.matieres = matiere;
        });
        console.log('Requête envoyée');
      }
    

  onSubmit(event: any) {
    if((this.nomAssignment == '') || (this.dateDeRendu === undefined)) return;

    // on crée un nouvel assignment
    let nouvelAssignment = new Assignment();
    // on genere un id aléatoire (plus tard ce sera fait coté serveur par
    // une base de données)
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    // on utilise le service pour directement ajouter
    // le nouvel assignment dans le tableau
    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((reponse) => {
        console.log(reponse);
       // On navigue pour afficher la liste des assignments
       // en utilisant le router de manière programmatique
        this.router.navigate(['/home']);
      });
  }

}
