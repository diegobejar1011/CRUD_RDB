import {Router} from 'express';
import * as colorControllers from '../controllers/color.controller.js';
import { verificarJWT } from "../middlewares/auth.middleware.js";

const colorRouter = Router();

colorRouter.get('/', colorControllers.getColores);
colorRouter.post('/:id_producto/:id_imagen', verificarJWT,  colorControllers.postColorProducto);
colorRouter.get('/coloresProducto/:id_producto',verificarJWT,  colorControllers.getColorProducto);
colorRouter.post('/agregarColorProducto', verificarJWT , colorControllers.postColorProducto);
colorRouter.get('/coloresPedido/:id_pedido', verificarJWT , colorControllers.getColorPedido);
colorRouter.post('/agregarColorPedido', verificarJWT, colorControllers.postColorPedido);

export default colorRouter;