import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../atoms/atoms.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { DatatableComponent } from './datatable/datatable.component';
import { PaginationBarComponent } from './pagination-bar/pagination-bar.component';
import { BrandFormComponent } from './brand-form/brand-form.component';

@NgModule({
  declarations: [
    CategoryFormComponent,
    DatatableComponent,
    PaginationBarComponent,
    BrandFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtomsModule,
  ],
  exports: [
    CategoryFormComponent,
    DatatableComponent,
    PaginationBarComponent,
  ],
})
export class MoleculesModule {}