import { z } from "zod";


/** Cria usuario */
export const criaUsuarioSchema = z.object({
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
export type criaUsuarioPayload = z.infer<typeof criaUsuarioSchema>;

/** Lista usuarios */
export const listaPagamentosSchema = z.object({});
export type listaPagamentosPayload = z.infer<typeof listaPagamentosSchema>;

/** retorna usuario */
export const retornaUsuarioSchema = z.object({
  body: z.object({
    cpf: z
      .string({
        required_error: "CPF é obrigatório",
        invalid_type_error: "O CPF deve ser string",
      }),
  }),
});
export type retornaUsuarioPayload = z.infer<typeof retornaUsuarioSchema>;
