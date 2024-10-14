import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sort-by-atom',
  templateUrl: './sort-by-atom.component.html',
  styleUrls: ['./sort-by-atom.component.scss'],
})
export class SortByAtomComponent {
  @Input() sortOptions: string[] = []; // Recibe las opciones de ordenamiento desde el componente padre
  @Input() selectedCriteria: string = ''; // Recibe el criterio de ordenamiento seleccionado desde el componente padre
  isAscending: boolean = true; // Dirección de orden por defecto

  @Output() sortChange = new EventEmitter<{ criteria: string; direction: string }>();

  ngOnInit() {
    if (this.sortOptions.length > 0) {
      this.selectedCriteria = this.sortOptions[0]; // Selecciona la primera opción por defecto
    }
  }

  // Método que maneja el cambio de criterio de ordenación (evento select)
  onSortCriteriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCriteria = target.value;
    this.emitSortChange();
  }

  // Cambia la dirección de orden (asc/desc)
  toggleSortDirection(): void {
    this.isAscending = !this.isAscending;
    this.emitSortChange();
  }

  // Emitir cambios al componente padre
  emitSortChange(): void {
    console.log('Emitiendo sortChange:', this.selectedCriteria, this.isAscending ? 'asc' : 'desc'); // Agrega log para verificar emisión
    this.sortChange.emit({
      criteria: this.selectedCriteria,
      direction: this.isAscending ? 'asc' : 'desc',
    });
  }
}