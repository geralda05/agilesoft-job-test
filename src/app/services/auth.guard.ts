import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate() : boolean {
    if (this.authService.isLoggedIn !== true) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'Debes iniciar sesión para ingresar a esta dirección',
      });
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
