import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from 'src/app/services/services.index';
import { SearchByTypeService } from '../../components/search-by-type/search-by-type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  loading = true;
  totalDoctors = 0;
  doctors: Doctor[] = [];
  from = 0;

  // Subscriptions
  subscriptionForNotificationDoctors: Subscription;
  subscriptionForNotification: Subscription;

  constructor(
    private doctorService: DoctorService,
    private searchByTypeService: SearchByTypeService
  ) { }

  ngOnInit() {
    this.loadDoctors();
    // Subscripción al componente de búsqueda por tipo
    this.subscriptionForNotificationDoctors = this.searchByTypeService.searchByTypeNotificacionDoctors.subscribe(
      (resp: Doctor[]) => {
        this.doctors = resp;
        this.loading = false;
      }
    );
    this.subscriptionForNotification = this.searchByTypeService.searchByTypeNotificacion.subscribe(
      () => {
        this.loadDoctors();
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionForNotificationDoctors.unsubscribe();
    this.subscriptionForNotification.unsubscribe();
  }

  loadDoctors(): void {
    this.loading = true,
    this.doctorService.getDoctors(this.from).subscribe(
      (resp: any) => {
        this.totalDoctors = resp.total;
        this.doctors = resp.doctors;
        this.loading = false;
      }
    );
  }

  deleteDoctor(doctor: Doctor): void {
    this.doctorService.deleteDoctor(doctor).subscribe(
      () => {
        this.loadDoctors();
      }
    );
  }

  changeFrom(value: number): void {
    const tempFrom = this.from + value;
    if (tempFrom >= this.totalDoctors) {
      return;
    }
    if (tempFrom < 0) {
      return;
    }
    this.from += value;
    this.loadDoctors();
  }

}
