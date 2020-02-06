import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/services.index';
import { User } from '../models/user.model';
import { CLIENT_ID } from '../config/config';

declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe = false;
  email: string;
  auth2: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    initPlugins();
    // Info de Google
    this.googleInit();
    // Si hemos puesto la opción de recuérdame previamente, recuperamos la info de email
    this.email = localStorage.getItem('email') || '';
    // Si recuperamos el mail, dejamos el check de recuérdame
    if (this.email.length > 1) {
      this.rememberMe = true;
    }
  }

  googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element: HTMLElement): void {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile: any = googleUser.getBasicProfile();
      // console.log(profile);
      // Get Google token
      const token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token).subscribe(
        () => {
          // # -> no recargo la aplicación
          // Para evitar que el css se descoloque tenemos que realizar una redirección manual
          window.location.href = '#/dashboard';
        }
      );
    });
  }

  startSession(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }
    const user: User = new User(null, loginForm.value.email, loginForm.value.password);
    this.userService.login(user, loginForm.value.rememberMe).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
