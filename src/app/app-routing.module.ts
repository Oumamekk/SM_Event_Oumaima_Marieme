import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductDetailsComponent} from './product/product-details/product-details.component';
import {CartDetailsComponent} from './cart/cart-details/cart-details.component';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'cart', component: CartDetailsComponent},
  {path: 'search/:key', component: ProductListComponent},
  {path: 'categories/:id', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: false,
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
