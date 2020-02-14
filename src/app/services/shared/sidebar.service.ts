import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any;

  constructor(
    private userService: UserService
  ) { }

  loadMenu(): void {
    this.menu = this.userService.menu;
  }
}
