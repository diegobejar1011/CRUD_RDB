import * as entregaServices from "../services/entrega.service.js";
import { getProducto } from "../services/productos.service.js";
import { validatePartialEntrega, validateEntrega } from "../models/entrega.js";
import crypto from "node:crypto";
import { updateImage } from "../services/productos.service.js";
import { createColor, postColorProducto } from "../services/color.service.js";
import { crearImagen } from "../helpers/crearImagen.js";
import { postColorPedido } from "../services/color.service.js";

export const getEntrega = (req, res) => {
  const { page = 1, limit = 10, orden = "fecha" } = req.query;
  const skip = (page - 1) * limit;
  entregaServices
    .getEntregas(skip, limit, orden)
    .then((response) => {
      res.status(200).json({
        message: "Entregas conseguidas",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al conseguir las entregas",
        error: error.message,
      });
    });
};

export const getEntregaById = (req, res) => {
  const { id } = req.params;
  entregaServices
    .getEntregaById(id)
    .then((response) => {
      res.status(200).json({
        message: "Entrega conseguida",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al conseguir las entregas",
        error: error.message,
      });
    });
};

export const createEntrega = (req, res) => {
  const result = validateEntrega(req.body);
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }
  const newEntrega = {
    id: crypto.randomUUID(),
    ...result.data,
    created_at: new Date(),
    deleted: false,
    created_by: req.usuario.id  
  };
  entregaServices
    .createEntrega(newEntrega)
    .then(() => {
      res.status(201).json({
        message: "Entrega creada correctamente",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al crear la entrega",
        error: error.message,
      });
    });
};

export const updateEntrega = (req, res) => {
  const { id } = req.params;
  const result = validateEntrega(req.body);
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }
  const newEntrega = {
    ...result.data,
    updated_at: new Date(),
  };
  entregaServices
    .updateEntrega(newEntrega, id)
    .then(() => {
      res.status(200).json({
        message: "Entrega actualizada",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió al actualizar la entrega",
        error: error.message,
      });
    });
};

export const updateParcialEntrega = (req, res) => {
  const { id } = req.params;
  entregaServices
    .getEntregaById(id)
    .then((response) => {
      const originalData = response[0];
      const result = validatePartialEntrega(req.body);
      if (!result.success) {
        return res
          .status(422)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newEntrega = {
        ...originalData,
        ...result.data,
        updated_at: new Date(),
      };
      entregaServices
        .updateEntrega(newEntrega, id)
        .then(() => {
          res.status(200).json({
            message: "Entrega actualizada",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Ocurrió al actualizar la entrega",
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Entrega no encontrada",
        error: error.message,
      });
    });
};

export const deleteFisico = (req, res) => {
  const { id } = req.params;
  entregaServices
    .deleteFisico(id)
    .then(() => {
      res.status(200).json({
        message: "Entrega eliminada",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió al eliminar la entrega",
        error: error.message,
      });
    });
};

export const deleteLogico = (req, res) => {
  const { id } = req.params;
  entregaServices
    .deleteLogico(id)
    .then(() => {
      res.status(200).json({
        message: "La entrega ha sido eliminada",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al eliminar la entrega",
        error: error.message,
      });
    });
};

export const getEntregasByDate = (req, res) => {
  const { month } = req.params;
  entregaServices
    .getEntregabyDate(month)
    .then((response) => {
      res.status(200).json({
        message: "La entrega se consiguio correctamente",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al conseguir la entrega",
        error: error.message,
      });
    });
};

export const createEntregaWithTransaction = async (req, res) => {
  const { id_productoNew = null } = req.body;
  let producto = {};

  const id_producto = crypto.randomUUID();

  if (!id_productoNew) {
    id_producto,
      (producto = {
        id_producto,
        nombre_producto: req.body.producto.nombre_producto,
        precio: req.body.producto.precio,
        id_tamaño: req.body.producto.id_tamaño,
        tipo_producto: req.body.producto.tipo_producto,
        deleted: false,
        created_at: new Date(),
      });
    const imagenes = [...req.body.producto.imagenes];
    const colores = [...req.body.producto.colores];

    imagenes.forEach(async (imagen) => {
      const { b64, extension } = imagen;
      const id_producto = producto.id_producto;
      const nombreImagen = `${id_producto}${Date.now()}.${extension}`;
      const newImagen = {
        id_producto,
        id_imagen: crypto.randomUUID(),
        url_imagen: nombreImagen,
        created_at: new Date(),
        deleted: false,
      };
      const result = await updateImage(newImagen);
      if (result) {
        const apiImagen = {
          b64,
          nombreImagen,
        };
        crearImagen(apiImagen);
      }
    });

    colores.forEach((color) => {
      const newColor = {
        id_producto: producto.id_producto,
        id_color: color,
      };
      //crear color con el color (#FFF, etc...) que mando
      // createColor()
      postColorProducto(newColor);
    });
  } else {
    const result = await getProducto(id_productoNew);
    producto = {
      ...result[0],
      deleted: false,
      created_at: new Date(),
      created: true,
    };
  }

  const id_pedido = crypto.randomUUID();
  const id_usuario = req.usuario.id;
  const pedido = {
    id_producto: producto.id_producto,
    id_pedido,
    id_usuario,
    ...req.body.pedido,
    created_at: new Date(),
    deleted: false,
  };

  let coloresPedido = [];
  if (req.body.producto) {
    coloresPedido = [...req.body.producto.colores];
  } else {
    coloresPedido = [...req.body.pedido.colores];
  }

  coloresPedido.forEach((color) => {
    const newColor = {
      id_pedido: id_pedido,
      id_color: color,
    };
    postColorPedido(newColor);
  });

  const id_entrega = crypto.randomUUID();
  const entrega = {
    id_entrega,
    id_pedido,
    ...req.body.entrega,
    created_at: new Date(),
    deleted: false,
  };

  entregaServices
    .createEntregaWithTransaction(producto, pedido, entrega)
    .then(() => {
      res.status(201).json({
        message: "Se creo correctamente el pedido y la entrega",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al crear el pedido y la entrega",
        error: error.message,
      });
    });
};

export const getEntregasSinFecha = (req, res) => {
  const { page = 1, limit = 10, orden = "fecha" } = req.query;
  const skip = (page - 1) * limit;
  entregaServices
    .getEntregasSinFecha(skip, limit, orden)
    .then((response) => {
      res.status(200).json({
        message: "Entregas conseguidas",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Ocurrió un error al conseguir las entregas",
        error: error.message,
      });
    });
};


export const getIngresosMes = (req, res) =>{
  entregaServices
    .getIngresosMes()
    .then((response) =>{
      res.status(200).json({
        message: 'Se han conseguido los ingresos del mes',
        // data: response[0]
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Ocurrió un error al conseguir los ingresos del mes',
        error: error.message
      })
    });
};

export const setFechaEntrega = (req, res) =>{
  const {id_pedido} = req.params;
  entregaServices
  .setFechaEntrega(id_pedido)
  .then(()=>{
    res.status(200).json({
      message: `Se ha dado una fecha a la entrega con id_pedido ${id_pedido}`
    });
  })
  .catch((error) =>{
    res.status(500).json({
      message: 'Ocurrió un eror al asignar una fecha aproximada a la entrega',
      error: error.message
    });
  });
};