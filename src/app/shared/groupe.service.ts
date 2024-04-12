import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  getGroupe(): Observable<Groupe[]> {
    return this.http.get<Groupe[]>(this.url);
  }

  getGroupeById(id: string): Observable<Groupe> {
    return this.http.get<Groupe>(this.uriId + "/" + id);
  }

  addGroupe(groupe: Groupe): Observable<any> {
    console.log(groupe.nom, " groupe ajouté");
    return this.http.post<Groupe>(this.uri, groupe);
  }

  getGroupesPagines(page: number, limit: number, nom: string): Observable<any> {
    return this.http.get<Groupe[]>(this.uri + "?page=" + page + "&limit=" + limit + "&nom=" + nom);
  }

  getGroupesPaginesStudents(page: number, limit: number, nom: string, idStudent: string): Observable<any> {
    return this.http.get<Groupe[]>(this.uri + '/etudiant/' + idStudent + "?page=" + page + "&limit=" + limit + "&nom=" + nom);
  }

  addUsertoGroup(data: any): Observable<any> {
    return this.http.post<any>(this.uri + '/membre', data);
  }

  removeStudent(groupe: Groupe, user: User): Observable<any> {
    console.log('delete from groupe ' + groupe._id + ' user : ' + user.name);
    const payload = {
      groupId: groupe._id,
      studentIds: [user._id]
    };
    return this.http.delete(this.uri + "/membre", { body: payload });
  }
}
