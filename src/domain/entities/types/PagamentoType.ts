export interface PagamentoDTO {
  id: string;
  isPago: boolean;
  valorPagamento: number;
  tipoDePagamento: string;
  faturaId: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}

export interface PagamentoInput {
  id: string;
  isPago: boolean;
  valorPagamento: number;
  tipoDePagamento: string;
  faturaId: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}
