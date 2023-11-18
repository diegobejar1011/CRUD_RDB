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
      created_at,
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
      created_at,
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
    const query = `SELECT pe.id_pedido, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at
    FROM pedido pe
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    WHERE pe.deleted = false and status = true
    ORDER BY ${orden} DESC LIMIT ${skip}, ${limite}`;
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
    const query = `SELECT pe.id_pedido, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at
    FROM pedido pe
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    WHERE pe.deleted = false and status = true and pe.id_pedido = ?;`;
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
    const { nombre_pedido, cantidad, especificacion, dedicatoria, status } =
      newPedido;
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
  return new Promise((resolve, reject) => {
    const query =
      "SELECT id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria, deleted, created_at, updated_at, deleted_at, status FROM pedido where deleted = false and id_usuario = ?";
    db.execute(query, [id_usuario])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPedidosPending = (skip, limite, orden) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT pe.id_pedido, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at
    FROM pedido pe
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    WHERE pe.deleted = false and status = false
    ORDER BY ${orden} DESC LIMIT ${skip}, ${limite}`;
    db.execute(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};