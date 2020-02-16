import { NgModule } from '@angular/core';

// Rutas
import { PagesRoutingModule } from './pages-routing.module';

// Módulos
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Componentes del módulo Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { SearchComponent } from './search/search.component';

// Incrementador
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
// Gráfico de donut
import { GraficoDonutComponent } from '../components/grafico-donut/grafico-donut.component';
// SearchByType
import { SearchByTypeComponent } from '../components/search-by-type/search-by-type.component';
// Loading
import { LoadingComponent } from '../components/loading/loading.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    SearchComponent,
    IncrementadorComponent,
    GraficoDonutComponent,
    SearchByTypeComponent,
    LoadingComponent
  ],
  imports: [
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    CommonModule,
    PipesModule
  ]
})
export class PagesModule { }
