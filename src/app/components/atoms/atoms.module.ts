import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button-atom/button.component';
import { InputAtomComponent } from './input-atom/input-atom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationAtomComponent } from './notification-atom/notification-atom.component';
import { ScrollAtomComponent } from './scroll-atom/scroll-atom.component';
import { DropdownAtomComponent } from './dropdown-atom/dropdown-atom.component';
import { TextComponent } from './text-atom/text.component';
import { PagePickerAtomComponent } from './pagepicker-atom/pagepicker-atom.component';
import { ModalComponent } from './app-modal-atom/app-modal-atom.component';
import { ShowByAtomComponent } from './show-by-atom/show-by-atom.component';
import { SortByAtomComponent } from './sort-by-atom/sort-by-atom.component';

@NgModule({
    declarations: [ButtonComponent, TextComponent, InputAtomComponent, NotificationAtomComponent, ScrollAtomComponent, DropdownAtomComponent, PagePickerAtomComponent, ModalComponent, ShowByAtomComponent, SortByAtomComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    exports: [ButtonComponent, TextComponent, InputAtomComponent, NotificationAtomComponent, ScrollAtomComponent, DropdownAtomComponent, PagePickerAtomComponent, ModalComponent, ShowByAtomComponent, SortByAtomComponent],
})
export class AtomsModule {}
