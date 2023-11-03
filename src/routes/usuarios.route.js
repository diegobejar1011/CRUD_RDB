import { Router } from "express";
import * as usuariosController from "../controllers/usuarios.controller.js";
import { verificarJWT } from "../middlewares/auth.middleware.js";
import { login } from "../controllers/auth.controller.js";

const usuarioRouter = Router();

usuarioRouter.post("/login", login);
usuarioRouter.get("/", verificarJWT, usuariosController.index);
usuarioRouter.get("/:id", verificarJWT, usuariosController.getById);
usuarioRouter.post("/", verificarJWT, usuariosController.create);
usuarioRouter.patch("/:id", verificarJWT, usuariosController.updateParcial);
usuarioRouter.put("/:id", verificarJWT, usuariosController.updateCompleto);
usuarioRouter.delete("/:id", verificarJWT, usuariosController.deleteLogico);

export default usuarioRouter;
