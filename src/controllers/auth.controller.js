import bcrypt from "bcrypt";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

const jwtToken = process.env.JWTSECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuarioEncontrado = await db.execute(
      "select * from usuarios where email = ?",
      [email]
    );
    //return res.json(usuarioEncontrado[0][0])
    if (usuarioEncontrado[0].length == 0) {
      return res.status(400).json({
        message: "email o password incorrecto",
      });
    }

    const passwordCorrecto = bcrypt.compareSync(
      password,
      usuarioEncontrado[0][0].password
    );
    //return res.json(passwordCorrecto)
    if (!passwordCorrecto) {
      return res.status(400).json({
        message: "email o password incorrecto",
      });
    }

    const payload = {
      usuario: {
        id: usuarioEncontrado[0][0].id,
      },
    };

    const token = jwt.sign(payload, jwtToken, { expiresIn: "1h" });

    return res.status(200).json({
      message: "acceso correcto",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "ocurrió un error al validar credenciales",
      error: error.message,
    });
  }
};
