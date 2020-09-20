import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddressService {

    private url:string = "https://sample-app-7.herokuapp.com/"

    constructor(private httpClient: HttpClient) { }

    getStatesListByCountryId(countryId: number): Observable<any> {
        return this.httpClient.get(this.url + 'address/get/state/' + countryId);
    }

    getCitiesListByStateId(stateId: number): Observable<any> {
        return this.httpClient.get(this.url + 'address/get/city/' + stateId);
    }

    getStatesList(): Observable<any> {
        return this.httpClient.get(this.url + 'common/states');
    }

    getCountries(): Observable<any> {
        return this.httpClient.get(this.url + 'common/countries');
    }

    getCountriesAndStatesList(): Observable<any> {
        return this.httpClient.get(this.url + 'common/countries-and-states');
    }

}