import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { TextComponent } from './text/text.component';
import { InputAtomComponent } from './input-atom/input-atom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationAtomComponent } from './notification-atom/notification-atom.component';
import { ScrollAtomComponent } from './scroll-atom/scroll-atom.component';
import { DropdownAtomComponent } from './dropdown-atom/dropdown-atom.component';

@NgModule({
    declarations: [ButtonComponent, TextComponent, InputAtomComponent, NotificationAtomComponent, ScrollAtomComponent, DropdownAtomComponent, ],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [ButtonComponent, TextComponent, InputAtomComponent, NotificationAtomComponent, ScrollAtomComponent, DropdownAtomComponent, ],
})
export class AtomsModule {}
