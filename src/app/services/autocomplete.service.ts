import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { City } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private apiService: ApiService) { }

  getMatchingCities(query: string): Observable<City[]> {
    return this.apiService.getSearchSuggestions(query).pipe(
      map(response => {
        return response.map(cityData => {
          const { name, region } = cityData;
          return { name, region } as City;
        });
      })
    )
  }

}
