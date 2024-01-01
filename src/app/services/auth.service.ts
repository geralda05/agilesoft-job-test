import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import axios from 'axios';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public router: Router,
    public ngZone: NgZone,
  ) {}

  private user = {name: null, apellido: null, perfil: null};
  public token = localStorage.getItem('auth-ppa-agrosuper');
  public nombre = localStorage.getItem('user-ppa-agrosuper');
  public cargo = localStorage.getItem('ags-information-user-cargo');
  public animals = {
    animal_1: 'Pollos',
    animal_2: 'Cerdos',
    animal_3: 'Pavos',
  };

  async login(user:string, pass:string) {
    const self = this;
    try {
      localStorage.removeItem('ags-information-user-authorization');
      const response = await axios({
        method: 'post',
        url: environment.LOGIN,
        data: {email: user, password: pass},
        timeout: 30000,
      });
      if (typeof response.data['access_token'] === 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Error interno',
        });
        throw 'error';
      } else {
        try {
          const data = response.data;

          return 'success';
        } catch {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Error interno',
          });
          throw 'error';
        }
      }
    } catch (error) {
      console.error(error)
      return error
    }
  }

  getPermisos() {
    return (localStorage.getItem('ags-information-user-animals') !== null && localStorage.getItem('ags-information-user-animals') !== undefined) ? localStorage.getItem('ags-information-user-animals'): ''
  }


  getUSer() {
    return this.user;
  }

  get isLoggedIn(): boolean {
    return this.token !== null && this.token !== undefined ? true : false;
  }

  get isDataRegistered(): boolean {
    return true;
  }

  
}
