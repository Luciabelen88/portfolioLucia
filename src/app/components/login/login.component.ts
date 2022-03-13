import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit { 

  invalidLoggedIn = "hidden"; 
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  invalidLogin: boolean = true;

  onSubmit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.service
        .login({ email: this.email?.value, password: this.password?.value })
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['/']);
          } else {
            this.invalidLoggedIn = "visible";
            setTimeout(() => {this.invalidLoggedIn = "hidden"}, 3000)
          }
        }); 
    } else {
      this.form.markAllAsTouched();
    }
  }

  constructor(public router: Router, public service: AuthService) {}

  

  ngOnInit(): void {}
}
