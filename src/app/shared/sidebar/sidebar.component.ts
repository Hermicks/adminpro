import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services.index';
import { UserService } from 'src/app/services/services.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(
    public sidebarService: SidebarService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

}
