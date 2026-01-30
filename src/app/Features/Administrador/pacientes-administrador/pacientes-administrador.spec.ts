import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesAdministrador } from './pacientes-administrador';

describe('PacientesAdministrador', () => {
  let component: PacientesAdministrador;
  let fixture: ComponentFixture<PacientesAdministrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesAdministrador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesAdministrador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
