import Usuario from 'core/domain/usuarios';

export default interface usuarioRepository {
    criaUsuario(Usuario: Usuario): Promise<Usuario>;
    listaUsuarios(): Promise<Usuario[]>;
    retornaUsuario(cpf: string|null): Promise<Usuario| null>;
}
