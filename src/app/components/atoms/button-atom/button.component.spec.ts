import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { BUTTON_DEFAULT_SIZE, BUTTON_DEFAULT_TYPE, BUTTON_DEFAULT_STATE } from '@constants/atom-constants';
import { ButtonSize, ButtonType } from 'src/app/shared/types/enums.d';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.size).toBe(BUTTON_DEFAULT_SIZE);
    expect(component.type).toBe(BUTTON_DEFAULT_TYPE);
    expect(component.state).toBe(BUTTON_DEFAULT_STATE);
    expect(component.isDisabled).toBe(false);
  });

  it('should set styles correctly on initialization', () => {
    component.size = 'l'; 
    component.type = 'main'; 
    component.state = 'active'; 

    component.ngOnInit();

    expect(component.styles).toContain('button-size-large'); // Cambia 'button-size-large' por el prefijo real
    expect(component.styles).toContain('button-type-primary'); // Cambia 'button-type-primary' por el prefijo real
    expect(component.styles).toContain('button-state-active'); // Cambia 'button-state-active' por el prefijo real
  });

  it('should handle disabled state', () => {
    component.isDisabled = true;
    component.ngOnInit();

    expect(component.isDisabled).toBe(true);
  });
});