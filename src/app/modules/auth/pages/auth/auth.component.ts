import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    MatInputModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  hide: boolean = true;
  loginForm!: FormGroup;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      this.authService.login({ email, password }).subscribe(
        (response) => {
          this.localStorageService.setItem('X-Token', response.token);
          this.localStorageService.setItem('Role', response.role);
          this.router.navigate(['menu']);
          this.toastr.success('Авторизація успішна!');
        },
        (error) => {
          this.toastr.warning(
            'Будь ласка, спробуйте ще раз!',
            'Невірно введенні пошта або пароль!'
          );
        }
      );
    } else {
      this.toastr.warning(
        'Будь ласка, спробуйте ще раз!',
        'Невірна пошта або пароль'
      );
    }
  }
}
