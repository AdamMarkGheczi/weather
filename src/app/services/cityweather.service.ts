import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { ApiErrorObject, HourWeather, LargeApiReturnObject, ServiceReturnObject } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CityweatherService {

  constructor(private apiService: ApiService) { }

  convertToServiceObject(apiObject: LargeApiReturnObject): ServiceReturnObject {

    
    let forecastArray = apiObject.forecast.forecastday.map( (f) => {
      let obj = {
        day: Object.assign({date: f.date}, f.day),
        hour: f.hour.map((snapshot:HourWeather) => {
          let temp:HourWeather = snapshot;
          temp.condition.icon = '../../assets' + temp.condition.icon.split('.com')[1];
          return temp;
        })
      };
      
      obj.day.condition.icon = '../../assets' +  obj.day.condition.icon.split('.com')[1]; 
      return obj;
    }
    )
    return {
      location: [apiObject.location.name, apiObject.location.region, apiObject.location.country].filter(Boolean).join(", "),
      current: apiObject.current,
      forecast: forecastArray
    };
  }

  getForecast(query: string): Observable<ApiErrorObject | ServiceReturnObject> {
    return this.apiService.getForecast(query).pipe(
      map(response => 'error' in response ? response : this.convertToServiceObject(response))
    )
  }
}



