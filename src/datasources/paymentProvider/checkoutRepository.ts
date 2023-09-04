import { randomUUID } from "crypto";
import QRCode from 'qrcode';

import PedidoDataBaseRepository from "~datasources/database/repository/pedidoDatabaseRepository";
import { Fatura } from "~domain/entities/fatura";
import CheckoutRepository from "~domain/repositories/checkoutRepository";
import FaturaRepository from "~domain/repositories/faturaRepository";

const pedidoRepository = new PedidoDataBaseRepository();

export default class CheckoutProvider implements CheckoutRepository{
  async geraCobranca(fatura: Fatura, faturaRepository: FaturaRepository): Promise<Fatura> {
    
    // aqui vamos simular dados enviados pelo provider de pagamento
    const pedido = await pedidoRepository.retornaPedido(fatura.pedidoId);
    const idCobrancaFake = randomUUID();
    const urlQrCodeFake = await QRCode.toDataURL(`https://www.apidepagamento.com.br/?valor=${pedido?.valor}&id=${idCobrancaFake}`) as string;
    // fim dados fake de pagamento

    return (await faturaRepository.atualizaFatura({ id: fatura.id, qrCode: urlQrCodeFake })) as Fatura;
  }
}
