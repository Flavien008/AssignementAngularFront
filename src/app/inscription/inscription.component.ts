import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,RouterLink],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  username = '';
  password = ''; 
  name = '';
  matricule = ''; 
  isloading: boolean = false;

  constructor(private authService: AuthService,private router:Router) { }

  inscris(){
    console.log(this.username, this.password)
    this.isloading = true;
    this.authService.signIn(this.username, this.password,this.name,this.name)
      .subscribe(
        () => {
          this.isloading = false;
          console.log('Inscription réussie');
          this.router.navigate(['/']); 
        },
        error => {
          console.error('Erreur lors de la connexion:', error);
          // Afficher un message d'erreur approprié à l'utilisateur
        }
      );
  }
}
