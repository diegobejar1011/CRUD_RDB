import { Router } from "express";
import * as colorControllers from "../controllers/color.controller.js";
import { verificarJWT } from "../middlewares/auth.middleware.js";

const colorRouter = Router();

//obtienes todos los colores
colorRouter.get("/", colorControllers.getColores);

//color por pedido
colorRouter.get(
  "/coloresPedido/:id_pedido",
  verificarJWT,
  colorControllers.getColorPedido
);

//color por producto
colorRouter.get(
  "/coloresProducto/:id_producto",
  verificarJWT,
  colorControllers.getColorProducto
);

//agregas color del producto
colorRouter.post(
  "/agregarColorProducto",
  verificarJWT,
  colorControllers.postColorProducto
);

//?agregas color del pedido
colorRouter.post(
  "/agregarColorPedido",
  verificarJWT,
  colorControllers.postColorPedido
);

export default colorRouter;
