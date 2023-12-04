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
    const query = `SELECT e.fecha, e.lugar ,pe.id_pedido, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido
    FROM pedido pe
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    INNER JOIN usuario u 
    ON pe.id_usuario = u.id_usuario
    inner join entrega as e
    on  e.id_pedido = pe.id_pedido
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
    const query = `SELECT pe.id_pedido, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido
    FROM pedido pe
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    INNER JOIN usuario u 
    ON pe.id_usuario = u.id_usuario
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

export const getByIdPedidoForDelete = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT pe.id_pedido, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido
    FROM pedido pe
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    INNER JOIN usuario u 
    ON pe.id_usuario = u.id_usuario
    WHERE pe.deleted = false and pe.id_pedido = ? and status = false`;
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
      "SELECT e.fecha, e.lugar, pe.id_pedido, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido FROM pedido pe INNER JOIN producto p ON pe.id_producto = p.id_producto INNER JOIN tamaño t ON p.id_tamaño = t.id_tamaño INNER JOIN tipo_producto tp ON p.tipo_producto = tp.id_tipo INNER JOIN usuario u ON pe.id_usuario = u.id_usuario inner join entrega as e where pe.deleted = false and pe.id_usuario = ? and pe.status = true";
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
    const query = `SELECT pe.id_pedido, en.lugar, en.fecha, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido FROM pedido pe INNER JOIN producto p ON pe.id_producto = p.id_producto INNER JOIN tamaño t  ON p.id_tamaño = t.id_tamaño INNER JOIN tipo_producto tp  ON p.tipo_producto = tp.id_tipo INNER JOIN usuario u  ON pe.id_usuario = u.id_usuario INNER JOIN entrega en on en.id_pedido = pe.id_pedido WHERE pe.deleted = false and status = false ORDER BY ${orden} DESC LIMIT ${skip}, ${limite}`;
    db.execute(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteLogicoPedido = (id) => {
  return new Promise((resolve, reject) => {
    const query = "update pedido set deleted = true where id_pedido = ?";
    db.execute(query, [id])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const aceptarPedido = (id) => {
  return new Promise((resolve, reject) => {
    const query = "update pedido set status = true where id_pedido = ?";
    db.execute(query, [id])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const getCantidadPedidos = (status) =>{
  return new Promise((resolve, reject) =>{
    const query ='SELECT contar_pedido(?) AS total_pedidos';
    db.execute(query,[status])
    .then((res)=>{
       resolve(res);
    })
    .catch((error)=>{
      reject(error);
    })
  }) 
};