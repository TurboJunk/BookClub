import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private as: AuthService,
              private router: Router
              ){ }

  register(name: string, password: string, confirm: string) {
    if (password == confirm){
      this.as.register(name, password).subscribe(res => {
        this.router.navigate(['/login']);
      }, error => {
        alert(error.message);
      });
    } else {
      alert("Passwords don't match");
    }
  }

  NameFormControl = new FormControl('', [
    Validators.required
  ]);

  PasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  ConfirmFormControl = new FormControl('', [
    Validators.required
  ]);
}
