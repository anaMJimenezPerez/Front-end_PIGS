import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  selectedOption: string = 'profile';
  selectedMenuOption: string = ''; // Nueva variable para controlar el estado activo del menú secundario

  selectOption(option: string) {
    this.selectedOption = option;
  }

  selectMenuOption(option: string) {
    this.selectedMenuOption = option; // Actualizar el estado activo del menú secundario
  }
}