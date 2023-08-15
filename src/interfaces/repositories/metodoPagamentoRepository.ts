import { MetodoDePagamento } from "entities/metodoDePagamento";

export default interface MetodoPagamentoRepository {
    listaPagamentos(): Promise<MetodoDePagamento[]>;
  }
  