import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { 
    path: 'profile', 
    component: ProfileComponent,
    children: [
      { path: 'products', component: ProfileComponent },
      { path: 'income', component: ProfileComponent },
      { path: 'subscriptions', component: ProfileComponent },
      { path: 'orders', component: ProfileComponent },
      { path: 'favourites', component: ProfileComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' } // Ruta por defecto, redirige a 'products'
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
