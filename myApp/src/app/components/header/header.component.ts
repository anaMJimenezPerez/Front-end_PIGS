import { Component, OnDestroy,HostListener  } from '@angular/core';
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
  mostrarBusqueda = false;
  mostrarBusquedaSubmenu = false;
  isLessThan1070 = window.innerWidth < 1070;
  isLessThan850 = window.innerWidth < 850;

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

  toggleSearch() {
    this.mostrarBusqueda = !this.mostrarBusqueda;
  }

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event) {
    this.isLessThan1070 = window.innerWidth < 1070;
    this.isLessThan850 = window.innerWidth < 850;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
