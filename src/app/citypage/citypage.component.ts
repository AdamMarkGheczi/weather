import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeathercardComponent } from '../weathercard/weathercard.component';
import { CurrentweatherbarComponent } from '../currentweatherbar/currentweatherbar.component';
import { ServiceReturnObject } from '../../types';
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

  response: ServiceReturnObject | null = null;

  freeToLoad = false;
  cityNotFound = false;

  ngOnInit(): void {
    let query = this.route.snapshot.params['query'];
    this.cityWeatherService.getForecast(query)
      .subscribe((response => this.setRepsonse(response)));
  }

  setRepsonse(response: any) {
    this.response = response as ServiceReturnObject;
    if('error'in response) this.cityNotFound = true;
    this.freeToLoad = true;
  }

}
