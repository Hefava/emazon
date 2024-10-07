import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollAtomComponent } from './scroll-atom.component';

describe('ScrollAtomComponent', () => {
  let component: ScrollAtomComponent;
  let fixture: ComponentFixture<ScrollAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
