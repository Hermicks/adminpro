import { NgModule } from '@angular/core';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Módulos
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// Componentes del módulo Pages
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
