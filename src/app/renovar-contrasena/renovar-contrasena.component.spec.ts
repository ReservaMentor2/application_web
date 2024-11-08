import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarContrasenaComponent } from './renovar-contrasena.component';

describe('RenovarContrasenaComponent', () => {
  let component: RenovarContrasenaComponent;
  let fixture: ComponentFixture<RenovarContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovarContrasenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenovarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
