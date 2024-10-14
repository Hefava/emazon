import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Column } from '@interfaces/atoms-interfaces';
import { Page } from '@interfaces/services/page';

@Component({
  selector: 'paginated-datatable',
  templateUrl: './paginated-datatable.component.html',
  styleUrls: ['./paginated-datatable.component.scss'],
})
export class PaginatedDatatableComponent<T extends Record<string, any>> implements OnInit {
  @Input() columns?: Array<Column>;
  @Input() page?: Page<T>; // Recibe el objeto paginado con los datos

  // Emitir eventos para que el componente padre pueda recibir los cambios
  @Output() sortChange = new EventEmitter<{ criteria: string; direction: string }>();
  @Output() showByChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  rows: Array<T> = [];

  ngOnInit(): void {
    if (this.page) {
      this.rows = this.page.content; // Actualiza las filas de la tabla con los datos de la página
    }
  }

  ngOnChanges(): void {
    if (this.page) {
      this.rows = this.page.content;
    }
  }

  // Manejar el cambio de orden
  onSortChange(event: { criteria: string; direction: string }): void {
    this.sortChange.emit(event); // Emitir el evento al componente padre
  }

  // Manejar el cambio de tamaño de página
  onShowByChange(pageSize: number): void {
    this.showByChange.emit(pageSize); // Emitir el evento al componente padre
  }

  // Manejar el cambio de página
  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage); // Emitir el cambio de página
  }
}