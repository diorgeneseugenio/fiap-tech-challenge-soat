import { z } from "zod";


/** Cria usuario */
export const CriaUsuarioSchema = z.object({
  body: z.object({
    nome: z
      .string({
        invalid_type_error: "O nome deve ser um texto",
      })
      .optional(),
    cpf: z
      .string({
        invalid_type_error: "O CPF deve ser string",
      })
      .optional(),
    email: z
      .string({ invalid_type_error: "O Email deve ser string" })
      .optional(),
  }),
});
export type CriaUsuarioPayload = z.infer<typeof CriaUsuarioSchema>;
export type CriaUsuarioBody = CriaUsuarioPayload["body"];


/** Lista usuarios */
export const ListaUsuariosSchema = z.object({
  params: z.object({}),
  body: z.object({}),
});
export type ListaUsuariosPayload = z.infer<typeof ListaUsuariosSchema>;
export type ListaUsuariosParams = ListaUsuariosPayload["params"];
export type ListaUsuariosBody = ListaUsuariosPayload["body"];

/** retorna usuario */
export const RetornaUsuarioSchema = z.object({
  body: z.object({
    cpf: z
      .string({
        required_error: "CPF é obrigatório",
        invalid_type_error: "O CPF deve ser string",
      }),
  }),
});
export type RetornaUsuarioPayload = z.infer<typeof RetornaUsuarioSchema>;
export type RetornaUsuarioBody = RetornaUsuarioPayload["body"];
