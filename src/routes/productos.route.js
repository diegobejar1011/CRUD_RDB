import { Router } from "express";
import { verificarJWT } from "../middlewares/auth.middleware.js";
import {
  getProductos,
  createProducts,
  updatePartialProduct,
  updateProduct,
  deleteLogico,
  deleteFisico,
} from "../controllers/productos.controller.js";

const productosRouter = Router();

productosRouter.get("/:offset", getProductos);
productosRouter.post("/", verificarJWT, createProducts);
productosRouter.patch("/parcialUpdate/:id", verificarJWT, updatePartialProduct);
productosRouter.put("/update/:id", verificarJWT, updateProduct);
productosRouter.delete("/deleteLogico/:id", verificarJWT, deleteLogico);
productosRouter.delete("/deleteFisico/:id", verificarJWT, deleteFisico);

export default productosRouter;
