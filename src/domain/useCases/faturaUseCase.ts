import FaturaDataBaseRepository from "~datasources/database/repository/faturaDatabaseRepository";
import { Fatura, statusDePagamento } from "~domain/entities/fatura";
import Pedido from "~domain/entities/pedido";


export default class FaturaUseCase {
  
  static async geraFatura(metodoDePagamentoId: string, pedido: Pedido): Promise<Fatura> {
    const status = statusDePagamento.AGUARDANDO_PAGAMENTO;
      const fatura =  await FaturaDataBaseRepository.criaFatura({
        pedidoId: pedido.id,
        metodoDePagamentoId: metodoDePagamentoId,
        qrCode: '',
        statusDePagamento: status,
      });
    return fatura as Fatura;
  }
}
