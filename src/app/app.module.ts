import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';
import { CheckoutService } from './services/checkout.service';
import { CustomerService } from './services/customer.service';

import { UserComponent } from './user/user.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutItemsComponent } from './checkout-items/checkout-items.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    CategoryListComponent,
    ContactFormComponent,
    CheckoutComponent,
    CheckoutItemsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
  ],
  providers: [
    ProductService,
    CartService,
    CategoryService,
    CustomerService,
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
