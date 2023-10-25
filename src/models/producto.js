import z from "zod";

const productoSchema = z.object({
  Prod_Name: z.string({
    invalid_type_error: "Task name must be a string",
    required_error: "Task name is required",
  }),
  Price: z.number({
    invalid_type_error: "Price must be a Number",
    required_error: "Price is required",
  }),
  Width: z.number({
    invalid_type_error: "Width must be a Number",
    required_error: "Width is required",
  }),
  Height: z.number({
    invalid_type_error: "Height must be a Number",
    required_error: "Height is required",
  }),
  Colour: z.string({
    invalid_type_error: "Task name must be a string",
    required_error: "Task name is required",
  }),
  Images: z.string({
    invalid_type_error: "Task name must be a string",
    required_error: "Task name is required",
  }),
  state_delete: z
    .string({
      invalid_type_error: "Delete must be a Char",
    })
    .default("N"),
  Delete_at: z.coerce.date().nullable().default(null),
  Created_at: z.coerce.date().nullable().default(null),
  Update_at: z.coerce.date().nullable().default(null),
});

export const validateProduct = (object) => {
  return productoSchema.safeParse(object);
};

export const validatePartialProduct = (object) => {
  return productoSchema.partial().safeParse(object);
};
