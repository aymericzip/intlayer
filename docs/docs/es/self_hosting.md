---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Autoalojamiento de Intlayer
description: Ejecuta una instancia completa de Intlayer en tu propia infraestructura con un solo comando. No se requiere una cuenta de Intlayer Cloud.
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Installation
  - Infrastructure
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Autoalojamiento de Intlayer

Intlayer puede ejecutarse completamente en tu propia infraestructura, sin necesidad de una cuenta de Intlayer Cloud. Un solo comando inicia una pila lista para producción:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

El instalador descarga un `docker-compose.yml` y un `.env`, autogenera los secretos necesarios e inicia todos los contenedores con `docker compose up -d`.

## Tabla de Contenidos

<TOC/>

---

## Arquitectura

```
                ┌─────────────────────────────┐
 navegador ──────▶ │  app  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (RS de 1 nodo)             (API de S3)     (SMTP)        (en-imagen)
                             minio:9001   mailpit:8025
                             (consola)    (interfaz web)
```

Chromium (utilizado para la generación de capturas de pantalla de Puppeteer) se incluye dentro de la imagen del backend, no se necesita un contenedor separado.

---

## Requisitos previos

- **Docker** ≥ 24 y **Docker Compose** ≥ v2. Si falta alguno, el instalador imprimirá el enlace de instalación y saldrá.
- Puertos `3000`, `3100`, `8025`, `9000` y `9001` disponibles en el host.
- Un host Linux o macOS (o WSL2 en Windows).

---

## Inicio rápido

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Lo que hace el instalador:

1.  Verifica que `docker` y `docker compose` estén presentes.
2.  Descarga `docker-compose.yml` y `.env.example` en `./intlayer/`.
3.  Si no existe un `.env`, copia el ejemplo y genera secretos aleatorios para `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` y `S3_SECRET_ACCESS_KEY` a través de `openssl rand`.
4.  Ejecuta `docker compose pull` + `docker compose up -d`.
5.  Imprime las URLs: dashboard `:3000`, API `:3100`, interfaz de usuario de correo electrónico `:8025`, consola de MinIO `:9001`.

Una vez que la pila esté en funcionamiento, abre **http://localhost:3000** y crea tu primera cuenta.

---

## Servicios

| Servicio    | Imagen                                     | Puerto(s) del host                   | Propósito                                                                        |
| :---------- | :----------------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------- |
| **app**     | construido desde `apps/app/Dockerfile`     | `3000`                               | Dashboard de TanStack Start (UI del CMS)                                         |
| **backend** | construido desde `apps/backend/Dockerfile` | `3100`                               | API REST de Fastify (endpoint `/health`)                                         |
| **mongo**   | `mongo:7`                                  | interno                              | Conjunto de réplicas de un solo nodo (`rs0`)                                     |
| **redis**   | `redis:7-alpine`                           | interno                              | Colas de trabajos (BullMQ) y almacenamiento en caché (ioredis)                   |
| **minio**   | `minio/minio`                              | `9000` (S3), `9001` (consola)        | Almacenamiento de objetos compatible con S3 para avatares y capturas de pantalla |
| **mailpit** | `axllent/mailpit`                          | `1025` (SMTP), `8025` (interfaz web) | Receptor local de correos electrónicos transaccionales                           |

Los puertos internos (mongo, redis) no se exponen al host por defecto.

> El puerto `9000` de MinIO debe ser accesible desde el navegador porque los activos cargados (avatares, capturas de pantalla) se cargan directamente desde `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variables de entorno

El instalador genera un archivo `.env` listo para usar. La siguiente tabla describe cada variable.

### Requeridas (autogeneradas o solicitadas)

| Variable               | Ejemplo                                         | Descripción                                                         |
| :--------------------- | :---------------------------------------------- | :------------------------------------------------------------------ |
| `NODE_ENV`             | `production`                                    | Entorno de ejecución                                                |
| `PORT`                 | `3100`                                          | Puerto de escucha del backend                                       |
| `BACKEND_URL`          | `http://localhost:3100`                         | URL pública de la API del backend                                   |
| `APP_URL`              | `http://localhost:3000`                         | URL pública del dashboard                                           |
| `DOMAIN`               | `localhost`                                     | Dominio de la cookie                                                |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | URI de conexión completa de MongoDB                                 |
| `REDIS_URL`            | `redis://redis:6379`                            | URL de conexión de Redis                                            |
| `BETTER_AUTH_SECRET`   | _(generado)_                                    | Secreto de 32 bytes para la firma de sesiones                       |
| `MAIL_PROVIDER`        | `smtp`                                          | Transporte de correo: `smtp` o `resend`                             |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Nombre de host SMTP (nombre del contenedor de Mailpit)              |
| `MAIL_SMTP_PORT`       | `1025`                                          | Puerto SMTP                                                         |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Dirección del remitente                                             |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Endpoint compatible con S3                                          |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | URL pública para la carga de activos del navegador                  |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Nombre del bucket                                                   |
| `S3_ACCESS_KEY_ID`     | _(generado)_                                    | Clave de acceso de MinIO                                            |
| `S3_SECRET_ACCESS_KEY` | _(generado)_                                    | Clave secreta de MinIO                                              |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL del backend integrada en el dashboard en tiempo de construcción |
| `VITE_DOMAIN`          | `localhost`                                     | Dominio integrado en el dashboard en tiempo de construcción         |

### Opcionales (las características se degradan elegantemente cuando están ausentes)

| Variable                                                 | Característica                                                                          |
| :------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Traducción asistida por IA y auditoría de contenido                                     |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Gestión de facturación y suscripciones                                                  |
| `RESEND_API_KEY`                                         | Correo electrónico transaccional a través de Resend (anula Mailpit cuando se configura) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Inicio de sesión GitHub OAuth                                                           |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Inicio de sesión Google OAuth                                                           |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Inicio de sesión GitLab OAuth                                                           |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Inicio de sesión Microsoft OAuth                                                        |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Inicio de sesión LinkedIn OAuth                                                         |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Inicio de sesión Atlassian OAuth                                                        |

---

## Conectando tu proyecto Intlayer

Una vez que la pila esté en funcionamiento, apunta tu proyecto al backend y dashboard autoalojados en lugar de `intlayer.org`.

### Configuración del proyecto

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL del dashboard CMS autoalojado.
     * Por defecto: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL de la API del backend autoalojado.
     * Por defecto: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Establece las variables de entorno en el `.env` de tu proyecto:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Crea credenciales de acceso en tu dashboard autoalojado en **Proyectos → Claves de acceso** en `http://localhost:3000/projects`.

### SDK de `@intlayer/api`

Al usar el SDK de `@intlayer/api` programáticamente, pasa `backendURL` explícitamente:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

---

## Actualización

Volver a ejecutar el instalador en un despliegue existente realiza una actualización continua:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Esto descarga las últimas imágenes y reinicia los contenedores con `docker compose pull && docker compose up -d`. Los volúmenes existentes (`mongo-data`, `redis-data`, `minio-data`) se conservan, sin pérdida de datos.

Para actualizar manualmente desde el directorio `./intlayer/`:

```sh
docker compose pull
docker compose up -d
```

---

## Copia de seguridad y restauración

Todos los datos persistentes residen en tres volúmenes de Docker con nombre.

### Copia de seguridad

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### Restauración

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Repetir para redis-data y minio-data
```

---

## Uso de un proxy inverso (Nginx / Caddy)

Para despliegues de producción, coloca un proxy inverso delante de los contenedores de la aplicación y del backend en lugar de exponerlos directamente.

### Ejemplo de Nginx

```nginx
server {
    listen 80;
    server_name cms.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Actualiza las siguientes variables `.env` para que coincidan con tus dominios públicos:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> Las variables `VITE_*` se integran en la imagen del dashboard en el momento de la construcción. Si las cambias después de que se construya la imagen, necesitas reconstruir la imagen de la `app` (`docker compose build app`) o usar la inyección de configuración en tiempo de ejecución.

---

## Solución de problemas

### Reinicios del backend en bucle al inicio

MongoDB y Redis deben estar saludables antes de que el backend se inicie. El archivo compose utiliza `depends_on` con `condition: service_healthy`. Si ves reinicios repetidos del backend, verifica que los healthchecks de `mongo` y `redis` pasen:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### El dashboard no puede conectar con la API

Verifica que `VITE_BACKEND_URL` coincida con la URL donde el backend es accesible desde el **navegador** (no desde la red de Docker). Si cambiaste el puerto del backend o añadiste un proxy inverso, reconstruye la imagen del dashboard:

```sh
docker compose build app
docker compose up -d app
```

### El correo electrónico no se envía

Por defecto, todos los correos electrónicos salientes son capturados por Mailpit. Abre `http://localhost:8025` para ver los mensajes enviados. Para enviar correos electrónicos reales, establece `MAIL_PROVIDER=resend` y `RESEND_API_KEY=<tu-clave>` en `.env`, luego reinicia el backend:

```sh
docker compose restart backend
```

### Falta el bucket de MinIO

Si el servicio de un solo uso `minio-init` no se ejecutó (o se ejecutó antes de que MinIO estuviera listo), crea el bucket manualmente:

```sh
docker compose run --rm minio-init
```

---

## Enlaces útiles

- [Documentación del CMS de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)
- [Referencia de configuración](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [SDK del CMS — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md#programmatic-access-con-el-sdk-intlayerapi)
