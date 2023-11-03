import zod  from 'zod'

const usuarioSchema = zod.object({
    nombre: zod.string({
        invalid_type_error: "Task name must be a string",
        required_error: "Task name is required"
    }),
    apellido: zod.string({
        invalid_type_error: "Task name must be a string",
        required_error: "Task name is required"
    }),
    email: zod.string({
        invalid_type_error: "Task name must be a string",
        required_error: "Task name is required"
    }),
    password: zod.string({
        invalid_type_error: "Task password must be a string",
        required_error: "Task password is required"
    }),
    updated: zod.boolean({
        invalid_type_error: "Task must be a boolean"
    })
    .default(false),
    updated_at: zod.coerce.date().nullable().default(null),
    deleted: zod.boolean({
        invalid_type_error: 'Task must be a boolean'
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