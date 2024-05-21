
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})
export class MailService {
    uri = environment.baseUrl + "/sendmail";
    headers: any;
    constructor(private http: HttpClient, private auth: AuthService) {
        this.headers = this.auth.createAuthorizationHeader();
    }

    sendMail(data: any) {
        this.headers = this.auth.createAuthorizationHeader();
        return this.http.post(this.uri, data, { headers: this.headers });
    }


}
