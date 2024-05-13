import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  postAddProduct(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>('http://localhost:8080/cart', cart);
  }
}
