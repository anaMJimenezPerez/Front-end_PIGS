import { Component, OnInit  } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { FollowsService } from 'src/app/services/follows.service';
import { CartService } from 'src/app/services/cart.service';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { Follow } from 'src/app/interfaces/follow';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  //Products
  products: Product[] = [];
  productImages: any[] = [];
  newProducts: Product[] = [];

  // Users
  follows: Follow[] = [];
  isAuthenticated: boolean = false;
  users: User[] = [];
  orderFollowers: User[] = [];
  addedUsers: Set<any> = new Set();
  loggedInUser: User | null = null;

  user: User | undefined;
  loggedUser = this.authService.getLoggedUser();

  constructor(
    private productService: ProductService,
    private followService: FollowsService,
    private authService: AuthUserService,
    private userService: UserService,
    private router: Router,
    private cartService: CartService
  ) {
    const savedUsers = localStorage.getItem('addedUsers');
    if (savedUsers) {
      this.addedUsers = new Set(JSON.parse(savedUsers));
    }
  }



  ngOnInit() {

    //Part the products
    forkJoin([
      this.productService.getAllProducts()
    ]).subscribe(([products]) => {

      this.products = products;

      //New products
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

      this.newProducts = this.products.filter(product => {
        if (product.creationTime) {
            const [year, month, day] = product.creationTime.split('T')[0].split('-');
            const creationTime = new Date(Number(year), Number(month) - 1, Number(day));
            return creationTime >= fifteenDaysAgo;
        }
        return false;
      });
    });

    //Part the user
    forkJoin([
      this.userService.getAllUser(),
      this.userService.getByFollowers()
    ]).subscribe(([users, orderFollowers]) => {

      this.users = users;
      this.orderFollowers = orderFollowers;

      //Authenticated
      this.authService.currentUser$.subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.authService.getLoggedInUser().subscribe((user: User | null) => {
            this.loggedInUser = user;
          });
        }
      });

    });
  }

  addToCart(event: Event, product: Product): void {
    event.stopPropagation(); // Avoid page reloads
    

    if (this.loggedInUser && this.loggedInUser?.id) {
      console.log("llega");
      if (this.authService.isAuthenticated()) {
        const productId = product.id.toString();


        console.log(product);

        const cartItem: Cart = {
          id: 0,
          user: this.loggedInUser,
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

  toggleUserIcon(event: Event, user: any) {
    event.stopPropagation();

    if (this.loggedInUser && this.loggedInUser.id !== user.id) {

      this.authService.getLoggedInUser().subscribe((loggedInUser: User | null) => {

        if (loggedInUser !== null) {
          if (this.addedUsers.has(user)) {

            const follow: Follow = { follower: loggedInUser, followed: user };
            this.followService.deleteFollow(follow).subscribe();
            this.addedUsers.delete(user);
            try {
              localStorage.setItem('addedUsers', JSON.stringify([...this.addedUsers]));
              console.log("Estado del icono guardado correctamente");
            } catch (error) {
              console.error("Error al guardar el estado del icono en el almacenamiento local:", error);
            }
            console.log("Eliminar");
          } else {
            console.log(loggedInUser);
            console.log(user);
            const follow: Follow = { follower: loggedInUser, followed: user };
            console.log(follow);
            this.followService.createFollow(follow).subscribe();
            this.addedUsers.add(user);
            try {
              localStorage.setItem('addedUsers', JSON.stringify([...this.addedUsers]));
              console.log("Estado del icono guardado correctamente");
            } catch (error) {
              console.error("Error al guardar el estado del icono en el almacenamiento local:", error);
            }
            console.log("Crear");
          }
        } else {
          console.log("Usuario no logueado");
        }
      });
    } else {
      console.log("No estas logueado");
    }
  }

  productDetails(product: Product){
    this.router.navigateByUrl('/product', { state: { product } });
  }

  userDetails(user: User){
    this.router.navigateByUrl('/user', { state: { user, loggedInUser: this.loggedInUser } });
  }

  //Button the Show More
  totalRowsToShow: number = 4;
  totalRowsToShowUser: number = 4;
  totalRowsToShowFavorite: number = 4;
  totalRowsToShowNewProducts: number = 4;
  totalRowsToShowFollows: number = 4;
  showAllRows: boolean = false;
  showAllRowsUser: boolean = false;
  showAllRowsFavorite: boolean = false;
  showAllRowsNewProducts: boolean = false;
  showAllRowsFollows: boolean = false;

  adjustTotalRows(id: number, totalRowsToShow: number, list: any[], showAllRows: boolean) {
    const rowsPerPage = 4;
    const newTotalRowsToShow = totalRowsToShow + rowsPerPage;
    const isEndOfList = newTotalRowsToShow >= list.length;

    if (showAllRows) {
      return Math.min(rowsPerPage, list.length);
    } else {
      return isEndOfList ? list.length : newTotalRowsToShow;
    }
  }

  showMore(id: number, list: any[], totalRowsToShow: number, showAllRows: boolean) {
    if (id === 1) {
      this.totalRowsToShow = this.adjustTotalRows(id, this.totalRowsToShow, list, showAllRows);
      this.showAllRows = !showAllRows && this.totalRowsToShow === list.length;
    } else if (id === 2) {
      this.totalRowsToShowUser = this.adjustTotalRows(id, this.totalRowsToShowUser, list, showAllRows);
      this.showAllRowsUser = !showAllRows && this.totalRowsToShowUser === list.length;
    } else if (id === 3) {
      this.totalRowsToShowNewProducts = this.adjustTotalRows(id, this.totalRowsToShowNewProducts, list, showAllRows);
      this.showAllRowsNewProducts = !showAllRows && this.totalRowsToShowNewProducts === list.length;
    }else if (id === 4) {
      this.totalRowsToShowFollows = this.adjustTotalRows(id, this.totalRowsToShowFollows, list, showAllRows);
      this.showAllRowsFollows = !showAllRows && this.totalRowsToShowFollows === list.length;
    }
  }

}
