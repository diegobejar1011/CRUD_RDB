import { Router } from "express";
import * as pedidosController from "../controllers/pedidos.controller.js";
import { verificarJWT } from "../middlewares/auth.middleware.js";

const pedidosRouter = Router();

//Se consiguen todos los pedidos aprobados
pedidosRouter.get("/", verificarJWT, pedidosController.getPedidos);

//Se crea un pedido
pedidosRouter.post("/", verificarJWT, pedidosController.createPedido);

//Se obtiene un pedido por id
pedidosRouter.get("/:id", verificarJWT, pedidosController.getByIdPedido);

//Se elimina de forma fisica un pedido por id
pedidosRouter.delete(
  "/eliminarFisico/:id",
  verificarJWT,
  pedidosController.deleteFisico
);

//Se elimina de forma logica un pedido por id
pedidosRouter.delete(
  "/eliminarLogico/:id",
  verificarJWT,
  pedidosController.deleteLogico
);

//Se actualiza de forma parcial un pedido por id
pedidosRouter.patch(
  "/actualizarParcial/:id",
  verificarJWT,
  pedidosController.updatePartialPedido
);

//Se actualiza completamente un pedido por id
pedidosRouter.put(
  "/actualizarCompleto/:id",
  verificarJWT,
  pedidosController.updatePedido
);

//Se consiguen los pedidos de un usuario a traves del id_usuario
pedidosRouter.get(
  "/pedidosUser/:id_usuario",
  pedidosController.getPedidosByUser
);

//Se acepta el pedido con el id
pedidosRouter.patch(
  "/aceptarPedido/:id",
  verificarJWT,
  pedidosController.aceptarPedido
);

//Se consiguen los pedidos pendientes por aceptar
pedidosRouter.get("/pedidos/Pendientes", pedidosController.getPedidosPending);

export default pedidosRouter;
