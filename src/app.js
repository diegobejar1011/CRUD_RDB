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
app.use(cors());
app.use(express.json());

// var corsOptions = {
//   origin: "http://localhost:5173",
//   optionsSuccessStatus: 200, // For legacy browser support
// };
// app.use(cors(corsOptions));

// app.options("*", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true"); // Si estás utilizando credenciales (por ejemplo, cookies)
//   res.status(200).end();
// });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true"); // Si estás utilizando credenciales (por ejemplo, cookies)
//   next();
// });

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
