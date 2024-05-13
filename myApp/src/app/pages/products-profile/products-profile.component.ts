import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';
import { ProductImage } from 'src/app/interfaces/productimage';

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

 /* getProductImages(productId: number) {
    this.ProductService.getProductImages(productId).subscribe(
      (images: ProductImage[]) => {
        this.productImages = images;
      },
      error => {
        console.log('Error fetching product images:', error);
      }
    );
  }
}*/
}