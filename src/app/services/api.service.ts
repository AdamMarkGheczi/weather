import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { City, SearchInfo } from '../../types';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

// https://api.weatherapi.com/v1/current.json?q=diosi&lang=hu&key=826ebfec371d456a88f85216241105


  private baseUrl = `https://api.weatherapi.com/v1`;
  
  
  
  getSearchSuggestions(q:string): Observable<City[]> {
    let requestUrl = `${this.baseUrl}/search.json?key=${environment.API_KEY}&q=${q}`;
    return this.httpClient.get<SearchInfo[]>(requestUrl, { responseType: 'json' }) ;
  }



  // getForecast<T>(url: string, options: Options): Observable<T> {
  //   return this.httpClient.get<T>(url, options) as Observable<T>;
  // }
  // getHistory<T>(url: string, options: Options): Observable<T> {
  //   return this.httpClient.get<T>(url, options) as Observable<T>;
  // }
  // getCurrent<T>(url: string, options: Options): Observable<T> {
  //  let requestUrl = `${this.baseUrl}/current.json?key=${environment.API_KEY}&q=${q}`;
  //  if (lang ?? false) requestUrl += `&lang=${lang}`;
  //   return this.httpClient.get<T>(url, options) as Observable<T>;
  // }
}


/*

  getSearchSuggestions(q:string): Observable<City> {
    let requestUrl = `${this.baseUrl}/search.json?key=${environment.API_KEY}&q=${q}`;

    return this.httpClient.get(requestUrl, {responseType: 'json' }) .pipe(
        map(response => {
          // Extract only the name and region from the response
          const { name, region } = (response as Array<Object>)[0] as City; // Adjust this based on the actual structure of the response
    
          console.log((response ));

          // Create a City object with the extracted information
          const city: City = {
            name: name,
            region: region
          };
    
          return city ;
        })
      ) as Observable<City>;
  }

*/