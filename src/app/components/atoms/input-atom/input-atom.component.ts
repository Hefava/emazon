import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    DISABLED_STATE,
    EMPTY_STRING,
    INPUT_DEFAULT_SIZE,
    INPUT_DEFAULT_STATE,
    INPUT_DEFAULT_TYPE,
    INPUT_LABEL_SIZE_PREFIX,
    INPUT_SIZE_PREFIX,
    INPUT_STATE_PREFIX,
} from '@constants/atom-constants';
import { InputSize, InputState, InputType } from '@customTypes/enums';

@Component({
    selector: 'input-atom',
    templateUrl: './input-atom.component.html',
    styleUrls: ['./input-atom.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputAtomComponent),
            multi: true,
        },
    ],
})
export class InputAtomComponent implements OnInit, ControlValueAccessor {
    styles: string = EMPTY_STRING;
    disabled: string = EMPTY_STRING;
    labelStyles: string = EMPTY_STRING;

    @Input() size: InputSize = INPUT_DEFAULT_SIZE;
    @Input() state: InputState = INPUT_DEFAULT_STATE;
    @Input() type: InputType = INPUT_DEFAULT_TYPE; 
    @Input() placeholder: string = EMPTY_STRING;
    @Input() label: string = EMPTY_STRING;

    // Valor del input
    value: string = EMPTY_STRING;

    // Funciones que se llaman cuando el valor cambia
    onChange: (value: string) => void = () => {};
    onTouched: () => void = () => {};

    constructor() {}

    ngOnInit(): void {
        this.styles = `${INPUT_SIZE_PREFIX}${this.size} ${INPUT_STATE_PREFIX}${this.state}`;
        if (this.state === DISABLED_STATE) this.disabled = this.state;
        if (this.label !== EMPTY_STRING)
            this.labelStyles = `${INPUT_LABEL_SIZE_PREFIX}${this.size}`;
    }

    // Implementa el método para escribir el valor
    writeValue(value: string): void {
        this.value = value;
    }

    // Implementa el método para registrar el callback de cambio
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // Implementa el método para registrar el callback de toque
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // Método que se llama cuando el input cambia
    onInput(value: string): void {
        this.value = value;
        this.onChange(value); // Llama al callback de cambio
    }
}