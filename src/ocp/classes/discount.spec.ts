import { Discount, FiftyPercentDiscount, NoDiscount, TenPercentDiscount } from "./discount";

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  it('should have no discount', () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBeCloseTo(10.99);
  });

  it('should have 50% discount', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(150.5)).toBeCloseTo(75.25);
  });

  it('should have 10% discount', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(10)).toBeCloseTo(9);
  });
});