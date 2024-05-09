import { Component, OnInit  } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { FollowsService } from 'src/app/services/follows.service';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';

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
  follows: any[] = [];
  isAuthenticated: boolean = false;
  followedUsers: any[] = [];
  users: User[] = [];
  usersImages: any[] = [];

  constructor(
    private productService: ProductService,
    private followService: FollowsService,
    private authService: AuthUserService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {

    //Part the products
    forkJoin([
      this.productService.getAllProducts(),
      this.productService.getAllProductImages()
    ]).subscribe(([products, productImages]) => {

      //Images the product
      const productImagesMap = new Map<number, string[]>();
      productImages.forEach((image: any) => {
        const productId = image.product_id;
        if (!productImagesMap.has(productId)) {
          productImagesMap.set(productId, []);
        }
        productImagesMap.get(productId)?.push(image.images_path);
      });

      // Products with image
      this.products = products.map((product: Product) => {
        const images = productImagesMap.get(product.id) || [];
        return { ...product, images_path: images };
      });
      //New products
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

      this.newProducts = this.products.filter(product => {
        const [year, month, day] = product.creation_time.split('T')[0].split('-');
        const creationTime = new Date(Number(year), Number(month) - 1, Number(day));
        return creationTime >= fifteenDaysAgo;
      });

    });

    //Part the user
    forkJoin([
      this.userService.getAllUser(),
      this.followService.getAllFollows()
    ]).subscribe(([users, follows]) => {

      this.users = users;

      //Authenticated
      this.authService.currentUser$.subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.authService.getLoggedInUserId().subscribe(loggedInUserId => {
            this.follows = follows.filter((follow: any) => follow.follower_id === loggedInUserId);
          });
        }
      });

      this.followedUsers = this.follows.map((follow) => {
        const followedUser = this.users.find((user) => user.id === follow.followed_id);
        if (followedUser) {
          return {
            id: followedUser.id,
            name: followedUser.name,
            image: followedUser.image
          };
        } else {
          return null;
        }
      });

    });
  }

  productDetails(product: Product){
    this.router.navigateByUrl('/product', { state: { product } });
  }

  //Button the Show More
  totalRowsToShow: number = 4;
  totalRowsToShowFavorite: number = 4;
  totalRowsToShowNewProducts: number = 4;
  totalRowsToShowFollows: number = 4;
  showAllRows: boolean = false;
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
      this.totalRowsToShowFavorite = this.adjustTotalRows(id, this.totalRowsToShowFavorite, list, showAllRows);
      this.showAllRowsFavorite = !showAllRows && this.totalRowsToShowFavorite === list.length;
    } else if (id === 3) {
      this.totalRowsToShowNewProducts = this.adjustTotalRows(id, this.totalRowsToShowNewProducts, list, showAllRows);
      this.showAllRowsNewProducts = !showAllRows && this.totalRowsToShowNewProducts === list.length;
    }else if (id === 4) {
      this.totalRowsToShowFollows = this.adjustTotalRows(id, this.totalRowsToShowFollows, list, showAllRows);
      this.showAllRowsFollows = !showAllRows && this.totalRowsToShowFollows === list.length;
    }
  }

}
