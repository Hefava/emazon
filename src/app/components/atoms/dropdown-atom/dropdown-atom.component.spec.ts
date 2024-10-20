import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownAtomComponent } from './dropdown-atom.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DropdownSize, DropdownState } from '@customTypes/enums'; // Asegúrate de que la ruta sea correcta
import { EMPTY_STRING, DROPDOWN_SIZE_PREFIX, DROPDOWN_STATE_PREFIX } from '@constants/atom-constants';

describe('DropdownAtomComponent', () => {
  let component: DropdownAtomComponent;
  let fixture: ComponentFixture<DropdownAtomComponent>;
  let mockElementRef: ElementRef;

  beforeEach(async () => {
    mockElementRef = new ElementRef(document.createElement('div'));

    await TestBed.configureTestingModule({
      declarations: [DropdownAtomComponent],
      providers: [
        { provide: ElementRef, useValue: mockElementRef }
      ],
      schemas: [NO_ERRORS_SCHEMA], // Esto evita errores de Angular al no encontrar otros componentes
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownAtomComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize styles correctly', () => {
    component.size = 'm'; // Usa el valor de tipo de cadena directamente
    component.state = 'active'; // Usa el valor de tipo de cadena directamente
    component.ngOnInit();

    // Verifica que los estilos se concatenen correctamente
    expect(component.styles).toBe(`${DROPDOWN_SIZE_PREFIX}${component.size} ${DROPDOWN_STATE_PREFIX}${component.state}`);
  });

  it('should write value correctly', () => {
    const value = 'Option 1';
    component.writeValue(value);

    expect(component.value).toBe(value); // Verifica que el valor se haya establecido
  });

  it('should register onChange callback', () => {
    const callback = jest.fn();
    component.registerOnChange(callback);

    component.selectOption('Option 1'); // Cambia el valor seleccionado
    expect(callback).toHaveBeenCalledWith('Option 1'); // Verifica que se llame al callback con el valor correcto
  });

  it('should register onTouched callback', () => {
    const callback = jest.fn();
    component.registerOnTouched(callback);

    component.onBlur(); // Simula el desenfoque
    expect(callback).toHaveBeenCalled(); // Verifica que se llame al callback de onTouched
  });

  it('should select option and close dropdown', () => {
    component.options = ['Option 1', 'Option 2'];
    component.toggleDropdown(); // Abre el dropdown

    component.selectOption('Option 1'); // Selecciona una opción

    expect(component.value).toBe('Option 1'); // Verifica que el valor seleccionado sea correcto
    expect(component.isActive).toBe(false); // Verifica que el dropdown esté cerrado
  });

  it('should toggle dropdown visibility', () => {
    expect(component.isActive).toBe(false); // Inicialmente, el dropdown no está activo

    component.toggleDropdown(); // Abre el dropdown
    expect(component.isActive).toBe(true); // Verifica que el dropdown esté activo

    component.toggleDropdown(); // Cierra el dropdown
    expect(component.isActive).toBe(false); // Verifica que el dropdown esté cerrado
  });

  it('should focus and activate dropdown', () => {
    component.state = 'active'; // Asegúrate de que el estado no esté deshabilitado
    component.onFocus(); // Simula el enfoque

    expect(component.isActive).toBe(true); // Verifica que el dropdown esté activo
  });

  it('should call onTouched on blur', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    component.onBlur(); // Simula el desenfoque

    expect(onTouchedSpy).toHaveBeenCalled(); // Verifica que se haya llamado a onTouched
  });

  it('should close dropdown on click outside', () => {
    component.isActive = true; // Abre el dropdown

    const mockEvent = new MouseEvent('click');
    document.body.dispatchEvent(mockEvent); // Simula un clic en el documento

    expect(component.isActive).toBe(false); // Verifica que el dropdown esté cerrado
  });
});