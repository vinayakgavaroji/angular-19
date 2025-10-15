import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  private svc = inject(CartService);

  constructor() {
    
  }

  get inventory() { return this.svc.inventory(); }
  get cart() { return this.svc.cart(); }
  get productIds() { return Object.keys(this.inventory); }
  get subTotal() { return this.svc.subTotal(); }
  get discount() { return this.svc.discount(); }
  get tax() { return this.svc.tax(); }
  get total() { return this.svc.total(); }

  addToCart(pid: string) {
    this.svc.addToCart(pid, 1);
  }

}
