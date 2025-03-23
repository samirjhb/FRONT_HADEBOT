import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  async login() {
    console.log(this.form.value);
    if (this.form.valid) {
      try {
        const response: any = await this.authService.loginService(this.form.value);
        
        // If login was successful and we have a token, navigate to dashboard
        if (response && response.token) {
          this.router.navigate(['/dashboard']);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
}
