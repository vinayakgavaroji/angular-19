import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  profileForm: FormGroup;

  constructor() {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      bio: new FormControl('', [Validators.maxLength(200)]),
      profilePicture: new FormControl(null)
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile Data:', this.profileForm.value);
      alert('Profile saved successfully ✅');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  // Preview profile picture
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ profilePicture: file });
    }
  }

}
