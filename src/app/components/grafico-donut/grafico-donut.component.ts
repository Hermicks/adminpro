import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-donut',
  templateUrl: './grafico-donut.component.html',
  styles: []
})
export class GraficoDonutComponent implements OnInit {

  @Input() data: number[];
  @Input() labels: Label[];
  @Input() type: ChartType;
  @Input() legend: string;

  constructor() { }

  ngOnInit() {
  }

}
