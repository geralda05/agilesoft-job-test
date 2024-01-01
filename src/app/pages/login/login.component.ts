import {Component, OnInit} from '@angular/core';
import {FormsModule, UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public newPassword = '';
  public newPassword2 = '';
  public token = null;
  public user = '';
  public saveCache : (boolean | Event) = false;
  public loading = false;
  public password = '';

  public loginForm = this.formBuilder.group({
    user: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    public route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {

  }

  async login() {
    this.loading = true;
    try {
      if (this.saveCache) {
        localStorage.setItem('ags-information-login-email', this.user);
        localStorage.setItem('ags-information-login-password', this.password);
      }
      await this.auth.login(this.user, this.password);
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  }

  public status = {
    capitalFlag: false,
    numberFlag: false,
    numberPas: false,
  };

  forceFocus(){
    document.getElementById('email')?.focus();
  }
}
