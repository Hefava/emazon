import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './app-modal-atom.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when closeModal is called', () => {
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should receive notification input and display it correctly', () => {
    const mockNotification = {
      show: true,
      type: 'Success' as 'Success' | 'Error' | 'Warning' | 'Inform', 
      message: 'Operation was successful!',
    };

    component.notification = mockNotification;
    fixture.detectChanges();

    expect(component.notification).toEqual(mockNotification);
  });

  it('should not display the notification if it is null', () => {
    component.notification = null;
    fixture.detectChanges();

    expect(component.notification).toBeNull();
  });
});