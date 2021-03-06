import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { EditComponent } from './components/users/edit/edit.component';
import { EditComponent as EditNewsComponent } from './components/news/edit/edit.component';
import { UserListComponent } from './components/users/list/user-list.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path : 'home', component : HomeComponent},
  { path : 'user_list', component : UserListComponent},
  { path : 'payments', component : PaymentsComponent, canActivate : [AuthGuard]},
  { path : 'news', component : NewsComponent, canActivate : [AuthGuard]},
  { path : 'news/:id', component : EditNewsComponent, canActivate : [AuthGuard]},
  { path : 'users', component : UsersComponent, canActivate : [AuthGuard]},
  { path : 'users/:id', component : EditComponent, canActivate : [AuthGuard]},
  { path : 'login', component : LoginComponent},
  { path : '**', pathMatch : 'full', redirectTo : 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
