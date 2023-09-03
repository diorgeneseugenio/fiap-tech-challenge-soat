import QRCode from 'qrcode';

import { Fatura, StatusDePagamento, statusDePagamento } from '~domain/entities/fatura';
import CheckoutRepository, { GeraPagamentoInput } from "~domain/repositories/checkoutRepository";
import FaturaRepository from '~domain/repositories/faturaRepository';


// FAKE CHECKOUT 
export default class FakeCheckout implements CheckoutRepository {
  constructor(
    private readonly faturaRepository: FaturaRepository,
  ) { }
  async geraPagamento(geraPagamentoInput: GeraPagamentoInput): Promise<Fatura> {
    // Deve validar a forma de pagamento e enviar o valor do pedido para o pagamento externo
    // O Fake checkout apenas vai gerar o fake qrcode e automaticamente mudar o status para aguardando preparo
    let status: StatusDePagamento = statusDePagamento.AGUARDANDO_PAGAMENTO; // FIXADO
    let qrCode = "";
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
