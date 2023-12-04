import db from "../config/db.js";

export const getProducto = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "select p.id_producto, p.nombre_producto, p.precio, t.nombre_tamaño from producto p INNER JOIN tamaño t ON p.id_tamaño = t.id_tamaño INNER JOIN tipo_producto tp ON p.tipo_producto = tp.id_tipo where id_producto = ? and deleted = false";
    db.execute(query, [id])
      .then((res) => {
        resolve(res[0]);
      })
      .catch((err) => reject(err));
  });
};

export const getProductos = (offset, limit, orden) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT p.id_producto, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, p.deleted, p.created_at, p.updated_at, p.deleted_at
    FROM producto p
    INNER JOIN tamaño t ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp ON p.tipo_producto = tp.id_tipo
    WHERE p.deleted = false
    and p.tipo_producto = 1
    ORDER BY ${orden} DESC
    LIMIT ${offset}, ${limit};`;
    db.execute(query)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createProduct = (newProduct) => {

  return new Promise((resolve, reject) => {
    const {
      id_producto,
      nombre_producto,
      precio,
      id_tamaño,
      tipo_producto,
      deleted,
      created_at,
      created_by
    } = newProduct;
    const query =
      "insert into producto (id_producto, nombre_producto, precio, id_tamaño, tipo_producto, deleted, created_at, created_by ) values (?, ?, ?, ?, ?, ?, ?, ?)";
    db.execute(query, [
      id_producto,
      nombre_producto,
      precio,
      id_tamaño,
      tipo_producto,
      deleted,
      created_at,
      created_by
    ])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProduct = (newProduct, id) => {
  return new Promise((resolve, reject) => {
    const { nombre_producto, precio, id_tamaño, tipo_producto, updated_at } =
      newProduct;
    const query =
      "update producto set nombre_producto = ?, precio = ?, id_tamaño = ?, tipo_producto = ?, updated_at = ? where id_producto = ?";
    db.execute(query, [
      nombre_producto,
      precio,
      id_tamaño,
      tipo_producto,
      updated_at,
      id,
    ])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    const query = "delete from producto where id_producto = ?";
    db.execute(query, [id])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const deleteLogico = (deleted_at, id) => {
  return new Promise((resolve, reject) => {
    const query =
      "update producto set deleted = true , deleted_at = ? where id_producto = ?";
    db.execute(query, [deleted_at, id])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

//servicios para las imagenes

export const updateImage = async (newObject) => {
  await db.beginTransaction();
  try {
    const { id_imagen, url_imagen, created_at, deleted, id_producto } =
      newObject;

    const query =
      "INSERT INTO imagen (id_imagen, url_imagen, created_at, deleted) VALUES (?,?,?,?);";
    db.execute(query, [id_imagen, url_imagen, created_at, deleted]);

    const queryImagenProducto =
      "INSERT INTO producto_imagen (id_producto, id_imagen, created_at) VALUES (?,?,?);";
    db.execute(queryImagenProducto, [id_producto, id_imagen, created_at]);

    await db.commit();
    return true;
  } catch (error) {
    await db.rollback();
    return false;
  }
};

export const deleteImage = (id_imagen) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE imagen SET deleted = true , deleted_at = ? where id_imagen= ?";
    db.execute(query, [new Date(), id_imagen])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteImageProduct = (id_producto) =>{
  return new Promise((resolve, reject) =>{
    const query = 'DELETE FROM producto_imagen WHERE id_producto = ?';
    db.execute(query,[id_producto])
    .then((res) =>{
      resolve(res);
    })
    .catch((error) =>{
      reject(error);
    });
  });
};

export const getTamaños = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id_tamaño, nombre_tamaño FROM tamaño";
    db.execute(query)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createTamaño = (nombre_tamaño) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO tamaño (nombre_tamaño, created_at) VALUES (?,?)";
    db.execute(query, [nombre_tamaño, new Date()])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateTamaño = (newObject) => {
  return new Promise((resolve, reject) => {
    const { id_tamaño, nombre_tamaño } = newObject;
    const query =
      "UPDATE tamaño SET nombre_tamaño = ?, updated_at = ? WHERE id_tamaño = ?";
    db.execute(query, [nombre_tamaño, new Date(), id_tamaño])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getType = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id_tipo, nombre_tipo from tipo_producto";
    db.execute(query)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createTypeProducto = (nombre_tipo) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO tipo_producto (nombre_tipo, created_at) VALUES (?,?)";
    db.execute(query, [nombre_tipo, new Date()])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateTypeProducto = (newObject) => {
  return new Promise((resolve, reject) => {
    const { id_tipo, nombre_tipo } = newObject;
    const query =
      "UPDATE tipo_usuario SET nombre_tipo = ?, updated_at = ? WHERE id_tipo = ?";
    db.execute(query, [nombre_tipo, new Date(), id_tipo])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProductImage = (id_producto) =>{
  return new Promise((resolve, reject) =>{
    const query = " SELECT i.url_imagen FROM producto_imagen pm INNER JOIN imagen i ON pm.id_imagen = i.id_imagen WHERE pm.id_producto = ? ";
    db.execute(query,[id_producto])
    .then((res)=>{
      resolve(res);
    })
    .catch((error) =>{
      reject(error);
    });
  });
};

export const getProductPersonal = (offset, limit, orden) =>{
  return new Promise((resolve, reject) => {
    const query = `SELECT p.id_producto, p.nombre_producto, p.precio, t.nombre_tamaño, tp.nombre_tipo, p.deleted, p.created_at, p.updated_at, p.deleted_at
    FROM producto p
    INNER JOIN tamaño t ON p.id_tamaño = t.id_tamaño
    INNER JOIN tipo_producto tp ON p.tipo_producto = tp.id_tipo
    WHERE p.deleted = false
    and p.tipo_producto = 2
    ORDER BY ${orden} DESC
    LIMIT ${offset}, ${limit};`;
    db.execute(query)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


export const getProductosCantidad = (tipo) =>{
  return new Promise((resolve, reject) =>{
    const query = 'SELECT contar_producto(?) AS total_productos_tipo;'
    db.execute(query,[tipo])
    .then((res) => {
      resolve(res);
    })
    .catch((error) =>{
      reject(error);
    })
  });
}