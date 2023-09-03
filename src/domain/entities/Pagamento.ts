import { PagamentoInput } from "./types/PagamentoType";

export default class Pagamento {
  public id: string;
  public isPago: boolean;
  public valorPagamento: number;
  public tipoDePagamento: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(PagamentoInput: PagamentoInput) {
    this.id = PagamentoInput.id;
    this.isPago = PagamentoInput.isPago;
    this.valorPagamento = PagamentoInput.valorPagamento;
    this.tipoDePagamento = PagamentoInput.tipoDePagamento;
    this.createdAt = PagamentoInput.createdAt ?? new Date();
    this.deletedAt = PagamentoInput.deletedAt ?? null;
    this.updatedAt = PagamentoInput.updatedAt ?? null;
  }
}
