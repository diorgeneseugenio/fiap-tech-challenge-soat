export interface MetodoDePagamento {
  id: string;
  nome: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
