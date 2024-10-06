import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { InputComponentComponent } from './input-component/input-component.component';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponentComponent,
  ],
  imports: [CommonModule],
  exports: [ButtonComponent],
})
export class AtomsModule { }
