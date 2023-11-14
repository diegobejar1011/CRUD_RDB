import path from "node:path";
import { validatePartialProduct, validateProduct } from "../models/producto.js";
import * as productosService from "../services/productos.service.js";
import crypto from "node:crypto";
import fs from "node:fs";

export const getProductos = (req, res) => {
  const { page = 1, limit = 10, orden = "nombre_producto" } = req.query;
  const skip = (page - 1) * limit;
  productosService
    .getProductos( skip, limit, orden) 
    .then((response) => {
      res.status(200).json({
        data: response[0],
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const createProducts = (req, res) => {
  const result = validateProduct(req.body);
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }
  const newProduct = {
    id: crypto.randomUUID(),
    ...result.data,
    created_at: new Date(),
  };
  productosService
    .createProduct(newProduct)
    .then(() => {
      res.status(201).json({
        data: `Product created sucessfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export const updatePartialProduct = (req, res) => {
  const { id } = req.params;
  productosService
    .getProducto(id)
    .then((response) => {
      const originalData = response[0];
      const result = validatePartialProduct(req.body);
      if (!result.success) {
        return res
          .status(422)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newProduct = {
        ...originalData,
        ...result.data,
        updated_at: new Date(),
      };
      productosService
        .updateProduct(newProduct, id)
        .then(() => {
          res.status(200).json({
            data: `Product updated sucessfully!`,
          });
        })
        .catch((secondErr) => {
          res.status(500).json({
            error: secondErr.message
          });
        });
    })
    .catch((err) => {
      res.status(404).send("Producto no encontrado", err);
    });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const result = validateProduct(req.body);
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }
  const updateProduct = {
    ...result.data,
    id: id,
    updated_at: new Date(),
  };
  productosService
    .updateProduct(updateProduct, id)
    .then(() => {
      res.status(200).json({
        data: `Product updated sucessfully!`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      });
    });
};

export const deleteLogico = (req, res) => {
  const { id } = req.params;
  productosService
    .deleteLogico(id)
    .then(()=>{
      res.status(200).json({
        message: 'Producto eliminado'
      })
    })
    .catch((error)=>{
      res.status(500).json({
        error: error.message
      })
    })
};

export const deleteFisico = (req, res) => {
  const { id } = req.params;
  productosService
    .deleteProduct(id)
    .then(() => {
      res.status(201).json({
        data: `Product deleted sucessfully!`,
      });
    })
    .catch((secondErr) => {
      res.status(500).send(secondErr);
    });
};


export const updateImagen = async (req,res)=>{
  try{
    const {b64, extension}=req.body;
    const idProducto= req.params.id;
    const imagen= Buffer.from(b64,'base64');
    const nombreImagen = `${idProducto}${Date.now()}.${
      extension
    }`;
    const __dirname=path.resolve();
    const productoEncontrado= await productosService.getProducto(idProducto);

    if(!productoEncontrado){
      return res.status(404).json({
        message: "Producto no encontrado"
      })
    }
    const uploadPath = path.join(__dirname,'uploads', nombreImagen);
    fs.writeFileSync(uploadPath, imagen);

    productosService.saveImage();
    productosService.updateImage(idProducto,uploadPath); 

    return res.status(200).json({
      message: "Se subio la imagen correctamente",
    });
  }catch(error){
    return res.status(500).json({
      message: "Ocurrión un error al actualizar imagen del producto",
      error: error.message
    })
  }
}

export const deleteImagen = (req,res)=>{
  const __dirname= path.resolve();
  const {idProducto,extension}=req.params;
  const uploadPath = path.join(__dirname,'uploads', `${idProducto}.${extension}`); 
  productosService
  .deleteImage(idProducto)
  .then(()=>{
    fs.unlinkSync(uploadPath);
    return res.status(200).json({
      message: "Imagen eliminada",
    })
  })
  .catch((err)=>{
    return res.status().json({
      message: "ocurrió un error al eliminar la imagen",
      error: err.message
    })
  })

}