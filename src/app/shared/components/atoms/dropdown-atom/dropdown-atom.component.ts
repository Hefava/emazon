import { Component, OnInit, Input, forwardRef, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    EMPTY_STRING,
    DROPDOWN_DEFAULT_STATE,
    DROPDOWN_DEFAULT_SIZE,
    DROPDOWN_STATE_PREFIX,
    DROPDOWN_SIZE_PREFIX,
} from '@constants/atom-constants';
import { DropdownSize, DropdownState } from '@customTypes/enums';

@Component({
    selector: 'dropdown-atom',
    templateUrl: './dropdown-atom.component.html',
    styleUrls: ['./dropdown-atom.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownAtomComponent),
            multi: true,
        },
    ],
})
export class DropdownAtomComponent implements OnInit, ControlValueAccessor {
    styles: string = EMPTY_STRING;
    disabled: string = EMPTY_STRING;

    @Input() options: string[] = [];
    @Input() placeholder: string = 'Selecciona una opción';
    @Input() state: DropdownState = DROPDOWN_DEFAULT_STATE;
    @Input() size: DropdownSize = DROPDOWN_DEFAULT_SIZE;

    value: string = EMPTY_STRING;
    isActive: boolean = false;

    onChange: (value: string) => void = () => {};
    onTouched: () => void = () => {};

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.styles = `${DROPDOWN_SIZE_PREFIX}${this.size} ${DROPDOWN_STATE_PREFIX}${this.state}`;
    }

    writeValue(value: string): void {
        this.value = value;
        this.onChange(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    selectOption(option: string): void {
        this.value = option;
        this.onChange(option);
        this.isActive = false;  // Cerrar el dropdown al seleccionar
    }

    toggleDropdown() {
        this.isActive = !this.isActive;
    }

    onFocus(): void {
        if (this.state !== 'disabled') {
            this.isActive = true;
        }
    }

    onBlur(): void {
        this.onTouched();
    }

    // Escucha los clics en el documento para cerrar el dropdown si se hace clic fuera
    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent): void {
        if (this.isActive && !this.elementRef.nativeElement.contains(event.target)) {
            this.isActive = false;  
        }
    }
}
