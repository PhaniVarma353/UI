import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, ProjComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginService } from './services/login-service';
import { CommonModule } from '@angular/common';
import { ProjectPropertiesService } from './services/project-properties-service';
import { ContactusService } from './services/contact-us-service';
import { AddressService } from './services/address-service';

@NgModule({
  declarations: [
    AppComponent, ProjComponents,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [UserService, LoginService, ProjectPropertiesService, ContactusService, AddressService],
  bootstrap: [AppComponent],
  exports: [ProjComponents]
})
export class AppModule { }
