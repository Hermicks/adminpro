import { NgModule } from '@angular/core';

// Componentes del módulo Shared
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
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
