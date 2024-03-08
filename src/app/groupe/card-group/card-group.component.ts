import { Component } from '@angular/core';
import { MatCard,MatCardContent } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface Carte {
  image: string;
  titre: string;
  description: string;
}

@Component({
  selector: 'app-card-group',
  standalone: true,
  imports: [MatCard,MatCardContent,MatCardModule,MatGridListModule,MatIcon,CommonModule],
  templateUrl: './card-group.component.html',
  styleUrl: './card-group.component.css'
})
export class CardGroupComponent {
  cartes: Carte[] = [
    {
      image: "https://picsum.photos/id/237/200/300",
      titre: "Titre de la carte 1",
      description: "Description de la carte 1"
    },
    {
      image: "https://picsum.photos/id/1075/200/300",
      titre: "Titre de la carte 2",
      description: "Description de la carte 2"
    },
    {
      image: "https://picsum.photos/id/873/200/300",
      titre: "Titre de la carte 3",
      description: "Description de la carte 3"
    },{
      image: "https://picsum.photos/id/237/200/300",
      titre: "Titre de la carte 1",
      description: "Description de la carte 1"
    },
    {
      image: "https://picsum.photos/id/1075/200/300",
      titre: "Titre de la carte 2",
      description: "Description de la carte 2"
    },
    {
      image: "https://picsum.photos/id/873/200/300",
      titre: "Titre de la carte 3",
      description: "Description de la carte 3"
    },
    {
      image: "https://picsum.photos/id/237/200/300",
      titre: "Titre de la carte 1",
      description: "Description de la carte 1"
    },
    {
      image: "https://picsum.photos/id/1075/200/300",
      titre: "Titre de la carte 2",
      description: "Description de la carte 2"
    },
    {
      image: "https://picsum.photos/id/873/200/300",
      titre: "Titre de la carte 3",
      description: "Description de la carte 3"
    },{
      image: "https://picsum.photos/id/237/200/300",
      titre: "Titre de la carte 1",
      description: "Description de la carte 1"
    },
    {
      image: "https://picsum.photos/id/1075/200/300",
      titre: "Titre de la carte 2",
      description: "Description de la carte 2"
    },
    {
      image: "https://picsum.photos/id/873/200/300",
      titre: "Titre de la carte 3",
      description: "Description de la carte 3"
    }
  ];

}
