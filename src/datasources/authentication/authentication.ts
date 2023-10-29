import { CognitoJwtVerifier } from "aws-jwt-verify";
import dotenv from "dotenv";

import AuthenticationRepository, { TipoUsuario } from "~domain/repositories/authenticationRepository";

dotenv.config();

const USER_POOL_ID = process.env.USER_POOL_ID as string;
const CLIENT_ID = process.env.CLIENT_ID as string;


export default class Authenticatior implements AuthenticationRepository {

    async authUser(token: string, tipo: TipoUsuario): Promise<string> {
        const verifier = CognitoJwtVerifier.create({
            userPoolId: USER_POOL_ID,
            tokenUse: "access",
            clientId: CLIENT_ID,
        });

        const payload = await verifier.verify(token);

        // TODO - Como validar as permissoes
        if (!(payload['cognito:groups'] && (payload['cognito:groups'].includes(TipoUsuario.ADMIN) || payload['cognito:groups'].includes(tipo)))) {
            throw new Error('Sem permissao para executar essa acao')
        }
        
        return payload.username;
    }

}
