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

  public timeoutHTTP = 30000;
  public fullName = '';
  public token = localStorage.getItem('agile-soft-token-session')
  

  get isLoggedIn(): boolean {
    return this.token !== null && this.token !== undefined ? true : false;
  }

  public formatHeader () {
    return {
      Authorization: 'Bearer '+this.token
    }
  }

  async logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.token = null;
  }

  async login(user:string, pass:string) {
    try {
      localStorage.clear();
      const response = await axios({
        method: 'post',
        url: environment.LOGIN,
        data: {username: user, password: pass},
        timeout: this.timeoutHTTP,
      });
      if (typeof response.data.data.payload === 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Sin credenciales',
        });
        throw 'error';
      } else {

        try {
        
          const data = response.data.data;
          this.token = data.payload.token;

          localStorage.setItem('agile-soft-token-session', data.payload.token);
          localStorage.setItem('agile-soft-token-refresh', data.payload.refresh_token);
          localStorage.setItem('agile-soft-user-name', `${data.user.firstName} ${data.user.lastName}`);

          this.fullName = `${data.user.firstName} ${data.user.lastName}`;

          this.router.navigate(['/home']);

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
    } catch (error:any) {
      console.error(error)
      if(error && error.response){
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: error.response.data.message
        })
        return false
      } else {
        throw error
      }
    }
  }

  async userInfo() {
    try {
      const response = await this.HTTPrequest({
        method: 'get',
        url: environment.USER,
        timeout: this.timeoutHTTP,
        headers: this.formatHeader()
      });
      console.log(response.data);
      this.fullName = `${response.data.data.firstName} ${response.data.data.lastName}`;
      localStorage.setItem('agile-soft-user', JSON.stringify(response.data.data));
      return response;
    } catch (error:any) {
      
      throw error
    }
  }

  async HTTPrequest(body : any) {
    try{
      const response = await axios(body);
      return response;
    }catch(error){
      const processError = await this.validateError(error);
      if(processError){
        console.log('Processing again')
        return await axios(body);
      }
      throw error;
    }
  }

  async validateError(error : any) {
    if(error.response.data.message === "jwt expired"){
      const response = await this.refresh()
      this.token = response.data.data.payload.token;
      console.log('token expired: ', response.data);
      localStorage.setItem('agile-soft-token-session', response.data.data.payload.token);
      return true
    } else {
      return false
    }
  }

  async refresh() {
    try {
      const response = await axios({
        method: 'post',
        url: environment.REFRESH,
        data: {
          refresh_token: localStorage.getItem('agile-soft-token-refresh')
        },
        timeout: this.timeoutHTTP,
        headers: this.formatHeader()
      });
      return response;
    } catch (error:any) {
      this.validateError(error);
      throw error
    }
  }

  get isDataRegistered(): boolean {
    return true;
  }

  
}
