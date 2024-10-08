import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatedDatatableComponent } from './paginated-datatable/paginated-datatable.component';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';

@NgModule({
    declarations: [PaginatedDatatableComponent],
    imports: [CommonModule, AtomsModule, MoleculesModule, ReactiveFormsModule],
    exports: [PaginatedDatatableComponent],
})
export class OrganismsModule {}
