import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  
  constructor(private router: Router, private authService: AuthUserService) {}

  navigateToSignUpPage() {
    this.router.navigateByUrl('/signupPage');
  }

  navigateToHomePage() {
    this.router.navigateByUrl('');
  }


  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: isAuthenticated => {
        if (isAuthenticated) {
          this.navigateToHomePage();
          this.authService.login(this.email, this.password);
        } else {
          window.alert('Nombre de usuario o contraseña incorrectos');
        }
      },
      error: error => {
        let errorMessage = 'Error al iniciar sesión';
      if (error && error.message) {
        errorMessage += ': ' + error.message;
      }
      window.alert(errorMessage);
      console.error(errorMessage, error);
      }
    });
  }

}
