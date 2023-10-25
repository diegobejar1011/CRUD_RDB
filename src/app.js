import express from "express";
import db from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from './routes/index.route.js'

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 4000);

//middleware
app.use(express.json());
app.use(cors());

//rutas
app.use("/", indexRouter)

//En caso que ingrese una ruta inexistente
app.use("*", (req, res) => {
  res.send("Esta ruta no existe en la API");
});

//Empieza servidor
app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});

//Conexion a db
db.connect()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error conectando base de datos: ", err);
  });
