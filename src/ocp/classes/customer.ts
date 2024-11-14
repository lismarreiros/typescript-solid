/**
 * Interface segregation principle - os clientes não devem ser forçados a depender 
 * de interfaces, types ou membros abstratos que não utilizam
 */
import { CustomerProtocol, CustomerProtocolEnterprise } from "./interfaces/customer-protocol";

export class IndividualCustomer implements CustomerProtocol {
  firstName: string;
  lastName: string;
  cpf: string;

  constructor(firstName: string, lastName: string, cpf: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.cpf = cpf
  }

  getName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  getIDN(): string {
    return this.cpf
  }
}

export class EnterpriseCustomer implements CustomerProtocolEnterprise {
  name: string;
  cnpj: string;

  constructor(name: string, cnpj: string) {
    this.name = name
    this.cnpj = cnpj
  }

  getName(): string {
    return this.name
  }

  getIDN(): string {
    return this.cnpj
  }
}