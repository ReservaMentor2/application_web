import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentoriaPaginaComponent } from './mentoria-pagina.component';

describe('MentoriaPaginaComponent', () => {
  let component: MentoriaPaginaComponent;
  let fixture: ComponentFixture<MentoriaPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentoriaPaginaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentoriaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
