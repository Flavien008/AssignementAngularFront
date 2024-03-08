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

@Component({
  selector: 'app-card-group',
  standalone: true,
  imports: [MatCard,MatCardContent,MatCardModule,MatGridListModule,MatIcon,CommonModule,MatDivider,MatListItem,MatList,MatProgressSpinnerModule],
  templateUrl: './card-group.component.html',
  styleUrl: './card-group.component.css'
})
export class CardGroupComponent {
  groupes:Groupe[] = [];
  isLoading = true;

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
      this.isLoading = false;
    });
    console.log('Requête envoyée');
  }


}
