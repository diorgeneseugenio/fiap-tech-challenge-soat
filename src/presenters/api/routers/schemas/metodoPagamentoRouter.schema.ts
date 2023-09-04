import { z } from "zod";

/** Lista Categoria */
export const ListaPagamentosSchema = z.object({
    params: z.object({}),
    body: z.object({}),
});

export type ListaPagamentosPayload = z.infer<typeof ListaPagamentosSchema>;
export type ListaPagamentosBody = ListaPagamentosPayload["body"];
export type ListaPagamentosParams = ListaPagamentosPayload["params"];
