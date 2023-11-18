import zod from "zod";

const usuarioSchema = zod.object({
  nombre: zod.string({
    invalid_type_error: "name must be a string",
    required_error: "name is required",
  }),
  apellido: zod.string({
    invalid_type_error: "apellido must be a string",
    required_error: "apellido is required",
  }),
  telefono: zod.string({
    invalid_type_error: "telefono must be a string",
    required_error: "telefono is required",
  }),
  email: zod.string({
    invalid_type_error: "email must be a string",
    required_error: "email is required",
  }),
  password: zod.string({
    invalid_type_error: " password must be a string",
    required_error: "password is required",
  }),
  tipo: zod
    .number({
      invalid_type_error: "tipo must be a number",
    })
    .default(1),
  deleted: zod
    .boolean({
      invalid_type_error: "deleted must be a boolean",
    })
    .default(false),
});

export const validarUsuario = (object) => {
  return usuarioSchema.safeParse(object);
};

export const validarUsuarioParcial = (object) => {
  return usuarioSchema.partial().safeParse(object);
};
