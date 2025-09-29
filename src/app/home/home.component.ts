import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cards = [
    { title: 'Profile', description: 'View and update your profile', icon: 'bi-person-circle', path: '/profile' },
    { title: 'Tasks', description: 'Manage your tasks efficiently', icon: 'bi-list-task', path: '/home/tasks' },
    { title: 'Reports', description: 'View reports and analytics', icon: 'bi-bar-chart', path: '/home/reports' },
    { title: 'Settings', description: 'Update your preferences', icon: 'bi-gear', path: '/home/settings' }
  ];

}
