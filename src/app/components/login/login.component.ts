import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit { 
  
  // captcha: string;
  // captchaVisi: boolean;
  //siteKey: string = environment.recaptcha.siteKey;

  loadingRequest: string = 'hidden';
  invalidLoggedIn = "hidden"; 
  
  form = new FormGroup({
    user_name: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  get user_name() {
    return this.form.get('user_name');
  }
  get password() {
    return this.form.get('password');
  }

  invalidLogin: boolean = true;

  onSubmit(event: Event) {
    event.preventDefault;
    this.loadingRequest = 'visible';
    if (this.form.valid) {
      this.service
        .login({ username: this.user_name?.value, password: this.password?.value })
        .subscribe({
          next: (response) => {
            this.loadingRequest = 'hidden';
            this.router.navigate(['/']);
          },
          error: () => {
            this.loadingRequest = 'hidden';
            this.invalidLoggedIn = 'visible';
          },
        });
    } else {
      this.loadingRequest = 'hidden';
      this.form.markAllAsTouched();
    }
  }


  constructor(public router: Router, public service: AuthService,) {
    // (this.captcha = ''), (this.captchaVisi = false);
  }

  // resolve(captchaResponse: string) {
  //   this.captcha = captchaResponse;
  //   this.captchaVisi = false;
  // }

  ngOnInit(): void {}
}
