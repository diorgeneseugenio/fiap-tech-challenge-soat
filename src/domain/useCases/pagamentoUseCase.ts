import FaturaDataBaseRepository from "~datasources/database/repository/faturaDatabaseRepository";
import PedidoDataBaseRepository from "~datasources/database/repository/pedidoDatabaseRepository";
import { PagamentoDTO, PagamentoInput } from "~domain/entities/types/PagamentoType";
import PagamentoRepository from "~domain/repositories/pagamentoRepository";

import PedidoUseCase from "./pedidoUseCase";

export default class PagamentoUseCase {
    static async recebePagamento(PagamentoRepository: PagamentoRepository, pagamento: PagamentoInput): Promise<PagamentoDTO> {
      const pedidoRepository = new PedidoDataBaseRepository()
      const faturaRepository = new FaturaDataBaseRepository()
      const pagamentoCriado = await PagamentoRepository.criaPagamento(pagamento);
      if (pagamentoCriado.isPago) {
        PedidoUseCase.pagamentoAprovado(pedidoRepository, faturaRepository, pagamentoCriado)
      } else {
        PedidoUseCase.pagamentoReprovado(pedidoRepository, faturaRepository, pagamentoCriado)
      }
    return pagamentoCriado
    }
  }
  