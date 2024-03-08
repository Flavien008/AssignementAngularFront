import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Groupe } from '../groupe/goupe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  uri = environment.baseUrl+"/groupes";
  constructor(private http:HttpClient) { }
  
  getGroupe():Observable<Groupe[]> {
    return this.http.get<Groupe[]>(this.uri);
  }
}
