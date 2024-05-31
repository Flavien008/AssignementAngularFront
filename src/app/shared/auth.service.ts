import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../login/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = environment.baseUrl;
  loggedIn = false;

  constructor(private http: HttpClient,private router: Router) { }

  logIn(username: string, password: string): Observable<any> {
    const data = {
      "username": username,
      "password": password
    }
    console.log(data);
    return this.http.post(this.uri + "/login", data).pipe(
      tap(response => this.storeUserData(response)),
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        throw error;
      })
    );
  }

  private storeUserData(userData: any): void {
    localStorage.setItem('token', userData.token);
    console.log('userData.user' + userData.user);

    localStorage.setItem('user', JSON.stringify(userData.user));
    this.loggedIn = true;
    console.log(localStorage)
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token || '';
  }

  createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + (token ? token : ''));
    return headers;
  }

  getUserData(): User {
    const userData = localStorage.getItem('user');
    if(userData == null) this.router.navigate(['/login']);
    return userData ? JSON.parse(userData) : null;
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn = false;
  }

  signIn(username: string, password: string, name: string, matricule: string) {
    const data = {
      "username": username,
      "password": password,
      "name": name,
      "role": "student",
      "matricule": matricule
    }
    return this.http.post(this.uri + "/signup", data).pipe(
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        throw error;
      })
    );
  }


  // propriété pour savoir si l'utilisateur est connecté

  isEtudiant() {
    const userData = this.getUserData();
    if (userData.role === 'student') return true;
    else return false;
  }

  isProf() {
    const userData = this.getUserData();
    if (userData.role === 'prof') return true;
    else return false;
  }


  async isAdmin() {
    try {
        // Accès à la base de données ou à un service Web pour vérifier si l'utilisateur est authentifié et a le statut d'administrateur
        const isProfessor = this.isProf(); // Supposons que isProf est une fonction qui vérifie si l'utilisateur est un professeur
        
        if ( isProfessor) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
        throw error; // Propager l'erreur à l'appelant
    }
}

}
