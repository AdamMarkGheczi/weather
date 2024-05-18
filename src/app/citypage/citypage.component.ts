import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeathercardComponent } from '../weathercard/weathercard.component';
import { CurrentweatherbarComponent } from '../currentweatherbar/currentweatherbar.component';
import { CurrentWeather, ServiceReturnObject } from '../../types';
import { CityweatherService } from '../services/cityweather.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-citypage',
  standalone: true,
  imports: [
    WeathercardComponent,
    CurrentweatherbarComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './citypage.component.html',
  styleUrl: './citypage.component.scss'
})
export class CitypageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cityWeatherService: CityweatherService
  ) {}

  dummycurrentweather: CurrentWeather  = {
    last_updated: '2024-05-18 18:00',
    temp_c: 15,
    feelslike_c: 15,
    condition: {
      text: 'sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    },
    humidity: 15,
    wind_kph: 15,
    wind_dir: 'ENE',
    precip_mm: 15,
    uv: 1
  }

  data = ""
  response: ServiceReturnObject | null = null;

  freeToLoad = false;
  cityNotFound = false;

  ngOnInit(): void {
    this.data = this.route.snapshot.params['query'];
    this.cityWeatherService.getForecast(this.data)
      .subscribe((response => this.setRepsonse(response)));
  }

  setRepsonse(response: any) {
    this.response = response as ServiceReturnObject;
    if('error'in response) this.cityNotFound = true;
    this.freeToLoad = true;
  }

}
