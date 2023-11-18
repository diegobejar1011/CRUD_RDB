import { Router } from "express";
import * as entregasController from "../controllers/entrega.controller.js";
import { verificarJWT } from "../middlewares/auth.middleware.js";

const entregasRouter = Router();

//Se consiguen todas las entregas
entregasRouter.get("/", verificarJWT, entregasController.getEntrega);

//Se consigue entrega por id
entregasRouter.get("/:id", verificarJWT, entregasController.getEntregaById);

//Se crea una entrega
entregasRouter.post("/", verificarJWT, entregasController.createEntrega);

//Se actualiza completamente una entrega por id
entregasRouter.put("/:id", entregasController.updateEntrega);

//Se actualiza parcialmente una entrega por id
entregasRouter.patch(
  "/parcialUpdate/:id",
  verificarJWT,
  entregasController.updateParcialEntrega
);

//Se elimina de forma logica una entrega por id 
entregasRouter.delete(
  "/deleteLogico/:id",
  verificarJWT,
  entregasController.deleteLogico
);

//Se elimina de forma fisica una entrega por id
entregasRouter.delete(
  "/deleteFisico/:id",
  verificarJWT,
  entregasController.deleteFisico
);

//Se obtienen las entregas del mes para el calendario (el mes se manda como un número)
entregasRouter.get(
  "/entregaDate/:month",
  verificarJWT,
  entregasController.getEntregasByDate
);

//Creación de una entrega con transacción
/*
  Si en el req.body viene el id_producto significa que el producto ya existe y no se creará, 
  si no viene significa que lo que debe venir es un objeto producto para la creación del producto, 
  como también un objeto pedido como el de entrega
*/
entregasRouter.post(
  "/creacionTotal",
  verificarJWT,
  entregasController.createEntregaWithTransaction
);

//Se consiguen las entregas sin fecha (Va para el calendario del admin para que el las arrastre)
entregasRouter.get(
  "/entregasAprobadas/sinFecha",
  entregasController.getEntregasSinFecha
)
export default entregasRouter;
