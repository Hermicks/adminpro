import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { HttpClientModule } from '@angular/common/http';

// Modal service to connect modal component and other components
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// Search by type service to connect components of maintenance
import { SearchByTypeService } from '../components/search-by-type/search-by-type.service';

// Services from Service module
import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  HospitalService,
  DoctorService,
  UploadImageService,
  LoginGuard,
  AdminGuard
} from './services.index';

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
    HospitalService,
    DoctorService,
    UploadImageService,
    ModalUploadService,
    SearchByTypeService,
    LoginGuard,
    AdminGuard
  ]
})
export class ServiceModule { }
