import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  email!: string;
  usersData: any;
  successMsg: string = ''
  errorMsg!: String;
  submitted: Boolean = false;


  ngOnInit() {
    this.email = decodeURIComponent(this.route.snapshot.paramMap.get('email') ?? '');

    this.shared.getDetailsById(this.email).subscribe(userData => {
      if (userData && userData.length > 0) {
        const user = userData[0];
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          // profilePicture: user.profilePicture
        });
      }
    });

    this.shared.getProfilesById(this.email).subscribe(proData => {
      if (proData && proData.length > 0) {
        const profile = proData[0];
        this.profileForm.patchValue({
          contactNo: profile.contactNo,
          bio: profile.bio,
          // profilePicture: profile.profilePicture
        });
      }
    })

    this.shared.getAllUsers().subscribe((res) => {
      this.usersData = res;
    })
  }

  constructor(private route: ActivatedRoute, private shared: SharedService) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNo: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      bio: new FormControl('', [Validators.maxLength(200)]),
      // profilePicture: new FormControl(null)
    });
  }

  // onSubmit() {
  //   if (this.profileForm.valid) {
  //     console.log('Profile Data:', this.profileForm.value);
  //     alert('Profile saved successfully ✅');
  //   } else {
  //     alert('Please fill all required fields correctly.');
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    if (localStorage.getItem('token') === this.profileForm.value.email) {
      this.shared.saveProfile(this.profileForm.value).subscribe((res) => {
        this.successMsg = 'Profile saved successfully ✅'
      }, (err) => {
        this.errorMsg = "Please fill all required fields correctly."
      })
    }
  }

  // Preview profile picture
  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.profileForm.patchValue({ profilePicture: file });
  //   }
  // }

}
