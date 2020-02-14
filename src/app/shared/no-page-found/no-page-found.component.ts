import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['no-page-found.component.scss']
})
export class NoPageFoundComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
