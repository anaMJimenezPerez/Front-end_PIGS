import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
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

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const { product } = history.state;
    this.product = product;

    if (this.product) {
      this.userService.getAllUser().subscribe(users => {
        this.user = users.find( (user:any) => user.id === this.product!.sellerId);
        this.seller = this.user?.name;
      });
    }
  }
}
