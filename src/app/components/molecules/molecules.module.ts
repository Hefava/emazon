import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AtomsModule } from '../atoms/atoms.module'; 

@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    AtomsModule, 
  ],
  exports: [CategoryFormComponent],
})
export class MoleculesModule {}
