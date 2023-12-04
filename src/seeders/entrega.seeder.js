import { createEntrega } from "../services/entrega.service.js";
import crypto from "node:crypto";

const entregas = [
  {
    id_pedido: "3d9faffc-3624-48d4-9cb1-862f4445f511",
    lugar: "Fraccionamiento Villa Linda Calle Tres Estrellas",
    horario: "13:45:00",
    fecha: "2023-11-09",
    total: 250,
  },
  {
    id_pedido: "4a85baf0-c119-4ed5-b285-d29a53b4aafc",
    lugar: "Colonia Flores Hermosas Avenida Primavera",
    horario: "11:30:00",
    fecha: "2023-11-10",
    total: 180,
  },
  {
    id_pedido: "73c53546-f4b6-42f8-ab16-ec934348c439",
    lugar: "Barrio Jardín Calle Jazmín",
    horario: "15:20:00",
    fecha: "2023-11-11",
    total: 120,
  },
  {
    id_pedido: "f47d6334-383b-4b69-9153-fcf6610b9b4f",
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
      created_by: null
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