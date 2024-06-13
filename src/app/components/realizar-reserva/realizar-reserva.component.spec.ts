import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarReservaComponent } from './realizar-reserva.component';

describe('RealizarReservaComponent', () => {
  let component: RealizarReservaComponent;
  let fixture: ComponentFixture<RealizarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
