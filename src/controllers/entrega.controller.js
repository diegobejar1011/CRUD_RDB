import * as entregaServices from '../services/entrega.service.js';
import { validatePartialEntrega, validateEntrega } from "../models/entrega.js";
import crypto from 'node:crypto';
import { response } from 'express';

export const getEntrega = (req, res) =>{
    const { page = 1, limit = 10 , orden = 'fecha' } = req.query;
    const skip = (page - 1) * limit;
    entregaServices
        .getEntregas(skip, limit, orden)
        .then((response)=>{
            return res.status(200).json({
                message: 'Entregas conseguidas',
                data: response[0]
            })
        })
        .catch((error)=>{
            return res.status(500).json({
                message: 'Ocurrió un error al conseguir las entregas',
                error: error.message
            })
        })
}

export const getEntregaById = (req, res) =>{
    const {id} = req.params
    entregaServices
       .getEntregaById(id)
        .then((response)=>{
            res.status(200).json({
                message: 'Entrega conseguida',
                data: response[0]
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al conseguir las entregas',
                error: error.message
            })
        })
};

export const createEntrega = (req, res) =>{
    const result = validateEntrega(req.body);
    if(!result.success){
        return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const newEntrega = {
        id: crypto.randomUUID(),
        ...result.data,
        created_at: new Date(),
        deleted: false
    }
    entregaServices
        .createEntrega(newEntrega)
        .then(()=>{
            res.status(201).json({
                message: 'Entrega creada correctamente'
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al crear la entrega',
                error: error.message
            })
        })
};

export const updateEntrega = (req, res) =>{
    const {id} = req.params
    const result = validateEntrega(req.body);
    if(!result.success){
        return res.status(422).json({ error: JSON.parse(result.error.message) });
    }
    const newEntrega = {
        ...result.data,
        updated_at: new Date()
    };
    entregaServices
        .updateEntrega(newEntrega, id)
        .then(()=>{
            res.status(200).json({
                message: 'Entrega actualizada'
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió al actualizar la entrega',
                error: error.message
            })
        });
};

export const updateParcialEntrega = (req, res) =>{
    const {id} = req.params
    entregaServices
        .getEntregaById(id)
        .then((response)=>{
            const originalData = response[0];
            const result = validatePartialEntrega(req.body);
            if(!result.success){
                return res.status(422).json({ error: JSON.parse(result.error.message) });
            }
            const newEntrega = {
                ...originalData,
                ...result.data,
                updated_at: new Date()
            };
            entregaServices
                .updateEntrega(newEntrega, id)
                .then(()=>{
                    res.status(200).json({
                        message: 'Entrega actualizada'
                    })
                })
                .catch((error)=>{
                    res.status(500).json({
                        message: 'Ocurrió al actualizar la entrega',
                        error: error.message
                    })
                });
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Entrega no encontrada',
                error: error.message
            })
        });
};

export const deleteFisico = (req, res) =>{
    const {id} = req.params;
    entregaServices
        .deleteFisico(id)
        .then(()=>{
            res.status(200).json({
                message: 'Entrega eliminada'
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió al eliminar la entrega',
                error: error.message
            })
        });
};

export const deleteLogico = (req, res) => {
    const {id} = req.params;
    entregaServices
        .deleteLogico(id)
        .then(()=>{
            res.status(200).json({
                message: 'La entrega ha sido eliminada'
            })
        })
        .catch((error)=>{
            res.status(500).json({
                message: 'Ocurrió un error al eliminar la entrega',
                error: error.message
            })
        })
}
