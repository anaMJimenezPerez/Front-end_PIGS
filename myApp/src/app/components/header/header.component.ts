import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthUserService) {}

  mostrarMenu: boolean = false;

  navigateToLogInPage() {
    this.router.navigateByUrl('/loginPage');
  }

  mostrarOpciones() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}
