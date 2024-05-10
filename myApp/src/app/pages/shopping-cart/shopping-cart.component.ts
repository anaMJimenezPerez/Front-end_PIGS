import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  userCartIsEmpty: boolean = false;

  constructor(private userService: UserService, private authService: AuthUserService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.userService.userCartIsEmpty(user.email).subscribe((isEmpty: boolean) => {
          this.userCartIsEmpty = isEmpty;
        });
      }
    });

    
  }
}
