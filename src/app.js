import express from "express";
import db from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import indexRouter from "./routes/index.route.js";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("port", process.env.PORT || 4000);

//middleware
app.use(express.json());
app.use(cors());

//rutas
app.use("/", indexRouter);

//En caso que ingrese una ruta inexistente
app.use("*", (req, res) => {
  res.send("Esta ruta no existe en la API");
});

//Empieza servidor
server.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});

io.on("connection", () => {
  console.log("usuario conectado");
});

//Conexion a db
db.connect()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error conectando base de datos: ", err);
  });
