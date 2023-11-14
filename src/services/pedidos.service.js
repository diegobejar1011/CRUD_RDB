import db from "../config/db.js";

export const createPedido = (newPedido) => {
  return new Promise((resolve, reject) => {
    const {
      id,
      producto,
      usuario,
      nombre,
      cantidad,
      especificacion,
      dedicatoria,
      deleted
    } = newPedido;
    const query = `INSERT INTO pedido ( id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria, deleted) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.execute(query, [
      id,
      producto,
      usuario,
      nombre,
      cantidad,
      especificacion,
      dedicatoria,
      deleted
    ])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPedidos = (skip, limite, orden) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria FROM pedido WHERE deleted = false ORDER BY ${orden} DESC LIMIT ${skip}, ${limite}`;
    db.execute(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getByIdPedido = (id) => {
  return new Promise((resolve, reject) => {
    const query = `select id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria from pedido where id_pedido = ? and deleted = false `;
    db.execute(query, [id])
      .then((result) => {
        resolve(result[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deletePedido = (id) => {
  return new Promise((resolve, reject) => {
    const query = `delete from pedido where id_pedido = ?`;
    db.execute(query, [id])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updatePedido = (newPedido, id) => {
  return new Promise((resolve, reject) => {
    const {
      nombre,
      cantidad, 
      especificacion,
      dedicatoria
    } = newPedido;
    const query =
      "update pedido set nombre_pedido = ?, cantidad = ?, especificacion = ?, dedicatoria= ? where id_pedido = ?";
    db.execute(query, [
      nombre,
      cantidad,
      especificacion,
      dedicatoria,
      id,
    ])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
