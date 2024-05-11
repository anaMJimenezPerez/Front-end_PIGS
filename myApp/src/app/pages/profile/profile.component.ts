import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { forkJoin } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { ProductService } from 'src/app/services/product.service';
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
  class: number;
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
}

interface PurchaseHistory {
  id: number;
  user_id: number;
  date: string;
  total_amount: number;
}

interface PurchaseDetails {
  id: number;
  purchase_id: number;
  product_id: number;
  quantity: number;
  purchase_date: string;
  product: Product;
  seller: User;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  newproducts: any[] = [];

  //Purchase
  purchaseDetails: PurchaseDetails[] = [];
  purchaseHistory: PurchaseHistory[] = [];

  //Users
  isAuthenticated: boolean = false;
  details: any[] = [];
  users: User[] = [];

  //Products
  products: Product[] = [];
  productImages: any[] = [];

  constructor(
    /*private purchaseService: PurchaseService,*/
    /*private purchaseService: PurchaseService,*/
    private authService: AuthUserService,
    private productService: ProductService,
    private userService: UserService,
  ) { }


  /*Part the my_orders*/
  ngOnInit() {


    /*forkJoin([
      this.purchaseService.getAllPurchaseDetails(),
      this.purchaseService.getAllPurchaseHistory(),
      this.productService.getAllProducts(),
      this.productService.getAllProductImages(),
      this.userService.getAllUser(),
      this.authService.getLoggedInUserId()
    ]).subscribe(([purchaseDetails, purchaseHistory, products, productImages,users, loggedInUserId]) => {

      this.purchaseDetails = purchaseDetails;
      this.purchaseHistory = purchaseHistory;
      this.products = products;
      this.productImages = productImages;
      this.users = users;

      this.authService.currentUser$.subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.authService.getLoggedInUserId().subscribe(loggedInUserId => {
            console.log(loggedInUserId);
            this.details = this.purchaseDetails
                .filter(detail => detail.purchase_id === loggedInUserId)
                .map(detail => {
                  const product = this.products.find(product => product.id === detail.product_id);
                  const seller = this.users.find(user => user.id === product?.seller_id);
                  const purchaseHistory = this.purchaseHistory.find(purchase => purchase.id === detail.purchase_id);

                  console.log(detail);
                  console.log(product);

                  return {
                    ...detail,
                    productName: product?.name,
                    sellerName: seller?.name,
                    purchaseDate: purchaseHistory?.date,
                    price: product?.price
                  };
                });

            console.log(this.details);

            /*
            this.details = this.purchaseDetails.filter(detail => detail.purchase_id === loggedInUserId);
            console.log(`Detalles de compra para la compra con ID ${loggedInUserId}:`, this.details);

            this.details.forEach(detail => {
              products = this.products.find(product => product.id === detail.product_id);
              console.log(`Información del producto con ID ${detail.product_id}:`, products);

              users = this.users.find(user => user.id === products.seller_id);
              console.log(`Información sobre el seller con ID ${products.seller_id}:`, users);

            });


            /*
            this.details = this.purchaseDetails.filter(detail => detail.purchase_id === loggedInUserId);
            console.log(`Detalles de compra para la compra con ID ${loggedInUserId}:`, this.details);

            this.details.forEach(detail => {
              products = this.products.find(product => product.id === detail.product_id);
              console.log(`Información del producto con ID ${detail.product_id}:`, products);

              users = this.users.find(user => user.id === products.seller_id);
              console.log(`Información sobre el seller con ID ${products.seller_id}:`, users);

            });

          });
        }
      });
    });
  }*/

}

    /* delete button*/

    confirmDelete() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        console.log('Account deleted');
      }
    }
  }
