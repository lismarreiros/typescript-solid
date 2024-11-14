import { MessageProtocol } from "../services/interfaces/message-protocol";
import { PersistenceProtocol } from "../services/interfaces/persistence-protocol";
import { CartItem } from "./interfaces/cart-item";
import { CustomerOrder, CustomerProtocol } from "./interfaces/customer-protocol";
import { ShoppingCartProtocol } from "./interfaces/shopping-cart-protocol";
import { Order } from "./order";

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> { return [] }
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  total(): number { return 1 }
  totalWithDiscount(): number { return 2 }
  isEmpty(): boolean { return false }
  clear(): void {}
}

class MessageMock implements MessageProtocol {
  sendMessage(msg: string): void {}
}

class PersistenceMock implements PersistenceProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getName(): string { return '' }
  getIDN(): string { return '' }
} 

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messageMock = new MessageMock();
  const persistenceMock = new PersistenceMock();
  const customerMock = new CustomerMock();
  const sut = new Order(shoppingCartMock, messageMock, persistenceMock, customerMock);
  return {
    sut, 
    shoppingCartMock, 
    messageMock, 
    persistenceMock 
  }
}

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'isEmpty').mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear')
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should send an email to customer', () => {
    const { sut, messageMock } = createSut();
    const messageMockSpy = jest.spyOn(messageMock, 'sendMessage');
    sut.checkout();
    expect(messageMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistenceMock } = createSut();
    const persistenceMockSpy = jest.spyOn(persistenceMock, 'saveOrder');
    sut.checkout();
    expect(persistenceMockSpy).toHaveBeenCalledTimes(1);
  });
})