import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css']
})
export class MenuProfileComponent {
 /* currentOption: string = '';

  constructor(private router: Router) {}

  selectOption(option: string) {
    this.currentOption = option;
    this.router.navigateByUrl(`/${option}`);
  }

  isActive(option: string): boolean {
    return this.currentOption === option;
  }*/
}