import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  selectedOption: string;
  activeOption: string; // Agregamos la propiedad activeOption

  constructor(private router: Router) {
    this.selectedOption = 'profile'; // Opción por defecto seleccionada
    this.activeOption = 'profile'; // Inicializamos activeOption con 'profile'
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.activeOption = option; // Actualizamos activeOption al seleccionar una opción
    switch (option) {
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'products':
        this.router.navigate(['/products']);
        break;
      case 'income':
        this.router.navigate(['/income']);
        break;
      case 'subscriptions':
        this.router.navigate(['/subscriptions']);
        break;
      case 'orders':
        this.router.navigate(['/orders']);
        break;
      case 'favourites':
        this.router.navigate(['/favourites']);
        break;
      default:
        this.router.navigate(['/']); // Ruta que no existe para ocultar los componentes
        break;
    }
  }
}