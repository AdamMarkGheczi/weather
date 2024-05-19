import { Component, Input } from '@angular/core';
import { HourWeather } from '../../types';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-hourweathertable',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe
  ],
  templateUrl: './hourweathertable.component.html',
  styleUrl: './hourweathertable.component.scss'
})
export class HourweathertableComponent {
  @Input({required:true}) hourTable!: HourWeather[];

  displayedColumns: string[] = ['time', 'icon', 'condition', 'temp_c', 'feelslike_c', 'humidity', 'chance_of_rain', 'precip_mm', 'chance_of_snow', 'wind_kph', 'wind_dir', 'uv'];
}
