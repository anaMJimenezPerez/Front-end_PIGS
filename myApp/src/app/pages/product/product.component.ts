import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  product: Product | undefined;
  user: User | undefined;
  seller: string | undefined;
  selectedImage: string | undefined;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const { product } = history.state;
    this.product = product;

    console.log(this.product);

    if (this.product && this.product.images_path && this.product.images_path.length > 0) {
      this.selectedImage = this.product.images_path[0];
    }

    if (this.product) {
      this.userService.getAllUser().subscribe(users => {
        this.user = users.find( (user:any) => user.id === this.product!.sellerId);
        this.seller = this.user?.name;
      });
    }
  }

  showImage(index: number, event: MouseEvent): void {
    if (event.target === event.currentTarget && this.product && this.product.images_path) {
      this.selectedImage = this.product.images_path[index];
    }
  }
}
