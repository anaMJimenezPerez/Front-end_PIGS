import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DirectionFormComponent } from './pages/direction-form/direction-form.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'signupPage', component: SignUpComponent },
  { path: 'directionFormPage', component: DirectionFormComponent },
  { path: 'ShoppingCart', component: ShoppingCartComponent},
  { path: 'product', component: ProductComponent},
  { path: 'user', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
