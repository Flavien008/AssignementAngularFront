import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../matiere/matiere.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri = environment.baseUrl+"/matiere";

  constructor(private http:HttpClient) { }

  getMatiere():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }

}
