import { Product } from "./product";

const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe('Product', () => {
  it('should have properties name and price', () => {
    const sut = createSut('Camiseta', 49.99);
    expect(sut).toHaveProperty('name', 'Camiseta');
    expect(sut.price).toBeCloseTo(49.99);
  });
});