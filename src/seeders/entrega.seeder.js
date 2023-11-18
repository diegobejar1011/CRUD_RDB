import { createEntrega } from "../services/entrega.service.js";
import crypto from "node:crypto";

const entregas = [
  {
    id_pedido: "84ca57e1-8b59-45fc-a486-b1eb4ecfbf0e",
    lugar: "Fraccionamiento Villa Linda Calle Tres Estrellas",
    horario: "13:45:00",
    fecha: "2023-11-09",
    total: 250,
  },
  {
    id_pedido: "bbaa3eae-c5f8-4b92-9bd1-7c49781f44e3",
    lugar: "Colonia Flores Hermosas Avenida Primavera",
    horario: "11:30:00",
    fecha: "2023-11-10",
    total: 180,
  },
  {
    id_pedido: "f24301b1-1b01-4f48-a02e-8090bc4b6233",
    lugar: "Barrio Jardín Calle Jazmín",
    horario: "15:20:00",
    fecha: "2023-11-11",
    total: 120,
  },
  {
    id_pedido: "6b2da63e-3c1b-4f7d-bd84-cd6b4d453dca",
    lugar: "Urbanización El Paraíso Avenida del Sol",
    horario: "09:00:00",
    fecha: "2023-11-12",
    total: 300,
  },
];

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
    await createEntrega(newEntrega);
    process.exit(1);
  });
  console.log("Entregas creadas correctamente");
} catch (error) {
  console.log("Ocurrió un error al crear las entregas", error);
}
