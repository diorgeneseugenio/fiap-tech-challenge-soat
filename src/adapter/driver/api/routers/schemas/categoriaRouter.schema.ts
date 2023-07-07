import { z } from "zod";

/** Cria Categoria */
export const CriaCategoriaSchema = z.object({
  body: z.object({
    nome: z
      .string()
  }),
});

export type CriaCategoriaPayload = z.infer<typeof CriaCategoriaSchema>;

/** Lista Categoria */
export const ListaCategoriaSchema = z.object({});
export type ListaCategoriaPayload = z.infer<typeof ListaCategoriaSchema>;

/** retorna Categoria */
export const RetornaCategoriaSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type RetornaCategoriaPayload = z.infer<typeof RetornaCategoriaSchema>;
export type RetornaCategoriaParams = RetornaCategoriaPayload["params"];

/** Deleta Categoria */
export const DeletaCategoriaSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "id inválido",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type DeletaCategoriaPayload = z.infer<typeof DeletaCategoriaSchema>;
export type DeletaCategoriaParams = DeletaCategoriaPayload["params"];

/** Edita Categoria */
export const EditaCategoriaSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "id inválido",
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

export type EditaCategoriaPayload = z.infer<typeof EditaCategoriaSchema>;
export type EditaCategoriaBody = EditaCategoriaPayload["body"];
export type EditaCategoriaParams = EditaCategoriaPayload["params"];