import db from "../config/db.js";

export const createPedido = (newPedido) => {
  return new Promise((resolve, reject) => {
    const {
      id,
      id_producto,
      id_usuario,
      nombre_pedido,
      cantidad,
      especificacion,
      dedicatoria,
      deleted,
      status,
      created_at
    } = newPedido;
    const query = `INSERT INTO pedido ( id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria, deleted, status, created_at) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.execute(query, [
      id,
      id_producto,
      id_usuario,
      nombre_pedido,
      cantidad,
      especificacion,
      dedicatoria,
      deleted,
      status,
      created_at
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
    const query = `SELECT id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria, status, deleted, created_at, updated_at, deleted_at FROM pedido WHERE deleted = false ORDER BY ${orden} DESC LIMIT ${skip}, ${limite}`;
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
      nombre_pedido,
      cantidad, 
      especificacion,
      dedicatoria,
      status
    } = newPedido;
    const query =
      "update pedido set nombre_pedido = ?, cantidad = ?, especificacion = ?, dedicatoria= ?, status = ? where id_pedido = ?";
    db.execute(query, [
      nombre_pedido,
      cantidad,
      especificacion,
      dedicatoria,
      status,
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


export const getPedidosbyUser = (id_usuario) => {
  return new Promise ((resolve, reject) => {
    const query = 'SELECT id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria, deleted, created_at, updated_at, deleted_at, status FROM pedido where deleted = false and id_usuario = ?';
    db.execute(query,[id_usuario])
      .then((res)=>{
        resolve(res);
      })
      .catch((error)=>{
        reject(error);
      });
  });
};