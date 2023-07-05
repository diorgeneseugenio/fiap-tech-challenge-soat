import CheckoutRepository, { Pagamento } from "../repositories/checkoutRepository";
import { Pedido } from "~core/domain/pedido";


export default class PedidoService {
    constructor(
      private readonly checkoutRepository: CheckoutRepository,
    ) {}

    async geraPagamento(metodoDePagamentoId: string, pedido: Pedido): Promise<Pagamento> {
        return this.checkoutRepository.geraPagamento(metodoDePagamentoId, pedido);
    }
}