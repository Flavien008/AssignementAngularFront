import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Groupe } from '../groupe/goupe.model';
import { Observable } from 'rxjs';
import { User } from '../login/user.model';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  uri = environment.baseUrl + "/groupes";
  uriId = environment.baseUrl + "/groupe";
  url = environment.baseUrl + "/groupesAll";
  headers: any;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.headers = this.auth.createAuthorizationHeader();
  }

  getGroupe(): Observable<Groupe[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Groupe[]>(this.url,{ headers: this.headers });
  }

  getGroupeById(id: string): Observable<Groupe> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Groupe>(this.uriId + "/" + id,{ headers: this.headers });
  }

  addGroupe(groupe: Groupe): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    console.log(groupe.nom, " groupe ajouté");
    return this.http.post<Groupe>(this.uri, groupe,{ headers: this.headers });
  }

  getGroupesPagines(page: number, limit: number, nom: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Groupe[]>(this.uri + "?page=" + page + "&limit=" + limit + "&nom=" + nom, { headers: this.headers });
  }

  getGroupesPaginesStudents(page: number, limit: number, nom: string, idStudent: string): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Groupe[]>(this.uri + '/etudiant/' + idStudent + "?page=" + page + "&limit=" + limit + "&nom=" + nom,{ headers: this.headers });
  }

  addUsertoGroup(data: any): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.post<any>(this.uri + '/membre', data,{ headers: this.headers });
  }

  removeStudent(groupe: Groupe, user: User): Observable<any> {
    this.headers = this.auth.createAuthorizationHeader();
    console.log('delete from groupe ' + groupe._id + ' user : ' + user.name,{ headers: this.headers });
    const payload = {
      groupId: groupe._id,
      studentIds: [user._id]
    };
    return this.http.delete(this.uri + "/membre", { body: payload,headers: this.headers });
  }
}
