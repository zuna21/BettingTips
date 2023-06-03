import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TipsComponent } from './tips/tips.component';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './create/create.component';
import { CreatePackageComponent } from './create/create-package/create-package.component';
import { CreateTipComponent } from './create/create-tip/create-tip.component';
import { PackageListComponent } from './package-list/package-list.component';
import { authGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {
    path: '', 
    canActivate: [authGuard()],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'tips/:id', component: TipsComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'create', component: CreateComponent},
      {path: 'create-package', component: CreatePackageComponent},
      {path: 'create-tip', component: CreateTipComponent},
      {path: 'package-list', component: PackageListComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
