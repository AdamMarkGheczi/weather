import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AutocompleteService } from '../services/autocomplete.service';
import { City } from '../../types';
import { MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
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
    )
    .subscribe((value) => {
      if(!!value === false) 
        this.cities = [];
      else
        this.autoComplete.getMatchingCities(value)
        .subscribe((cities => {this.cities = cities}));
    });

  }

  ngOnInit(): void {
    this.initFormAutoComplete();  
  }

  handleSearchButtonClick() {
    let query = this.formGroup.get('CityName')?.value;
    if (query !== '') {
      let selectedCityId = this.cities.find(city => `${city.name}, ${city.region}` === query)?.id;

      if(!!selectedCityId) {
        this.routeToWeatherPage(`id:${selectedCityId}`);
      } else{
        this.routeToWeatherPage(query);
      }
    }
  }

  routeToWeatherPage(queryParam: string) {
    this.router.navigate(['/city/', queryParam]);
  }
  

}
