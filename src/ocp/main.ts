import { Order } from "./classes/order";
import { Persistence } from "./services/persistence";
import { Product } from "./classes/product";
import { ShoppingCart } from "./classes/shopping-cart";
import { NoDiscount } from "./classes/discount";
import { EnterpriseCustomer, IndividualCustomer } from "./classes/customer";
import { Message } from "./services/message";

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const message = new Message();
const persistence = new Persistence();
const customer = new IndividualCustomer('Lis', 'Marreiros', '11199900000');
// const customer2 = new EnterpriseCustomer('Loja', '00032012030391')
const order = new Order(shoppingCart, message, persistence, customer);

shoppingCart.addItem(new Product('Camiseta', 10.0));
shoppingCart.addItem(new Product('Caderno', 20.0));
shoppingCart.addItem(new Product('Lápis', 100.0));

console.log(shoppingCart.totalWithDiscount());
order.checkout();