import { NgModule } from '@angular/core';

// Módules
import { RouterModule } from '@angular/router';
// El CommonModule se encarga de directivas básicas como el NgIf o NgFor
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Componentes del módulo Shared
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    NoPageFoundComponent,
    SidebarComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    NoPageFoundComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
