import { z } from "zod";

/** Cria Categoria */
export const criaCategoriaSchema = z.object({
  body: z.object({
    nome: z
      .string()
  }),
});

export type criaCategoriaPayload = z.infer<typeof criaCategoriaSchema>;

/** Lista Categoria */
export const listaCategoriaSchema = z.object({});
export type listaCategoriaPayload = z.infer<typeof listaCategoriaSchema>;

/** retorna Categoria */
export const retornaCategoriaSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type retornaCategoriaPayload = z.infer<typeof retornaCategoriaSchema>;

/** Deleta Categoria */
export const deletaCategoriaSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type deletaCategoriaPayload = z.infer<typeof deletaCategoriaSchema>;

/** Edita Categoria */
export const editaCategoriaSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
  body: z.object({
    nome: z
      .string({
        required_error: "O nome da categoria é obrigatório",
        invalid_type_error: "O nome deve ser um texto",
      })
  }),
});

export type editaCategoriaPayload = z.infer<typeof editaCategoriaSchema>;