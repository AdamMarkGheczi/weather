import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather } from '../../types';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-currentweatherbar',
  standalone: true,
  imports: [
    DatePipe,
  ],
  templateUrl: './currentweatherbar.component.html',
  styleUrl: './currentweatherbar.component.scss'
})
export class CurrentweatherbarComponent implements OnInit {
  @Input({required: true}) currentWeatherObject!: CurrentWeather;
  @Input({required: true}) location!: string;

  ngOnInit(): void {
    this.currentWeatherObject.condition.icon = '../../assets' +  this.currentWeatherObject.condition.icon.split('.com')[1]; 
  }

  
}
