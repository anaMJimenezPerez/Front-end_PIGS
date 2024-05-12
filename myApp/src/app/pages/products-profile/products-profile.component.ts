import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewproductService } from 'src/app/services/newproduct.service';

@Component({
  selector: 'app-products-profile',
  templateUrl: './products-profile.component.html',
  styleUrls: ['./products-profile.component.css']
})
export class ProductsProfileComponent implements OnInit {
  products: any[] = [];

  @ViewChild('imgContainer', { static: true }) imgContainer!: ElementRef;

  constructor(
    private router: Router,
    private newProductService: NewproductService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.newProductService.currentProducts.subscribe(products => {
      this.products = products;
    });
  }

  loadImage(event: any, product: any) {
    const imgElement: HTMLImageElement = event.target;
    this.adjustImageSize(imgElement, product);
  }

  adjustImageSize(img: HTMLImageElement, product: any) {
    const container = this.imgContainer.nativeElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const containerRatio = containerWidth / containerHeight;
    const imgRatio = imgWidth / imgHeight;

    if (containerRatio > imgRatio) {
      this.renderer.setStyle(img, 'width', '100%');
      this.renderer.setStyle(img, 'height', 'auto');
    } else {
      this.renderer.setStyle(img, 'width', 'auto');
      this.renderer.setStyle(img, 'height', '100%');
    }
  }

  navigateToNewProduct() {
    localStorage.setItem('profileAccess', 'true');
    this.router.navigate(['/newproduct']);
  }

  addStock(product: any) {
    product.stock += 1;
    this.newProductService.updateProduct(product);
    console.log(`Stock after adding: ${product.stock}`);
  }

  deleteProduct(product: any): void {
    this.products = this.products.filter(p => p !== product);
  }
}