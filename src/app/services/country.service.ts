import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Country, ICountry } from '../components/checkout/models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<ICountry[]> {
    return this.httpClient.get('/assets/countries.json').pipe(
      switchMap((countries: []) => {
        return of(countries.map((country) => new Country(country)));
      }),
    );
  }
}
