export enum UserType {
  CLIENT = "Client",
  ADMIN = "Admin",
}

export default interface AuthenticationRepository {
  authUser(token: string, userType: UserType): Promise<void>;
}
