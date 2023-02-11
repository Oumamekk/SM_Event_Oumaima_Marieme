import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { CartStatusComponent } from './cart/cart-status/cart-status.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { WishlistDetailsComponent } from './wishlist/wishlist-details/wishlist-details.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { WishlistStatusComponent } from './wishlist/wishlist-status/wishlist-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    CartDetailsComponent,
    CartStatusComponent,
    ProductDetailsComponent,
    ProductSearchComponent,
    WishlistDetailsComponent,
    WishlistStatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
