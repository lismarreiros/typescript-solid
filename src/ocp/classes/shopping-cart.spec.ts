import { Discount } from "./discount"
import { CartItem } from "./interfaces/cart-item";
import { ShoppingCart } from "./shopping-cart"

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock }
}

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock()
}

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }
  return new CartItemMock(name, price);
}

const createSutWithCartItems = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItem('Camiseta', 89.0);
  const cartItem2 = createCartItem('Tenis', 109.0);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMock }
}

describe('ShoppingCart', () => {
  it('should be an empty cart when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 items', () => {
    const sut = createSutWithCartItems();
    expect(sut.sut.items.length).toBe(2);
  });

  it('should total and totalWithDiscount', () => {
    const sut = createSutWithCartItems()
    expect(sut.sut.total()).toBe(198.0);
    expect(sut.sut.totalWithDiscount()).toBe(198.0)
  });

  it('should add products and clear cart', () => {
    const { sut } = createSutWithCartItems()
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove products', () => {
    const { sut } = createSutWithCartItems();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithCartItems();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with totalPrice when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithCartItems();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});