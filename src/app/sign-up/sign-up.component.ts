import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  signupForm: FormGroup;
  submitted = false;
  message: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false, [Validators.requiredTrue])
    }, { validators: this.passwordMatchValidator.bind(this) });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    return password === confirm ? null : { mismatch: true };
  }


  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.message = null;

    if (this.signupForm.invalid) return;

    const { name, email, password } = this.signupForm.value;

    this.auth.signup({ name, email, password }).subscribe({
      next: () => {
        alert('Signup successful ✅');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.message = err.message || "Signup failed";
        alert(this.message);
      }
    });
  }

}
