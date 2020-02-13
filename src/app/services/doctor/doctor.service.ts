import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

// Models
import { Doctor } from 'src/app/models/doctor.model';

// Config
import { URL_SERVICES } from '../../config/config';
import { DOCTOR_SERVICES } from '../../config/medico/medico-config.index';
import { Observable } from 'rxjs';
import { SEARCH_SERVICES } from '../../config/search/search-config.index';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getDoctors(from: number = 0): Observable<any> {
    const URL: string = URL_SERVICES + DOCTOR_SERVICES.getDoctors + '?from=' + from;
    return this.http.get(URL, { headers: this.userService.getHeaders() });
  }

  getDoctorById(id: string): Observable<Doctor> {
    const URL: string = URL_SERVICES + DOCTOR_SERVICES.getDoctorById + '/' + id;
    return this.http.get(URL, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          return resp.doctor;
        }
      )
    );
  }

  searchDoctor(value: string): Observable<Doctor[]> {
    const URL: string = URL_SERVICES + SEARCH_SERVICES.specificSearch + '/medico/' + value;
    return this.http.get(URL, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          return resp.medico;
        }
      )
    );
  }

  deleteDoctor(doctor: Doctor): Observable<boolean> {
    const URL: string = URL_SERVICES + DOCTOR_SERVICES.deleteDoctor + '/' + doctor._id + '?token=' + this.userService.token;
    return this.http.delete(URL)
    .pipe(
      map(
        (resp: any) => {
          swal('Médico borrado', doctor.nombre, 'success');
          return true;
        }
      )
    );
  }

  postDoctor(doctor: Doctor): Observable<Doctor> {
    const URL: string = URL_SERVICES + DOCTOR_SERVICES.postDoctor + '?token=' + this.userService.token;
    return this.http.post(URL, doctor, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          swal('Médico creado', doctor.nombre, 'success');
          return resp.storedDoctor;
        }
      )
    );
  }

  putDoctor(doctor: Doctor, hospitalId: string) {
    const URL: string = URL_SERVICES + DOCTOR_SERVICES.putDoctor + '/' + doctor._id + '?token=' + this.userService.token;
    return this.http.put(URL, { nombre: doctor.nombre, hospital: hospitalId }, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          swal('Doctor actualizado correctamente', doctor.nombre, 'success');
          return resp.updatedDoctor;
        }
      )
    );
  }
}
