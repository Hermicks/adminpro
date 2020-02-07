import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { IMG_SERVICES } from '../../config/img/img-config.index';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor() { }

  uploadFile(file: File, type: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Angular no nos provee con herramientas para subida de imagenes Hay que usar JS puro
      // Creamos el form-data, es decir, el cuerpo que llevará la petición con la imagen
      const formData = new FormData();
      // Creamos una peticón HTTP
      const xhr = new XMLHttpRequest();
      // Seteamos valores en el formulario
      // Primero colocamos el nombre que lleva en el req.body, el fichero que subimos y su nombre
      // Esto lo necesitamos para crear una petición con un cuerpo que incluya el fichero a mano
      formData.append('imagen', file, file.name);
      // Configuramos la petición AJAX
      // La propiedad readyStateChange nos notifica de cualquier cambio. Estaremos recibiendo
      // información continuamente, como un Observable, mientras el estado cambie
      xhr.onreadystatechange = () => {
        // La petición termina. Solo nos interesa este estado
        if (xhr.readyState === 4) {
          // Comprobamos que nos devuelva un 200 para verificar que todo ha ido bien
          if (xhr.status === 200) {
            console.log('Imagen subida');
            // Datos de la respuesta de la petición
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo en la subida');
            reject(JSON.parse(xhr.response));
          }
        }
      };
      // Ya hemos finalizado la CONFIGURACIÓN de nuestra petición AJAX. Ahora falta lanzarla
      // Traemos el URL al que vamos a lanzar la petición xhr
      const URL: string = URL_SERVICES + IMG_SERVICES.postImg + type + '/' + id;
      // Preparo como va a ser la petición -> Tipo de petición, URL, asíncrono o no
      xhr.open('PUT', URL, true);
      // Enviamos nuestro req.body con la imagen
      xhr.send(formData);
      // Toda esta configuración va a retornar una promesa con el resolve o el reject en función
      // de si ha ido bien o mal
    });
  }
}
