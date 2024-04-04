import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = ''; 
  isloading: boolean = false;

  constructor(private authService: AuthService,private router:Router) { }

  login(): void {
    console.log(this.username, this.password)
    this.isloading = true;
    this.authService.logIn(this.username, this.password)
      .subscribe(
        () => {
          this.isloading = false;
          console.log('Connexion réussie');
          this.router.navigate(['/home']); 
        },
        error => {
          console.error('Erreur lors de la connexion:', error);
          // Afficher un message d'erreur approprié à l'utilisateur
        }
      );
  }
}
