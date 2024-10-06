import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAtomComponent } from './notification-atom.component';

describe('NotificationAtomComponent', () => {
  let component: NotificationAtomComponent;
  let fixture: ComponentFixture<NotificationAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
