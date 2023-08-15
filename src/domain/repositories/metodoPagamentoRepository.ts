import { MetodoPagamentoDTO } from "~domain/entities/types/metodoPagamentoType";

export default interface MetodoPagamentoRepository {
    listaPagamentos(): Promise<MetodoPagamentoDTO[]>;
  }
  