import db from "../config/db.js";

export const getUsuarioByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "select * from usuarios where email = ?";
    db.execute(query, [email])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUsuarioById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "select * from usuarios where id=?";
    db.execute(query, [id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUsuarios = (offset, limit) => {
  return new Promise((resolve, reject) => {
    const query = `Select * from usuarios where deleted = 0 or deleted is null limit ${offset},${limit} `;
    db.execute(query)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createUsuario = (data) => {
  return new Promise((resolve, reject) => {
    const { nombre, apellido, email, password, updated, deleted, hoy } = data;
    const query =
      "Insert into usuarios (nombre, apellido, email, password, updated, deleted, created_at) values (?, ?, ?, ?, ?, ?, ?)";
    db.execute(query, [
      nombre,
      apellido,
      email,
      password,
      updated,
      deleted,
      hoy,
    ])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateParcialUsuario = (data, id) => {
  return new Promise((resolve, reject) => {
    const { nombre, apellido, email, updated_at } = data;
    const query =
      "update usuarios set nombre= ?, email = ?, apellido = ?, updated = true, updated_at = ? where id = ?";
    db.execute(query, [nombre, email, apellido, updated_at, id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateUsuario = (data, id) => {
  return new Promise((resolve, reject) => {
    const { nombre, apellido, email, hoy, updated_at } = data;
    const query =
      "update usuarios set nombre= ?, apellido= ?, email= ?, updated = true, updated_at = ? where id = ?";
    db.execute(query, [nombre, apellido, email, updated_at, id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteLogico = (deletedAt, id) => {
  return new Promise((resolve, reject) => {
    const query =
      "update usuarios set deleted= true, deleted_at= ? where id = ?";
    db.execute(query, [deletedAt, id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteFisico = (id) => {
  return new Promise((resolve, reject) => {
    const query = "delete from usuarios where id = ?";
    db.execute(query, [id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
