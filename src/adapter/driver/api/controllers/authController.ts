import { Request, Response } from "express";

import AuthenticationService from "~core/applications/services/authService";

export default class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async geraToken(req: Request, res: Response) {
    const { cpf } = req.body
    if (!cpf) {
      res.status(400).json({ error: 'dados de acesso não fornecidos' })
    }
    try {
      const token = await this.authenticationService.geraToken(cpf);
      if (!token) {
        res.status(401).json({ error: 'falha na autenticação' })
      }

      return res.status(201).json({
        status: "success",
        message: token,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        status: "error",
        message: {err, errorMessage: 'dados de acesso inexistentes'},
      });
    }
  }
}
