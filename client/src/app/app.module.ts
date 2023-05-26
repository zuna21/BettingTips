import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './_components/nav/nav.component';
import { NavDropdownComponent } from './_components/nav-dropdown/nav-dropdown.component';
import { DropdownSvgComponent } from './_components/svg/dropdown-svg/dropdown-svg.component';
import { DownArrowSvgComponent } from './_components/svg/down-arrow-svg/down-arrow-svg.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NavDropdownComponent,
    DropdownSvgComponent,
    DownArrowSvgComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
