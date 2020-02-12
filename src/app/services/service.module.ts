import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { HttpClientModule } from '@angular/common/http';

// Modal service to connect modal component and other components
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// Services from Service module
import { SettingsService, SharedService, SidebarService, UserService, LoginGuard, UploadImageService } from './services.index';

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
    LoginGuard,
    UploadImageService,
    ModalUploadService
  ]
})
export class ServiceModule { }
