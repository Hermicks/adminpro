import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadImageService } from '../upload-img/upload-image.service';
import swal from 'sweetalert';

// Config
import { URL_SERVICES } from '../../config/config';
import { USER_SERVICES } from '../../config/user/user-config.index';
import { LOGIN_SERVICES } from '../../config/login/login-config.index';
import { SEARCH_SERVICES } from '../../config/search/search-config.index';

// Models
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private uploadImageService: UploadImageService
  ) {
    this.loadStorage();
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json');
  }

  saveIntoStorage(id: string, token: string, user: User, menu: any): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    // Guardamos datos en variables para cerciorarnos de si existe tanto usuario como token
    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loadStorage(): void {
    if (localStorage.getItem('token')) {
      // Cargamos las variables al inicio para poder cerciorarnos de si hay alguien logueado con token
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
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
          this.saveIntoStorage(resp.id, resp.token, resp.userDB, resp.menu);
          // Regreso una respuesta true indicando que el login ha ido bien y porque el map debe
          // devolver algo
          return true;
        }),
        catchError(err => {
          swal('Error en el login', err.error.message, 'error');
          return throwError(err.message);
        })
      );
  }

  loginGoogle(token: string): Observable<any> {
    const URL: string = URL_SERVICES + LOGIN_SERVICES.googleLogin;
    return this.http.post(URL, { token }, { headers: this.getHeaders() })
      .pipe(
        map(
          (resp: any) => {
            this.saveIntoStorage(resp.id, resp.token, resp.googleUser, resp.menu);
            return true;
          }
        )
      );
  }

  logOut(): void {
    this.user = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    // Una vez hemos eliminado la persistencia de datos volvemos al login
    this.router.navigate(['/login']);
  }

  getUsers(from: number = 0): Observable<any> {
    const URL: string = URL_SERVICES + USER_SERVICES.getUser + '?from=' + from;
    return this.http.get(URL, { headers: this.getHeaders() });
  }

  postUser(user: User): Observable<any> {
    const URL: string = URL_SERVICES + USER_SERVICES.postUser;
    return this.http.post(URL, user, { headers: this.getHeaders() })
      .pipe(
        map((resp: any) => {
          swal('Usuario creado', user.email, 'success');
          return resp.userStored;
        }),
        catchError(err => {
          swal(err.error.message, err.error.errors.message, 'error');
          return throwError(err.message);
        })
      );
  }

  putUser(user: User): Observable<any> {
    // Concatenamos el token
    const URL: string = URL_SERVICES + USER_SERVICES.putUser + '/' + user._id + '?token=' + this.token;
    return this.http.put(URL, user, { headers: this.getHeaders() })
      .pipe(
        map((resp: any) => {
          if (this.user._id === user._id) {
            const userUpdated: User = resp.userUpdated;
            this.saveIntoStorage(userUpdated._id, this.token, userUpdated, this.menu);
          }
          swal('Usuario actualizado', resp.userUpdated.nombre, 'success');
          return true;
        }),
        catchError(err => {
          swal(err.error.message, err.error.errors.message, 'error');
          return throwError(err.message);
        })
      );
  }

  searchUser(value: string): Observable<User[]> {
    const URL: string = URL_SERVICES + SEARCH_SERVICES.specificSearch + '/usuario/' + value;
    return this.http.get(URL, { headers: this.getHeaders() })
      .pipe(
        map(
          (resp: any) => {
            return resp.usuario;
          }
        )
      );
  }

  deleteUser(id: string): Observable<any> {
    const URL: string = URL_SERVICES + USER_SERVICES.deleteUser + '/' + id + '?token=' + this.token;
    return this.http.delete(URL, { headers: this.getHeaders() })
      .pipe(
        map(
          (resp: any) => {
            swal('Usuario eliminado', 'Ha eliminado al usuario ' + resp.userDeleted.nombre, 'success');
            return true;
          }
        )
      );
  }

  changeImg(file: File, id: string) {
    this.uploadImageService.uploadFile(file, 'usuarios', id)
      .then(
        (resp: any) => {
          // Actualizamos la nueva imagen
          this.user.img = resp.userUpdated.img;
          // Alerta de éxito
          swal('Avatar actualizado', this.user.nombre, 'success');
          // Persistimos datos en localStorage
          this.saveIntoStorage(id, this.token, this.user, this.menu);
        }
      )
      .catch(
        (resp) => {
          console.log(resp);
        }
      );
  }
}
