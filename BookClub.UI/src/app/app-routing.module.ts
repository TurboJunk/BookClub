import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AviablebooksComponent } from './components/aviablebooks/aviablebooks.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booklist', component: BooklistComponent, canActivate: [AuthGuard] },
  { path: 'aviablebooks', component: AviablebooksComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
