import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AUTH_API_URL, CLUB_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { AviablebooksComponent } from './components/aviablebooks/aviablebooks.component';
import { ReactiveFormsModule } from '@angular/forms';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BooklistComponent,
    AviablebooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains : environment.tokenWhiteListedDomains
      }
    })

  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  },
  {
    provide: CLUB_API_URL,
    useValue: environment.clubApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
