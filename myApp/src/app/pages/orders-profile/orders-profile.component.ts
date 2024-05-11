import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-profile',
  templateUrl: './orders-profile.component.html',
  styleUrls: ['./orders-profile.component.css']
})
export class OrdersProfileComponent {

  selectedMenuOption: string = 'my_orders';

  selectMenuOption(option: string) {
    this.selectedMenuOption = option;
  }

  shouldShow(option: string) {
    if (option === "my_orders") {
      return this.selectedMenuOption === 'my_orders';
    } else {
      return this.selectedMenuOption === 'customer_orders';
    }
  }
}
