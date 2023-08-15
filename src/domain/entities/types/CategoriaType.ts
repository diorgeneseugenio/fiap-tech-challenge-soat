export interface CategoriaInput {
  id: string;
  nome: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CategoriaDTO {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

// export interface CriaCategoriaInput {
//   id: string;
//   nome: string;
// }