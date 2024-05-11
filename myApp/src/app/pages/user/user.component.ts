import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { forkJoin } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: User | undefined;
  products: Product [] = [];

  constructor(
    private productService: ProductService
  ) {
    this.user = history.state.user;
  }

  ngOnInit(): void {

    forkJoin([
      this.productService.getAllProducts(),
      this.productService.getAllProductImages()
    ]).subscribe(( [products, images ]) => {

      this.products = products.filter( (product:any) => product.seller_id === this.user?.id)
        .map((product: Product) => {
          const productImages = images.filter((image: any) => image.product_id === product.id);
          return { ...product, images_path: productImages.map((image: any) => image.images_path) };
        });
    });
  }
}
