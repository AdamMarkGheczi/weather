import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourweathertableComponent } from './hourweathertable.component';

describe('HourweathertableComponent', () => {
  let component: HourweathertableComponent;
  let fixture: ComponentFixture<HourweathertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourweathertableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourweathertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
