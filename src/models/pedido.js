import z from "zod";

const pedidoSchema = z.object({
  producto: z.string({
    invalid_type_error: "Id_product debe ser un string",
    required_error: "Id_product es requerido",
  }),
  usuario: z.string({
    invalid_type_error: "Id_usuario debe ser un string",
    required_error: "Id_usuario es requerido",
  }),
  nombre: z.string({
    invalid_type_error: "Nombre debe ser un string",
    required_error: "Nombre es requerido",
  }),
  cantidad: z.number({
    invalid_type_error: "Cantidad debe ser un número",
    required_error: "Cantidad es requerido",
  }),
  especificacion: z.string({
    invalid_type_error: "Especificación debe ser un string",
  }),
  dedicatoria: z.string({
    invalid_type_error: "Dedicatoria debe ser un string",
  }),
  deleted: z.boolean({
    invalid_type_error: 'Deletede debe ser un booleano'
  })
  .default(false)
});

export const validatePedido = (object) => {
  return pedidoSchema.safeParse(object);
};

export const validatePartialPedido = (object) => {
  return pedidoSchema.partial().safeParse(object);
};
