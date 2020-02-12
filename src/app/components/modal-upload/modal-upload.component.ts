import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../../services/upload-img/upload-image.service';
import swal from 'sweetalert';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imgToUpload: File;
  temporaryImg: string | ArrayBuffer;

  constructor(
    private uploadImageService: UploadImageService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() { }

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

  uploadImg(): void {
    this.uploadImageService.uploadFile(this.imgToUpload, this.modalUploadService.type, this.modalUploadService.id)
    .then((resp: any) => {
      // Notificamos al resto de componentes que estén pendientes de la subida de imagen
      // que hemos subido la imagen a través del modal
      this.modalUploadService.modalNotification.emit(resp);
      this.hideModal();
    })
    .catch(error => console.log(error, 'Error en la carga'));
  }

  hideModal(): void {
    this.imgToUpload = null;
    this.temporaryImg = null;
    this.modalUploadService.hideModal();
  }

}
