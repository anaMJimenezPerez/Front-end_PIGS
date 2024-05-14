import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { User } from 'src/app/interfaces/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  
  email = "";
  password =   "";
  
  rememberMe: boolean = false;
  
  //No funciona el remember me
  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
  }

  constructor(private router: Router, private authService: AuthUserService) {}

  logInForm = new FormGroup({
    emailControl: new FormControl('', [Validators.email, Validators.required]),
    passwordControl: new FormControl('', [Validators.required])
  }
  )

  get emailControl(){
    return this.logInForm.get('emailControl');
  }
  get passwordControl(){
    return this.logInForm.get('passwordControl');
  }

  ngOnInit(): void {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (this.rememberMe && rememberedEmail && rememberedPassword) {
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
    .subscribe({
      next: ({ isAuthenticated, user }: { isAuthenticated: boolean, user: User }) => {
        if (isAuthenticated) {
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
            localStorage.setItem('rememberedPassword', this.password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
            this.rememberMe = false;
          }
          this.navigateToHomePage();
        } else {
          console.log("Email or password is incorrect");
        }
      },
      error: (error: any) => {
        window.alert("Incorrect user email or password");
        console.error("An error occurred:", error);
        return;
        }
    });
  
  }
}
