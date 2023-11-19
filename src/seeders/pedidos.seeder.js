import { createPedido } from "../services/pedidos.service.js";
import crypto from "node:crypto";

const pedidos = [
  {
    id_producto: "0b5bed7d-9adb-4475-b3cd-b5301f5aee8f",
    id_usuario: "8b806fe3-cc5d-486c-816a-8f28749462e8",
    nombre_pedido: "Tulipanes Rojos",
    cantidad: 5,
    especificacion: "Quiero que sea muy bonito, con detalles",
    dedicatoria: "Con todo mi amor para ti",
    status: true,
  },
  {
    id_producto: "7240b73a-c1ec-4db0-a51d-2d00364b3c28",
    id_usuario: "ac12062a-4dda-43a2-a212-a5df16e958c8",
    nombre_pedido: "Rosas Blancas",
    cantidad: 10,
    especificacion: "Me gustaría un ramo grande",
    dedicatoria: "Feliz cumpleaños",
    status: false,
  },
  {
    id_producto: "bdb8ca01-b074-474d-8258-01536a75568a",
    id_usuario: "52050963-5f07-4494-9772-ecd04c6c0475",
    nombre_pedido: "Girasoles Amarillos",
    cantidad: 3,
    especificacion: "Que sean frescos",
    dedicatoria: "Para alegrar tu día",
    status: true,
  },
  {
    id_producto: "5e7bfdfd-dc16-4270-b704-60ece00d68d7",
    id_usuario: "1cf0c950-90c7-4a72-a9be-b0404307de64",
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