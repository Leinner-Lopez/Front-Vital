import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAdministrador } from './citas-administrador';

describe('CitasAdministrador', () => {
  let component: CitasAdministrador;
  let fixture: ComponentFixture<CitasAdministrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasAdministrador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasAdministrador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
