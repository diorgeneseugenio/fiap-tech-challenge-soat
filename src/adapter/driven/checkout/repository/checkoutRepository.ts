import QRCode from 'qrcode';

import CheckoutRepository, { GeraPagamentoInput } from "~core/applications/repositories/checkoutRepository";
import FaturaRepository from '~core/applications/repositories/faturaRepository';
import { Fatura, StatusDePagamento, statusDePagamento } from '~core/domain/fatura';


// FAKE CHECKOUT 
export default class FakeCheckout implements CheckoutRepository {
  constructor(
    private readonly faturaRepository: FaturaRepository,
  ) { }
  async geraPagamento(geraPagamentoInput: GeraPagamentoInput): Promise<Fatura> {
    // Deve validar a forma de pagamento e enviar o valor do pedido para o pagamento externo
    // O Fake checkout apenas vai gerar o fake qrcode e automaticamente mudar o status para aguardando preparo
    let qrCode: string | null = null;
    let status: StatusDePagamento = statusDePagamento.PAGAMENTO_APROVADO; // FIXADO
 
    try {
     qrCode = await QRCode.toDataURL('FAKE CHECKOUT') as string // Em um checkout real aqui seria a chamada externa
      
    } catch (err) {
      console.error(err);
      status = statusDePagamento.ERRO_AO_PROCESSAR_PAGAMENTO
    }

    return this.faturaRepository.criaFatura({
      pedidoId:  geraPagamentoInput.pedido.id,
      metodoDePagamentoId:  geraPagamentoInput.metodoDePagamentoId,
      qrCode,
      statusDePagamento: status,
    });
  }
}
