import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosAdministrador } from './medicos-administrador';

describe('MedicosAdministrador', () => {
  let component: MedicosAdministrador;
  let fixture: ComponentFixture<MedicosAdministrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicosAdministrador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosAdministrador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
