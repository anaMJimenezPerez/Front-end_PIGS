import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>('../../../assets/data/product.json');
  }

  getAllProductImages(): Observable<any> {
    return this.http.get<any>('../.../../assets/data/product_images.json');
  }
}
