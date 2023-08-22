import { UsuarioDTO } from "~domain/entities/types/UsuarioType";

export default interface UsuarioRepository {
    criaUsuario(Usuario: UsuarioDTO): Promise<UsuarioDTO>;
    listaUsuarios(): Promise<UsuarioDTO[]>;
    retornaUsuario(cpf: string | null): Promise<UsuarioDTO | null>;
    filtraUsuario(cpf: string | null, email: string | null): Promise<UsuarioDTO | null>;
}
