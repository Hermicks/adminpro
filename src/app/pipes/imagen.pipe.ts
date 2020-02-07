import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';
import { IMG_SERVICES } from '../config/img/img-config.index';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, type: string = 'usuarios'): any {
    let url: string = URL_SERVICES + IMG_SERVICES.getImg;
    // Sino viene la imagen retornamos una ceda cualquiera
    if (!img) {
      return url + 'usuarios/xxx';
    }
    // Si la imagen viene por https la retornamos tal cual ya que es de Google
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (type) {
      case 'usuarios':
        url += 'usuarios/' + img;
        break;
      case 'medicos':
        url += 'medicos/' + img;
        break;
      case 'hospitales':
        url += 'hospitales/' + img;
        break;
      default:
        console.log('Type no válido');
        url += 'usuarios/xxx';
        break;
    }
    return url;
  }

}
