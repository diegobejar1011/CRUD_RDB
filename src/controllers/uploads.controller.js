import path from 'node:path';
import fs from 'node:fs';


export const mostrarArchivo = async (req,res)=>{
    try{
        const __dirname = path.resolve();
        
        const { nombreArchivo } = req.params;
        const pathArchivo = path.join(__dirname,'uploads',nombreArchivo);
        console.log(pathArchivo);
        if(!fs.existsSync(pathArchivo)){
            return res.status(404).json({
                message: "El archivo no existe", 
            });
        }
        return res.sendFile(pathArchivo);
    }catch(error){
        return res.status(500).json({
            message: "Ocurrio un error al obtener el archivo",
        })
    };
};
