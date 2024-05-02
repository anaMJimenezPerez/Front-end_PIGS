import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})

export class MenuProfileComponent {
  @Input() activeOption: string = 'profile'; // Definimos activeOption como una propiedad de entrada

  @Output() optionSelected = new EventEmitter<string>();

  selectOption(option: string) {
    this.activeOption = option; // Actualizamos la opción activa al hacer clic en un botón
    this.optionSelected.emit(option); // Emitimos el evento para que lo maneje el componente padre
  }
}