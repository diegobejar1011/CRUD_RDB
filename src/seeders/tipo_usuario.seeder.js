import { createType } from "../services/usuarios.service.js";

const tipos = [
  {
    nombre_tipo: "Administrador",
  },
  {
    nombre_tipo: "Cliente",
  },
];

const array = [];

try {
  tipos.forEach(async (tipo) => {
    array.push(createType(tipo.nombre_tipo));
  });
  async () => {
    await Promise.all(array);
    console.log("Tipos de usuarios creados exitosamente");
    process.exit(1);
  };
} catch (error) {
  console.log("Ocurrió un error al crear los tipos de usuarios", error);
}
