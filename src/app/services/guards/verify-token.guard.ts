import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    const token: string = this.userService.token;
    // Descodificamos la info del token con la función atob, encargada de descodificar una cadena de datos que ha sido codificada
    // en base 64
    const payload: any = JSON.parse(atob(token.split('.')[1]));
    const expired: boolean = this.expired(payload.exp);
    // Ha expirado
    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verifyRenew(payload.exp);
  }

  expired(expiredDate: number): boolean {
    // Dividimos entre 1000 para pasarlo de milliseconds a seconds
    const now: number = new Date().getTime() / 1000;
    // Si la fecha actual es mayor que la del token, en efecto, este ha expirado
    if (expiredDate < now) {
      return true;
    } else {
      return false;
    }
  }

  verifyRenew(expiredDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Convertimos la fecha del token a una fecha presente
      // Multiplicamos por 1000 porque la fecha está en segundos y la queremos en milliseconds
      const tokenExp = new Date(expiredDate * 1000);
      const now = new Date();
      // Confirmamos si faltan cuatro horas para que el token expire
      // Sumamos cuatro horas al tiempo actual
      now.setTime(now.getTime() + (4 * 60 * 60 * 1000));
      // Si la fecha del token es superior a la actual + 4 horas, significa que aún es válido
      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        // Si el token está próximo a expirar, ya que es menos que la fecha actual + 4 horas, renovamos token
        this.userService.renewToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            reject(false);
            this.router.navigate(['/login']);
          }
        );
      }
    });
  }

}
