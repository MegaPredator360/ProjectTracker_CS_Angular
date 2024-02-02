import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaUsuarioModalComponent } from './tarea-usuario-modal.component';

describe('TareaUsuarioModalComponent', () => {
  let component: TareaUsuarioModalComponent;
  let fixture: ComponentFixture<TareaUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaUsuarioModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
