// category-form.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMPTY_STRING } from '@constants/atom-constants';
import {
  CATEGORY_BUTTON_TEXT,
  CATEGORY_DESCRIPTION_LABEL,
  CATEGORY_DESCRIPTION_PLACEHOLDER,
  CATEGORY_FORM_TITLE,
  CATEGORY_NAME_LABEL,
  CATEGORY_NAME_PLACEHOLDER,
} from '@constants/molecule-constants';
import { CategoryRequest } from '@interfaces/models/category-request.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  buttonActive: boolean = false;

  @Output() submitForm = new EventEmitter<CategoryRequest>();

  title: string = CATEGORY_FORM_TITLE;
  nameLabel: string = CATEGORY_NAME_LABEL;
  descriptionLabel: string = CATEGORY_DESCRIPTION_LABEL;
  namePlaceholder: string = CATEGORY_NAME_PLACEHOLDER;
  descriptionPlaceholder: string = CATEGORY_DESCRIPTION_PLACEHOLDER;
  buttonText: string = CATEGORY_BUTTON_TEXT;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: [EMPTY_STRING, Validators.required],
      description: [EMPTY_STRING, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryForm.valueChanges.subscribe(() => {
      this.buttonActive = this.isButtonActive();
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const dataToSend: CategoryRequest = {
        nombre: this.categoryForm.value.name,
        descripcion: this.categoryForm.value.description,
      };
      this.submitForm.emit(dataToSend); 
      console.log(dataToSend); 
      this.categoryForm.reset(); 
    }
  }

  isButtonActive(): boolean {
    return this.categoryForm.valid;
  }
}
