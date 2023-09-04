import { PagamentoDTO, PagamentoInput } from "~domain/entities/types/PagamentoType";
import FaturaRepository from "~domain/repositories/faturaRepository";
import PagamentoRepository from "~domain/repositories/pagamentoRepository";
import PedidoRepository from "~domain/repositories/pedidoRepository";

import PedidoUseCase from "./pedidoUseCase";

export default class PagamentoUseCase {
  static async recebePagamento(faturaRepository: FaturaRepository, pedidoRepository: PedidoRepository, pagamentoRepository: PagamentoRepository, pagamento: PagamentoInput): Promise<PagamentoDTO> {
    const pagamentoCriado = await pagamentoRepository.criaPagamento(pagamento);

    if (pagamentoCriado.isPago) {
      await PedidoUseCase.pagamentoAprovado(pedidoRepository, faturaRepository, pagamentoCriado)
    } else {
      await PedidoUseCase.pagamentoReprovado(pedidoRepository, faturaRepository, pagamentoCriado)
    }
    return pagamentoCriado
  }
}
