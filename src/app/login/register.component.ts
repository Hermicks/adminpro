import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { Router } from '@angular/router';

// Services
import { UserService } from '../services/services.index';
import { Subscription } from 'rxjs';

// Model
import { User } from '../models/user.model';

declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    initPlugins();
    this.createFormObject();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createFormObject(): void {
    // Creo el formulario como un objeto con los campos específicos que contendrá
    this.form = new FormGroup({
      // En Form Control, el primer campo es el valor por defecto
      // El segundo campo es un array que contendrá las validaciones del formulario
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
      // Valor por defecto false para que cuando no se envíen las condiciones salga un popup avisando
      conditions: new FormControl(false)
    },
      {
        validators: this.notEquals('password', 'confirmPassword')
    });
    /*
    this.form.setValue({
      name: 'Test1',
      email: 'test1@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      conditions: false
    });
    */
  }

  notEquals(value1: string, value2: string): any {
    return (formGroup: FormGroup) => {
      const pass = formGroup.controls[value1].value;
      const confirmPass = formGroup.controls[value2].value;
      // Si son iguales mandamos null para que el array de errores del formulario venga vacío
      return (pass === confirmPass) ? null : { notEquals: true };
    };
  }

  registerUser(): void {
    // Es lo mismo que poner !this.form.valid
    if (this.form.invalid) {
      console.log('INVALID');
      return;
    }
    if (!this.form.value.conditions) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    // Si el formulario es válido y hemos aceptado las condiciones creamos el User
    const user: User = this.createUserForPost(this.form);
    // Post y subscripción del usuario
    this.subscription = this.userService.postUser(user).subscribe(
      (postedUser) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createUserForPost(form: FormGroup): User {
    const user: User = new User(form.value.name, form.value.email, form.value.password);
    return user;
  }

}
