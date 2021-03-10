import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AviablebooksComponent } from './aviablebooks.component';

describe('AviablebooksComponent', () => {
  let component: AviablebooksComponent;
  let fixture: ComponentFixture<AviablebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AviablebooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AviablebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
