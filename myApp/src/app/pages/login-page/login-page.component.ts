import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  
  constructor(private router: Router, private authService: AuthUserService) {}

  ngOnInit(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
      this.email = rememberedEmail;
      this.password = rememberedPassword;
      this.rememberMe = true;
    }
  }

  navigateToSignUpPage() {
    this.router.navigateByUrl('/signupPage');
  }

  navigateToHomePage() {
    this.router.navigateByUrl('');
  }


  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: isAuthenticated => {
        if (isAuthenticated) {
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
            localStorage.setItem('rememberedPassword', this.password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
          this.navigateToHomePage();
        } else {
          window.alert('Incorrect email or password');
        }
      },
      error: error => {
        let errorMessage = 'Failure logging in';
        if (error?.message) {
          errorMessage += ': ' + error.message;
        }
        window.alert(errorMessage);
        console.error(errorMessage, error);
      }
    });
  }

}
