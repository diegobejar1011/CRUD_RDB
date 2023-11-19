import { createColor } from "../services/color.service.js";

const colores = [
  {
    codigo_color: "#FF0000",
  },
  {
    codigo_color: "#00FF00",
  },
  {
    codigo_color: "#0000FF",
  },
];

const array = [];

try {
  colores.forEach(async (color) => {
    array.push(createColor(color.codigo_color));
  });
  (async () => {
    await Promise.all(array);
    console.log("Colores creados correctamente");
    process.exit(1);
  })();
} catch (error) {
  console.log("Error al crear los colores", error);
}
