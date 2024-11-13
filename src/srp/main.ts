import { Messaging } from "./services/messaging";
import { Order } from "./entities/order";
import { Persistence } from "./services/persistence";
import { Product } from "./entities/product";
import { ShoppingCart } from "./entities/shopping-cart";

const shoppingCart = new ShoppingCart();
const messaging = new Messaging();
const persistence = new Persistence();
const order = new Order(shoppingCart, messaging, persistence);

shoppingCart.addItem(new Product('Camiseta', 48.9));
shoppingCart.addItem(new Product('Caderno', 20.9));
shoppingCart.addItem(new Product('Lápis', 8.9));

shoppingCart.removeItem(0);
order.checkout();