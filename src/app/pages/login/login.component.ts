import {Component, OnInit} from '@angular/core';
import {FormsModule, UntypedFormBuilder, Validators, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'login',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public loading = false;

  public loginForm = this.formBuilder.group({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  matcher = new MyErrorStateMatcher();


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
      await this.auth.login(this.loginForm.get('user')?.value, this.loginForm.get('password')?.value);
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.loading = false;
    }
  }

}
