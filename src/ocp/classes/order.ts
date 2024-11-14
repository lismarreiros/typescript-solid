import { OrderStatus } from "./interfaces/order-status";
import { Messaging } from "../services/messaging";
import { Persistence } from "../services/persistence";
import { ShoppingCart } from "./shopping-cart";
import { CustomerOrder } from "./interfaces/customer-protocol";

export class Order {
  private _orderStatus: OrderStatus= 'open';
  constructor(
    private readonly cart: ShoppingCart, 
    private readonly messaging: Messaging,
    private readonly persistence: Persistence,
    private readonly customer: CustomerOrder
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if(this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio')
      return;
    }
    this._orderStatus = 'closed';
    this.messaging.sendMessage(`Seu pedido com total de ${this.cart.total()} foi recebido.`);
    this.persistence.saveOrder();
    console.log('O cliente é: ', this.customer.getName(), this.customer.getIDN())
    this.cart.clear();
  }
}