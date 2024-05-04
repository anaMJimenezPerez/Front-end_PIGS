import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  isAuthenticated$ = this.authService.currentUser$;
  private authSubscription!: Subscription;

  constructor(private router: Router, public authService: AuthUserService) {
    this.authSubscription = this.isAuthenticated$.subscribe(user => {
      this.mostrarMenu = !!user; // Mostrar el menú solo si el usuario está autenticado
    });
  }
  mostrarMenu: boolean = false;

  navigateToLogInPage() {
    this.router.navigateByUrl('/loginPage');
  }
  mostrarOpciones() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
