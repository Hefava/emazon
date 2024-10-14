import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'show-by-atom',
  templateUrl: './show-by-atom.component.html',
  styleUrls: ['./show-by-atom.component.scss'],
})
export class ShowByAtomComponent {
  pageSizes: number[] = [10, 20, 50];

  @Output() pageSizeChange = new EventEmitter<number>();

  onPageSizeChange(event: Event): void {
    const selectedSize = +(event.target as HTMLSelectElement).value;
    this.pageSizeChange.emit(selectedSize); 
  }
}