import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignupDetails, UserDetails } from '../interfaces/UserDetails';
import { ProjectPropertiesRequest } from '../interfaces/ProjectProperties';

@Injectable()
export class ProjectPropertiesService {

    constructor(private httpClient: HttpClient) { }

    getProjectProperties(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/common/getproperties');
    }

    getCountriesAndStatesList(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/common/countries-and-states');
    }

    getStatesList(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/common/states');
    }

    getCountries(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/common/countries');
    }

    saveProperties(projectProperties: ProjectPropertiesRequest): Observable<any> {
        return this.httpClient.post('http://localhost:7077/project-properties/save', projectProperties, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    };

}