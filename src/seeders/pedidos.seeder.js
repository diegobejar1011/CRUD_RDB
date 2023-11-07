import { createPedido } from "../services/pedidos.service.js";
import crypto from "node:crypto";

const pedidos = [
  {
    id_entrega: 10,
    id_producto: "0e9a2c63-ce65-4648-87b4-f5e4131a4f67",
    id_lugar: 200,
    fecha: "2023-11-10",
    id_horario: 3,
    total: 50,
    deleted: "N",
    Deleted_at: null,
    Created_at: null,
    Update_at: null,
  },
  {
    id_entrega: 20,
    id_producto: "ad79ad70-1708-49f5-9001-43fa8dbd1fa0",
    id_lugar: 201,
    fecha: "2023-11-12",
    id_horario: 2,
    total: 75,
    deleted: "N",
    Deleted_at: null,
    Created_at: null,
    Update_at: null,
  },
  {
    id_entrega: 30,
    id_producto: "b1d801c1-a299-4981-a336-be0e5eaf6f01",
    id_lugar: 202,
    fecha: "2023-11-15",
    id_horario: 1,
    total: 60,
    deleted: "N",
    Deleted_at: null,
    Created_at: null,
    Update_at: null,
  },
];

pedidos.forEach((pedido) => {
  const newPedido = {
    ...pedido,
    Created_at: new Date(),
  };
  createPedido(newPedido)
    .then(() => console.log("Pedidos creados"))
    .catch((error) => console.error("Error al crear pedidos", error));
});
