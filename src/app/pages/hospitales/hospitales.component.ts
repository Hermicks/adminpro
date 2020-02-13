import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService, UserService } from '../../services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { SearchByTypeService } from '../../components/search-by-type/search-by-type.service';

// Models
import { Hospital } from '../../models/hospital.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

declare const swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  loading = true;
  hospitals: Hospital[] = [];
  totalHospitals = 0;
  user: User;

  // Subscriptions
  subscriptionForNotificationHospitals: Subscription;
  subscriptionForNotification: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private userService: UserService,
    private modalUploadService: ModalUploadService,
    private searchByTypeService: SearchByTypeService
  ) { }

  ngOnInit() {
    setTimeout(() => this.loadHospitals(), 1000);
    // Recuperamos la info de usuario
    this.user = this.userService.user;
    // Evento del modal de cambio de imagen
    this.modalUploadService.modalNotification.subscribe(
      () => this.loadHospitals()
    );
    // Subscripción al componente de búsqueda por tipo
    this.subscriptionForNotificationHospitals = this.searchByTypeService.searchByTypeNotificacionHospitals.subscribe(
      (resp: Hospital[]) => {
        this.hospitals = resp;
        this.loading = false;
      }
    );
    this.subscriptionForNotification = this.searchByTypeService.searchByTypeNotificacion.subscribe(
      () => {
        this.loadHospitals();
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionForNotificationHospitals.unsubscribe();
    this.subscriptionForNotification.unsubscribe();
  }

  loadHospitals(): void {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe(
      (resp) => {
        this.hospitals = resp.hospitals;
        this.totalHospitals = resp.total;
        this.loading = false;
      }
    );
  }

  searchHospital(value: string): void {
    if (value.length <= 0) {
      this.loadHospitals();
      return;
    }
    this.loading = true;
    this.hospitalService.searchHospital(value).subscribe(
      (resp) => {
        this.hospitals = resp;
        this.loading = false;
      }
    );
  }

  saveHospital(): void {
    swal({
      title: 'Añade un nuevo hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
      .then(
        (hospitalName: string) => {
          if (hospitalName && hospitalName.length > 0) {
            const newHospital: Hospital = new Hospital(hospitalName);
            this.hospitalService.postHospital(newHospital).subscribe(
              () => {
                this.loadHospitals();
              }
            );
          } else {
            return;
          }
        }
      );
  }

  updateHospital(hospital: Hospital): void {
    // Actualizamos el hospital con los nuevos datos
    this.hospitalService.putHospital(hospital).subscribe(
      () => {
        this.loadHospitals();
      }
    );
  }

  deleteHospital(hospital: Hospital): void {
    if (this.user.role !== 'ADMIN_ROLE') {
      swal('No puedes eliminar el hospital', 'Debes ser administrador para ello', 'error');
      return;
    }
    swal({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then(
        (willDelete) => {
          if (willDelete) {
            this.hospitalService.deleteHospital(hospital._id).subscribe(
              () => {
                this.loadHospitals();
              }
            );
          }
        }
      );
  }

  showModal(id: string): void {
    this.modalUploadService.showModal('hospitales', id);
  }

}
