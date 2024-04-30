import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [
    {
    name: 'jar', price: '12€', tags: ['cat1'], rating: 1.5, creation_time: "28/03/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar1', price: '12€', tags: ['cat2'], rating: 1.6 , creation_time: "28/04/2024",urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar2', price: '12€', tags: ['cat3'], rating: 1.8, creation_time: "28/03/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar3', price: '12€', tags: ['cat4'], rating: 2.8, creation_time: "28/04/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
    name: 'jar4', price: '12€', tags: ['cat1','cat2'], rating: 5.8, creation_time: "28/03/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar5', price: '12€', tags: ['cat1','cat3'], rating: 6.8, creation_time: "28/04/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar6', price: '12€', tags: ['cat1','cat4'], rating: 1.8, creation_time: "28/04/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar7', price: '12€', tags: ['cat2','cat3'], rating: 7.8, creation_time: "28/03/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
    name: 'jar8', price: '12€', tags: ['cat2','cat4'], rating: 8.8, creation_time: "28/04/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar9', price: '12€', tags: ['cat1','cat2'], rating: 4.8, creation_time: "28/04/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar10', price: '12€', tags: ['cat1','cat2'],rating: 5.8, creation_time: "28/04/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
    {
      name: 'jar11', price: '12€', tags: ['cat1','cat2'], rating: 1.8, creation_time: "28/04/2024" ,urlImage: 'https://s1.eestatic.com/2020/08/05/imprescindibles/branded_content-marcas_destacadas-amazon_510709568_157068665_1706x960.jpg'
    },
  ]

  currentDate = new Date();
  formattedCurrentDate = `${this.currentDate.getDate()}/${this.currentDate.getMonth() + 1}/${this.currentDate.getFullYear()}`;

  productsFavorite = this.products.filter((products) => products.rating > 5.00);

  colors: string[] = [];
  filteredProducts: any[] = [];

  constructor() {
    this.products.forEach(() => this.colors.push('transparent'));
    this.filteredProducts = this.products;
    console.log(this.currentDate)
    console.log(this.formattedCurrentDate)
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


  totalRowsToShowFavorite: number = 4;
  totalRowsToShow: number = 4;
  rowsPerPage: number = 4;
  showAllRowsFavorite: boolean = false;
  showAllRows: boolean = false;

  showMore(id: number, list: any[], totalRowsToShow: number, showAllRows: boolean) {
    if (id === 1) {
      if (showAllRows) {
        this.totalRowsToShow = 4;
        this.showAllRows = false;
      } else {
        this.totalRowsToShow += this.rowsPerPage;
        if (this.totalRowsToShow >= list.length) {
          this.totalRowsToShow = list.length;
          this.showAllRows = true;
        } else {
          this.showAllRows = false;
        }
      }
    } else if (id === 2) {
      if (showAllRows) {
        this.totalRowsToShowFavorite = 4;
        this.showAllRowsFavorite = false;
      } else {
        this.totalRowsToShowFavorite += this.rowsPerPage;
        if (this.totalRowsToShowFavorite >= list.length) {
          this.totalRowsToShowFavorite = list.length;
          this.showAllRowsFavorite = true;
        } else {
          this.showAllRowsFavorite = false;
        }
      }
    }
  }

}
