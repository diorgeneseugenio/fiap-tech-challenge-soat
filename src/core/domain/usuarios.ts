export default interface Usuario {
  id?: string;
  cpf?: string | null;
  email?: string | null;
  nome?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}