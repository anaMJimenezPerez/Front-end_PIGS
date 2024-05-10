import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';

export function passwordsMatch(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent {

  completeForm = true;

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required ]),
    confirmPassword: new FormControl('', [Validators.required])
  },
    {validators: passwordsMatch() }
  )

  constructor(private router: Router) {}

  get name(){
    return this.signUpForm.get('name');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirmPassword(){
    return this.signUpForm.get('confirmPassword');
  }

  navigateToDirectionFormPage() {
    this.router.navigateByUrl('/directionFormPage');
  }

  submit(){
    const { name, email, password, confirmPassword } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email || !confirmPassword) {
      this.completeForm = false;
    } else {
      this.completeForm = true;
      this.router.navigateByUrl('/directionFormPage');
    }
  }
}
