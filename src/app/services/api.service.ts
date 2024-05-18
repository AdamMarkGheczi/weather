import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { City, SearchInfo, LargeApiReturnObject, ApiErrorObject } from '../../types';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private baseUrl = `https://api.weatherapi.com/v1`;
  
  getSearchSuggestions(q:string): Observable<City[]> {
    let requestUrl = `${this.baseUrl}/search.json?key=${environment.API_KEY}&q=${q}`;
    return this.httpClient.get<SearchInfo[]>(requestUrl, { responseType: 'json' }) ;
  }
  
  getForecast(q: string): Observable<LargeApiReturnObject | ApiErrorObject> {
    let requestUrl = `${this.baseUrl}/forecast.json?key=${environment.API_KEY}&q=${q}&days=3`;
    return this.httpClient.get<LargeApiReturnObject>(requestUrl, { responseType: 'json' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.warn("Could not find city");
        return of({
          error: {
            code: error.status,
            message: error.message,
          },
        } as ApiErrorObject);
      })
    );
  }
  


  // getHistory<T>(url: string, options: Options): Observable<T> {
  //   return this.httpClient.get<T>(url, options) as Observable<T>;
  // }

}


