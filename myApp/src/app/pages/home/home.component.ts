import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [
    {
    name: 'jar', price: '12€', tags: ['cat1'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar1', price: '12€', tags: ['cat2'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar2', price: '12€', tags: ['cat3'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar3', price: '12€', tags: ['cat4'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar4', price: '12€', tags: ['cat1','cat2'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
      },
      {
        name: 'jar5', price: '12€', tags: ['cat1','cat3'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
      },
      {
        name: 'jar6', price: '12€', tags: ['cat1','cat4'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
      },
      {
        name: 'jar7', price: '12€', tags: ['cat2','cat3'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
      },
      {
        name: 'jar8', price: '12€', tags: ['cat2','cat4'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
        },
        {
          name: 'jar9', price: '12€', tags: ['cat1','cat2'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
        },
        {
          name: 'jar10', price: '12€', tags: ['cat1','cat2'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
        },
        {
          name: 'jar11', price: '12€', tags: ['cat1','cat2'] ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
        },
  ]

  colors: string[] = [];
  filteredProducts: any[] = [];

  constructor() {
    this.products.forEach(() => this.colors.push('transparent'));
    this.filteredProducts = this.products;
  }

  changeColor(index: number) {
    this.colors[index] = this.colors[index] === 'transparent' ? '#00ADB5' : 'transparent';
  }

  selectedCategories: string[] = [];

  filterProducts(category: string) {
    if (this.selectedCategories.includes(category)) {

      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    } else {

      this.selectedCategories.push(category);
    }

    if (this.selectedCategories.length === 0) {

      this.filteredProducts = this.products;
    } else {

      this.filteredProducts = this.products.filter(product => {
        return product.tags.some((tag:string) => this.selectedCategories.includes(tag));
      });
    }
  }

  /*
  totalRowsToShow: number = 4;
  showAllRows: boolean = false;

  showMore() {
    this.showAllRows = !this.showAllRows;
    this.totalRowsToShow = this.showAllRows ? this.filteredProducts.length : 4;
  }*/

  totalRowsToShow: number = 4;
  rowsPerPage: number = 4;
  showAllRows: boolean = false;

  showMore() {
    if (this.showAllRows) {
      this.totalRowsToShow = 4;
      this.showAllRows = false;
    } else {
      this.totalRowsToShow += this.rowsPerPage;
      if (this.totalRowsToShow >= this.filteredProducts.length) {
        this.totalRowsToShow = this.filteredProducts.length;
        this.showAllRows = true;
      } else {
        this.showAllRows = false;
      }
    }
  }
}
