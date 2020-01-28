import { NgModule } from '@angular/core';

// Módulos
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Componentes del módulo Components
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonutComponent } from './grafico-donut/grafico-donut.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficoDonutComponent
  ],
  exports: [
    IncrementadorComponent,
    GraficoDonutComponent
  ],
  imports: [
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
