import { Router } from "express";
import { verificarJWT } from "../middlewares/auth.middleware.js";
import {
  getProductos,
  createProducts,
  updatePartialProduct,
  updateProduct,
  deleteLogico,
  deleteFisico,
  updateImagen,
  deleteImagen
} from "../controllers/productos.controller.js";

import {mostrarArchivo} from "../controllers/uploads.controller.js"

const productosRouter = Router();
 
productosRouter.get("/:id", getProductos);
productosRouter.post("/", verificarJWT, createProducts);
productosRouter.patch("/parcialUpdate/:id", verificarJWT, updatePartialProduct);
productosRouter.put("/update/:id", verificarJWT, updateProduct); 
productosRouter.delete("/deleteLogico/:id", verificarJWT, deleteLogico);
productosRouter.delete("/deleteFisico/:id", verificarJWT, deleteFisico);

//rutas paa imgenes
productosRouter.put("/updateImagen/:id", updateImagen);
productosRouter.get("/mostrarArchivo/:nombreArchivo", mostrarArchivo);
productosRouter.delete("/eliminarImagen/:idProducto/:extension", deleteImagen);

export default productosRouter;
