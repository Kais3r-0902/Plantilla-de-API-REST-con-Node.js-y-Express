# API REST Template
Este es un template básico para un API REST utilizando Node.js, Express, Axios, Body-Parser y JSON Web Tokens (JWT). Este ejemplo incluye consultas a un servicio externo de productos, marcas, categorías, disponibilidad, stock y precios. Además, se implementan prácticas comunes como la autenticación básica, paginación y manejo de errores.

## Requisitos
Antes de ejecutar la aplicación, asegúrate de tener instalado Node.js y las dependencias necesarias. Puedes instalar las dependencias ejecutando el siguiente comando:

npm install

## Configuración
Base de Datos (MongoDB): Este template no utiliza una base de datos, pero si necesitas una, asegúrate de configurar la conexión a MongoDB en el archivo app.js.

Clave Privada para JWT: Define una clave privada para firmar los tokens JWT. Modifica la variable secretKey en app.js con tu propia clave.

## Ejecución
Para ejecutar la aplicación, utiliza el siguiente comando:
node API-REST.js

La aplicación se ejecutará en el puerto 3000 por defecto. Puedes cambiar el puerto modificando la variable port en app.js.

## Endpoints
## Autenticación
POST /api/login
Credenciales de Prueba:
Usuario: usuario
Contraseña: contrasena
## Productos
GET /api/productos
Autenticación: Token JWT necesario
Parámetros de Consulta:
page: Número de página para la paginación
GET /api/productos/:id
Autenticación: Token JWT necesario
Parámetros de Ruta:
id: Identificador del producto
## Marcas
GET /api/marcas
Autenticación: Token JWT necesario
## Categorías
GET /api/categorias
Autenticación: Token JWT necesario
## Disponibilidad, Stock y Precios
GET /api/disponibilidad/:productoId
Autenticación: Token JWT necesario
Parámetros de Ruta:
productoId: Identificador del producto
## Manejo de Errores
Los errores se manejan centralmente en la aplicación, devolviendo respuestas JSON con códigos de estado apropiados.

