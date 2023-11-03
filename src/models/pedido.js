import z from "zod";

const pedidoSchema = z.object({
  id_entrega: z.number({
    invalid_type_error: "Id_pedido debe ser un string",
    required_error: "Id_pedido es requerido",
  }),
  id_producto: z.string({
    invalid_type_error: "Id_product debe ser un string",
    required_error: "Id_product es requerido",
  }),
  id_lugar: z.number({
    invalid_type_error: "Id_lugar debe ser un número",
    required_error: "Id_lugar es requerido",
  }),
  fecha: z.string({
    invalid_type_error: "Fecha debe ser un string",
    required_error: "Fecha es requerida",
  }),
  id_horario: z.number({
    invalid_type_error: "Id_horario debe ser un numero",
    required_error: "Id_horario es requerido",
  }),
  total: z.number({
    invalid_type_error: "Total debe ser un número",
    required_error: "Total es requerido",
  }),
  deleted: z
    .string({
      invalid_type_error: "Deleted must be a Char",
    })
    .default("N"),
  Deleted_at: z.coerce.date().nullable().default(null),
  Created_at: z.coerce.date().nullable().default(null),
  Update_at: z.coerce.date().nullable().default(null),
});

export const validatePedido = (object) => {
  return pedidoSchema.safeParse(object);
};

export const validatePartialPedido = (object) => {
  return pedidoSchema.partial().safeParse(object);
};
