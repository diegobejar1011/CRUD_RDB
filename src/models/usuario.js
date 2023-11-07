import zod  from 'zod'

const usuarioSchema = zod.object({
    nombre: zod.string({
        invalid_type_error: "name must be a string",
        required_error: "name is required"
    }),
    apellido: zod.string({
        invalid_type_error: "apellido must be a string",
        required_error: "apellido is required"
    }),
    email: zod.string({
        invalid_type_error: "email must be a string",
        required_error: "email is required"
    }),
    password: zod.string({
        invalid_type_error: " password must be a string",
        required_error: "password is required"
    }),
    updated: zod.boolean({
        invalid_type_error: "updated must be a boolean"
    })
    .default(false),
    updated_at: zod.coerce.date().nullable().default(null),
    deleted: zod.boolean({
        invalid_type_error: 'deleted must be a boolean'
    })
    .default(false),
    deleted_at: zod.coerce.date().nullable().default(null),
})

export const validarUsuario = (object) =>{
    return usuarioSchema.safeParse(object)
}

export const validarUsuarioParcial = (object) => {
    return productoSchema.partial().safeParse(object);
  };