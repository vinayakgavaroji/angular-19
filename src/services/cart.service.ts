import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  inventory = signal<Inventory>({ ...startInventory });
  cart = signal<CartItem[]>([]);

  // Add to cart and decrease inventory
  addToCart(productId: string, quantity: number = 1) {
    // Simulate async inventory check (API)
    setTimeout(() => {
      const product = this.inventory()[productId];
      if (product && product.stock >= quantity) {
        // Update Inventory
        this.inventory.set({
          ...this.inventory(),
          [productId]: { ...product, stock: product.stock - quantity }
        });
        // Update Cart
        const items = [...this.cart()];
        const idx = items.findIndex(it => it.productId === productId);
        if (idx > -1) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        } else {
          items.push({ productId, name: product.name, price: product.price, quantity });
        }
        this.cart.set(items);
      } else {
        alert('Insufficient stock!');
      }
    }, 500); // Simulate API delay
  }

  // Computed signals
  subTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  discount = computed(() =>
    this.subTotal() > 100 ? this.subTotal() * 0.1 : 0
  );
  tax = computed(() =>
    (this.subTotal() - this.discount()) * 0.08
  );
  total = computed(() =>
    this.subTotal() - this.discount() + this.tax()
  );

}

export interface InventoryItem {
  stock: number;
  name: string;
  price: number;
}

// This allows any string key
export type Inventory = { [id: string]: InventoryItem };

const startInventory: { [id: string]: InventoryItem } = {
  'prodA': { stock: 10, name: 'Product A', price: 30 },
  'prodB': { stock: 20, name: 'Product B', price: 70 },
  'prodC': { stock: 15, name: 'Product C', price: 50 },
};

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
