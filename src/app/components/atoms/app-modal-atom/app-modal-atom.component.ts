import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal-atom.component.html',
  styleUrls: ['./app-modal-atom.component.scss']
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  
  // Nuevo Input para recibir la notificación
  @Input() notification: { show: boolean, type: 'Error' | 'Warning' | 'Success' | 'Inform', message: string } | null = null;

  closeModal(): void {
    this.close.emit();
  }
}