import QRCode from 'qrcode';

import CheckoutRepository, { Pagamento } from "~core/applications/repositories/checkoutRepository";
import { statusDePagamento } from '~core/domain/fatura';
import { Pedido, statusDoPedido } from "~core/domain/pedido";
import PedidoDataBaseRepository from '~driven/infra/repository/pedidoDatabaseRepository';


// FAKE CHECKOUT 
export default class FakeCheckout implements CheckoutRepository {
  async geraPagamento(metodoDePagamentoId: string, pedido: Pedido): Promise<Pagamento> {
    // Deve validar a forma de pagamento e enviar o valor do pedido para o pagamento externo
    // O Fake checkout apenas vai gerar o fake qrcode e automaticamente mudar o status para aguardando preparo

    try {
      const dbPedidosRepository = new PedidoDataBaseRepository();

      await dbPedidosRepository.atualizaPedido({ id: pedido.id, status: statusDoPedido.AGUARDANDO_PREPARO })

      return {
        qrCode: await QRCode.toDataURL('FAKE CHECKOUT'),
        statusDePagamento: statusDePagamento.PAGAMENTO_APROVADO
      }

    } catch (err) {
      console.error(err);
      return {
        statusDePagamento: statusDePagamento.ERRO_AO_PROCESSAR_PAGAMENTO
      }
    }
  }
}
