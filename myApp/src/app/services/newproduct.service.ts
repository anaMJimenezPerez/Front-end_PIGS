import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewproductService {

  private productsSource = new BehaviorSubject<any[]>([]);
  private editingProductSource = new BehaviorSubject<any>(null);
  private idCounter = 1; // Starts the counter from 1

  currentProducts = this.productsSource.asObservable();
  currentEditingProduct = this.editingProductSource.asObservable();

  constructor() { }

  addProduct(product: any) {
    product.id = this.idCounter++; // Assign an ID and increment the counter
    const currentProducts = this.productsSource.value;
    this.productsSource.next([...currentProducts, product]);
  }

  updateProduct(updatedProduct: any) {
    const products = this.productsSource.value;
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.productsSource.next([...products]);
    }
  }
}