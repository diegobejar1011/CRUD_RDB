import db from "../config/db.js";

export const getProducto = (id) => {
  return new Promise((resolve, reject) => {
    const query =
      "select id_producto, nombre_producto, precio, id_tamaño, tipo_producto, created_at, updated_at, deleted_at, deleted from producto where id_producto = ? and deleted = false";
    db.execute(query, [id])
      .then((res) => {
      resolve(res[0])
      })
      .catch((err) => reject(err));
  });
};

export const getProductos = (offset, limit, orden) => {
  return new Promise((resolve, reject) => {
    const query =
      `select id_producto, nombre_producto, precio, id_tamaño, tipo_producto from producto where deleted = false order by ${orden}  desc limit ${offset},${limit}`;
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
      created_at
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
        created_at
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
    const {
        nombre_producto,
        precio,
        id_tamaño,
        tipo_producto,
        updated_at,
    } = newProduct;
    const query =
      "update producto set nombre_producto = ?, precio = ?, id_tamaño = ?, tipo_producto = ?, updated_at = ? where id_producto = ?";
    db.execute(query, [
        nombre_producto,
        precio,
        id_tamaño,
        tipo_producto,
        updated_at,
        id
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

export const deleteLogico = (id) => {
  return new Promise((resolve, reject) => {
    const query = "update producto set deleted = true , deleted_at = ? where id_producto = ?";
    db.execute(query, [new Date(),id])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}



export const updateImage = (idProducto, id_imagen) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO producto_imagen (id_producto, id_imagen) VALUES (?,?);";
    db.execute(query, [idProducto, id_imagen])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const saveImage = (newObject) => {
  return new Promise((resolve, reject) => {
    const {
      id_imagen,
      url_imagen,
      created_at,
      deleted
    } = newObject;
    const query =
      "INSERT INTO imagen (id_imagen, url_imagen, created_at, deleted) VALUES (?,?,?,?);";
    db.execute(query, [id_imagen, 
      url_imagen, 
      created_at,
      deleted])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteImage = (id_imagen) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE imagen SET deleted = true , deleted_at = ? where id_imagen= ?";
    db.execute(query, [new Date(),id_imagen])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
