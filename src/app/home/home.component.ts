import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private email = localStorage.getItem('token');

  constructor(private shared: SharedService) {

  }

  ngOnInit() {
    
  }

  cards = [
    {
      title: 'Profile',
      description: 'View and update your profile',
      icon: 'person-circle',
      path: ['/profile', this.email]
    },
    { title: 'Tasks', description: 'Manage your tasks efficiently', icon: 'bi-list-task', path: '/tasks' },
    { title: 'Reports', description: 'View reports and analytics', icon: 'bi-bar-chart', path: '/reports' },
    { title: 'Shopping', description: 'Great Indian Festival Amazon', icon: 'bi-gear', path: '/shopping' },
    { title: 'Settings', description: 'Update your preferences', icon: 'bi-gear', path: '/settings' }
  ];

}
