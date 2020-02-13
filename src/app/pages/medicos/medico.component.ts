import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService, HospitalService } from 'src/app/services/services.index';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  doctor: Doctor = new Doctor('', '', '', '', '');

  constructor(
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private router: Router,
    private routes: ActivatedRoute,
    private modalUploadService: ModalUploadService
  ) {
    this.routes.params.subscribe(
      (params) => {
        const id: string = params.id;
        // Comprobamos en que página nos encontramos
        if (id !== 'new') {
          this.loadDoctor(id);
        }
      }
    );
  }

  ngOnInit() {
    // Carga de hospitals
    this.hospitalService.getHospitals().subscribe(
      (resp: any) => {
        this.hospitals = resp.hospitals;
      }
    );
    // Subscripcion a modal de img
    this.modalUploadService.modalNotification.subscribe(
      (resp: any) => {
        this.doctor.img = resp.doctorUpdated.img;
      }
    );
  }

  loadDoctor(id: string): void {
    this.doctorService.getDoctorById(id).subscribe(
      (doctor) => {
        this.doctor = doctor;
        if (this.doctor.hospital) {
          this.doctor.hospital = doctor.hospital['_id'];
          this.changeHospital(this.doctor.hospital);
        }
      }
    );
  }

  validateDoctor(doctorForm: NgForm): void {
    if (doctorForm.invalid) {
      return;
    }
    if (this.doctor._id) {
      // Existe el id, actualizamos
      this.doctorService.putDoctor(this.doctor, this.hospital._id).subscribe(
        (doctorUpdated) => {
          this.doctor = doctorUpdated;
        }
      );
    } else {
      // No existe el id, estamos creando un médico nuevo
      this.doctorService.postDoctor(this.doctor).subscribe(
        (doctor: any) => {
          this.doctor = doctor;
          this.router.navigate(['/medico', doctor._id]);
        }
      );
    }
  }

  changeHospital(id: string): void {
    this.hospitalService.getHospitalById(id).subscribe(
      (hospital) => {
        this.hospital = hospital;
      }
    );
  }

  showModal(id: string): void {
    this.modalUploadService.showModal('medicos', id);
  }

}
