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



export const updateImage = (idProducto, UrlImagen) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO imagenes (id_producto, url_imagen) VALUES (?,?);";
    db.execute(query, [idProducto, UrlImagen])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const saveImage = (idProducto) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO imagen (url_imagen) VALUES (?,?);";
    db.execute(query, [idProducto, UrlImagen])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteImage = (idProducto) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM imagenes where id_producto= ?";
    db.execute(query, [idProducto])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
