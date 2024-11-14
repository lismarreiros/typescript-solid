import { OrderStatus } from "./interfaces/order-status";
import { CustomerOrder } from "./interfaces/customer-protocol";
import { ShoppingCartProtocol } from "./interfaces/shopping-cart-protocol";
import { MessageProtocol } from "../services/interfaces/message-protocol";
import { PersistenceProtocol } from "../services/interfaces/persistence-protocol";

export class Order {
  private _orderStatus: OrderStatus= 'open';
  constructor(
    private readonly cart: ShoppingCartProtocol, 
    private readonly messaging: MessageProtocol,
    private readonly persistence: PersistenceProtocol,
    private readonly customer: CustomerOrder // dip - interface
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