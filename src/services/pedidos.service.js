import db from "../config/db.js";

export const createPedido = (newPedido) => {
  return new Promise((resolve, reject) => {
    const {
      id_producto,
      id_lugar,
      fecha,
      id_horario,
      total,
      deleted,
      Deleted_at,
      Created_at,
      Update_at,
    } = newPedido;
    const query = `INSERT INTO pedido ( id_producto, id_lugar, fecha, id_horario, total, deleted, Deleted_at, Created_at, Update_at) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.execute(query, [
      id_producto,
      id_lugar,
      fecha,
      id_horario,
      total,
      deleted,
      Deleted_at,
      Created_at,
      Update_at,
    ])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPedidos = (pagina, limite) => {
  return new Promise((resolve, reject) => {
    const offset = (pagina - 1) * limite;
    const query = `SELECT * FROM pedido WHERE deleted = 'N' ORDER BY total DESC LIMIT ${offset}, ${limite}`;
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
    const query = `select * from pedido where id_entrega = ? and deleted = "N"`;
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
    const query = `delete from pedido where id_entrega = ?`;
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
      id_producto,
      id_lugar,
      fecha,
      id_horario,
      total,
      deleted,
      Deleted_at,
      Created_at,
      Update_at,
    } = newPedido;
    const query =
      "update pedido set id_entrega = ?, id_producto=?, id_lugar=?, fecha=?, id_horario=?, total=?, deleted=?, Deleted_at=?, Created_at=?, Update_at=? where id_entrega = ?";
    db.execute(query, [
      id,
      id_producto,
      id_lugar,
      fecha,
      id_horario,
      total,
      deleted,
      Deleted_at,
      Created_at,
      Update_at,
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
