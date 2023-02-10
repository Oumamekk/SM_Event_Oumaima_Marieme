import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
//import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import {MenuComponent} from "./menu/menu.component";
//import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  //{path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartDetailsComponent},
  {path: 'search/:key', component: ProductListComponent},
  {path: 'categories/:id', component: ProductListComponent},
  //{path: 'categories/:name', component: MenuComponent},
  //{path: 'categories', component: MenuComponent},
  //{path: 'productsCategory/:id', component: MenuComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductListComponent},
  //{path: '' , redirectTo: 'MenuComponent', pathMatch: 'full'},
  //{path: '', pathMatch: 'full',component: MenuComponent},
  {path: '', pathMatch: 'full', redirectTo: 'products'}
  //{path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
