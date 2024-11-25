import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExcluirComponent } from './popup-excluir.component';

describe('PopupExcluirComponent', () => {
  let component: PopupExcluirComponent;
  let fixture: ComponentFixture<PopupExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupExcluirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
