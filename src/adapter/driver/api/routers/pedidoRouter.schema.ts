import { z } from "zod";

/** Inicia Pedido */
export const iniciaPedidoSchema = z.object({
  body: z.object({
    clienteId: z
      .string()
      .uuid({ message: "O id do cliente deve ser UUID" })
      .optional(),
  }),
});

export type IniciaPedidoPayload = z.infer<typeof iniciaPedidoSchema>;

/** Adicionar Item */
export const adicionarItemSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do pedido é obrigatório",
        invalid_type_error: "O id pedido deve ser um texto",
      })
      .uuid({ message: "O id do pedido deve ser UUID" }),
  }),
  body: z.object({
    produtoId: z
      .string({
        required_error: "O id do produto é obrigatório",
        invalid_type_error: "O id deve ser um texto",
      })
      .uuid({ message: "O id do produto deve ser UUID" }),
    quantidade: z
      .number({
        required_error: "Quantidade é obrigatória",
        invalid_type_error: "Quantidade deve ser um número",
      })
      .positive({ message: "Quantidade deve ser maior que zero" }),
    observacao: z
      .string({ invalid_type_error: "Observação deve ser um texto" })
      .optional(),
  }),
});

export type AdicionarItemPayload = z.infer<typeof adicionarItemSchema>;

export type AdicionarItemBody = AdicionarItemPayload["body"];
export type AdicionarItemParams = AdicionarItemPayload["params"];

/** Remover Item */
export const removerItemSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do pedido é obrigatório",
        invalid_type_error: "O id pedido deve ser um texto",
      })
      .uuid({ message: "O id do pedido deve ser UUID" }),
    idItem: z
      .string({
        required_error: "O id do item é obrigatório",
        invalid_type_error: "O id item deve ser um texto",
      })
      .uuid({ message: "O id do item deve ser UUID" }),
  }),
});

export type RemoverItemPayload = z.infer<typeof removerItemSchema>;
export type RemoverItemParams = RemoverItemPayload["params"];

/** Realizar Pedido */
export const realizarPedidoSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do pedido é obrigatório",
        invalid_type_error: "O id pedido deve ser um texto",
      })
      .uuid({ message: "O id do pedido deve ser UUID" }),
  }),
  body: z.object({
    metodoDePagamentoId: z
      .string({
        required_error: "O id do método de pagamento é obrigatório",
        invalid_type_error: "O id do método de pagamento deve ser um texto",
      })
      .uuid({ message: "O id do método de pagamento deve ser UUID" }),
  }),
});

export type RealizarPedidoPayload = z.infer<typeof realizarPedidoSchema>;
export type RealizarPedidoBody = RealizarPedidoPayload["body"];
export type RealizarPedidoParams = RealizarPedidoPayload["params"];

/** Iniciar Preparo */
export const iniciarPreparoSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "O id do pedido é obrigatório",
        invalid_type_error: "O id pedido deve ser um texto",
      })
      .uuid({ message: "O id do pedido deve ser UUID" }),
  }),
});

export type IniciarPreparoPayload = z.infer<typeof iniciarPreparoSchema>;
export type IniciarPreparoParams = IniciarPreparoPayload["params"];
