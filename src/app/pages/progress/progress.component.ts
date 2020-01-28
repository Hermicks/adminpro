import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1 = 20;
  progress2 = 30;

  constructor() { }

  ngOnInit() { }

}
