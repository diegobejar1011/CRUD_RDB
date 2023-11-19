import { validatePartialProduct, validateProduct } from "../models/producto.js";
import * as productosService from "../services/productos.service.js";
import crypto from "node:crypto";
import {postColorProducto} from '../services/color.service.js';
import {crearImagen} from '../helpers/crearImagen.js'

export const getProductos = (req, res) => {
  const { page = 1, limit = 10, orden = "nombre_producto" } = req.query;
  const skip = (page - 1) * limit;
  productosService
    .getProductos(skip, limit, orden)
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
    id_producto,
    nombre_producto: result.data.nombre_producto,
    precio: result.data.precio,
    id_tamaño: result.data.id_tamaño,
    tipo_producto: result.data.tipo_producto,
    created_at: new Date(),
    deleted: false
  };

  const imagenes = [...req.body.imagenes];
  const colores = [...req.body.colores];


  productosService
    .createProduct(newProduct)
    .then(() => {
      imagenes.forEach( async (imagen)=>{
        const { b64, extension } = imagen;
        const id_producto  = newProduct.id;
        const nombreImagen = `${id_producto}${Date.now()}.${extension}`;
        const newImagen = {
          id_producto,
          id_imagen: crypto.randomUUID(),
          url_imagen: nombreImagen,
          created_at: new Date(),
          deleted: false,
        }
        const result = await productosService.updateImage(newImagen);
        if(result){
          const apiImagen = {
            b64,
            nombreImagen
          };
          crearImagen(apiImagen);
        };
      });
      colores.forEach((color)=>{
        const newColor = {
          id_producto: newProduct.id,
          id_color: color
        };
        postColorProducto(newColor);
      });
      res.status(201).json({
        message: 'Se completo el guardado del producto'
      })
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
            error: secondErr.message,
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
        error: err.message,
      });
    });
};

export const deleteLogico = (req, res) => {
  const { id } = req.params;
  productosService
    .deleteLogico(new Date(), id)
    .then(() => {
      res.status(200).json({
        message: "Producto eliminado",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
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

//controladores para las imagenes --------

export const updateImagen = async (req, res) => {
  try {
    const { b64, extension } = req.body;
    const { id_producto } = req.params;
    const nombreImagen = `${id_producto}${Date.now()}.${extension}`;
    const productoEncontrado = await productosService.getProducto(id_producto);
    if (!productoEncontrado) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    const id_imagen = crypto.randomUUID();
    const newImagen = {
      id_producto,
      id_imagen,
      url_imagen: nombreImagen,
      created_at: new Date(),
      deleted: false,
    };
    const result = await productosService.updateImage(newImagen);
    if (result) {
      const apiImagen = {
        b64,
        nombreImagen
      };
      crearImagen(apiImagen);
    };
    return res.status(200).json({
      message: "Se subio la imagen correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrión un error al actualizar imagen del producto",
      error: error.message,
    });
  }
};

export const deleteImagen = (req, res) => {
  const { id_imagen } = req.params;
  productosService
    .deleteImage(id_imagen)
    .then(() => {
      return res.status(200).json({
        message: "Imagen eliminada",
      });
    })
    .catch((err) => {
      return res.status().json({
        message: "ocurrió un error al eliminar la imagen",
        error: err.message,
      });
    });
};

//tamaño
export const createTamaño = (req, res) => {
  const { nombre_tamaño } = req.body;
  productosService
    .createTamaño(nombre_tamaño)
    .then(() => {
      res.status(201).json({
        message: "Tamaño creado correctamente",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al crear el tamaño",
        error: error.message,
      });
    });
};

export const updateTamaño = (req, res) => {
  const { id_tamano, nombre_tamano } = req.body;
  const newTamano = {
    id_tamano,
    nombre_tamano,
  };
  productosService
    .updateTamaño(newTamano)
    .then(() => {
      res.status(200).json({
        message: "Tamaño actualizado",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al actualizar el tamaño",
        error: error.message,
      });
    });
};

export const getTamaños = (req, res) => {
  productosService
    .getTamaños()
    .then((response) => {
      res.status(200).json({
        message: "Se obtuvieron los tamaños correctamente",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al conseguir los tamaños",
        error: error.message,
      });
    });
};

//tipo de producto
export const createTypeProducto = (req, res) => {
  const { nombre_tipo } = req.body;
  productosService
    .createTypeProducto(nombre_tipo)
    .then(() => {
      res.status(201).json({
        message: "Tipo de producto creado exitosamente",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al crear el tipo de producto",
        error: error.message,
      });
    });
};

export const updatedTypesProducto = (req, res) => {
  const { id_tipo, nombre_tipo } = req.body;
  const newTipo = {
    id_tipo,
    nombre_tipo,
  };
  productosService
    .updateTypeProducto(newTipo)
    .then(() => {
      res.status(200).json({
        messgae: "Se actualizo el tipo de producto",
        error: error.message,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al actualizar el tipo de producto",
        error: error.message,
      });
    });
};

export const getType = (req, res) => {
  productosService
    .getType()
    .then((response) => {
      res.status(200).json({
        message: "Se obtuvieron los tipos de producto correctamente",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al conseguir los tipos de producto",
        error: error.message,
      });
    });
};

export const getProductImage = (req, res) => {
  const { id_producto } = req.params;
  productosService
    .getProductImage(id_producto)
    .then((response) => {
      res.status(200).json({
        message: "Se consiguieron las imagenes correctamente",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al conseguir las imagenes",
        error: error.message,
      });
    });
};

export const getProductPersonal = (req, res) => {
  const { page = 1, limit = 10, orden = "nombre_producto" } = req.query;
  const skip = (page - 1) * limit;
  productosService
    .getProductPersonal(skip, limit, orden)
    .then((response) => {
      res.status(200).json({
        message: "Se consiguieron los productos personalizados",
        data: response[0],
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

