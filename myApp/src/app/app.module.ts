import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuProfileComponent } from './components/menu-profile/menu-profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DirectionFormComponent } from './pages/direction-form/direction-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductsProfileComponent } from './pages/products-profile/products-profile.component';
import { OrdersProfileComponent } from './pages/orders-profile/orders-profile.component';
import { FavouritesProfileComponent } from './pages/favourites-profile/favourites-profile.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    MenuProfileComponent,
    LoginPageComponent,
    SignUpComponent,
    DirectionFormComponent,
    ShoppingCartComponent,
    ProductComponent,
    UserComponent,
    ProfilePictureComponent,
    ProfileComponent,
    ProductsProfileComponent,
    OrdersProfileComponent,
    FavouritesProfileComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
