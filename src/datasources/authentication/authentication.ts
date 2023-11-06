import { CognitoJwtVerifier } from "aws-jwt-verify";
import dotenv from "dotenv";
import throwError from "handlerError/handlerError";
import jwt from 'jsonwebtoken';

import AuthenticationRepository, { TipoUsuario } from "~domain/repositories/authenticationRepository";

dotenv.config();

const USER_POOL_ID = process.env.USER_POOL_ID as string;
const ADMIN_POOL_ID = process.env.ADMIN_POOL_ID as string;
const POOL_CLIENT_CLIENT_ID = process.env.POOL_CLIENT_CLIENT_ID as string;
const POOL_ADMIN_CLIENT_ID = process.env.POOL_ADMIN_CLIENT_ID as string;


interface DecodedToken {
  "sub": string,
  "event_id": string,
  "token_use": string,
  "scope": string,
  "auth_time": number,
  "iss": string,
  "exp": number,
  "iat": number,
  "jti": string,
  "client_id": string,
  "username": string
}

export default class Authenticatior implements AuthenticationRepository {
  async validateToken(userPoolId: string, clientId: string, token: string): Promise<string> {
    const verifier = CognitoJwtVerifier.create({
      userPoolId,
      tokenUse: "access",
      clientId,
    });

    const payload = await verifier.verify(token);
    return payload.sub;
  }

  async authUser(token: string, tipo: TipoUsuario): Promise<string> {
    const decodedToken = jwt.decode(token) as DecodedToken;

    const PoolRegex = /([^/]+)$/;
    const getPoolIdMatch = decodedToken?.iss?.match(PoolRegex);

    if (!getPoolIdMatch) {
      return throwError('NO_PERMISSION', 'Sem permissao para executar essa acao');
    }
    const getPoolId = getPoolIdMatch[1];

    if (tipo === TipoUsuario.ADMIN && getPoolId !== ADMIN_POOL_ID) {
      return throwError('NO_PERMISSION', 'Sem permissao para executar essa acao');
    }

    if (tipo === TipoUsuario.ADMIN && getPoolId === ADMIN_POOL_ID) {
      return await this.validateToken(ADMIN_POOL_ID, POOL_ADMIN_CLIENT_ID, token);
    }

    if (tipo === TipoUsuario.CLIENT) {
      return await this.validateToken(getPoolId, getPoolId === USER_POOL_ID ? POOL_CLIENT_CLIENT_ID : POOL_ADMIN_CLIENT_ID, token);
    }

    return throwError('NO_PERMISSION', 'Sem permissao para executar essa acao');
  }
}