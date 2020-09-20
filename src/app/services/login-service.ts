import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignupDetails } from '../interfaces/UserDetails';
import { UserInfo } from '../interfaces/User';
import { ResetPasswordDetails } from '../interfaces/ResetPasswordDetails';
import { ChangePasswordRequest } from '../interfaces/ChangePasswordDetails';

@Injectable()
export class LoginService {

    private url:string = "https://sample-app-7.herokuapp.com/"

    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<any> {
        return this.httpClient.get(this.url + 'users/all');
    }

    authenticateUserLogin(userDetails: UserInfo): Observable<any> {
        return this.httpClient.post('app/login/authenticate', userDetails, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

    resetUserLogin(userDetails: ResetPasswordDetails): Observable<any> {
        return this.httpClient.post(this.url + 'app/login/reset-password', userDetails, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

    changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any> {
        return this.httpClient.post(this.url + 'app/login/change-password', changePasswordRequest, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };
}