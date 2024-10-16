import { Component, Input, OnInit } from '@angular/core';
import {
	BUTTON_DEFAULT_SIZE,
    BUTTON_DEFAULT_STATE,
    BUTTON_DEFAULT_TYPE,
    BUTTON_SIZE_PREFIX,
    BUTTON_STATE_PREFIX,
    BUTTON_TYPE_PREFIX,
    EMPTY_STRING,
} from '@constants/atom-constants';
import { ButtonSize, ButtonType } from 'src/app/shared/types/enums.d';

@Component({
    selector: 'button-atom',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    styles = EMPTY_STRING;

    @Input() size: ButtonSize = BUTTON_DEFAULT_SIZE;
    @Input() type: ButtonType = BUTTON_DEFAULT_TYPE;
    @Input() state: string = BUTTON_DEFAULT_STATE;
    @Input() isDisabled: boolean = false; 

    constructor() {}

    ngOnInit(): void {
        this.styles = `${BUTTON_SIZE_PREFIX}${this.size} ${BUTTON_TYPE_PREFIX}${this.type} ${BUTTON_STATE_PREFIX}${this.state}`;
    }
}