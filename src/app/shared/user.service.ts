import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../login/user.model';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    uri = environment.baseUrl;
    headers: any;
    constructor(private http: HttpClient, private auth: AuthService) {
        this.headers = this.auth.createAuthorizationHeader();
    }

    getStudentInGroups(page: number, limit: number, groupId: string, filtre: string): Observable<any> {
        this.headers = this.auth.createAuthorizationHeader();
        return this.http.get<User>(this.uri + `/etudiants/in-group?page=${page}&limit=${limit}&idgroupe=${groupId}&filtre=${filtre}`, { headers: this.headers });
    }

    getStudentNotInGroups(page: number, limit: number, groupId: string, filtre: string): Observable<any> {
        this.headers = this.auth.createAuthorizationHeader();
        return this.http.get<User>(this.uri + `/etudiants/not-in-group?page=${page}&limit=${limit}&idgroupe=${groupId}&filtre=${filtre}`, { headers: this.headers });
    }
}
