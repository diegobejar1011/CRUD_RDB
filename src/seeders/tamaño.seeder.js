import { createTamaño } from "../services/productos.service.js";

const tamaño = [
  {
    nombre_tamano: "Pequeño",
  },
  {
    nombre_tamano: "Mediano",
  },
  {
    nombre_tamano: "Grande",
  },
];
const array = [];

try {
  tamaño.forEach((tamaño) => {
    array.push(createTamaño(tamaño.nombre_tamano));
  });
  (async () => {
    await Promise.all(array);
    console.log("LOs tamañosfueron creados correctamente");
    process.exit(1);
  })();
} catch (error) {
  console.log("Ocurrió un error al crear los tamaños", error);
}
