import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/services.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare const swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  @ViewChild('inputUser', { static: false }) inputUser: ElementRef;

  users: User[] = [];
  from = 0;
  totalRegisters = 0;
  loading = true;

  constructor(
    private userService: UserService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUsers();
    // Nos subscribimos a la notificación del modal de cambio de imagen y, si este se emite, cargamos
    // la misma página de usuarios donde estábamos
    this.modalUploadService.modalNotification.subscribe(
      () => this.loadUsers()
    );
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(
      (resp: any) => {
        this.totalRegisters = resp.total;
        this.users = resp.users;
        this.loading = false;
      }
    );
  }

  changeFrom(value: number): void {
    const tempFrom = this.from + value;
    // Check del valor actual del from para la paginación
    if (tempFrom >= this.totalRegisters) {
      return;
    }
    if (tempFrom < 0) {
      return;
    }
    this.from += value;
    this.loadUsers();
  }

  searchUser(value: string): void {
    if (value.length <= 0) {
      this.loadUsers();
      return;
    }
    this.loading = true;
    this.userService.searchUser(value).subscribe(
      (resp: User[]) => {
        this.users = resp;
        this.loading = false;
      }
    );
  }

  saveUser(user: User): void {
    this.userService.putUser(user).subscribe(
      (resp: any) => {
        console.log(resp);
      }
    );
  }

  deleteUser(user: User): void {
    if (this.userService.user._id === user._id) {
      swal('No puede borrar el usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }
    // Pantalla de estás seguro con sweetAlert
    swal({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar a ' + user.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(
      (willDelete) => {
        if (willDelete) {
          this.userService.deleteUser(user._id).subscribe(
            () => {
              this.from = 0;
              this.inputUser.nativeElement.value = '';
              this.loadUsers();
            }
          );
        }
      }
    );
  }

  showModal(id: string): void {
    this.modalUploadService.showModal('usuarios', id);
  }

}
