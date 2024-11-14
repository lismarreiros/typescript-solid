/**
 * Interface segregation principle - os clientes não devem ser forçados a depender de interfaces que não utilizam
 */
import { CustomerProtocol, CustomerProtocolEnterprise } from "./interfaces/customer-protocol";

export class IndividualCustomer implements CustomerProtocol {
  firstName: string;
  lastName: string;
  cpf: string;

  constructor(firstName: string, lastName: string, cpf: string) {}
}

export class EnterpriseCustomer implements CustomerProtocolEnterprise {
  name: string;
  cnpj: string;

  constructor(name: string, cnpj: string) {}
}