import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.sendObservable()
    // .pipe(
      // Cuando el contador es 2 cae en el retry y se vuelve a lanzar, por eso en el subscribe no
      // emitimos el mensaje de error
      // retry(2)
    // )
    .subscribe(
      data => console.log(data),
      error => console.error(error),
      () => console.log('Completado')
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendObservable(): Observable<any> {
    return new Observable<any>(observer => {
      let count = 0;
      const intervalo = setInterval(() => {
        count++;
        const value = {
          value: count
        };
        observer.next(value);
        // if (count === 3) {
          // clearInterval(intervalo);
          // observer.complete();
        // }
        // if (count === 2) {
          // clearInterval(intervalo);
          // observer.error('Distinto de 3');
        // }
      }, 1000);
    })
    .pipe(
      map(data => data.value),
      filter(data => data % 2 !== 0)
    );
  }

}
