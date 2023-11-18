import { Router } from "express";
import * as entregasController from '../controllers/entrega.controller.js';
import { verificarJWT } from "../middlewares/auth.middleware.js";

const entregasRouter = Router();

entregasRouter.get("/", verificarJWT, entregasController.getEntrega);
entregasRouter.get('/:id', verificarJWT, entregasController.getEntregaById);
entregasRouter.post('/', verificarJWT, entregasController.createEntrega);
entregasRouter.put('/:id', entregasController.updateEntrega);
entregasRouter.patch('/parcialUpdate/:id', verificarJWT, entregasController.updateParcialEntrega);
entregasRouter.delete('/deleteLogico/:id', verificarJWT, entregasController.deleteLogico);
entregasRouter.delete('/deleteFisico/:id', verificarJWT, entregasController.deleteFisico);

entregasRouter.get('/entregaDate/:month', verificarJWT, entregasController.getEntregasByDate);
entregasRouter.post('/creacionTotal', verificarJWT, entregasController.createEntregaWithTransaction);

entregasRouter.get("/SinFecha/Conseguir", verificarJWT, entregasController.getEntregasPendingDate);


export default entregasRouter; 