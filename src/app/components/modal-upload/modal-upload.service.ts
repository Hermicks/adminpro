import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  // Usuario, Médico, Hospital
  type: string;
  // User id
  id: string;
  // Propiedad para saber si el modal está oculto o no
  hide = 'hide';
  // Evento al que nos subscribimos para saber si se ha emitido el cambio de imagen
  modalNotification: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  hideModal(): void {
    this.hide = 'hide';
    this.type = null;
    this.id = null;
  }

  showModal(type: string, id: string): void {
    this.hide = '';
    this.type = type;
    this.id = id;
  }

}
