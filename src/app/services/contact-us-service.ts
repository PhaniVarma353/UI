import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactusRequest } from '../interfaces/ContactusDetails';

@Injectable()
export class ContactusService {

    private url:string = "https://sample-app-7.herokuapp.com/"

    constructor(private httpClient: HttpClient) { }

    getProjectProperties(): Observable<any> {
        return this.httpClient.get(this.url + 'contactus/get-all');
    }

    saveNotes(projectProperties: ContactusRequest): Observable<any> {
        return this.httpClient.post(this.url + 'contactus/save', projectProperties, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

}