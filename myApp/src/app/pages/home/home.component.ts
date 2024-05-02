import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  products: Product[] = [];
  productImages: any[] = [];
  newProducts: Product[] = [];

  allUser: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
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
  }

  //Button the Show More
  totalRowsToShow: number = 4;
  totalRowsToShowFavorite: number = 4;
  totalRowsToShowNewProducts: number = 4;
  showAllRows: boolean = false;
  showAllRowsFavorite: boolean = false;
  showAllRowsNewProducts: boolean = false;

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
    }
  }

}
