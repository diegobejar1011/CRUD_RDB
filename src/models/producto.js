import z from "zod";

const productoSchema = z.object({
  nombre_producto: z.string({
    invalid_type_error: "name must be a string",
    required_error: "name is required",
  }),
  precio: z.number({
    invalid_type_error: "Price must be a Number",
    required_error: "Price is required", 
  }),
  id_tamaño: z.number({
    invalid_type_error: "Tamaño must be a Number",
    required_error: "Tamaño is required",
  }),
  tipo_producto: z.number({
    invalid_type_error: "Tipo must be a Number",
    required_error: "Tipo name is required",
  }),
  deleted: z.boolean({
    invalid_type_error: 'deleted must be a boolean'
  })
  .default(false)
});

export const validateProduct = (object) => {
  return productoSchema.safeParse(object);
};

export const validatePartialProduct = (object) => {
  return productoSchema.partial().safeParse(object);
};
