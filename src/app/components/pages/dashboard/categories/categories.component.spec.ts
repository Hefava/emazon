import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CategoriesComponent } from './categories.component';
import { CategoryService } from '@services/category/category.service';
import { Page } from '@interfaces/services/page';
import { CategoryRequest, CategoryResponse } from '@interfaces/models/category-request.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      getCategories: jest.fn(),
      saveCategory: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load categories on ngOnInit', () => {
    const mockPage: Page<CategoryResponse> = { content: [], totalCount: 0, page: 0, pageSize: 10, totalPages: 0 }; // Propiedad corregida
    categoryServiceMock.getCategories.mockReturnValue(of(mockPage));

    component.ngOnInit();

    expect(categoryServiceMock.getCategories).toHaveBeenCalled();
    expect(component.isDataLoaded).toBe(true);
    expect(component.page).toEqual(mockPage);
  });

  it('should reload categories when calling reloadCategories', () => {
    const mockPage: Page<CategoryResponse> = { content: [], totalCount: 0, page: 0, pageSize: 10, totalPages: 0 }; // Propiedad corregida
    categoryServiceMock.getCategories.mockReturnValue(of(mockPage));

    component.reloadCategories();

    expect(categoryServiceMock.getCategories).toHaveBeenCalledWith({
      page: component.currentPage,
      pageSize: component.pageSize,
      sortBy: component.sortBy,
      asc: component.asc,
    });
    expect(component.page).toEqual(mockPage);
    expect(component.isDataLoaded).toBe(true);
  });

  it('should handle form submit and save category', () => {
    const mockCategory: CategoryRequest = { nombre: 'Test Category', descripcion: 'Test Description' };
    categoryServiceMock.saveCategory.mockReturnValue(of({}));

    jest.spyOn(component, 'reloadCategories');
    jest.spyOn(component, 'showNotification');

    component.handleFormSubmit(mockCategory);

    expect(categoryServiceMock.saveCategory).toHaveBeenCalledWith(mockCategory);
    expect(component.showNotification).toHaveBeenCalledWith('Success', 'Categoría guardada con éxito');
    expect(component.reloadCategories).toHaveBeenCalled();
  });

  it('should show error notification if saving category fails with 409', () => {
    const mockCategory: CategoryRequest = { nombre: 'Duplicate Category', descripcion: 'Duplicate Description' };
    const errorResponse = new HttpErrorResponse({ status: 409, error: { Message: 'La categoría ya existe' } });
    categoryServiceMock.saveCategory.mockReturnValue(throwError(errorResponse));

    jest.spyOn(component, 'showNotification');

    component.handleFormSubmit(mockCategory);

    expect(component.showNotification).toHaveBeenCalledWith('Error', 'La categoría ya existe');
  });

  it('should show unexpected error if saving category fails with other error', () => {
    const mockCategory: CategoryRequest = { nombre: 'Test Category', descripcion: 'Test Description' };
    const errorResponse = new HttpErrorResponse({ status: 500 });
    categoryServiceMock.saveCategory.mockReturnValue(throwError(errorResponse));

    jest.spyOn(component, 'showNotification');

    component.handleFormSubmit(mockCategory);

    expect(component.showNotification).toHaveBeenCalledWith('Error', 'Error inesperado al guardar la categoría');
  });

  it('should update current page and reload categories on page change', () => {
    jest.spyOn(component, 'reloadCategories');

    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(component.reloadCategories).toHaveBeenCalled();
  });

  it('should update page size and reload categories on showByChange', () => {
    jest.spyOn(component, 'reloadCategories');

    component.onShowByChange(20);

    expect(component.pageSize).toBe(20);
    expect(component.currentPage).toBe(0);
    expect(component.reloadCategories).toHaveBeenCalled();
  });

  it('should update sorting criteria and reload categories on sort change', () => {
    jest.spyOn(component, 'reloadCategories');

    component.onSortChange({ criteria: 'nombre', direction: 'desc' });

    expect(component.sortBy).toBe('nombre');
    expect(component.asc).toBe(false);
    expect(component.currentPage).toBe(0);
    expect(component.reloadCategories).toHaveBeenCalled();
  });

  it('should open and close modal correctly', () => {
    component.openModal();
    expect(component.isModalOpen).toBe(true);

    component.closeModal();
    expect(component.isModalOpen).toBe(false);
  });

  it('should show notification and clear it after 5 seconds', () => {
    jest.useFakeTimers();

    component.showNotification('Success', 'Test notification');
    expect(component.notification.show).toBe(true);
    expect(component.notification.message).toBe('Test notification');

    jest.advanceTimersByTime(5000);
    expect(component.notification.show).toBe(false);

    jest.useRealTimers();
  });
});