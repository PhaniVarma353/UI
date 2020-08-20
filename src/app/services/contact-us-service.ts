import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactusRequest } from '../interfaces/ContactusDetails';

@Injectable()
export class ContactusService {

    constructor(private httpClient: HttpClient) { }

    getProjectProperties(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/contactus/get-all');
    }

    saveNotes(projectProperties: ContactusRequest): Observable<any> {
        return this.httpClient.post('http://localhost:7077/contactus/save', projectProperties, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

}