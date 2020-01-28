import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', { static: false }) txtProgress: ElementRef;

  @Input() legend = 'Leyenda';
  @Input() progress = 50;

  @Output() changeValueEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChanges(value: number): void {
    // const elementHTML: any = document.getElementsByName('progress')[0];
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    // elementHTML.value = this.progress;
    this.txtProgress.nativeElement.value = this.progress;
    this.changeValueEvent.emit(this.progress);
  }

  changeValue(value: number): void {
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }
    this.progress += value;
    this.txtProgress.nativeElement.focus();
    this.changeValueEvent.emit(this.progress);
  }

}
