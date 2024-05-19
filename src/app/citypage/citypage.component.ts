import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeathercardComponent } from '../weathercard/weathercard.component';
import { CurrentweatherbarComponent } from '../currentweatherbar/currentweatherbar.component';
import { HourWeather, ServiceReturnObject } from '../../types';
import { CityweatherService } from '../services/cityweather.service';
import { NgIf, NgFor } from '@angular/common';
import { HourweathertableComponent } from '../hourweathertable/hourweathertable.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-citypage',
  standalone: true,
  imports: [
    WeathercardComponent,
    CurrentweatherbarComponent,
    HourweathertableComponent,
    MatButtonModule,
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

  hourViewToggle:boolean = false;
  
  hourViewObjectArray?: HourWeather[];

  enableHourView(index:number){
    this.hourViewToggle = true;
    this.hourViewObjectArray = this.response?.forecast[index].hour;
  }

  disableHourView() {
    this.hourViewToggle = false;
  }

}
