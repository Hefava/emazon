import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationAtomComponent } from './notification-atom.component';
import {
  NOTIFICATION_DEFAULT_TYPE,
  NOTIFICATION_DEFAULT_MESSAGE,
  NOTIFICATION_DEFAULT_WIDTH,
  NOTIFICATION_DEFAULT_HEIGHT,
  NOTIFICATION_DEFAULT_OPACITY,
  NOTIFICATION_DEFAULT_TOP,
  NOTIFICATION_DEFAULT_LEFT,
  NOTIFICATION_DEFAULT_SHOW,
  NOTIFICATION_TYPE_PREFIX
} from '@constants/atom-constants';

describe('NotificationAtomComponent', () => {
  let component: NotificationAtomComponent;
  let fixture: ComponentFixture<NotificationAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationAtomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationAtomComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.type).toBe(NOTIFICATION_DEFAULT_TYPE);
    expect(component.message).toBe(NOTIFICATION_DEFAULT_MESSAGE);
    expect(component.width).toBe(NOTIFICATION_DEFAULT_WIDTH);
    expect(component.height).toBe(NOTIFICATION_DEFAULT_HEIGHT);
    expect(component.opacity).toBe(NOTIFICATION_DEFAULT_OPACITY);
    expect(component.top).toBe(NOTIFICATION_DEFAULT_TOP);
    expect(component.left).toBe(NOTIFICATION_DEFAULT_LEFT);
    expect(component.show).toBe(NOTIFICATION_DEFAULT_SHOW);
  });

  it('should set notificationClass correctly on initialization', () => {
    component.type = 'Success'; // Cambia el tipo a un valor válido
    component.ngOnInit();

    expect(component.notificationClass).toBe(`${NOTIFICATION_TYPE_PREFIX}success`);
  });

  it('should set notificationClass correctly for different types', () => {
    const types: Array<'Error' | 'Warning' | 'Success' | 'Inform'> = ['Error', 'Warning', 'Success', 'Inform'];

    for (const type of types) {
      component.type = type;
      component.ngOnInit();
      expect(component.notificationClass).toBe(`${NOTIFICATION_TYPE_PREFIX}${type.toLowerCase()}`);
    }
  });

  it('should correctly handle custom input values', () => {
    component.type = 'Error'; // Asigna un tipo válido
    component.message = 'This is an error message.';
    component.width = '300px';
    component.height = '100px';
    component.opacity = '0.9';
    component.top = '10px';
    component.left = '20px';
    component.show = true;

    component.ngOnInit();

    expect(component.type).toBe('Error');
    expect(component.message).toBe('This is an error message.');
    expect(component.width).toBe('300px');
    expect(component.height).toBe('100px');
    expect(component.opacity).toBe('0.9');
    expect(component.top).toBe('10px');
    expect(component.left).toBe('20px');
    expect(component.show).toBe(true);
  });

  it('should handle the show property', () => {
    component.show = true;
    expect(component.show).toBe(true);

    component.show = false;
    expect(component.show).toBe(false);
  });
});