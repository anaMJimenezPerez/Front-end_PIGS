import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get('http://localhost:8080/products/getProducts');
  }

  getAllProductsByUserId(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/products/getProducts?id=${userId}`);
  }

  updateProduct(userId: number, product: Product): Observable<any> {
    return this.http.put('http://localhost:8080/products?id=', { userId, product });
  }

  deleteProduct(userId: number): Observable<any> {
    return this.http.delete('http://localhost:8080/products?id=' + userId);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/products', product);
  }

  getAllProductImages(): Observable<any> {
    return this.http.get<any>('../.../../assets/data/product_images.json');
  }
}
