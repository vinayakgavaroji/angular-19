import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './home/profile/profile.component';
import { authGuard } from '../services/auth.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ImageComponent } from './image/image.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'image', component: ImageComponent },
    { path: 'shopping', component: ShoppingCartComponent },
    { path: 'home', canActivate: [authGuard], loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent) }, 
    { path: 'profile/:email', component: ProfileComponent },
    { path: '**', redirectTo: 'login', pathMatch: "full" }
];
