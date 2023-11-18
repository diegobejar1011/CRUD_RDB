import { Router } from "express";
import * as pedidosController from "../controllers/pedidos.controller.js";
import { verificarJWT } from "../middlewares/auth.middleware.js";

const pedidosRouter = Router();

pedidosRouter.get("/", verificarJWT, pedidosController.getPedidos);
pedidosRouter.post("/", verificarJWT, pedidosController.createPedido);
pedidosRouter.get("/pedido/:id", verificarJWT, pedidosController.getByIdPedido);
pedidosRouter.delete("/eliminarFisico/:id", verificarJWT, pedidosController.deleteFisico);
pedidosRouter.delete("/eliminarLogico/:id", verificarJWT, pedidosController.deleteLogico);
pedidosRouter.patch("/actualizarParcial/:id", verificarJWT, pedidosController.updatePartialPedido);
pedidosRouter.put("/actualizarCompleto/:id", verificarJWT, pedidosController.updatePedido);

pedidosRouter.get("/pedidosUser/:id_usuario", verificarJWT, pedidosController.getPedidosByUser);
pedidosRouter.get("/pedidosPendientes", pedidosController.getPedidosPending);

export default pedidosRouter;
