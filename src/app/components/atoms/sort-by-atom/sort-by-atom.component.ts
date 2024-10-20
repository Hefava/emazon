import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sort-by-atom',
  templateUrl: './sort-by-atom.component.html',
  styleUrls: ['./sort-by-atom.component.scss'],
})
export class SortByAtomComponent {
  @Input() sortOptions: string[] = []; 
  @Input() selectedCriteria: string = ''; 
  isAscending: boolean = true; 

  @Output() sortChange = new EventEmitter<{ criteria: string; direction: string }>();

  ngOnInit() {
    if (this.sortOptions.length > 0) {
      this.selectedCriteria = this.sortOptions[0]; 
    }
  }

  onSortCriteriaChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCriteria = target.value;
    this.emitSortChange();
  }

  toggleSortDirection(): void {
    this.isAscending = !this.isAscending;
    this.emitSortChange();
  }

  emitSortChange(): void {
    console.log('Emitiendo sortChange:', this.selectedCriteria, this.isAscending ? 'asc' : 'desc'); // Agrega log para verificar emisión
    this.sortChange.emit({
      criteria: this.selectedCriteria,
      direction: this.isAscending ? 'asc' : 'desc',
    });
  }
}