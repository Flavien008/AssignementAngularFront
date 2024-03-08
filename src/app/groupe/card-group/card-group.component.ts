import { Component } from '@angular/core';
import { MatCard,MatCardContent } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Groupe } from '../goupe.model';
import { GroupeService } from '../../shared/groupe.service';

@Component({
  selector: 'app-card-group',
  standalone: true,
  imports: [MatCard,MatCardContent,MatCardModule,MatGridListModule,MatIcon,CommonModule],
  templateUrl: './card-group.component.html',
  styleUrl: './card-group.component.css'
})
export class CardGroupComponent {
  groupes:Groupe[] = [];

  constructor(private groupeservice:GroupeService){}
  ngOnInit() {
    this.getGroupeFromService(); 
  }

  getGroupeFromService() {
    this.groupeservice.getGroupe()
    .subscribe((grp) => {
      console.log('Données arrivées atoo');
      console.log(grp);
      this.groupes = grp;
    });
    console.log('Requête envoyée');
  }


}
