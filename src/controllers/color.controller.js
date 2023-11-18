import * as colorServices from '../services/color.service.js'

export const getColores = (req, res) =>{
    colorServices
        .getColores()
        .then((response)=>{
            res.status(200).json({
                message: 'Se consiguieron los colores',
                data: response
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al conseguir los colores',
                error: error.message
            });
        });
};

export const createColor = (req, res) =>{
    const {codigo_color} = req.body;
    colorServices
        .createColor(codigo_color)
        .then(()=>{
            res.status(201).json({
                message: 'Color creado exitosamente'
            });
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al crear el color',
                error: error.message
            });
        });
};

export const updateColor = (req, res) => {
    const {id_color} = req.params;
    const {codigo_color} = req.body;
    const newColor ={
        id_color,
        codigo_color,
        updated_at: new Date()
    };
    colorServices
        .updateColor(newColor)
        .then(()=>{
            res.status(200).json({
                message: 'Color actualizado'
            });
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al actualizar el color',
                error: error.message
            });
        });
};

export const postColorProducto = (req, res) =>{
    const {id_producto, id_color} = req.body;
    const newColorProducto = {
        id_producto,
        id_color,
        created_at: new Date()
    }
    colorServices
        .postColorProducto(newColorProducto)
        .then(()=>{
            res.status(201).json({
                message: 'El color se agrego correctamente'
            })
        })
        .catch((error) => {
            res.status(5000).json({
                message: 'Ocurrrió un error al agregar el color',
                error: error.message
            })
        })
};

export const getColorProducto = (req, res) => {
    const {id_producto} = req.params;
    colorServices
        .getColorProducto(id_producto)
        .then((response)=>{
            res.status(200).json({
                message: 'Se obtuvieron los colores del producto',
                data: response[0]
            });
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al obtener los colores del producto',
                error: error.message
            });
        });
};

export const postColorPedido = (req,res) =>{
    const {id_pedido,id_color} = req.body;
    const newColorPedido ={
        id_pedido,
        id_color,
        created_at: new Date()
    };
    colorServices
        .postColorPedido(newColorPedido)
        .then(()=>{
            res.status(201).json({
                message: 'Se agrego el color al pedido',
            });
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrio un error al agregar el color al pedido',
                error: error.message
            });
        });
};

export const getColorPedido = (req,res) =>{
    const {id_pedido} = req.params;
    colorServices
        .getColorPedido(id_pedido)
        .then((response)=>{
            res.status(200).json({
                message: 'Se obtuvieron los colores del pedido',
                data: response[0]
            });
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al obtener los colores del pedido',
                error: error.message
            });
        });
};