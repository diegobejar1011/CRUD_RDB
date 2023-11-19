import { createProduct } from "../services/productos.service.js";
import crypto from "node:crypto";

const arregloDeProductos = [
  {
    nombre_producto: "Tulipanes Rojos",
    precio: 15,
    id_tamaño: 1,
    tipo_producto: 1,
  },
  {
    nombre_producto: "Rosas Blancas",
    precio: 25,
    id_tamaño: 2,
    tipo_producto: 1,
  },
  {
    nombre_producto: "Girasoles Amarillos",
    precio: 18,
    id_tamaño: 1,
    tipo_producto: 1,
  },
  {
    nombre_producto: "Lirios Morados",
    precio: 30,
    id_tamaño: 3,
    tipo_producto: 1,
  },
  {
    nombre_producto: "Orquídeas Rosadas",
    precio: 40,
    id_tamaño: 2,
    tipo_producto: 1,
  },
];

try {
  //primero se ejecuta producto
  arregloDeProductos.forEach((producto) => {
    const newObject = {
      id: crypto.randomUUID(),
      ...producto,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
      deleted: false,
    };
    createProduct(newObject);
    
  });
  console.log("Productos creados correctamente");
  process.exit(0);
} catch (error) {
  console.log("Ocurrió un error al crear los productos", error);
  process.exit(1);
}
