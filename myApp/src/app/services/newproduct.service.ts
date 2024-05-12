import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewproductService {

  private productsSource = new BehaviorSubject<any[]>([]);
  private editingProductSource = new BehaviorSubject<any>(null);

  currentProducts = this.productsSource.asObservable();
  currentEditingProduct = this.editingProductSource.asObservable();

  constructor() { }

  // Adds a single product to the existing array
  addProduct(product: any) {
    const currentProducts = this.productsSource.value;
    this.productsSource.next([...currentProducts, product]);
  }

  // Sets the product to be edited
  setEditingProduct(product: any) {
    this.editingProductSource.next(product);
  }

  // Update a product in the list
  updateProduct(updatedProduct: any) {
    const products = this.productsSource.value;
    const index = products.findIndex(p => p.id === updatedProduct.id); // assuming each product has a unique id
    if (index !== -1) {
      products[index] = updatedProduct;
      this.productsSource.next(products);
    }
  }
}