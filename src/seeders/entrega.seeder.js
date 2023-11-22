import { createEntrega } from "../services/entrega.service.js";
import crypto from "node:crypto";

const entregas = [
  {
    id_pedido: "2081583a-78d3-433e-b808-5f052c6cb289",
    lugar: "Fraccionamiento Villa Linda Calle Tres Estrellas",
    horario: "13:45:00",
    fecha: "2023-11-09",
    total: 250,
  },
  {
    id_pedido: "50417e30-6a5a-4e3d-a66f-0f72ef8734a7",
    lugar: "Colonia Flores Hermosas Avenida Primavera",
    horario: "11:30:00",
    fecha: "2023-11-10",
    total: 180,
  },
  {
    id_pedido: "7693cacf-4f08-4758-83d6-ae8e71316539",
    lugar: "Barrio Jardín Calle Jazmín",
    horario: "15:20:00",
    fecha: "2023-11-11",
    total: 120,
  },
  {
    id_pedido: "da0110b0-b761-4f2c-bb43-13f1c7313c19",
    lugar: "Urbanización El Paraíso Avenida del Sol",
    horario: "09:00:00",
    fecha: "2023-11-12",
    total: 300,
  },
];

const array = [];

try {
  entregas.forEach(async (entrega) => {
    const newEntrega = {
      id: crypto.randomUUID(),
      ...entrega,
      created_at: new Date(),
      updated_at: null,
      deleted: false,
      deleted_at: null,
    };
    array.push(createEntrega(newEntrega));
  });
  ( async () =>{
    await Promise.all(array);
    console.log("Las entregas fueron creadas correctamente");
    process.exit(0);
  })();
} catch (error) {
  console.log("Ocurrió un error al crear las entregas", error);
  process.exit(1);
}