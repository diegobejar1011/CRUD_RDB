import db from "../config/db.js";

export const getUsuarioByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query =
      "select id_usuario, nombre, apellido, telefono, correo, tipo_usuario, password from usuario where correo = ? and deleted = false";
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
    const query =
      "select id_usuario, nombre, apellido, telefono, correo, tipo_usuario, password from usuario where id_usuario=? and deleted = false";
    db.execute(query, [id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUsuarios = (offset, limit, orden) => {
  return new Promise((resolve, reject) => {
    const query = `Select id_usuario, nombre, apellido, telefono, correo, tipo_usuario, password from usuario where deleted = false ORDER BY ${orden} DESC limit ${offset},${limit} `;
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
    const {
      id,
      nombre,
      apellido,
      telefono,
      email,
      password,
      tipo,
      deleted,
      created_at,
    } = data;
    const query =
      "Insert into usuario (id_usuario,nombre, apellido, telefono, correo, password, tipo_usuario, created_at, deleted) values (?, ?, ?, ?, ?, ?, ?,?,?)";
    db.execute(query, [
      id,
      nombre,
      apellido,
      telefono,
      email,
      password,
      tipo,
      created_at,
      deleted,
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
    const { nombre, apellido, telefono, correo, updated_at } = data;
    const query =
      "update usuario set nombre= ?, apellido = ?, telefono= ?, correo= ? , updated_at = ? where id_usuario = ?";
    db.execute(query, [nombre, apellido, telefono, correo, updated_at, id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const updateUsuario = (data, id) => {
  return new Promise((resolve, reject) => {
    const { nombre, apellido, telefono, email, updated_at } = data;
    const query =
      "update usuario set nombre= ?, apellido = ?, telefono= ?, correo= ?, updated_at = ? where id_usuario = ?";
    db.execute(query, [nombre, apellido, telefono, email, updated_at, id])
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
      "update usuario set deleted= true, deleted_at= ? where id_usuario = ?";
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
    const query = "delete from usuario where id_usuario = ?";
    db.execute(query, [id])
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getTypes = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT id_tipo, nombre_tipo FROM tipo_usuario";
    db.execute(query)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createType = (nombre_tipo) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO tipo_usuario (nombre_tipo, created_at) VALUES (?,?)";
    db.execute(query, [nombre_tipo, new Date()])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateType = (newObject) => {
  return new Promise((resolve, reject) => {
    const { id_tipo, nombre_tipo } = newObject;
    const query =
      "UPDATE tipo_usuario SET nombre_tipo=? , update = ? where id_tipo=?";
    db.execute(query, [nombre_tipo, new Date(), id_tipo])
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
