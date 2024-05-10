import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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

export class ProfileComponent implements OnInit{

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
    private purchaseService: PurchaseService,
    private authService: AuthUserService,
    private productService: ProductService,

    private userService: UserService,
    private router: Router,

  ) {}


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
            
          });
        }
      });
    });
  }

  /*Part the menu*/
  selectedOption: string = 'profile';
  selectedMenuOption: string = 'my_orders';

  selectMenuOption(option: string) {
    this.selectedMenuOption = option;
  }

  shouldShow(option: string){
    if(option === "my_orders"){
      return this.selectedMenuOption === 'my_orders';
    }else{
      return this.selectedMenuOption === 'customer_orders';
    }
  }

  /* Choose the option*/
  selectOption(option: string) {
    this.selectedOption = option;
  }

  /*Part the profile picture*/

  profilePictureUrl: string | ArrayBuffer | null = null;

  @ViewChild('profileImage') profileImage: ElementRef | undefined;

  /* icon */
  selectProfilePicture() {
    const inputElement = document.getElementById('profile-picture');
    if (inputElement) {
      inputElement.click();
    }
  }

  onProfilePictureSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
        if (this.profileImage) {
          this.profileImage.nativeElement.onload = () => {
            this.adjustImageSize();
          };
        }
      };
      reader.readAsDataURL(file);
    }
  }

  /* resize icon  */
  adjustImageSize() {
    if (this.profileImage) {
      const img = this.profileImage.nativeElement;
      const container = img.parentElement;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const imgWidth = img.width;
      const imgHeight = img.height;

      if (imgWidth && imgHeight) {
        const containerRatio = containerWidth / containerHeight;
        const imgRatio = imgWidth / imgHeight;

        if (containerRatio > imgRatio) {
          img.style.width = '100%';
          img.style.height = 'auto';
        } else {
          img.style.width = 'auto';
          img.style.height = '100%';
        }
      }
    }
  }

  /* delete button*/
  confirmDelete() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deleted');
    }
  }

}
