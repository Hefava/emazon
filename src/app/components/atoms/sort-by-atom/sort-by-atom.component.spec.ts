import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByAtomComponent } from './sort-by-atom.component';

describe('SortByAtomComponent', () => {
  let component: SortByAtomComponent;
  let fixture: ComponentFixture<SortByAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortByAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortByAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
