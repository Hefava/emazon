import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMPTY_STRING, NOTIFICATION_DEFAULT_TYPE, NOTIFICATION_DEFAULT_MESSAGE } from '@constants/atom-constants';
import {
    CATEGORY_FORM_TITLE,
    CATEGORY_NAME_LABEL,
    CATEGORY_NAME_PLACEHOLDER,
    CATEGORY_DESCRIPTION_LABEL,
    CATEGORY_DESCRIPTION_PLACEHOLDER,
    CATEGORY_BUTTON_TEXT,
    CATEGORY_NOTIFICATION_TIMEOUT,  
    CATEGORY_SUCCESS_MESSAGE,
    CATEGORY_ERROR_EXISTING_MESSAGE,
    CATEGORY_ERROR_UNEXPECTED_MESSAGE,
    CATEGORY_ERROR_LOG_MESSAGE,
    CATEGORY_NOTIFICATION_DEFAULT_SHOW
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

  // Opciones para el dropdown
  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];

  notification = {
    show: CATEGORY_NOTIFICATION_DEFAULT_SHOW,
    type: NOTIFICATION_DEFAULT_TYPE,
    message: NOTIFICATION_DEFAULT_MESSAGE
  };

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
      this.clearNotification(); 
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const dataToSend: CategoryRequest = {
        nombre: this.categoryForm.value.name,
        descripcion: this.categoryForm.value.description,
      };

      this.categoryService.saveCategory(dataToSend).subscribe(
        () => {
          console.log(CATEGORY_SUCCESS_MESSAGE);
          this.categoryForm.reset();
          this.showNotification('Success', CATEGORY_SUCCESS_MESSAGE);
        },
        (error: HttpErrorResponse) => {
          console.error(CATEGORY_ERROR_LOG_MESSAGE, error);
          if (error.status === 409) {
            this.showNotification('Error', error.error.Message || CATEGORY_ERROR_EXISTING_MESSAGE);
          } else {
            this.showNotification('Error', CATEGORY_ERROR_UNEXPECTED_MESSAGE);
          }
        }
      );
    }
  }

  isButtonActive(): boolean {
    return this.categoryForm.valid;
  }

  showNotification(type: 'Error' | 'Warning' | 'Success' | 'Inform', message: string): void {
    this.notification = {
      show: true,
      type: type,
      message: message
    };

    setTimeout(() => {
      this.clearNotification();
    }, CATEGORY_NOTIFICATION_TIMEOUT); 
  }

  clearNotification(): void {
    this.notification.show = false;
  }
}