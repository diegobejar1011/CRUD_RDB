import { resolveEnvPrefix } from 'vite';
import db from '../config/db.js';

export const getEntregas = (skip, limit, orden) =>{
    return new Promise((resolve, reject)=>{
        const query = `Select id_entrega, id_pedido, lugar, horario, fecha, total, created_at, updated_at, deleted_at, deleted from entrega where deleted = false order by ${orden} DESC LIMIT ${skip}, ${limit} `;
        db.execute(query)
            .then((res)=>
                resolve(res)
            )
            .catch((error)=>
                reject(error)
            )
    })
};

export const getEntregaById = (id) =>{
    return new Promise((resolve, reject)=>{
        const query = `Select id_entrega, id_pedido, lugar, horario, fecha, total, created_at, updated_at, deleted_at, deleted from entrega where deleted = false and id_entrega = ?`;
        db.execute(query,[id])
            .then((result)=>{
                resolve(result[0])
            })
            .catch((error)=>{
                reject(error)
            });
    });
};
 
export const createEntrega = (newObject) => {
    return new Promise((resolve, reject)=>{
        const { 
            id,
            id_pedido,
            lugar,
            horario,
            fecha,
            total,
            created_at,
            deleted
        } = newObject;
        const query = 'INSERT INTO entrega (id_entrega, id_pedido, lugar, horario, fecha, total, created_at, deleted) values (?,?,?,?,?,?,?,?)';
        db.execute(query,[
            id,
            id_pedido,
            lugar,
            horario,
            fecha,
            total,
            created_at,
            deleted
        ])
        .then((res)=>
            resolve(res)
        )
        .catch((error)=>
        reject(error)
        )
    });
};


export const updateEntrega = (newObject, id) =>{
    return new Promise ((resolve, reject)=>{
        const {
            id_pedido,
            lugar,
            horario,
            fecha,
            total,
        } = newObject
        const query = 'UPDATE entrega set id_pedido = ?, lugar = ?, horario = ?, fecha = ?, total = ? where id_entrega = ?';
        db.execute(query,[
            id_pedido,
            lugar,
            horario,
            fecha,
            total,
            id
        ])
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
    });
};

export const deleteFisico = (id) =>{
    return new Promise((resolve, reject)=>{
        const query = 'DELETE FROM entrega where id_entrega=?';
        db.execute(query,[id])
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
        })
    });
};

export const deleteLogico = (id) => {
    return new Promise((resolve, reject)=>{
        const query = 'update entrega set deleted = true , deleted_at = ? where id_entrega = ?';
        db.execute(query,[new Date(), id])
            .then((result)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(error);
            });
    });
};