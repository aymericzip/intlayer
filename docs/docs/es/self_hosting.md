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

Lo que hace el instalador:

1.  Verifica que `docker` y `docker compose` estén presentes.
2.  Descarga `docker-compose.yml` y `.env.example` en `./intlayer/`.
3.  Si no existe un `.env`, copia el ejemplo y genera secretos aleatorios para `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` y `S3_SECRET_ACCESS_KEY` a través de `openssl rand`.
4.  Ejecuta `docker compose pull` + `docker compose up -d`.
5.  Imprime las URLs: dashboard `:3000`, API `:3100`, interfaz de usuario de correo electrónico `:8025`, consola de MinIO `:9001`.

Una vez que la pila esté en funcionamiento, abre **http://localhost:3000** y crea tu primera cuenta.

> El dashboard se sirve en `localhost`. Consulta [Limitaciones](#limitations) — los dominios personalizados no son compatibles con la imagen publicada.

---

## Configuración inicial

En una instancia nueva (base de datos vacía), abrir el dashboard te redirige a la página **`/init`**:

1. Crea la primera cuenta. Como la colección de usuarios está vacía, esta cuenta se promociona automáticamente a **super admin**.
2. Se envía un email de verificación (vía Resend). La verificación de email es **obligatoria** — por eso `RESEND_API_KEY` debe estar configurado antes de empezar.
3. Haz clic en el enlace del email e inicia sesión.

Una vez que existe un admin, `/init` redirige a la página estándar de inicio de sesión.

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

> El puerto `9000` de MinIO debe ser accesible desde el navegador porque los activos cargados (avatares, capturas de pantalla) se cargan directamente desde `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variables de entorno

### Requerido

| Variable               | Ejemplo                      | Descripción                                                                                                                                                        |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DB_ID`                | `intlayer`                   | Usuario de MongoDB Atlas                                                                                                                                           |
| `DB_MDP`               | _(tu contraseña)_            | Contraseña de MongoDB Atlas                                                                                                                                        |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | Host del cluster de MongoDB Atlas (utilizado en el URI `mongodb+srv://`)                                                                                           |
| `BETTER_AUTH_SECRET`   | _(generado)_                 | Secret de 32 bytes para la firma de sesiones                                                                                                                       |
| `S3_SECRET_ACCESS_KEY` | _(generado)_                 | Secret para el MinIO incluido                                                                                                                                      |
| `RESEND_API_KEY`       | _(tu clave)_                 | Email transaccional a través de Resend. Requerido para la configuración inicial a menos que configures un mailer SMTP global (ver [Global mailer](#global-mailer)) |

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

### Servicio de correo global

De forma predeterminada, todos los correos electrónicos transaccionales se envían a través de Resend utilizando `RESEND_API_KEY`. Los despliegues auto-hospedados pueden enrutar **todos** los correos electrónicos — incluyendo correos no organizacionales como restablecimiento de contraseña y enlaces mágicos — a través de un servicio de correo global configurado con variables de entorno.

Establece `MAIL_PROVIDER` para activarlo. Cuando no está configurado, se utiliza el servicio de correo Resend predeterminado.

| Variable             | Ejemplo                        | Descripción                                                                                       |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Transporte global: `smtp` o `resend`. Déjalo sin configurar para usar los valores predeterminados |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Encabezado del remitente. Acepta una dirección simple o formato `Name <email>`                    |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | Host SMTP (requerido cuando `MAIL_PROVIDER=smtp`)                                                 |
| `MAIL_SMTP_PORT`     | `587`                          | Puerto SMTP (por defecto `587`)                                                                   |
| `MAIL_SMTP_SECURE`   | `false`                        | TLS implícito. Establece `true` para el puerto `465`                                              |
| `MAIL_SMTP_USER`     | _(tu usuario)_                 | Usuario SMTP (opcional; omitir para relés sin autenticar)                                         |
| `MAIL_SMTP_PASSWORD` | _(tu contraseña)_              | Contraseña SMTP                                                                                   |

> Precedencia: el servicio de correo propio de una organización (configurado desde el panel de control de **Organization**) tiene prioridad sobre el servicio de correo global, que a su vez tiene prioridad sobre la clave Resend predeterminada.

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

Esto descarga las últimas imágenes y reinicia los contenedores con `docker compose pull && docker compose up -d`. Los volúmenes existentes (`mongo-data`, `redis-data`, `minio-data`) se conservan, sin pérdida de datos.

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

## Limitaciones

- **MongoDB debe ser externo (Atlas).** El backend se conecta solo a través de `mongodb+srv://` (construido desde `DB_ID` / `DB_MDP` / `DB_CLUSTER`), por lo que un simple `mongodb://host:27017` — incluyendo el `mongod` incluido en el contenedor — no se puede usar. Proporciona un cluster de MongoDB Atlas.
- **Sin dominio personalizado.** Todas las URLs `VITE_*` que enfrenta el navegador se insertan en línea en la aplicación en tiempo de compilación, y la imagen publicada se envía con valores de `localhost`. El dashboard debe accederse en `http://localhost:3000`; servirlo en un dominio público requeriría reconstruir la imagen con las URLs de destino incorporadas y no es compatible de forma predeterminada.
- **El correo electrónico requiere un mailer que funcione.** La configuración de primera ejecución obliga a la verificación de correo electrónico, por lo que se debe configurar `RESEND_API_KEY` o un [mailer SMTP global](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`). Después de que el primer administrador inicie sesión, cada organización también puede configurar su propio mailer SMTP o Resend desde el dashboard.

---

## Solución de problemas

### Reinicios del backend en bucle al inicio

MongoDB y Redis deben estar saludables antes de que el backend se inicie. El archivo compose utiliza `depends_on` con `condition: service_healthy`. Si ves reinicios repetidos del backend, verifica que los healthchecks de `mongo` y `redis` pasen:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Busca `MongoDB connection error` cerca de la parte superior del log.

### El dashboard no puede conectar con la API

Verifica que `VITE_BACKEND_URL` coincida con la URL donde el backend es accesible desde el **navegador** (no desde la red de Docker). Si cambiaste el puerto del backend o añadiste un proxy inverso, reconstruye la imagen del dashboard:

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
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
