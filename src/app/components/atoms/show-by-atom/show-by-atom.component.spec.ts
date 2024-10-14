import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowByAtomComponent } from './show-by-atom.component';

describe('ShowByAtomComponent', () => {
  let component: ShowByAtomComponent;
  let fixture: ComponentFixture<ShowByAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowByAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowByAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
