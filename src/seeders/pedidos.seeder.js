import { createPedido } from "../services/pedidos.service.js";
import crypto from "node:crypto";

const pedidos = [
  {
    id_producto: "2218a179-9a10-4816-a878-291999c8b154",
    id_usuario: "a2db4dd0-95c1-480c-9914-c30b5a523d82",
    nombre_pedido: "Tulipanes Rojos",
    cantidad: 5,
    especificacion: "Quiero que sea muy bonito, con detalles",
    dedicatoria: "Con todo mi amor para ti",
    status: true,
  },
  {
    id_producto: "c194879f-d58f-4f5f-b4d0-69df13917edd",
    id_usuario: "fe4477c4-2f01-4cf8-b52c-fe1859525151",
    nombre_pedido: "Rosas Blancas",
    cantidad: 10,
    especificacion: "Me gustaría un ramo grande",
    dedicatoria: "Feliz cumpleaños",
    status: false,
  },
  {
    id_producto: "8733fa79-627c-43a7-a4c6-97ec20f44c05",
    id_usuario: "de42c740-447a-4173-8ceb-7c3514c57822",
    nombre_pedido: "Girasoles Amarillos",
    cantidad: 3,
    especificacion: "Que sean frescos",
    dedicatoria: "Para alegrar tu día",
    status: true,
  },
  {
    id_producto: "3d334b04-7a69-4166-b8a0-cb52a0408154",
    id_usuario: "ec26e54e-4a5b-49e9-9c02-cac3860ad44e",
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