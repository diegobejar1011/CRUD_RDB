const db = require("../configs/db");
const bcrypt = require("bcrypt");

const usuarios = [
  {
    nombre: "rodrigo",
    apellido: "flores",
    email: "rodrigFlores@gmail.com",
    password: bcrypt.hashSync("rodrigo", 10),
  },
  {
    nombre: "fernando",
    apellido: "flores",
    email: "fercho@gmail.com",
    password: bcrypt.hashSync("fernando", 10),
  },
  {
    nombre: "Diego",
    apellido: "Bejar",
    email: "debz@gmail.com",
    password: bcrypt.hashSync("Diego", 10),
  },
  {
    nombre: "Roxana",
    apellido: "Flores",
    email: "rox@gmail.com",
    password: bcrypt.hashSync("Roxana", 10),
  },
  {
    nombre: "carlos",
    apellido: "ruiz",
    email: "cato@gmail.com",
    password: bcrypt.hashSync("carlos", 10),
  },
  {
    nombre: "Edgar",
    apellido: "Flores",
    email: "edgar@gmail.com",
    password: bcrypt.hashSync("Edgar", 10),
  },
  {
    nombre: "Cinthya",
    apellido: "Lopez",
    email: "cLopez@gmail.com",
    password: bcrypt.hashSync("Cinthya", 10),
  },
  {
    nombre: "Jessica",
    apellido: "Morales",
    email: "Jess@gmail.com",
    password: bcrypt.hashSync("Jessica", 10),
  },
  {
    nombre: "Shiny",
    apellido: "Crochet",
    email: "ShinyCrochet@gmail.com",
    password: bcrypt.hashSync("Shiny", 10),
  },
  {
    nombre: "Fernanda",
    apellido: "Quezada",
    email: "FerQuezada@gmail.com",
    password: bcrypt.hashSync("Fernanda", 10),
  },
  {
    nombre: "Ary",
    apellido: "Coronado",
    email: "Ary@gmail.com",
    password: bcrypt.hashSync("Ary", 10),
  },
  {
    nombre: "Iskander",
    apellido: "Donet",
    email: "IskanderD@gmail.com",
    password: bcrypt.hashSync("Iskander", 10),
  },
];

const insertarUsarios = () => {
  const query =
    "insert into usuarios (nombre, apellido, email, password) values (?,?,?,?)";

  usuarios.map((usuario) => {
    db.execute(query, [
      usuario.nombre,
      usuario.apellido,
      usuario.email,
      usuario.password,
    ])
      .then(() => console.log("usuario creado"))
      .catch((err) => console.error("Error creando usuario", err));
  });
};

insertarUsarios();
