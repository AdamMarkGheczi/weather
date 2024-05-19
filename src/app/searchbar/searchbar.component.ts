import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AutocompleteService } from '../services/autocomplete.service';
import { City } from '../../types';
import { MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'searchbar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit {
  constructor(
    private autoComplete: AutocompleteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {};
  
  formGroup: FormGroup = this.formBuilder.group({
    'CityName' : ['']
  });

  cities: City[] = [];

  initFormAutoComplete() {
    this.formGroup.get('CityName')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (this.suppressSearch || !value) {
          this.suppressSearch = false;
          return of([]);
        }
        return this.autoComplete.getMatchingCities(value);
      })
    )
    .subscribe(cities => {
      this.cities = cities;
    });
  }

  ngOnInit(): void {
    this.initFormAutoComplete();  
  }

  handleSearchButtonClick() {
    let query = this.formGroup.get('CityName')?.value;
    if (query !== '') {
      if(this.selectedCity && query == `${this.selectedCity.name}, ${this.selectedCity.region}, ${this.selectedCity.country}`)
        this.routeToWeatherPage(`id:${this.selectedCity.id}`);
      else 
        this.routeToWeatherPage(query);
    }
  }

  selectedCity?: City | null = null;
  suppressSearch: boolean = false;

  optionSelected() {
    this.suppressSearch = true;
    let query = this.formGroup.get('CityName')?.value;
    this.selectedCity = this.cities.find(city => `${city.name}, ${city.region}, ${city.country}` === query);
  }

  routeToWeatherPage(queryParam: string) {
    this.router.navigate(['/city/', queryParam]);
  }
  

}
