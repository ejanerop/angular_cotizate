import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { EditComponent } from './components/users/edit/edit.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path : 'home', component : HomeComponent},
  { path : 'news', component : NewsComponent},
  { path : 'payments', component : PaymentsComponent, canActivate : [AuthGuard]},
  { path : 'users', component : UsersComponent, canActivate : [AuthGuard]},
  { path : 'users/:id', component : EditComponent, canActivate : [AuthGuard]},
  { path : 'login', component : LoginComponent},
  { path : '**', pathMatch : 'full', redirectTo : 'news' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
