import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignupDetails, UserDetails } from '../interfaces/UserDetails';
import { ProjectPropertiesRequest } from '../interfaces/ProjectProperties';

@Injectable()
export class ProjectPropertiesService {

    private url:string = "https://sample-app-7.herokuapp.com/"

    constructor(private httpClient: HttpClient) { }

    getProjectProperties(): Observable<any> {
        return this.httpClient.get(this.url + 'common/getproperties');
    }

    getCountriesAndStatesList(): Observable<any> {
        return this.httpClient.get(this.url + 'common/countries-and-states');
    }

    getStatesList(): Observable<any> {
        return this.httpClient.get(this.url + 'common/states');
    }

    getCountries(): Observable<any> {
        return this.httpClient.get(this.url + 'common/countries');
    }

    saveProperties(projectProperties: ProjectPropertiesRequest): Observable<any> {
        return this.httpClient.post(this.url + 'project-properties/save', projectProperties, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

}