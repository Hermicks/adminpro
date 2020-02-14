import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService
  ) { }

  canActivate(): boolean {
    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    }
    console.log('Bloqueado por adminguard');
    this.userService.logOut();
    return false;
  }

}
