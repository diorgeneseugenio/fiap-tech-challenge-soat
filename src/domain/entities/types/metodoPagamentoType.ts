export interface MetodoPagamentoDTO {
    id: string;
    nome: string;
    ativo: boolean;
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date | null;
  }

export interface MetodoPagamentoInput {
    id: string;
    nome: string;
    ativo?: boolean;
    createdAt: Date;
    deletedAt: Date | null;
    updatedAt: Date | null;
}