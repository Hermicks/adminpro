import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { HttpClientModule } from '@angular/common/http';

// Services from Service module
import { SettingsService, SharedService, SidebarService, UserService, LoginGuard } from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard
  ]
})
export class ServiceModule { }
