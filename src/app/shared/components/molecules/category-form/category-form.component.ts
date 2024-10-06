import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMPTY_STRING } from '@constants/atom-constants';
import {
    CATEGORY_FORM_TITLE,
    CATEGORY_NAME_LABEL,
    CATEGORY_NAME_PLACEHOLDER,
    CATEGORY_DESCRIPTION_LABEL,
    CATEGORY_DESCRIPTION_PLACEHOLDER,
    CATEGORY_BUTTON_TEXT
} from '@constants/molecule-constants';
import { HttpErrorResponse } from '@angular/common/http'; 
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryRequest } from 'src/app/core/services/category-request.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  buttonActive: boolean = false;
  errorMessage: string | null = null; 

  title: string = CATEGORY_FORM_TITLE;
  nameLabel: string = CATEGORY_NAME_LABEL; 
  descriptionLabel: string = CATEGORY_DESCRIPTION_LABEL;
  namePlaceholder: string = CATEGORY_NAME_PLACEHOLDER;
  descriptionPlaceholder: string = CATEGORY_DESCRIPTION_PLACEHOLDER;
  buttonText: string = CATEGORY_BUTTON_TEXT;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: [EMPTY_STRING, Validators.required],
      description: [EMPTY_STRING, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryForm.valueChanges.subscribe(() => {
      this.buttonActive = this.isButtonActive(); 
      this.errorMessage = null; 
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
        const dataToSend: CategoryRequest = {
            nombre: this.categoryForm.value.name,
            descripcion: this.categoryForm.value.description 
        };

        this.categoryService.saveCategory(dataToSend).subscribe(
          () => {
            console.log('Categoría creada exitosamente');
            this.categoryForm.reset();
            this.errorMessage = null; 
          },
          (error: HttpErrorResponse) => {
            console.error('Error al crear la categoría:', error);
            if (error.status === 409) {
              this.errorMessage = error.error.Message || 'Ya existe esa categoría.'; 
            } else {
              this.errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.'; 
            }
          }
        );
    }
  }

  isButtonActive(): boolean {
    return this.categoryForm.valid; 
  }
}