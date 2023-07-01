import { sign } from "jsonwebtoken";

import usuarioRepository from "~adapter/driven/infra/repository/usuarioDatabaseRepository";

export default class AuthenticationService {
  constructor(private readonly usuarioRepository: usuarioRepository) {}

  async geraToken(cpf: string): Promise<string> { 
    const dadosUsuario = await this.usuarioRepository.retornaUsuario(cpf);

    if (!dadosUsuario) null;

    const token = sign(
      { email: dadosUsuario!.email, cpf: dadosUsuario!.cpf },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    return token;
  }
}
