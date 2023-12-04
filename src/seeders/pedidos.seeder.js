import { createPedido } from "../services/pedidos.service.js";
import crypto from "node:crypto";

const pedidos = [
  {
    id_producto: "22177806-dd5d-4904-9fb3-819998fc30dd",
    id_usuario: "494f5f4e-1e83-4762-83cc-bb05ec580d79",
    nombre_pedido: "Tulipanes Rojos",
    cantidad: 5,
    especificacion: "Quiero que sea muy bonito, con detalles",
    dedicatoria: "Con todo mi amor para ti",
    status: true,
  },
  {
    id_producto: "3288e2a7-e9b0-4aff-a200-feb850b5d374",
    id_usuario: "2f9207f9-86fb-49fe-b98c-83a80ee822b0",
    nombre_pedido: "Rosas Blancas",
    cantidad: 10,
    especificacion: "Me gustaría un ramo grande",
    dedicatoria: "Feliz cumpleaños",
    status: false,
  },
  {
    id_producto: "7dc10092-7276-4a9b-9fec-5880f1020397",
    id_usuario: "0e186bf7-ffef-43fe-8866-df59fbd8ef80",
    nombre_pedido: "Girasoles Amarillos",
    cantidad: 3,
    especificacion: "Que sean frescos",
    dedicatoria: "Para alegrar tu día",
    status: true,
  },
  {
    id_producto: "8c62d8e0-cd0b-4d06-bc72-2742aa98e6ff",
    id_usuario: "026aa489-2d8e-42b3-bc3e-6077128ec06b",
    nombre_pedido: "Lirios Morados",
    cantidad: 7,
    especificacion: "Con envoltura morada",
    dedicatoria: "Con cariño",
    status: false,
  },
];

const array = [];

try {
  pedidos.forEach(async (pedido) => {
    const newPedido = {
      id: crypto.randomUUID(),
      ...pedido,
      created_at: new Date(),
      updated_at: null,
      deleted: false,
      deleted_at: null,
    };
    array.push(createPedido(newPedido));
  });
  (async () =>{
    await Promise.all(array);
    console.log("Los pedidos fueron creados correctamente");
    process.exit(0);
  })();
} catch (error) {
  console.log("Ocurrió un error al crear los pedidos", error);
  process.exit(1);
};