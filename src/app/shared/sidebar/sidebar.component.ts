import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/services.index';
import { UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

}
