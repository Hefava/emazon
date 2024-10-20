import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortByAtomComponent } from './sort-by-atom.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SortByAtomComponent', () => {
  let component: SortByAtomComponent;
  let fixture: ComponentFixture<SortByAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortByAtomComponent],
      schemas: [NO_ERRORS_SCHEMA], // Esto evita errores de Angular al no encontrar otros componentes
    }).compileComponents();

    fixture = TestBed.createComponent(SortByAtomComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedCriteria with the first sort option', () => {
    component.sortOptions = ['Name', 'Date', 'Price'];
    component.ngOnInit();

    expect(component.selectedCriteria).toBe('Name'); // Verifica que la primera opción se haya seleccionado
  });

  it('should set selectedCriteria correctly on sort criteria change', () => {
    component.sortOptions = ['Name', 'Date', 'Price'];
    component.ngOnInit();

    const mockEvent = {
      target: {
        value: 'Price', // Opción seleccionada simulada
      },
    } as unknown as Event;

    component.onSortCriteriaChange(mockEvent);
    
    expect(component.selectedCriteria).toBe('Price'); // Verifica que se haya actualizado la opción seleccionada
  });

  it('should emit sortChange with correct criteria and direction', () => {
    jest.spyOn(component.sortChange, 'emit'); // Espía la función emit
    component.sortOptions = ['Name', 'Date', 'Price'];
    component.ngOnInit();

    component.selectedCriteria = 'Price';
    component.isAscending = true;

    component.emitSortChange();

    expect(component.sortChange.emit).toHaveBeenCalledWith({
      criteria: 'Price',
      direction: 'asc',
    }); // Verifica que se emita el cambio de ordenamiento con la dirección correcta
  });

  it('should toggle sort direction and emit sortChange', () => {
    jest.spyOn(component.sortChange, 'emit'); // Espía la función emit
    component.isAscending = true;

    component.toggleSortDirection();

    expect(component.isAscending).toBe(false); // Verifica que la dirección se haya invertido
    expect(component.sortChange.emit).toHaveBeenCalledWith({
      criteria: component.selectedCriteria,
      direction: 'desc',
    }); // Verifica que se emita el cambio de ordenamiento con la dirección correcta
  });
});