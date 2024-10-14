import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sort-by-atom',
  templateUrl: './sort-by-atom.component.html',
  styleUrls: ['./sort-by-atom.component.scss']
})
export class SortByAtomComponent {
  sortOptions: string[] = ['Nombre']; // Opciones de ordenamiento
  isAscending: boolean = true; // Dirección de orden por defecto

  @Output() sortChange = new EventEmitter<{ criteria: string, direction: string }>();

  selectedCriteria: string = 'Nombre'; // Valor por defecto

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
      direction: this.isAscending ? 'asc' : 'desc' 
    });
  }
}