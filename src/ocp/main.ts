import { Messaging } from "./services/messaging";
import { Order } from "./classes/order";
import { Persistence } from "./services/persistence";
import { Product } from "./classes/product";
import { ShoppingCart } from "./classes/shopping-cart";
import { NoDiscount } from "./classes/discount";

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistence = new Persistence();
const order = new Order(shoppingCart, messaging, persistence);

shoppingCart.addItem(new Product('Camiseta', 10.0));
shoppingCart.addItem(new Product('Caderno', 20.0));
shoppingCart.addItem(new Product('Lápis', 100.0));

console.log(shoppingCart.totalWithDiscount());
order.checkout();