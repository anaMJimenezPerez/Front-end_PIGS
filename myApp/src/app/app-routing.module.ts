import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DirectionFormComponent } from './pages/direction-form/direction-form.component';
import { NewProductComponent } from './pages/newProduct/newProduct.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'newproduct', component: NewProductComponent  },
  { path: 'signupPage', component: SignUpComponent },
  { path: 'directionFormPage', component: DirectionFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
