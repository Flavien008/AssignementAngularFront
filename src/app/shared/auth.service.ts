import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = environment.baseUrl;
  loggedIn = false;

  constructor(private http: HttpClient) { }

  logIn(username: string, password: string): Observable<any> {
    const data = {
      "username" : username,
      "password" : password
    }
    console.log(data);
    return this.http.post(this.uri+"/login", data).pipe(
      tap(response => this.storeUserData(response)),
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        throw error;
      })
    );
  }

  private storeUserData(userData: any): void {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user)); 
    this.loggedIn = true;
    console.log(localStorage)
  }

  getUserData(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn = false;
  }

  signIn(username: string, password : string, name : string, matricule : string){
    const data = {
      "username" : username,
      "password" : password,
      "name" : name,
      "matricule" : matricule
    }
    return this.http.post(this.uri+"/signup", data).pipe(
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        throw error;
      })
    );
  }

  
  // propriété pour savoir si l'utilisateur est connecté



  
  isAdmin() {
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      resolve(this.loggedIn);
      // pas de cas d'erreur ici, donc pas de reject
    });

    return promesse;
  }
}
