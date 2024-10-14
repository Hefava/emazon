import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss'],
})
export class PaginationBarComponent {
  @Output() sortChange = new EventEmitter<{ criteria: string; direction: string }>();
  @Output() showByChange = new EventEmitter<number>();

  onSortChange(event: { criteria: string; direction: string }): void {
    console.log('Emitiendo sortChange a CategoriesComponent:', event); // Confirmar emisión
    this.sortChange.emit(event); // Emitir el evento al componente padre
  }

  onShowByChange(pageSize: number): void {
    console.log('Show by changed:', pageSize); // Confirmar emisión
    this.showByChange.emit(pageSize); // Emitir el valor de tamaño de página como número
  }
}