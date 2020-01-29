import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    // Flujo de la promesa
    this.countThree()
    .then(
      data => console.log('Resuelto!', data)
    )
    .catch(
      error => console.error(error)
    );
  }

  ngOnInit() {
  }

  countThree(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 1;
      const interval = setInterval(() => {
        console.log(contador);
        contador++;
        if (contador === 3) {
          resolve(true);
          // reject('Ocurrió un error');
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
