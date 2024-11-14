export interface CustomerOrder {
  getName(): string;
  getIDN(): string;
}

export interface CustomerProtocol  {
  firstName: string;
  lastName: string;
  cpf: string;
}

export interface CustomerProtocolEnterprise {
  name: string
  cnpj: string;
}