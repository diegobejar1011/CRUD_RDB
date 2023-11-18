import { Router } from "express";
import productosRouter from "./productos.route.js";
import pedidosRouter from "./pedidos.route.js";
import usuariosRouter from "./usuarios.route.js";
import entregasRouter from "./entregas.route.js";
import colorRouter from "./color.route.js";

const indexRouter = Router();
const prefijo = "/api";

indexRouter.get(prefijo, (req, res) => {
  res.send("Bienvenido a mi API").status(200);
}); 

indexRouter.use(`${prefijo}/productos`, productosRouter);
indexRouter.use(`${prefijo}/pedidos`, pedidosRouter);
indexRouter.use(`${prefijo}/usuarios`, usuariosRouter);
indexRouter.use(`${prefijo}/entregas`, entregasRouter);
indexRouter.use(`${prefijo}/colores`, colorRouter);

export default indexRouter;
