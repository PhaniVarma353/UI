import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { UserDetails } from 'src/app/interfaces/User';

@Injectable({
    providedIn: 'root'
})
export class LoginUtilityService {
    private userLoginData = new BehaviorSubject<any>('');

    getUserLoginData$(): Observable<UserDetails> {
        return this.userLoginData.asObservable();
    }
    setUserLoginData(userDetails: UserDetails): void {
        this.userLoginData.next(userDetails);
    }
    clearUserLoginData() {
        this.userLoginData = new BehaviorSubject<any>('');
    }
}