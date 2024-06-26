import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-direction-form',
  templateUrl: './direction-form.component.html',
  styleUrls: ['./direction-form.component.css']
})
export class DirectionFormComponent implements OnInit{
  completeForm = true;
  user: User = {
    "id": 0,
    "name": "",
    "email": "",
    "password": "",
    "creationTime": "",
    "address": "",
    "lastViewed": 0,
    "favorites": "",
    "image": ""
};


  directionForm = new FormGroup({
    street: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  })

  get street(){
    return this.directionForm.get('street');
  }
  get postalCode(){
    return this.directionForm.get('postalCode');
  }

  get province(){
    return this.directionForm.get('province');
  }
  get number(){
    return this.directionForm.get('number');
  }

  get city(){
    return this.directionForm.get('city');
  }
  get country(){
    return this.directionForm.get('country');
  }

  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UserService) {}

  navigateToDirectionFormPage() {
    this.router.navigateByUrl('');
  }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      const userString = params['user'];
      if (userString) {
        const user = JSON.parse(decodeURIComponent(userString));
        this.user = user;
      }
    });
  }

  save(){
    let userParams: User = {
      "id": 0,
      "name": "",
      "email": "",
      "password": "",
      "creationTime": "",
      "address": "",
      "lastViewed": 0,
      "favorites": "",
      "image": ""
    };
    const { street, postalCode, province, number, city, country } = this.directionForm.value;

    if (!this.directionForm.valid || !street || !postalCode || !province || !number || !city || !country) {
      this.completeForm = false;
    } else {
      const address = 'Street ' + street + " " + number + ", City " + city + ", CP " + postalCode + ", province " + province + ", country " + country;

      this.userService.getUserInfo(this.user.email)
      .subscribe(
        (response) => {
          userParams = response[0];

          this.user = {
            "id": userParams.id,
            "name": userParams.name,
            "email": userParams.email,
            "password": userParams.password,
            "creationTime": userParams.creationTime,
            "address": address,
            "lastViewed": userParams.lastViewed,
            "favorites": userParams.favorites,
            "image": userParams.image
          };
          this.userService.userDirectionInfo(userParams.id, this.user).subscribe(
            (response) => {
              console.log("Usuario registrado exitosamente:", response);

            }
          );
        }
      );

      this.navigateToDirectionFormPage();
    }
  }
}
