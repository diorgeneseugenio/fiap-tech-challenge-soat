import { z } from "zod";

/** Cria Produto */
export const criaProdutoSchema = z.object({
  body: z.object({
    nome: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      }),
    preco: z
      .number({
        required_error: "O preco é obrigatório",
        invalid_type_error: "O id deve ser um numer",
      }),
    descricao: z
      .string(),
    categoriaId: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "categoriaId deve ser UUID" }),
    //images - TODO 
  }),
});

export type criaProdutoPayload = z.infer<typeof criaProdutoSchema>;

/** Lista Produto */
export const listaProdutoSchema = z.object({});
export type listaProdutoPayload = z.infer<typeof listaProdutoSchema>;

/** retorna Produto */
export const retornaProdutoSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do Produto é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type retornaProdutoPayload = z.infer<typeof retornaProdutoSchema>;

/** Deleta Produto */
export const deletaProdutoSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do Produto é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
});

export type deletaProdutoPayload = z.infer<typeof deletaProdutoSchema>;

/** Edita Produto */
export const editaProdutoSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id da Produto é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
  body: z.object({
    nome: z
      .string({
        required_error: "O nome é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .optional(),
    preco: z
      .number({
        required_error: "O preco é obrigatório",
        invalid_type_error: "O id deve ser um numer",
      })
      .optional(),
    descricao: z
      .string()
      .optional(),
    categoriaId: z
      .string({
        required_error: "O id da categoria é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "categoriaId deve ser UUID" })
    //images - TODO 
  }),
});

export type editaProdutoPayload = z.infer<typeof editaProdutoSchema>;

/** Deleta imagem Produto */
export const removeImagemSchema = z.object({
  params: z.object({
    idProduto: z
      .string({
        required_error: "O id do Produto é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
    idImagem: z
      .string({
        required_error: "O id da imagem é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id da imagem deve ser UUID" }),
  }),
});

export type removeImagemPayload = z.infer<typeof removeImagemSchema>;

/** Edita Produto */
export const adicionaImagenSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do produto é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id deve ser UUID" }),
  }),
  body: z.object({
    //images - TODO 
  }),
});

export type adicionaImagenPayload = z.infer<typeof adicionaImagenSchema>;