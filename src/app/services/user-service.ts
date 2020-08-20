import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignupDetails, UserDetails } from '../interfaces/UserDetails';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/users/all');
    }

    getAllUsersOnRole(role: number): Observable<any> {
        return this.httpClient.get('http://localhost:7077/users/get/allusers/role/' + role);
    }

    getUserById(userId: number): Observable<any> {
        return this.httpClient.get('http://localhost:7077/users/' + userId);
    }

    saveUser(userDetails: UserSignupDetails): Observable<any> {
        return this.httpClient.post('http://localhost:7077/users/save', userDetails, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

    saveSettings(userDetails: UserDetails): Observable<any> {
        return this.httpClient.post('http://localhost:7077/users/save', userDetails, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };
}