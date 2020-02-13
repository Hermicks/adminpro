import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';

// Models
import { Hospital } from '../../models/hospital.model';

// Config
import { URL_SERVICES } from '../../config/config';
import { HOSPITAL_SERVICES } from '../../config/hospital/hospital-config.index';
import { SEARCH_SERVICES } from '../../config/search/search-config.index';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {
    this.token = this.userService.token;
  }

  getHospitals(): Observable<any> {
    const URL: string = URL_SERVICES + HOSPITAL_SERVICES.getHospitals;
    return this.http.get(URL, { headers: this.userService.getHeaders() });
  }

  getHospitalById(id: string): Observable<Hospital> {
    const URL: string = URL_SERVICES + HOSPITAL_SERVICES.getHospitalById + '/' + id;
    return this.http.get(URL, { headers: this.userService.getHeaders() })
    .pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }

  postHospital(hospital: Hospital): Observable<any> {
    const URL: string = URL_SERVICES + HOSPITAL_SERVICES.postHospital + '?token=' + this.token;
    return this.http.post(URL, { nombre: hospital.nombre }, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          swal('Hospital creado correctamente', resp.storedHospital.nombre, 'success');
          return true;
        }
      )
    );
  }

  putHospital(hospital: Hospital): Observable<boolean> {
    const URL: string = URL_SERVICES + HOSPITAL_SERVICES.putHospital + '/' + hospital._id + '?token=' + this.token;
    return this.http.put(URL, hospital, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          swal('Hospital actualizado', resp.hospitalUpdated.nombre, 'success');
          return true;
        }
      )
    );
  }

  searchHospital(value: string): Observable<Hospital[]> {
    const URL: string = URL_SERVICES + SEARCH_SERVICES.specificSearch + '/hospital/' + value;
    return this.http.get(URL, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          return resp.hospital;
        }
      )
    );
  }

  deleteHospital(id: string): Observable<any> {
    const URL: string = URL_SERVICES + HOSPITAL_SERVICES.deleteHospital + '/' + id + '?token=' + this.token;
    return this.http.delete(URL, { headers: this.userService.getHeaders() })
    .pipe(
      map(
        (resp: any) => {
          swal('Hospital eliminado', 'Ha eliminado el hospital ' + resp.hospitalDeleted.nombre, 'success');
          return true;
        }
      )
    );
  }

}
