import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatDialogModule} from '@angular/material/dialog';

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
import { EditUserDialogComponent } from './_components/edit-user-dialog/edit-user-dialog.component';
import { LoadingSpinnerComponent } from './_components/loading-spinner/loading-spinner.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ConfirmationsDialogComponent } from './_components/confirmations-dialog/confirmations-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { ServerErrorComponent } from './_components/server-error/server-error.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';



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
    EditUserDialogComponent,
    LoadingSpinnerComponent,
    ConfirmationsDialogComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
