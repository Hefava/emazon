import { Component, Input } from '@angular/core';

@Component({
  selector: 'scroll-atom',
  templateUrl: './scroll-atom.component.html',
  styleUrls: ['./scroll-atom.component.scss']
})
export class ScrollAtomComponent {
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() size: 'standard' | 'small' = 'standard';
}