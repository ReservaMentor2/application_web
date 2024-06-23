import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMentoriaComponent } from './detalles-mentoria.component';

describe('DetallesMentoriaComponent', () => {
  let component: DetallesMentoriaComponent;
  let fixture: ComponentFixture<DetallesMentoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesMentoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesMentoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
