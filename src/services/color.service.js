import db from "../config/db.js";

export const getColores = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id_color, codigo_color from color;";
    db.execute(query)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createColor = (codigo) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO color (codigo_color, created_at) VALUES (?,?)";
    db.execute(query, [codigo, new Date()])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateColor = (newObject) => {
  return new Promise((resolve, reject) => {
    const { id_color, codigo_color } = newObject;
    const query =
      "UPDATE color set codigo_color = ?, updated_at = ? WHERE id_color=?";
    db.execute(query, [codigo_color, new Date(), id_color])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postColorProducto = (newObject) => {
  return new Promise((resolve, reject) => {
    const { id_producto, id_color } = newObject;
    const query =
      "INSERT INTO producto_color (id_producto,id_color, created_at) VALUES (?,?,?)";
    db.execute(query, [id_producto, id_color, new Date()])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getColorProducto = (id_producto) => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT c.codigo_color FROM producto_color pc INNER JOIN color c ON pc.id_color= c.id_color where pc.id_producto = ?';
    db.execute(query, [id_producto])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteColorProducto = (id_color, id_producto) =>{
  return new Promise((resolve, reject) =>{
    const query = 'DELETE FROM producto_color WHERE id_color = ? and id_producto = ?';
    db.execute(query,[id_color,id_producto])
    .then((res) =>{
      resolve(res);
    })
    .catch((error) =>{
      reject(error);
    })
  })
}

export const postColorPedido = (newObject) => {
  return new Promise((resolve, reject) => {
    const { id_pedido, id_color } = newObject;
    const query =
      "INSERT INTO pedido_color (id_pedido, id_color, created_at) VALUES (?,?,?)";
    db.execute(query, [id_pedido, id_color, new Date()])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getColorPedido = (id_pedido) => {
  return new Promise((resolve, reject) => {
    const query =
      'SELECT c.codigo_color FROM pedido_color pe INNER JOIN color c ON pe.id_color= c.id_color where pe.id_pedido = ? ;';
    db.execute(query, [id_pedido])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
