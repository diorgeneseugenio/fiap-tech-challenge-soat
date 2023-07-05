import { z } from "zod";


/** Lista Categoria */
export const listaPagamentosSchema = z.object({});
export type listaPagamentosPayload = z.infer<typeof listaPagamentosSchema>;
