
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
import { ShippingService } from './services/shipping.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { AddressService } from './services/address.service';
import { OrderService } from './services/order.service';

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
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { DropdownComponent } from './dropdown/dropdown.component';

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
    CheckoutItemsComponent,
    OrderComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    CheckoutAddressComponent,
    DropdownComponent
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
    CheckoutService,
    ShippingService,
    AuthService,
    UserService,
    AuthGuard,
    AddressService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
