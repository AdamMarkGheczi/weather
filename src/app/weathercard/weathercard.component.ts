import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgIf } from '@angular/common';
import { DailyAverageWithDate } from '../../types';

@Component({
  selector: 'app-weathercard',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './weathercard.component.html',
  styleUrl: './weathercard.component.scss'
})
export class WeathercardComponent {
  @Input({required: true}) dailyWeatherObject!: DailyAverageWithDate;

  click() {
    console.log("I HAVE BEEN CLICKED");
  }
}
