import { Component, OnInit  } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { FollowsService } from 'src/app/services/follows.service';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

interface Product {
  id: number;
  name: string;
  description: string;
  seller_id: number;
  seller: string;
  price: number;
  rating: number;
  creation_time: string;
  tags: string[];
  class: number;
  images_path: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: number;
  creation_time: string;
  address: number;
  last_viewed: number;
  favorites: string;
  images_path: string;
}

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
    private userService: UserService
  ) {}

  ngOnInit() {

    //Part the products
    forkJoin([
      this.productService.getAllProducts(),
      this.productService.getAllProductImages()
    ]).subscribe(([products, productImages]) => {

      //All products
      this.productImages = productImages;

      //We compare the ids and take the first image
      this.products = products.map((product: Product) => {
        const matchingImage = this.productImages.find(image => image.product_id === product.id);
        if (matchingImage) {
          return { ...product, images_path: matchingImage.images_path };
        } else {
          return { ...product, images_path: '' };
        }
      });

      //New products
      const fifteenDaysAgo = new Date();
      fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

      this.newProducts = this.products.filter(product => {
        const [day, month, year] = product.creation_time.split('/');
        const creationTime = new Date(Number(year), Number(month) - 1, Number(day));
        return creationTime >= fifteenDaysAgo;
      });

    });

    //Part the user
    forkJoin([
      this.userService.getAllUser(),
      this.userService.getAllUserImages(),
      this.followService.getAllFollows()
    ]).subscribe(([users, usersImages, follows]) => {

      //Users with images
      this.users = users.map((user: User) => {
        const matchingImage = usersImages.find( (image: any) => image.user_id === user.id);
        if (matchingImage) {
          return { ...user, images_path: matchingImage.image_path };
        } else {
          return { ...user, images_path: '' };
        }
      });

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
            image: followedUser.images_path
          };
        } else {
          return null;
        }
      });

    });
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
