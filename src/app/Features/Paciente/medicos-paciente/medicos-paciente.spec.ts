import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosPaciente } from './medicos-paciente';

describe('MedicosPaciente', () => {
  let component: MedicosPaciente;
  let fixture: ComponentFixture<MedicosPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicosPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosPaciente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
