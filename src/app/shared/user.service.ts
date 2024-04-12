import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../login/user.model';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    uri = environment.baseUrl;
    constructor(private http: HttpClient) { }

    getStudentInGroups(page:number, limit:number,groupId: string,filtre:string): Observable<any> {
        return this.http.get<User>(this.uri+`/etudiants/in-group?page=${page}&limit=${limit}&idgroupe=${groupId}&filtre=${filtre}`);
    }

    getStudentNotInGroups(page:number, limit:number,groupId: string,filtre:string): Observable<any> {
        return this.http.get<User>(this.uri+`/etudiants/not-in-group?page=${page}&limit=${limit}&idgroupe=${groupId}&filtre=${filtre}`);
    }
}
