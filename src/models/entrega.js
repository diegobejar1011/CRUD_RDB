import z from 'zod';

const entregaSchema = z.object({
    id_pedido: z.string({
        invalid_type_error: 'Id_pedido debe ser un string',
        required_error: 'Id_pedido es requerido'
    }),
    lugar: z.string({
        invalid_type_error: 'Lugar debe ser un string',
        required_error: 'Lugar es requerido'
    }),
    horario: z.string({
        invalid_type_error: 'Horario debe ser un string',
        required_error: 'Horario es requerido'
    }),
    fecha: z.coerce.date({
        invalid_type_error: 'Fecha debe ser tipo date',
        required_error: 'Fecha es requerido'
    }),
    total: z.number({
        invalid_type_error: 'Total debe ser un numero',
        required_error: 'Total es requerido'
    }),
    deleted: z.boolean({
        invalid_type_error: 'Deleted debe ser un booleano'
    })
    .default(false)

});

export const validateEntrega = (object) => {
    return entregaSchema.safeParse(object);
};

export const validatePartialEntrega = (object) => {
    return entregaSchema.partial().safeParse(object);
};
  