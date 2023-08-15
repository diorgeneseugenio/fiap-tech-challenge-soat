import CheckoutRepository, { GeraPagamentoInput } from "interfaces/repositories/checkoutRepository";

export class CheckoutGateway implements CheckoutRepository {
  private checkoutRepository: CheckoutRepository;

  constructor(checkoutRepository: CheckoutRepository) {
    this.checkoutRepository = checkoutRepository;
  }
  geraPagamento(geraPagamentoInput: GeraPagamentoInput): Promise<any> {
    return this.checkoutRepository.geraPagamento(geraPagamentoInput);
  }
}
