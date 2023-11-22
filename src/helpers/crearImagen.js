import fs from "node:fs"; 
import path from "node:path";

export const crearImagen = (newImagen) => {
    const { b64, nombreImagen} = newImagen;
          const imagen = Buffer.from(b64, "base64");
          const __dirname = path.resolve();
          const uploadPath = path.join(__dirname, "uploads", nombreImagen);
          fs.writeFileSync(uploadPath, imagen);
  };