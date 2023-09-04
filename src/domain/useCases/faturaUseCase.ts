import { Fatura, statusDePagamento } from "~domain/entities/fatura";
import Pedido from "~domain/entities/pedido";
import FaturaRepository from "~domain/repositories/faturaRepository";

export default class FaturaUseCase {
  static async geraFatura(
    metodoDePagamentoId: string,
    pedido: Pedido,
    faturaRepository: FaturaRepository
  ): Promise<Fatura> {
    const status = statusDePagamento.AGUARDANDO_PAGAMENTO;
    const fatura = await faturaRepository.criaFatura({
      pedidoId: pedido.id,
      metodoDePagamentoId: metodoDePagamentoId,
      qrCode: "",
      statusDePagamento: status,
    });
    return fatura as Fatura;
  }
}
