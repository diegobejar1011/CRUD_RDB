import { createProduct } from "../services/productos.service.js";
import crypto from "node:crypto";

const arregloDeProductos = [
  {
    Prod_Name: "Producto 1",
    Price: 10.99,
    Width: 5.5,
    Height: 8.2,
    Colour: "Rojo",
    Images: "imagen1.jpg",
    state_delete: "N",
    Delete_at: null,
    Created_at: null,
    Update_at: null,
  },
  {
    Prod_Name: "Producto 2",
    Price: 20.49,
    Width: 6.1,
    Height: 7.8,
    Colour: "Azul",
    Images: "imagen2.jpg",
    state_delete: "N",
    Delete_at: null,
    Created_at: null,
    Update_at: null,
  },
  {
    Prod_Name: "Producto 3",
    Price: 15.75,
    Width: 4.9,
    Height: 9.0,
    Colour: "Verde",
    Images: "imagen3.jpg",
    state_delete: "N",
    Delete_at: null,
    Created_at: null,
    Update_at: null,
  },
  {
    Prod_Name: "Producto 4",
    Price: 12.99,
    Width: 7.0,
    Height: 6.5,
    Colour: "Amarillo",
    Images: "imagen4.jpg",
    state_delete: "N",
    Delete_at: null,
    Created_at: null,
    Update_at: null,
  },
  {
    Prod_Name: "Producto 5",
    Price: 19.99,
    Width: 5.3,
    Height: 7.5,
    Colour: "Morado",
    Images: "imagen5.jpg",
    state_delete: "N",
    Delete_at: null,
    Created_at: null,
    Update_at: null,
  },
];

const createProducts = () => {
  arregloDeProductos.forEach((producto) => {
    const newObject = {
      id: crypto.randomUUID(),
      ...producto,
      Created_at: new Date(),
    };
    createProduct(newObject)
      .then(() => console.log("objeto creado correctamente"))
      .catch((err) => console.error("Error al crear el objeto", err));
  });
};

createProducts();
