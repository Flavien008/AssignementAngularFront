import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = ''; 
  isloading: boolean = false;
  error = '';

  constructor(private authService: AuthService,private router:Router) { }

  login(): void {
    console.log(this.username, this.password)
    this.isloading = true;
    this.authService.logIn(this.username, this.password)
      .subscribe(
        () => {
          this.isloading = false;
          console.log('Connexion réussie');
          const userData = this.authService.getUserData();
          if (userData.role === 'student') {
            this.router.navigate(['/groups']);
          } else if (userData.role === 'prof') {
            this.router.navigate(['/dashboard']);
          }
        },
        error => {
          console.error('Erreur lors de la connexion:', error);
          // Afficher un message d'erreur approprié à l'utilisateur
          this.isloading = false;
          this.error = "Mot de passe ou nom d'utilisateur incorrect !"
        }
      );
  }
  
}
