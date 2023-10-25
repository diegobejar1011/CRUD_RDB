import { Router } from "express";
import productosRouter from "./productos.route.js";

const indexRouter = Router();
const prefijo = "/api";

indexRouter.get(prefijo, (req, res) => {
  res.send("Bienvenido a mi API").status(200);
});

indexRouter.use(`${prefijo}/productos`, productosRouter);

export default indexRouter;
