import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalAtomComponent } from './app-modal-atom.component';

describe('AppModalAtomComponent', () => {
  let component: AppModalAtomComponent;
  let fixture: ComponentFixture<AppModalAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppModalAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModalAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
