import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  product: Product | undefined;
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const { user } = history.state;
  }

  ngOnInit(): void {

    forkJoin([
      this.userService.getAllUser()
    ]).subscribe(([user]) =>{



    });
  }
}
