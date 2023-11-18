import * as pedidosService from "../services/pedidos.service.js";
import { validatePartialPedido, validatePedido } from "../models/pedido.js";
import crypto from 'node:crypto';

export const getPedidos = (req, res) => {
  const { page = 1, limit = 10 , orden = 'nombre_pedido' } = req.query;
  const skip = (page - 1) * limit;
  pedidosService
    .getPedidos(skip, limit, orden)
    .then((response) => {
      res.status(200).json({
        message: "Se consiguieron los pedidos",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const createPedido = (req, res) => {
  const result = validatePedido(req.body);
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }

  //Manipular "creadorNombre" de la forma que se quiera (recordar modificar db)
  const {nombre : creadorNombre} = req.usuario
  console.log(creadorNombre);
  const newPedido = {
    id: crypto.randomUUID(),
    id_usuario: creadorNombre,
    ...result.data,
    created_at: new Date(),
    deleted: false
  };

  pedidosService
    .createPedido(newPedido)
    .then(() => {
      res.status(201).json({
        message: "Pedido creado"
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const getByIdPedido = (req, res) => {
  const { id } = req.params;
  pedidosService
    .getByIdPedido(id)
    .then((response) => {
      res.status(200).json({
        message: "Se consiguieron los pedidos",
        data: response[0],
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const deleteLogico = (req, res) => {
  const { id } = req.params;
  pedidosService.getByIdPedido(id).then((response) => {
    const originalData = response[0];
    const newPedido = {
      ...originalData,
      deleted: true,
      deleted_at: new Date(),
    };
    pedidosService
      .updatePedido(newPedido, id)
      .then(() => {
        res.status(200).json({
          message: `Pedido ha sido eliminado`,
        });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
};

export const deleteFisico = (req, res) => {
  const { id } = req.params;
  pedidosService
    .deletePedido(id)
    .then(() => {
      res.status(200).json({
        message: `Pedido con id ${id} ha sido eliminado`,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const updatePartialPedido = (req, res) => {
  const { id } = req.params;
  pedidosService
    .getByIdPedido(id)
    .then((response) => {
      const originalData = response[0];
      const result = validatePartialPedido(req.body);
      if (!result.success) {
        return res
          .status(422)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newPedido = {
        ...originalData,
        ...result.data,
        updated_at: new Date(),
      }; 
      pedidosService
        .updatePedido(newPedido, id)
        .then(() => {
          res.status(200).json({
            message: `Pedido con el id ${id} ha sido actualizado`,
          });
        })
        .catch((error) => {
          res.status(500).send(error);
        }); 
    })
    .catch((error) => {
      res.status(500).send("Pedido no encontrado", error);
    });
};

export const updatePedido = (req, res) => {
  const { id } = req.params;
  const result = validatePartialPedido(req.body);
  if (!result.success) {
    return res.status(422).json({ error: JSON.parse(result.error.message) });
  }
  const updatePedido = {
    ...result.data,
    Id_entrega: id,
    Update_at: new Date(),
  };
  pedidosService
    .updatePedido(updatePedido, id)
    .then(() => {
      res.status(200).json({
        message: `Pedido con el id ${updatePedido.Id_entrega} ha sido actualizado`,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

export const getPedidosByUser = (req, res) => {
  const { id_usuario } = req.params;
  pedidosService
    .getPedidosbyUser(id_usuario)
    .then((response)=> {
      res.status(200).json({
        message: 'Los pedidos se obtuvieron correctamente',
        data: response[0]
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Ocurrió un error al obtener los pedidos',
        error: error.message
      })
    })
};

export const getPedidosPending = (req, res) => {
  pedidosService
    .getPedidosPending()
    .then((response)=>{
      res.status(200).json({
        message: 'Se consiguieron los pedidos pendientes',
        data: response[0]
      });
    })
    .catch((error)=>{
      res.status(500).json({
        message: 'Ocurrió un error al conseguir los pedidos pendientes',
        error: error.message
      });
    });
};