import { validatePartialProduct, validateProduct } from "../models/producto.js";
import * as productosService from "../services/productos.service.js";
import crypto from "node:crypto";

export const getProductos = (req, res) => {
  const {offset} = req.params;
  productosService
    .getProductos(offset)
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
        data: `Product with name ${newProduct.Prod_Name} created sucessfully!`,
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
        Update_at: new Date(),
      };
      productosService
        .updateProduct(newProduct, id)
        .then(() => {
          res.status(200).json({
            data: `Product with name ${newProduct.Prod_Name} updated sucessfully!`,
          });
        })
        .catch((secondErr) => {
          res.status(500).send(secondErr);
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
    ID_Product: id,
    Update_at: new Date(),
  };
  console.log(updateProduct);
  productosService
    .updateProduct(updateProduct, id)
    .then(() => {
      res.status(200).json({
        data: `Product with name ${updateProduct.Prod_Name} updated sucessfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteLogico = (req, res) => {
  const { id } = req.params;
  productosService
    .getProducto(id)
    .then((response) => {
      const originalData = response[0];
      const newProduct = {
        ...originalData,
        state_delete: "Y",
        Delete_at: new Date(),
      };
      productosService
        .updateProduct(newProduct, id)
        .then(() => {
          res.status(200).json({
            data: `Product with name ${newProduct.Prod_Name} deleted sucessfully!`,
          });
        })
        .catch((secondErr) => {
          res.status(500).send(secondErr);
        });
    })
    .catch((err) => {
      res.status(404).send("Producto no encontrado", err);
    });
};

export const deleteFisico = (req, res) => {
  const { id } = req.params;
  productosService
    .deleteProduct(id)
    .then(() => {
      res.status(301).json({
        data: `Product with id ${id} deleted sucessfully!`,
      });
    })
    .catch((secondErr) => {
      res.status(500).send(secondErr);
    });
};
