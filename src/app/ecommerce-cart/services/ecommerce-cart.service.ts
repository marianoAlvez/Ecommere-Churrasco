import { Injectable } from "@angular/core";
import { CartItem } from "../ecommerce-cart-item/cart-item";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EcommerceCartService {
  private items = new BehaviorSubject<CartItem[]>([]);
  items$ = this.items.asObservable();

  itemsCount$: Observable<number> = this.items$.pipe(
    map((items) => items.length)
  );

  total$: Observable<number> = this.items$.pipe(
    map((items) => items.reduce((acc, { price }) => (acc += price), 0))
  );

  addItem(item: CartItem): void {
    this.items.next([...this.items.value, item]);
  }

  deleteItem(itemToDelete: CartItem): void {
    this.items.next(this.items.value.filter((item) => item !== itemToDelete));
  }
}
