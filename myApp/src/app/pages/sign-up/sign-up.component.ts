import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { User } from 'src/app/interfaces/user';
import { SHA256 } from 'crypto-js';

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
  imageUrl: string | ArrayBuffer = "";

  signUpForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required ]),
    confirmPassword: new FormControl('', [Validators.required])
  },
    {validators: passwordsMatch() }
  )

  constructor(private router: Router, private authService: AuthUserService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.imageUrl = URL.createObjectURL(file);
        // Actualiza el atributo src de la imagen con la URL de la imagen seleccionada
        document.getElementById('userImage')?.setAttribute('src', this.imageUrl);
    }
  }

  updateImage() {
    const imageUrlInput = document.getElementById('image') as HTMLInputElement;
    const imageUrl = imageUrlInput.value.trim();
    
    if (imageUrl) {
      // Actualiza la URL de la imagen en la propiedad imageUrl
      this.imageUrl = imageUrl;
    } else {
      console.error('Please enter a valid image URL');
    }
  }

  get image(){
    return this.signUpForm.get('image');
  }

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

  navigateToDirectionFormPage(user: User) {
    const userString = JSON.stringify(user);
    this.router.navigateByUrl(`/directionFormPage?user=${encodeURIComponent(userString)}`);
  }

  submit(){
    const { image, name, email, password, confirmPassword } = this.signUpForm.value;

    if (!this.signUpForm.valid || !image || !name || !password || !email || !confirmPassword) {
      this.completeForm = false;
    } else {
    const user: User = {
        "id": 0,
        "name": name,
        "email": email,
        "password": SHA256(password).toString(),
        "creationTime": new Date().toISOString(),
        "address": "",
        "lastViewed": 0,
        "favorites": "",
        "image": image
    };
      this.authService.signup(user)
      .subscribe(
        (response) => {
          console.log("Usuario registrado exitosamente:", response);
        }
      );
      this.completeForm = true;
      this.navigateToDirectionFormPage(user);
    }
    this.logear();
  }

  logear(){
    const { name, email, password, confirmPassword } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email || !confirmPassword) {
      this.completeForm = false;
    } else {
      this.authService.login(email, password)
      .subscribe(response => {
        console.log(response);
      });
    }
  }
}
