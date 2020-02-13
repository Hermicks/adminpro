import { Injectable, EventEmitter } from '@angular/core';
import { UserService, HospitalService, DoctorService } from 'src/app/services/services.index';

// Models
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class SearchByTypeService {

  searchByTypeNotificacion: EventEmitter<any> = new EventEmitter<any>();
  searchByTypeNotificacionUsers: EventEmitter<any> = new EventEmitter<any>();
  searchByTypeNotificacionHospitals: EventEmitter<any> = new EventEmitter<any>();
  searchByTypeNotificacionDoctors: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private userService: UserService,
    private hospitalService: HospitalService,
    private doctorService: DoctorService
  ) { }

  searchByType(type: string, value: string): void {
    switch (type) {
      case 'usuarios':
        this.userService.searchUser(value).subscribe(
          (resp: User[]) => {
            this.searchByTypeNotificacionUsers.emit(resp);
          }
        );
        break;
      case 'hospitales':
        this.hospitalService.searchHospital(value).subscribe(
          (resp: Hospital[]) => {
            this.searchByTypeNotificacionHospitals.emit(resp);
          }
        );
        break;
      case 'medicos':
        this.doctorService.searchDoctor(value).subscribe(
          (resp: Doctor[]) => {
            this.searchByTypeNotificacionDoctors.emit(resp);
          }
        );
        break;
      default:
        this.searchByTypeNotificacion.emit();
        break;
    }
  }
}
