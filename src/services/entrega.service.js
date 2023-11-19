import db from "../config/db.js";

export const getEntregas = (skip, limit, orden) => {
  return new Promise((resolve, reject) => {
    const query = `
    Select e.id_entrega, e.id_pedido, e.lugar, e.horario, e.fecha, e.total, e.created_at, e.updated_at, e.deleted_at, e.deleted, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido
    from entrega e
    INNER JOIN pedido pe
    ON e.id_pedido = pe.id_pedido
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    INNER JOIN usuario u
    ON pe.id_usuario = u.id_usuario
    WHERE e.deleted = false and pe.status = true
    order by ${orden} DESC LIMIT ${skip}, ${limit} `;
    db.execute(query)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const getEntregaById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 
    `Select e.id_entrega, e.id_pedido, e.lugar, e.horario, e.fecha, e.total, e.created_at, e.updated_at, e.deleted_at, e.deleted, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido
    from entrega e
    INNER JOIN pedido pe
    ON e.id_pedido = pe.id_pedido
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    INNER JOIN usuario u
    ON pe.id_usuario = u.id_usuario
    where e.deleted = false and pe.status= true and id_entrega = ?`;
    db.execute(query, [id])
      .then((result) => {
        resolve(result[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createEntrega = (newObject) => {
  return new Promise((resolve, reject) => {
    const { id, id_pedido, lugar, horario, fecha, total, created_at, deleted } =
      newObject;
    const query =
      "INSERT INTO entrega (id_entrega, id_pedido, lugar, horario, fecha, total, created_at, deleted) values (?,?,?,?,?,?,?,?)";
    db.execute(query, [
      id,
      id_pedido,
      lugar,
      horario,
      fecha,
      total,
      created_at,
      deleted,
    ])
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const updateEntrega = (newObject, id) => {
  return new Promise((resolve, reject) => {
    const { id_pedido, lugar, horario, fecha, total } = newObject;
    const query =
      "UPDATE entrega set id_pedido = ?, lugar = ?, horario = ?, fecha = ?, total = ? where id_entrega = ?";
    db.execute(query, [id_pedido, lugar, horario, fecha, total, id])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteFisico = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM entrega where id_entrega=?";
    db.execute(query, [id])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteLogico = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "update entrega set deleted = true , deleted_at = ? where id_entrega = ?";
    db.execute(query, [new Date(), id])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getEntregabyDate = (month) => {
  return new Promise((resolve, reject) => {
    const query =
      "Select e.id_entrega, e.id_pedido, e.lugar, e.horario, e.fecha, e.total, e.created_at, e.updated_at, e.deleted_at, e.deleted, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido from entrega e INNER JOIN pedido pe ON e.id_pedido = pe.id_pedido INNER JOIN producto p ON pe.id_producto = p.id_producto INNER JOIN tamaño t ON p.id_tamaño = t.id_tamaño INNER JOIN tipo_producto tp ON p.tipo_producto = tp.id_tipo INNER JOIN usuario u ON pe.id_usuario = u.id_usuario WHERE e.deleted = false and pe.status = true and MONTH(fecha) = ? ";
    db.execute(query, [month])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createEntregaWithTransaction = async (
  newProducto,
  newPedido,
  newEntrega
) => {
  await db.beginTransaction();

  try {
    if (!newProducto.created) {
      const queryProducto =
        "insert into producto (id_producto, nombre_producto, precio, id_tamaño, tipo_producto, deleted, created_at ) values (?, ?, ?, ?, ?, ?, ?)";
      db.execute(queryProducto, [
        newProducto.id_producto,
        newProducto.nombre_producto,
        newProducto.precio,
        newProducto.id_tamaño,
        newProducto.tipo_producto,
        newProducto.deleted,
        newProducto.created_at,
      ]);
    }

    const queryPedido = `INSERT INTO pedido ( id_pedido, id_producto, id_usuario, nombre_pedido, cantidad, especificacion, dedicatoria, deleted, status, created_at) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.execute(queryPedido, [
      newPedido.id_pedido,
      newPedido.id_producto,
      newPedido.id_usuario,
      newPedido.nombre_pedido,
      newPedido.cantidad,
      newPedido.especificacion,
      newPedido.dedicatoria,
      newPedido.deleted,
      newPedido.status,
      newPedido.created_at,
    ]);

    const queryEntrega =
      "INSERT INTO entrega (id_entrega, id_pedido, lugar, horario, fecha, total, created_at, deleted) values (?,?,?,?,?,?,?,?)";
    db.execute(queryEntrega, [
      newEntrega.id_entrega,
      newEntrega.id_pedido,
      newEntrega.lugar,
      newEntrega.horario,
      newEntrega.fecha,
      newEntrega.total,
      newEntrega.created_at,
      newEntrega.deleted,
    ]);

    await db.commit();
  } catch (error) {
    await db.rollback();
    return error;
  }
};


export const getEntregasSinFecha = (skip, limit, orden) => {
  return new Promise((resolve, reject) => {
    const query = `
    Select e.id_entrega, e.id_pedido, e.lugar, e.horario, e.fecha, e.total, e.created_at, e.updated_at, e.deleted_at, e.deleted, pe.id_producto, pe.id_usuario, pe.nombre_pedido, pe.cantidad, pe.especificacion, pe.dedicatoria, pe.status, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, pe.created_at, pe.updated_at, pe.deleted, pe.deleted_at, u.nombre, u.apellido
    from entrega e
    INNER JOIN pedido pe
    ON e.id_pedido = pe.id_pedido
    INNER JOIN producto p
    ON pe.id_producto = p.id_producto
    INNER JOIN tamaño t 
    ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp 
    ON p.tipo_producto = tp.id_tipo
    INNER JOIN usuario u
    ON pe.id_usuario = u.id_usuario
    WHERE e.deleted = false and pe.status = true and e.fecha is NULL
    order by ${orden} DESC LIMIT ${skip}, ${limit} `;
    db.execute(query)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
