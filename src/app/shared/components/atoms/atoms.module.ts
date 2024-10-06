import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';
import { InputAtomComponent } from './input-atom/input-atom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ButtonComponent, TextComponent, InputAtomComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [ButtonComponent, TextComponent, InputAtomComponent],
})
export class AtomsModule {}
