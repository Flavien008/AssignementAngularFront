import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../matiere/matiere.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Donut } from '../matiere/donut.model';
import { AuthService } from './auth.service';
import { User } from '../login/user.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri = environment.baseUrl + "/matiere";
  uriprof = environment.baseUrl + "/allprofs";
  headers: any;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.headers = this.auth.createAuthorizationHeader();
  }

  getMatiere(): Observable<Matiere[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Matiere[]>(this.uri + "s", { headers: this.headers });
  }

  getStatistiqueParMatiere(): Observable<Donut[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Donut[]>(this.uri + "/statistique", { headers: this.headers });
  }

  getProfsPagines(page: number, limit: number, nom: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<User[]>(this.uriprof + "?page=" + page + "&limit=" + limit + "&nom=" + nom, { headers: this.headers });
  }

  getProfs(): Observable<User[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<User[]>(this.uriprof, { headers: this.headers });
  }
  addMatiere(matiere: Matiere): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    console.log(matiere.nom, " groupe ajouté");
    return this.http.post<Matiere>(this.uri, matiere, { headers: this.headers });
  }

  getMatierePagines(page: number, limit: number, nom: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Matiere[]>(this.uri + "?page=" + page + "&limit=" + limit + "&nom=" + nom, { headers: this.headers });
  }

}
