import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../matiere/matiere.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Donut } from '../matiere/donut.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri = environment.baseUrl+"/matiere";
  headers : any;
  constructor(private http:HttpClient, private auth: AuthService) {
    this.headers = this.auth.createAuthorizationHeader();
  }

  getMatiere():Observable<Matiere[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Matiere[]>(this.uri,{ headers: this.headers });
  }

  getStatistiqueParMatiere():Observable<Donut[]> {
    this.headers = this.auth.createAuthorizationHeader();
    return this.http.get<Donut[]>(this.uri+"/statistique",{ headers: this.headers });
  }

}
