# CRUD_RBD

## Descripción

CRUD_RBD es una API REST que facilita la manipulación concentrada en la base de datos, permitiendo la creación de rutas con métodos HTTP y un control de errores que simplifica la conexión con las vistas del FRONTEND.

## Inicio Rápido

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu_usuario/mi-proyecto.git

2. **Instalar los módulos necesarios:**
    
    npm install

3. **Crea un archivo .env en la raíz del proyecto:**

    Tomar de referencia el documento .env.example 

4. **Asegurarse de crear una carpeta llamada 'uploads' en la raíz del proyecto:**

    Esta carpera es necesaria para la funcionalidad del guardado de imagenes.

5. **Iniciar el servidor:**

    npm start 

    Si ve los mensajes siguientes en la terminal, el proyecto ha iniciado correctamente:

    Servidor corriendo en puerto ?
    Conectado a la base de datos

## Tecnologías Utilizadas

**Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
**Express:** Framework web para Node.js que simplifica la creación de API REST.
**Cors:** Middleware para habilitar el acceso a recursos desde diferentes orígenes.
**Bcrypt:** Librería para el hashing de contraseñas.
**Jsonwebtoken:** Implementación de JSON Web Tokens para autenticación.
**MySQL2:** Conector MySQL para Node.js.
**Socket.io:** Biblioteca para la comunicación bidireccional en tiempo real.
**Zod:** Librería para validación de esquemas.

## Estructura del Proyecto

La estructura del proyecto sigue las convenciones estándar de Express, con rutas en la carpeta 'routes', controladores en la carpeta 'controllers', los servicios a la base de datos en la carperta "services",etc.

## Configuración Adicional

El archivo .env contiene las configuraciones esenciales para la base de datos, el puerto del servidor, y la clave secreta para Jsonwebtoken.



