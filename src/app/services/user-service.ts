import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignupDetails, UserDetails } from '../interfaces/UserDetails';

@Injectable()
export class UserService {

    private url:string = "https://sample-app-7.herokuapp.com/"

    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<any> {
        return this.httpClient.get(this.url + 'users/all');
    }

    getAllUsersOnRole(role: number): Observable<any> {
        return this.httpClient.get(this.url + 'users/get/allusers/role/' + role);
    }

    getUserById(userId: number): Observable<any> {
        return this.httpClient.get(this.url + 'users/' + userId);
    }

    saveUser(userDetails: UserSignupDetails): Observable<any> {
        return this.httpClient.post(this.url + 'users/save', userDetails, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

    saveSettings(userDetails: UserDetails): Observable<any> {
        return this.httpClient.post(this.url + 'users/save', userDetails, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };
}