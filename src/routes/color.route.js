import {Router} from 'express';
import * as colorControllers from '../controllers/color.controller.js';
import { verificarJWT } from "../middlewares/auth.middleware.js";

const colorRouter = Router();

colorRouter.get('/', colorControllers.getColores);
colorRouter.post('/createColor',   colorControllers.createColor);
colorRouter.get('/coloresProducto/:id_producto',  colorControllers.getColorProducto);
colorRouter.post('/agregarColorProducto',  colorControllers.postColorProducto);
colorRouter.get('/coloresPedido/:id_pedido',  colorControllers.getColorPedido);
colorRouter.post('/agregarColorPedido',  colorControllers.postColorPedido);

export default colorRouter;