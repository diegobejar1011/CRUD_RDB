import { Router } from "express";
import { verificarJWT } from "../middlewares/auth.middleware.js";
import {
  getProducto,
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
  getProductImage,
  getProductPersonal,
  deleteImageProduct,
  getProductosCantidad
} from "../controllers/productos.controller.js";

import { mostrarArchivo } from "../controllers/uploads.controller.js";

const productosRouter = Router();

//Se consiguen todos los productos no eliminados y que son unicamente del catalogo (es decir no personalizados)
productosRouter.get("/", getProductos);

//se consigue un producto
productosRouter.get("/:id", getProducto);

//Se crea un producto
productosRouter.post("/", verificarJWT, createProducts);

//Se actualiza de manera parcial un producto
productosRouter.patch("/parcialUpdate/:id", verificarJWT, updatePartialProduct);

//Se actualiza completamente un producto
productosRouter.put("/update/:id", verificarJWT, updateProduct);

//Se elimina de manera logica un producto
productosRouter.delete("/deleteLogico/:id", verificarJWT, deleteLogico);

//Se elimina de manera fisica un producto
productosRouter.delete("/deleteFisico/:id", verificarJWT, deleteFisico);

//rutas para imagenes

//Para agregar una imagen a un producto
productosRouter.put("/updateImagen/:id_producto", verificarJWT, updateImagen);

//Para mandar a traer la imagen desde la carpeta uploads de la API
productosRouter.get(
  "/mostrarArchivo/:nombreArchivo",
  verificarJWT,
  mostrarArchivo
);

//Para eliminar una imagen
productosRouter.delete(
  "/eliminarImagen/:id_imagen",
  verificarJWT,
  deleteImagen
);

//Para traer todas las imagenes de un producto
productosRouter.get("/ImagenesProducto/:id_producto", getProductImage);

//Para eliminar la imagen de un producto en especifico
productosRouter.delete(
  "/eliminarImagen/producto/:id_producto",
  verificarJWT,
  deleteImageProduct
);

//rutasTamaños
//Traer todos los tamaños
productosRouter.get("/Tamaños", verificarJWT, getTamaños);

//rutasTipos
//Traer todos los tipos de productos
productosRouter.get("/Tipos", verificarJWT, getType);

//Consigue los productos personalizados
productosRouter.get("/productosPersonalizados", getProductPersonal);


//Se hace el conteo de los productos por tipo 
productosRouter.get("/conteoProducto/segunSuTipo/:tipo", getProductosCantidad);

export default productosRouter;
