import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Necesario para trabajar con Reactive Forms
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para mockear las peticiones HTTP
import { CategoryFormComponent } from './category-form.component';
import { CategoryService } from 'src/app/core/services/category.service'; // Asegúrate de que la ruta sea correcta
import { of, throwError } from 'rxjs';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule], // Importa Reactive Forms y HTTP Testing Module
      declarations: [ CategoryFormComponent ],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            saveCategory: jest.fn() // Simula el método saveCategory
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService); // Obtiene la instancia del servicio
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when filled', () => {
    component.categoryForm.controls['name'].setValue('Test Category');
    component.categoryForm.controls['description'].setValue('This is a test description.');

    expect(component.categoryForm.valid).toBeTruthy();
  });

  it('should show notification on successful form submission', () => {
    component.categoryForm.controls['name'].setValue('Test Category');
    component.categoryForm.controls['description'].setValue('This is a test description.');
    
    //jest.spyOn(categoryService, 'saveCategory').mockReturnValue(of({})); // Simula una respuesta exitosa

    component.onSubmit();

    expect(component.notification.show).toBe(true);
    expect(component.notification.type).toBe('Success');
    expect(component.notification.message).toBe('Category saved successfully.'); // Asegúrate de que este mensaje sea correcto
  });

  it('should show error notification on failed form submission', () => {
    component.categoryForm.controls['name'].setValue('Test Category');
    component.categoryForm.controls['description'].setValue('This is a test description.');

    const errorResponse = { status: 409, error: { Message: 'Category already exists' } };
    jest.spyOn(categoryService, 'saveCategory').mockReturnValue(throwError(() => errorResponse)); // Simula un error

    component.onSubmit();

    expect(component.notification.show).toBe(true);
    expect(component.notification.type).toBe('Error');
    expect(component.notification.message).toBe('Category already exists'); // Asegúrate de que este mensaje sea correcto
  });
});