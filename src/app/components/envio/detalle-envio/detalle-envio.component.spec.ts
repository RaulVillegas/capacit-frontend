import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEnvioComponent } from './detalle-envio.component';

describe('DetalleEnvioComponent', () => {
  let component: DetalleEnvioComponent;
  let fixture: ComponentFixture<DetalleEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
