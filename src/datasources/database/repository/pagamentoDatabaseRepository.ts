import { PagamentoDTO } from "~domain/entities/types/PagamentoType";
import PagamentoRepository from "~domain/repositories/pagamentoRepository";

import PagamentoModel from "../models/pagamentoModel";

export default class PagamentoDatabaseRepository implements PagamentoRepository {
  async criaPagamento(pagamento: PagamentoDTO): Promise<PagamentoDTO> {
    return (await PagamentoModel.create(pagamento)) as PagamentoDTO;
  }
}