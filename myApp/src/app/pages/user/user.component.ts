import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { forkJoin } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Cart } from 'src/app/interfaces/cart';
import { Follow } from 'src/app/interfaces/follow';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  user: User | undefined;
  loggedInUser: User;
  userProducts: Product[] = [];
  userCountProductos: any;
  productCounters: { [productId: string]: number } = {};

  loggedUser = this.authService.getLoggedUser();
  followService: any;
  addedUsers: Set<any> = new Set();

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthUserService,
    private cartService: CartService
  ) {
    this.user = history.state.user ;
    this.loggedInUser = history.state.loggedInUser || null;
  }

  ngOnInit(): void {
    if (this.user && this.user.id !== undefined) {
      forkJoin([
        this.productService.getAllProductImages(),
        this.userService.getProductsUser(this.user.id),
        this.userService.getCountProductsUser(this.user.id)
      ]).subscribe(( [ images, userProducts,  userCountProducts]) => {

        this.userProducts = userProducts.filter( (product: Product) => product.sellerId === this.user?.id)
          .map((product: Product) => {
            const productImages = images.filter((image: any) => image.product_id === product.id);
            return { ...product, images_path: productImages.map((image: any) => image.images_path) };
          });

        this.userCountProductos = userCountProducts;
      });

    }
  }

  addToCart(event: Event,product: Product): void {
    event.preventDefault(); // Avoid page reloads

    if (this.user && this.user.id !== undefined) {
      if (this.authService.isAuthenticated()) {
        const productId = product.id.toString();


        console.log(product);

        const cartItem: Cart = {
          id: 0,
          user: this.loggedUser,
          product: product,
          amount: 1
        };

        this.cartService.postAddProduct(cartItem).subscribe();

        console.log("Se me a añadido al carrito");

      } else {
        console.error('User is not authenticated');
      }
    }
  }

  toggleFollow(event: Event, user: User) {
    event.stopPropagation();
    if (this.loggedInUser && this.loggedInUser.id !== user.id) {
      if (this.isFollowing(user)) {
        const follow: Follow = { follower: this.loggedInUser, followed: user };
        this.followService.deleteFollow(follow).subscribe();
        this.addedUsers.delete(user);
        console.log("Dejar de seguir");
      } else {
        const follow: Follow = { follower: this.loggedInUser, followed: user };
        this.followService.createFollow(follow).subscribe();
        this.addedUsers.add(user);
        console.log("Seguir");
      }
    } else {
      console.log("No estás autenticado o intentas seguirte a ti mismo");
    }
  }

  isFollowing(user: User): boolean {
    return this.addedUsers.has(user);
  }
}
