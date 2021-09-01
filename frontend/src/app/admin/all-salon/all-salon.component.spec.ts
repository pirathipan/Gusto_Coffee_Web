import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSalonComponent } from './all-salon.component';

describe('AllSalonComponent', () => {
  let component: AllSalonComponent;
  let fixture: ComponentFixture<AllSalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSalonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
