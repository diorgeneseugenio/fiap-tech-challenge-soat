import { z } from "zod";

export const RecebimentoDePagamentosSchema = z.object({
  params: z.object({}),
  body: z.object({
    pagamentoId: z
      .string({
        required_error: "O id do pagamento é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
    faturaId: z
      .string({
        required_error: "O id da fatura é obrigatório",
        invalid_type_error: "id da fatura inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
    isPago: z
    .boolean({
      required_error: "O status do pagamento é obrigatório",
      invalid_type_error: "status inválido",
    }),
    valorPagamento: z
    .number({
      required_error: "O valor do pagamento é obrigatório",
      invalid_type_error: "valor inválido",
    })
    .gte(0.01, { message: "valor deve ser maior que 0" }),
    tipoDePagamento: z
    // deixei como string por enquanto
    .string({
      required_error: "O tipo do pagamento é obrigatório",
      invalid_type_error: "tipo inválido",
    })
  }),
});

export type RecebimentoDePagamentosPayload = z.infer<typeof RecebimentoDePagamentosSchema>;
export type RecebimentoDePagamentosBody = RecebimentoDePagamentosPayload["body"];
export type RecebimentoDePagamentosParams = RecebimentoDePagamentosPayload["params"];
