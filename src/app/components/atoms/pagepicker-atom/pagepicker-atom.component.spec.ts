import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagePickerAtomComponent } from './pagepicker-atom.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PagePickerAtomComponent', () => {
  let component: PagePickerAtomComponent;
  let fixture: ComponentFixture<PagePickerAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagePickerAtomComponent],
      schemas: [NO_ERRORS_SCHEMA], // Esto evita errores de Angular al no encontrar otros componentes
    }).compileComponents();

    fixture = TestBed.createComponent(PagePickerAtomComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(0);
    expect(component.totalPages).toBe(0);
    expect(component.displayedPages).toEqual([]);
  });

  it('should calculate displayed pages correctly on init', () => {
    component.totalPages = 10; // Establece un total de páginas
    component.page = 5; // Establece la página actual
    component.ngOnInit();

    expect(component.displayedPages).toEqual([2, 3, 4, 5, 6]); // Verifica que las páginas mostradas sean correctas
  });

  it('should update displayed pages when totalPages changes', () => {
    component.page = 5;
    component.totalPages = 10;
    component.calculatePages();

    expect(component.displayedPages).toEqual([2, 3, 4, 5, 6]); // Antes de que cambie
    component.totalPages = 8; // Cambia el total de páginas
    component.calculatePages();

    expect(component.displayedPages).toEqual([3, 4, 5, 6, 7]); // Verifica que las páginas mostradas se actualicen
  });

  it('should emit onPageChange when selectPage is called', () => {
    jest.spyOn(component.onPageChange, 'emit'); // Espía la función emit
    const newPage = 3;

    component.selectPage(newPage);

    expect(component.onPageChange.emit).toHaveBeenCalledWith(newPage); // Verifica que se emita el nuevo valor de la página
  });

  it('should handle edge case when totalPages is less than displayed pages', () => {
    component.page = 0;
    component.totalPages = 3;
    component.ngOnInit();

    expect(component.displayedPages).toEqual([0, 1, 2]); // Verifica que las páginas mostradas sean correctas
  });

  it('should handle edge case when current page is near the end', () => {
    component.page = 8;
    component.totalPages = 10;
    component.ngOnInit();

    expect(component.displayedPages).toEqual([6, 7, 8, 9]); // Verifica que las páginas mostradas sean correctas
  });

  it('should handle edge case when current page is 0', () => {
    component.page = 0;
    component.totalPages = 5;
    component.ngOnInit();

    expect(component.displayedPages).toEqual([0, 1, 2, 3, 4]); // Verifica que las páginas mostradas sean correctas
  });
});