# API de Gestión de Usuarios

Este proyecto es una API RESTful desarrollada en Node.js como parte de una prueba técnica. La API permite realizar operaciones CRUD de usuarios y gestiona la autenticación mediante JWT. Además, está diseñada con medidas de seguridad como XSS, TLS, y protección mediante `helmet`, y su documentación está generada con Swagger.

## Tabla de Contenidos

- [API de Gestión de Usuarios](#api-de-gestión-de-usuarios)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Tecnologías](#tecnologías)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Endpoints](#endpoints)
    - [1. Registro de Usuario](#1-registro-de-usuario)
    - [2. Actualización de Usuario](#2-actualización-de-usuario)
  - [3. Eliminación de Usuario](#3-eliminación-de-usuario)
  - [4. Obtener Información de Usuario](#4-obtener-información-de-usuario)
  - [Autenticación y Seguridad](#autenticación-y-seguridad)
    - [1. Inicio de Sesión](#1-inicio-de-sesión)
  - [Documentación de la API](#documentación-de-la-api)
  - [Dockerización](#dockerización)
  - [Seguridad](#seguridad)

## Tecnologías

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **JWT (JSON Web Token)** - Autenticación
- **Swagger** - Documentación de la API
- **Docker** - Contenedor para la API
- **helmet** - Protección HTTP y XSS
- **TLS/SSL** - Seguridad en la transmisión de datos

## Requisitos Previos

- **Node.js** v14 o superior
- **Docker** y **Docker Compose** (opcional para la ejecución en contenedor)
- **Microsoft SQL Server** o una base de datos compatible

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu_usuario/nombre_del_proyecto.git
    cd nombre_del_proyecto
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en el directorio raíz con las siguientes variables:

    ```plaintext
    PORT=3000
    DATABASE_URL=postgres://usuario:contraseña@localhost:5432/nombre_db
    JWT_SECRET=tu_secreto_jwt
    JWT_EXPIRATION=1h
    ```

4. Ejecuta las migraciones de la base de datos:

    ```bash
    npm run migrate
    ```

5. Inicia el servidor:

    ```bash
    npm start
    ```

## Uso

La API estará disponible en `http://localhost:3000`.

## Endpoints

### 1. Registro de Usuario

**POST /users/register**

Registra un nuevo usuario.  
**Validaciones**:

- Email único y con formato válido.
- Contraseña de al menos 8 caracteres, con una letra mayúscula, una minúscula, un dígito y un carácter especial.

**Ejemplo de solicitud**:

    ```bash
    POST /users/register
    {
        "email": "user@example.com",
        "password": "Password123!"
    }
    ```

### 2. Actualización de Usuario

**PUT /users/:id**

Actualiza la información de un usuario.

**Validaciones**:

- Verificar que el usuario exista.
- Evitar duplicación de nombre y apellido en otros registros.

**Ejemplo de solicitud**:

```json
{
    "firstName": "Juan",
    "lastName": "Pérez"
}
```

## 3. Eliminación de Usuario

**DELETE /users/:id**

Elimina un usuario por ID.


## 4. Obtener Información de Usuario

**GET /users/:id**

Devuelve la información de un usuario por ID.

**Validación**: Devuelve un mensaje claro si el usuario no existe.

**Ejemplo de solicitud**:
```json
GET /users/1
````

## Autenticación y Seguridad

### 1. Inicio de Sesión

**POST /auth/login**

Genera un token JWT al verificar las credenciales del usuario.

**Token**: Expira en el tiempo configurado en las variables de entorno (`JWT_EXPIRATION`).

**Ejemplo de solicitud**:
```json
POST /auth/login
{
    "email": "user@example.com",
    "password": "Password123!"
}```

## Documentación de la API

La documentación de esta API está generada con Swagger y puede ser accedida en `/api-docs` una vez que la aplicación esté en funcionamiento. Incluye descripciones claras para cada endpoint, así como ejemplos de solicitudes y respuestas.

## Dockerización

La aplicación está dockerizada para facilitar su despliegue. Sigue los siguientes pasos para ejecutarla en un contenedor:

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Construye un contenedor nuevo para la aplicación usando el archivo `Dockerfile` y utiliza el archivo `docker-compose.yml` para construir la base de datos.
    ```bash
    docker-compose up --build
    ```
3. Una vez levantada la base de datos, ejecuta:

    ```bash
    docker build -t app .
    ```

    ```bash
    docker run --name app  -p 3001:3001 app -d 
    ```

    ```bash
    node index.js
    ```
4. La aplicación estará disponible en `http://localhost:3001`.


## Seguridad

La API implementa protección contra XSS en todos los endpoints usando `helmet`.  
El tráfico se asegura con TLS/SSL.
