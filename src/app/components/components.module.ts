import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Componentes del módulo Components
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonutComponent } from './grafico-donut/grafico-donut.component';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    GraficoDonutComponent,
    ModalUploadComponent
  ],
  exports: [
    IncrementadorComponent,
    GraficoDonutComponent,
    ModalUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class ComponentsModule { }
