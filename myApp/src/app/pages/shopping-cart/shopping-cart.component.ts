import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  userCartIsEmpty: boolean = false;
  loggedUser = this.authService.getLoggedUser() ;
  cartProducts: any[] = []; 
  products: Product[] = [];

  constructor(private userService: UserService, private authService: AuthUserService, private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {
    this.cartService.getUserProducts(this.loggedUser.id).subscribe(response => {
      this.cartProducts = response;
      console.log(this.cartProducts);
      if(this.cartProducts.length == 0){
       this.userCartIsEmpty = true;
      } else {
        this.cartProducts.forEach((cart: Cart) => {
          this.products.push(cart.product);
        });
        console.log("Products" + this.products[0].id);
      }
    });
  }

  deleteProduct(product: Product): void {
    /*this.products = this.products.filter(p => p.id !== product.id);
    this.cartService.deleteCart(product.id).subscribe(
      () => {
        console.log("Product deleted successfully.");
      },
      (error) => {
        console.error("Error deleting product:", error);
      }
    );*/
  } 
  
}
