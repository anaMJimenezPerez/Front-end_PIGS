import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const { product } = history.state;
    this.product = product;
  }

  selectedImage: string | undefined;

  showImage(index: number, event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.selectedImage = this.product?.images_path[index];
    }
  }


  ngOnInit(): void {
    this.selectedImage = this.product?.images_path[0];

    forkJoin([
      this.userService.getAllUser()
    ]).subscribe(([user]) =>{

      this.seller = user.find( (user:any) => user.id === this.product?.seller_id).name;

    });
  }

}
