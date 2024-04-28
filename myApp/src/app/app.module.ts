import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
