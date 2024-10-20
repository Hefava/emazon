import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowByAtomComponent } from './show-by-atom.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ShowByAtomComponent', () => {
  let component: ShowByAtomComponent;
  let fixture: ComponentFixture<ShowByAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowByAtomComponent],
      schemas: [NO_ERRORS_SCHEMA], // Esto evita errores de Angular al no encontrar otros componentes
    }).compileComponents();

    fixture = TestBed.createComponent(ShowByAtomComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default page sizes', () => {
    expect(component.pageSizes).toEqual([10, 15, 20]); // Verifica que los tamaños de página predeterminados sean correctos
  });

  it('should emit pageSizeChange event when onPageSizeChange is called', () => {
    jest.spyOn(component.pageSizeChange, 'emit'); // Espía la función emit
    const mockEvent = {
      target: {
        value: '15', // Valor simulado del tamaño de página
      },
    } as unknown as Event; // Convierte a 'unknown' y luego a 'Event'

    component.onPageSizeChange(mockEvent);

    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(15); // Verifica que se emita el tamaño de página seleccionado
  });

  it('should emit pageSizeChange event with number when onPageSizeChange is called', () => {
    jest.spyOn(component.pageSizeChange, 'emit'); // Espía la función emit
    const mockEvent = {
      target: {
        value: '20', // Valor simulado del tamaño de página
      },
    } as unknown as Event; // Convierte a 'unknown' y luego a 'Event'

    component.onPageSizeChange(mockEvent);

    expect(component.pageSizeChange.emit).toHaveBeenCalledWith(20); // Verifica que se emita el tamaño de página seleccionado
  });
});