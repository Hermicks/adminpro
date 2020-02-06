import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// Config
import { URL_SERVICES } from '../../config/config';
import { USER_SERVICES } from '../../config/user/user-config.index';
import { LOGIN_SERVICES } from '../../config/login/login-config.index';

// Models
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStorage();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json');
  }

  saveIntoStorage(id: string, token: string, user: User): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // Guardamos datos en variables para cerciorarnos de si existe tanto usuario como token
    this.user = user;
    this.token = token;
  }

  loadStorage(): void {
    if (localStorage.getItem('token')) {
      // Cargamos las variables al inicio para poder cerciorarnos de si hay alguien logueado con token
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  isLogged(): boolean {
   return (this.token.length > 5) ? true : false;
  }

  login(user: User, rememberMe: boolean = false): Observable<any> {
    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    const URL: string = URL_SERVICES + LOGIN_SERVICES.login;
    return this.http.post(URL, user, { headers: this.getHeaders() }).
      pipe(
        map((resp: any) => {
          // Persistimos los datos en localStorage
          this.saveIntoStorage(resp.id, resp.token, resp.userDB);
          // Regreso una respuesta true indicando que el login ha ido bien y porque el map debe
          // devolver algo
          return true;
        })
      );
  }

  loginGoogle(token: string): Observable<any> {
    const URL: string = URL_SERVICES + LOGIN_SERVICES.googleLogin;
    return this.http.post(URL, { token }, { headers: this.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          this.saveIntoStorage(resp.id, resp.token, resp.googleUser);
          return true;
        }
      )
    );
  }

  logOut(): void {
    this.user = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Una vez hemos eliminado la persistencia de datos volvemos al login
    this.router.navigate(['/login']);
  }

  postUser(user: User): Observable<any> {
    const URL: string = URL_SERVICES + USER_SERVICES.postUser;
    return this.http.post(URL, user, { headers: this.getHeaders() })
      .pipe(
        map((resp: any) => {
          swal('Usuario creado', user.email, 'success');
          return resp.userStored;
        })
      );
  }
}
