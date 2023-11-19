import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { createUsuario } from "../services/usuarios.service.js";

const usuarios = [
  {
    nombre: "rodrigo",
    apellido: "flores",
    telefono: "96117272713",
    email: "rodrigFlores@gmail.com",
    tipo: 2,
    password: bcrypt.hashSync("rodrigo", 10),
    deleted: false,
  },
  {
    nombre: "fernando",
    apellido: "flores",
    telefono: "96117272713",
    email: "fercho@gmail.com",
    tipo: 2,
    password: bcrypt.hashSync("fernando", 10),
    deleted: false,
  },
  {
    nombre: "Diego",
    apellido: "Bejar",
    telefono: "96117272713",
    email: "debz@gmail.com",
    tipo: 2,
    password: bcrypt.hashSync("Diego", 10),
    deleted: false,
  },
  {
    nombre: "Roxana",
    apellido: "Flores",
    telefono: "96117272713",
    email: "rox@gmail.com",
    tipo: 2,
    password: bcrypt.hashSync("Roxana", 10),
    deleted: false,
  },
];

try {
  usuarios.forEach((usuario) => {
    const newUsuario = {
      id: crypto.randomUUID(),
      ...usuario,
      created_at: new Date(),
    };
    createUsuario(newUsuario);
  });
  console.log("Usuarios creados correctamente");
  process.exit(0);
} catch (error) {
  console.log("Ocurrió un error al crear los usuarios", error);
  process.exit(1);
}
