import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPaciente } from './citas-paciente';

describe('CitasPaciente', () => {
  let component: CitasPaciente;
  let fixture: ComponentFixture<CitasPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasPaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
