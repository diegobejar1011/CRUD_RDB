import { Router } from "express";
import * as entregasController from '../controllers/entrega.controller.js';

const entregasRouter = Router();

entregasRouter.get("/", entregasController.getEntrega);
entregasRouter.get('/:id', entregasController.getEntregaById);
entregasRouter.post('/', entregasController.createEntrega);
entregasRouter.put('/:id', entregasController.updateEntrega);
entregasRouter.patch('/parcialUpdate/:id', entregasController.updateParcialEntrega);
entregasRouter.delete('/deleteLogico/:id', entregasController.deleteLogico);
entregasRouter.delete('/deleteFisico/:id', entregasController.deleteFisico);


export default entregasRouter; 