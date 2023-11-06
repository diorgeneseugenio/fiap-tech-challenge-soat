export enum TipoUsuario {
  CLIENT = "Client",
  ADMIN = "Admin",
}

export default interface AuthenticationRepository {
  authUser(token: string, TipoUsuario: TipoUsuario): Promise<string>;
}
