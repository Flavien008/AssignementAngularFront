import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../matiere/matiere.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Donut } from '../matiere/donut.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  uri = environment.baseUrl+"/matiere";

  constructor(private http:HttpClient) { }

  getMatiere():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }

  getStatistiqueParMatiere():Observable<Donut[]> {
    return this.http.get<Donut[]>(this.uri+"/statistique");
  }

}
