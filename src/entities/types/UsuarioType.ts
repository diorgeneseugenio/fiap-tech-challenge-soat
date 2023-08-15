export default interface UsuarioInput {
    id?: string;
    cpf: string | null;
    email: string | null;
    nome?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

export interface UsuarioDTO {
    id?: string;
    cpf: string | null;
    email: string | null;
    nome?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }
