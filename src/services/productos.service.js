import { resolveEnvPrefix } from "vite";
import db from "../config/db.js";

export const getProducto = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "select id_producto, nombre_producto, precio, id_tamaño, tipo_producto, created_at, updated_at, deleted_at, deleted from producto where id_producto = ? and deleted = false";
    db.execute(query, [id])
      .then((res) => {
        resolve(res[0]);
      })
      .catch((err) => reject(err));
  });
};

export const getProductos = (offset, limit, orden) => {
  return new Promise((resolve, reject) => {
    const query = `select id_producto, nombre_producto, precio, id_tamaño, tipo_producto from producto where deleted = false order by ${orden}  desc limit ${offset},${limit}`;
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
      id,
      nombre_producto,
      precio,
      id_tamaño,
      tipo_producto,
      deleted,
      created_at,
    } = newProduct;
    const query =
      "insert into producto (id_producto, nombre_producto, precio, id_tamaño, tipo_producto, deleted, created_at ) values (?, ?, ?, ?, ?, ?, ?)";
    db.execute(query, [
      id,
      nombre_producto,
      precio,
      id_tamaño,
      tipo_producto,
      deleted,
      created_at,
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
      "INSERT INTO producto_imagen (id_producto, id_imagen) VALUES (?,?);";
    db.execute(queryImagenProducto, [id_producto, id_imagen]);

    await db.commit();
  } catch (error) {
    await db.rollback();
    return error;
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
