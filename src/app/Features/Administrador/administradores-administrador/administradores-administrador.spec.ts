import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresAdministrador } from './administradores-administrador';

describe('AdministradoresAdministrador', () => {
  let component: AdministradoresAdministrador;
  let fixture: ComponentFixture<AdministradoresAdministrador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradoresAdministrador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradoresAdministrador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
