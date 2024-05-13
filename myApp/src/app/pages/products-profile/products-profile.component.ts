import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-profile',
  templateUrl: './products-profile.component.html',
  styleUrls: ['./products-profile.component.css']
})
export class ProductsProfileComponent implements OnInit {

  products: Product[] = [];
  userId: number = 1;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  navigateToNewProduct() {
    localStorage.setItem('profileAccess', 'true');
    this.router.navigate(['/newproduct']);
  }

  loadProducts(): void {
    this.productService.getAllProductsByUserId(this.userId).subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(product: Product): void {
    this.products = this.products.filter(p => p.id !== product.id);
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        console.log("Product deleted successfully.");
      },
      (error) => {
        console.error("Error deleting product:", error);
        this.loadProducts();
      }
    );
  }

    /*updateStock(product: Product): void {
    if (isNaN(product.stock) || product.stock < 0) {
      console.error("Invalid stock value:", product.stock);
      return;
    }
  
    // Crea una copia del producto con solo el campo de stock actualizado
    const updatedProduct: Product = {
      ...product,
      stock: product.stock
    };
  
    // Actualiza el producto en el backend
    this.productService.updateProduct(updatedProduct).subscribe(
      () => {
        console.log("Stock updated successfully.");
        // Actualiza el producto en la lista local solo si la solicitud al backend tiene éxito
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index].stock = product.stock;
        } else {
          console.error("Product not found in the list.");
        }
      },
      (error) => {
        console.error("Error updating stock:", error);
      }
    );
  }*/
}