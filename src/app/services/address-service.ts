import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddressService {

    constructor(private httpClient: HttpClient) { }

    getStatesListByCountryId(countryId: number): Observable<any> {
        return this.httpClient.get('http://localhost:7077/address/get/state/' + countryId);
    }

    getCitiesListByStateId(stateId: number): Observable<any> {
        return this.httpClient.get('http://localhost:7077/address/get/city/' + stateId);
    }

    getStatesList(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/common/states');
    }

    getCountries(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/common/countries');
    }

    getCountriesAndStatesList(): Observable<any> {
        return this.httpClient.get('http://localhost:7077/common/countries-and-states');
    }

}