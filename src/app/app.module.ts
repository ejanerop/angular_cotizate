import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ToMonthPipe } from './pipes/to-month.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { EditComponent } from './components/users/edit/edit.component';
import { EditComponent as EditNewsComponent} from './components/news/edit/edit.component';
import { NewComponent } from './components/home/new/new.component';
import { StoriesComponent } from './components/stories/stories.component';
import { NewsComponent } from './components/news/news.component';
import { UserListComponent } from './components/users/list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToMonthPipe,
    NavbarComponent,
    PaymentsComponent,
    LoginComponent,
    UsersComponent,
    EditComponent,
    NewComponent,
    StoriesComponent,
    NewsComponent,
    UserListComponent,
    EditNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
