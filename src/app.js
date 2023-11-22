import express from "express";
import db from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";
import indexRouter from "./routes/index.route.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.set("port", process.env.PORT || 4000);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

//rutas
app.use("/", indexRouter);

//En caso que ingrese una ruta inexistente
app.use("*", (req, res) => {
  res.send("Esta ruta no existe en la API");
});

io.on("connection", (socket) => {
  console.log("usuario conectado");
  socket.on("disconnect", () => {
    console.log("usuario desconectado");
  });
  socket.on("nueva entrega", (data) => {
    socket.broadcast.emit("entrega recibida", data);
  });
});

//Empieza servidor
server.listen(app.get("port"), () => {
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
