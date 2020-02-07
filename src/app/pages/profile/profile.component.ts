import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/services.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imgToUpload: File;
  temporaryImg: string | ArrayBuffer;

  constructor(
    private userService: UserService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  updateUser(user: User): void {
    this.user.nombre = user.nombre;
    if (!this.user.google) {
      this.user.email = user.email;
    }
    // Actualizamos el usuario con los nuevos campos
    this.userService.putUser(this.user).subscribe();
  }

  selectImg(file: File): void {
    // Si el archivo no existe
    if (!file) {
      this.imgToUpload = null;
      return;
    }
    // Verificamos que sea una imagen
    if (file.type.indexOf('image') < 0) {
      swal('Solo se permiten imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imgToUpload = null;
      return;
    }
    this.imgToUpload = file;
    // Vista previa de imagen para actualizar. Con JS puro
    const reader = new FileReader();
    // Mandamos el archivo que acabamos de seleccionar
    const urlTemporaryImg = reader.readAsDataURL(file);
    // La variable result nos trae en base 64 la imagen que hemos escogido
    reader.onloadend = () => this.temporaryImg = reader.result;
  }

  changeImg(): void {
    this.userService.changeImg(this.imgToUpload, this.user._id);
  }

}
