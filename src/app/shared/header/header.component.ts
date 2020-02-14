import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/services.index';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;

  user: User;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  searchTerm(term: string): void {
    this.router.navigate(['/search', term]);
    this.inputSearch.nativeElement.value = '';
  }

}
