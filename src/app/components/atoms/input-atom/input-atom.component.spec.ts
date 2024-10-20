import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputAtomComponent } from './input-atom.component';
import { FormsModule } from '@angular/forms';
import {
  DISABLED_STATE,
  EMPTY_STRING,
  INPUT_DEFAULT_SIZE,
  INPUT_DEFAULT_STATE,
  INPUT_DEFAULT_TYPE,
  INPUT_LABEL_SIZE_PREFIX,
  INPUT_SIZE_PREFIX,
  INPUT_STATE_PREFIX,
} from '@constants/atom-constants';
import { InputSize, InputState, InputType } from '@customTypes/enums'; // Asegúrate de que la ruta es correcta

describe('InputAtomComponent', () => {
  let component: InputAtomComponent;
  let fixture: ComponentFixture<InputAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [InputAtomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputAtomComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.size).toBe(INPUT_DEFAULT_SIZE);
    expect(component.state).toBe(INPUT_DEFAULT_STATE);
    expect(component.type).toBe(INPUT_DEFAULT_TYPE);
    expect(component.placeholder).toBe(EMPTY_STRING);
    expect(component.label).toBe(EMPTY_STRING);
    expect(component.value).toBe(EMPTY_STRING);
  });

  it('should set styles correctly on initialization', () => {
    component.size = 'm'; // Asegúrate de que este valor es un InputSize válido
    component.state = 'active'; // Este valor debe ser exactamente 'active' o 'disabled'
    component.ngOnInit();

    expect(component.styles).toContain(`${INPUT_SIZE_PREFIX}${component.size}`);
    expect(component.styles).toContain(`${INPUT_STATE_PREFIX}${component.state}`);
  });

  it('should set disabled state correctly', () => {
    component.state = 'disabled'; // Este valor debe ser exactamente 'disabled'
    component.ngOnInit();

    expect(component.disabled).toBe(DISABLED_STATE);
  });

  it('should write value correctly', () => {
    const testValue = 'Test Value';
    component.writeValue(testValue);

    expect(component.value).toBe(testValue);
  });

  it('should register onChange callback', () => {
    const callback = jest.fn();
    component.registerOnChange(callback);
    
    expect(component.onChange).toBe(callback);
  });

  it('should register onTouched callback', () => {
    const callback = jest.fn();
    component.registerOnTouched(callback);
    
    expect(component.onTouched).toBe(callback);
  });

  it('should call onChange when input changes', () => {
    const testValue = 'New Value';
    const callback = jest.fn();
    component.registerOnChange(callback);

    component.onInput(testValue);

    expect(component.value).toBe(testValue);
    expect(callback).toHaveBeenCalledWith(testValue);
  });
});