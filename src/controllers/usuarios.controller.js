import * as usuarioModel from "../models/usuario.js";
import * as usuarioServices from "../services/usuarios.service.js";
import bcrypt from "bcrypt";

const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);

export const index = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  usuarioServices
    .getUsuarios(skip, limit)
    .then((response) => {
      res.status(200).json({
        message: "se obtuvieron los usuarios correctamente",
        usuarios: response[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "hubo un error en el servidor",
        error: err.message,
      });
    });
};

export const getById = (req, res) => {
  const { id } = req.params;
  usuarioServices
    .getUsuarioById(id)
    .then((response) => {
      res.status(200).json({
        message: "usuario obtenido correctamente",
        usuario: response[0],
      });
    })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al intentar obtener al usuarios",
        error: err.message,
      });
    });
};

export const create = (req, res) => {
  const validacion = usuarioModel.validarUsuario(req.body);

  if (!validacion.success) {
    return res.status(422).json({
      message: "datos invalidos",
      error: JSON.parse(validacion.error.message),
    });
  }
  const { nombre, apellido, email } = req.body;
  const { updated, deleted } = validacion.data;
  const password = bcrypt.hashSync(req.body.password, saltosBcrypt);
  const hoy = new Date();
  const newObject = {
    nombre,
    apellido,
    email,
    password,
    updated,
    deleted,
    hoy,
  };
  usuarioServices
    .createUsuario(newObject)
    .then(() => {
      res.status(201).json({
        message: `usuario con ${nombre} creado exitosamente`,
      });
    })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al crear el usuario",
        error: err.message,
      });
    });
};

export const updateParcial = (req, res) => {
  const { id } = req.params;
  const validacion = usuarioModel.validarUsuarioParcial(req.body);
  if (!validacion.success) {
    return res.status(422).json({
      message: "datos invalidos",
      error: JSON.parse(validacion.error.message),
    });
  }
  const { nombre, apellido, email } = req.body;
  usuarioServices
    .getUsuarioById(id)
    .then((response) => {
      const newObject = {
        ...response[0][0],
        nombre: nombre || response[0][0].nombre,
        apellido: apellido || response[0][0].apellido,
        email: email || response[0][0].email,
        updated_at: new Date(),
      };
      usuarioServices
        .updateParcialUsuario(newObject, id)
        .then(() => {
          res.status(200).json({
            message: "usuario actualizado correctamente",
          });
        })
        .catch((err) => {
          res.status(406).json({
            message: "hubo un error al intentar actualizar al usuarios",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "usuario no encontrado",
        error: err.message,
      });
    });
};

export const updateCompleto = (req, res) => {
  const { id } = req.params;
  const validacion = usuarioModel.validarUsuario(req.body);
  if (!validacion.success) {
    return res.status(422).json({
      message: "datos invalidos",
      error: JSON.parse(validacion.error.message),
    });
  }
  const newUser = {
    ...validacion.data,
    id,
    updated_at: new Date(),
  };
  usuarioServices
    .updateUsuario(newUser, id)
    .then(() => {
      res.status(200).json({
        message: "usuario actualizado correctamente",
      });
    })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al intentar actualizar al usuarios",
        error: err.message,
      });
    });
};

export const deleteLogico = (req, res) => {
  const { id } = req.params;
  const hoy = new Date();
  usuarioServices
    .deleteLogico(hoy, id)
    .then(() => {
      res.status(200).json({
        message: "usuario eliminado correctamente",
      });
    })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al intentar eliminar al usuarios",
        error: err.message,
      });
    });
};

export const deleteFisico = async (req, res) => {
  const { id } = req.params;
  usuarioServices
    .deleteFisico(id)
    .then(() => {
      res.status(200).json({
        message: "usuario eliminado correctamente",
      });
    })
    .catch((err) => {
      res.status(406).json({
        message: "hubo un error al intentar eliminar al usuarios",
        error: err.message,
      });
    });
};
