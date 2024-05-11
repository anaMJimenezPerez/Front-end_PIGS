import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-profile',
  templateUrl: './products-profile.component.html',
  styleUrls: ['./products-profile.component.css']
})
export class ProductsProfileComponent {

  constructor(
    private router: Router,
    
  ) {}
  
    /* Access to page newproduct */
    navigateToNewProduct() {
      // Establece una bandera de acceso en localStorage
      localStorage.setItem('profileAccess', 'true');
      // Navega a New Product
      this.router.navigate(['/newproduct']);
    }

}
