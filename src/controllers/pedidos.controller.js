import * as pedidosService from "../services/pedidos.service.js";
import { validatePartialPedido, validatePedido } from "../models/pedido.js";

export const getPedidos = (req, res) => {
  const { page, limit } = req.query;
  pedidosService
    .getPedidos(page, limit)
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
  const newPedido = {
    ...result.data,
    Created_at: new Date(),
  };

  pedidosService
    .createPedido(newPedido)
    .then(() => {
      res.status(201).json({
        message: "Pedido creado",
        data: `Pedido del producto: ${newPedido.id_entrega}`,
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
        data: response,
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
      deleted: "Y",
      Deleted_at: new Date(),
    };
    pedidosService
      .updatePedido(newPedido, id)
      .then(() => {
        res.status(200).json({
          message: `Pedido con id ${newPedido.id_entrega} ha sido eliminado`,
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
        Update_at: new Date(),
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
  const result = validatePedido(req.body);
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
      res.status(500).sned(error);
    });
};
