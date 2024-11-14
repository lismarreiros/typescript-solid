import { EnterpriseCustomer, IndividualCustomer } from "./customer";

const createIndividualCustomer = ( firstName: string, lastName: string, cpf: string): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
}

const createEnterpriseCustomer = ( name: string, cnpj: string ): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
}

describe('IndividualCustomer', () => {
  it('should have first name, last name and cpf', () => {
    const sut = createIndividualCustomer('Lis', 'Isabelle', '129230129313');
    expect(sut).toHaveProperty('firstName', 'Lis');
    expect(sut).toHaveProperty('lastName', 'Isabelle');
    expect(sut).toHaveProperty('cpf', '129230129313');
  });

  it('should have methods to getName and getIDN', () => {
    const sut = createIndividualCustomer('Lis', 'Isabelle', '129230129313');
    expect(sut.getName()).toBe('Lis Isabelle');
    expect(sut.getIDN()).toBe('129230129313');
  });
});

describe('EnterpriseCustomer', () => {
  it('should have name and cpnj', () => {
    const sut = createEnterpriseCustomer('Filial01', '019313913');
    expect(sut).toHaveProperty('name', 'Filial01');
    expect(sut).toHaveProperty('cnpj', '019313913')
  });

  it('should have methods to getName and getIDN', () => {
    const sut = createEnterpriseCustomer('Filial01', '019313913');
    expect(sut.getName()).toBe('Filial01');
    expect(sut.getIDN()).toBe('019313913');
  });
})