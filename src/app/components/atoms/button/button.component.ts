import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'button-atom',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    styles = '';

    @Input() size: string = 'm';
    @Input() type: string = 'main';
    @Input() state: string = 'active';

    constructor() {}

    ngOnInit(): void {
        this.styles = `btn-size-${this.size} btn-type-${this.type} btn-state-${this.state}`;
    }
}
