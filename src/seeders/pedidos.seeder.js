import { createPedido } from "../services/pedidos.service.js";
import crypto from "node:crypto";

const pedidos = [
  {
    id_producto: "18806413-aab9-4a91-93f3-3378b55b5e25",
    id_usuario: "2f9207f9-86fb-49fe-b98c-83a80ee822b0",
    nombre_pedido: "Tulipanes Rojos",
    cantidad: 5,
    especificacion: "Quiero que sea muy bonito, con detalles",
    dedicatoria: "Con todo mi amor para ti",
    status: true,
  },
  {
    id_producto: "23a4c7e7-2c05-4a7f-8c28-9f8f94cd453d",
    id_usuario: "c8739e06-8e7a-41e1-a4c7-2e71a59c8b24",
    nombre_pedido: "Rosas Blancas",
    cantidad: 10,
    especificacion: "Me gustaría un ramo grande",
    dedicatoria: "Feliz cumpleaños",
    status: false,
  },
  {
    id_producto: "8d45f56b-cc56-4f6b-9fc3-56a1e98b83fb",
    id_usuario: "7a1a6e90-3c1a-45d2-bb93-4b6aae2d7982",
    nombre_pedido: "Girasoles Amarillos",
    cantidad: 3,
    especificacion: "Que sean frescos",
    dedicatoria: "Para alegrar tu día",
    status: true,
  },
  {
    id_producto: "4fd9a9c1-8249-4c50-8a88-7a48ba0e09a7",
    id_usuario: "be1a52c0-2487-402c-87f1-348480e56bc2",
    nombre_pedido: "Lirios Morados",
    cantidad: 7,
    especificacion: "Con envoltura morada",
    dedicatoria: "Con cariño",
    status: false,
  },
];

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
    await createPedido(newPedido);
    process.exit(1);
  });
  console.log("Pedidos creados correctamente");
} catch (error) {
  console.log("Ocurrió un error al crear los pedidos", error);
}
