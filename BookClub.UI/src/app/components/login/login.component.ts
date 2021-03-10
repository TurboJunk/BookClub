import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private as: AuthService,
              private router: Router) { }

  login(name: string, password: string) {
    this.as.login(name, password).subscribe(res => {
      this.router.navigate(['/booklist']);
    }, error => {
      alert('Wrong login or password.')
    })
  }
}
