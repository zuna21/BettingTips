import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './_components/nav/nav.component';
import { NavDropdownComponent } from './_components/nav-dropdown/nav-dropdown.component';
import { DropdownSvgComponent } from './_components/svg/dropdown-svg/dropdown-svg.component';
import { DownArrowSvgComponent } from './_components/svg/down-arrow-svg/down-arrow-svg.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PackageCardComponent } from './_components/package-card/package-card.component';
import { TipsComponent } from './tips/tips.component';
import { TipPanelComponent } from './_components/tip-panel/tip-panel.component';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './create/create.component';
import { CreatePackageComponent } from './create/create-package/create-package.component';
import { CreateTipComponent } from './create/create-tip/create-tip.component';
import { PackageListComponent } from './package-list/package-list.component';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './_components/user-card/user-card.component';
import { WaitingComponent } from './waiting/waiting.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NavDropdownComponent,
    DropdownSvgComponent,
    DownArrowSvgComponent,
    LoginComponent,
    RegisterComponent,
    PackageCardComponent,
    TipsComponent,
    TipPanelComponent,
    ContactComponent,
    CreateComponent,
    CreatePackageComponent,
    CreateTipComponent,
    PackageListComponent,
    UsersComponent,
    UserCardComponent,
    WaitingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
