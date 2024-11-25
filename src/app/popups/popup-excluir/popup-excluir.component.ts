import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-popup-excluir',
  imports: [CommonModule],
  templateUrl: './popup-excluir.component.html',
  styleUrl: './popup-excluir.component.css'
})
export class PopupExcluirComponent {

  isVisible = false;
  @Output() response = new EventEmitter<boolean>();

  open() {
    this.isVisible = true;
  }

  onConfirm() {
    this.response.emit(true); // Emite 'true' para indicar que o usuário confirmou a exclusão
    this.isVisible = false; // Fecha o popup
  }

  onCancel() {
    this.response.emit(false); // Emite 'false' para indicar que o usuário cancelou
    this.isVisible = false; // Fecha o popup
  }

}
