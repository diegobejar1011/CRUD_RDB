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
  deleteImagen,
  getTamaños,
  getType,
  getProductImage
} from "../controllers/productos.controller.js";

import {
  mostrarArchivo
} from "../controllers/uploads.controller.js"

const productosRouter = Router();
 
productosRouter.get("/", getProductos);
productosRouter.post("/", verificarJWT, createProducts);
productosRouter.patch("/parcialUpdate/:id", verificarJWT, updatePartialProduct);
productosRouter.put("/update/:id", verificarJWT, updateProduct); 
productosRouter.delete("/deleteLogico/:id", verificarJWT, deleteLogico);
productosRouter.delete("/deleteFisico/:id", verificarJWT, deleteFisico);

//rutas paa imgenes
productosRouter.put("/updateImagen/:id_producto", verificarJWT, updateImagen);
productosRouter.get("/mostrarArchivo/:nombreArchivo", verificarJWT, mostrarArchivo);
productosRouter.delete("/eliminarImagen/:id_imagen", verificarJWT, deleteImagen);
productosRouter.get("/imagesProducto/:id_producto", verificarJWT, getProductImage );

//rutasTamaños
productosRouter.get('/Tamaños', verificarJWT, getTamaños); 

//rutasTipos
productosRouter.get('/Tipos', verificarJWT, getType);



export default productosRouter;
