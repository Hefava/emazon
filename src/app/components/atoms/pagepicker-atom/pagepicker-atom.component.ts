import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'page-picker-atom',
  templateUrl: './pagepicker-atom.component.html',
  styleUrls: ['./pagepicker-atom.component.scss']
})
export class PagePickerAtomComponent implements OnInit {
  @Input() page: number = 0; 
  @Input() totalPages: number = 0;

  @Output() onPageChange = new EventEmitter<number>();

  displayedPages: number[] = [];

  ngOnInit(): void {
    this.calculatePages();
  }

  ngOnChanges(): void {
    this.calculatePages();
  }

  // Calcular las páginas que se mostrarán
  calculatePages(): void {
    let pagesToShow = 5; 
    let startPage = Math.max(0, this.page - Math.floor(pagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + pagesToShow);

    if (endPage - startPage < pagesToShow) {
      startPage = Math.max(0, endPage - pagesToShow);
    }

    this.displayedPages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  }

  // Emitir el cambio de página
  selectPage(p: number): void {
    this.onPageChange.emit(p);
  }
}