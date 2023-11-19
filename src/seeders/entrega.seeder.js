import { createEntrega } from "../services/entrega.service.js";
import crypto from "node:crypto";

const entregas = [
  {
    id_pedido: "0efb6935-d50a-4bcf-8ac7-f7af27719483",
    lugar: "Fraccionamiento Villa Linda Calle Tres Estrellas",
    horario: "13:45:00",
    fecha: "2023-11-09",
    total: 250,
  },
  {
    id_pedido: "6b832007-6ca4-42ec-8642-7682ba9796ea",
    lugar: "Colonia Flores Hermosas Avenida Primavera",
    horario: "11:30:00",
    fecha: "2023-11-10",
    total: 180,
  },
  {
    id_pedido: "eee13e1a-c1f0-44a1-9801-6a67e15b111f",
    lugar: "Barrio Jardín Calle Jazmín",
    horario: "15:20:00",
    fecha: "2023-11-11",
    total: 120,
  },
  {
    id_pedido: "ab8bba47-1530-4c0d-a42b-d7e201b52683",
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