import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { User } from 'src/app/interfaces/user';

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
    this.authService.login(this.email, this.password)
    .subscribe(({ isAuthenticated, user }: { isAuthenticated: boolean, user: User }) => {
      if (isAuthenticated) {
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.email);
          localStorage.setItem('rememberedPassword', this.password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }
        this.navigateToHomePage(); // Asumiendo que tienes un método para navegar a la página de inicio
      } else {
        console.log("Email or password is incorrect");
      }
    });
    this.navigateToHomePage();
  }
}
