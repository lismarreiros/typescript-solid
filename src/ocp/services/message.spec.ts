import { Message } from "./message";

const createSut = () => {
  return new Message();
}

describe('Message', () => {
  afterEach(() => jest.clearAllMocks());

  it('it should return undefined', () => {
    const sut = createSut();
    expect(sut.sendMessage('messag test')).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('message test');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log with "Mensagem enviada: " and msg', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('message test');
    expect(consoleSpy).toHaveBeenCalledWith("Mensagem enviada: ", "message test");
  });
})