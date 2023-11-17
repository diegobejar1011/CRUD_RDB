import { promise } from 'zod';
import {createTypeProducto} from '../services/productos.service.js';

const tiposProducto = [
    {
        "nombre_tipo": "Normal"
    },
    {
        "nombre_tipo": "Personalizado"
    }
];

const array = [];

try {
    tiposProducto.forEach((tipo)=>{
        array.push(createTypeProducto(tipo.nombre_tipo));
    });
    (async ()=>{
        await Promise.all(array);
        console.log('Tipos de productos creados correctamente');
        process.exit(1);
    })()
} catch (error) {
    console.log('Ocurrió un error al crear los tipos de productos', error);
};
