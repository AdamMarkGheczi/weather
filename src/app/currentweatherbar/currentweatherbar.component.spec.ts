import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentweatherbarComponent } from './currentweatherbar.component';

describe('CurrentweatherbarComponent', () => {
  let component: CurrentweatherbarComponent;
  let fixture: ComponentFixture<CurrentweatherbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentweatherbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentweatherbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
