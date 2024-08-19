import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTareaUsuarioComponent } from './modal-tarea-usuario.component';

describe('ModalTareaUsuarioComponent', () => {
  let component: ModalTareaUsuarioComponent;
  let fixture: ComponentFixture<ModalTareaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTareaUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTareaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
