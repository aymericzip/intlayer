---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: Aprenda a usar el comando init infra de la CLI de Intlayer para instalar la aplicación de escritorio o autoalojar el CMS de Intlayer con Docker (contenedor todo en uno o stack de Docker Compose).
keywords:
  - CLI
  - Infraestructura
  - Autoalojamiento
  - Aplicación de escritorio
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "Agregar el comando init infra"
author: aymericzip
---

# Comando Intlayer CLI Init Infra

## Descripción

El comando `init infra` configura la infraestructura de Intlayer en su máquina. Descarga el instalador alojado para su plataforma (`https://intlayer.org/install.sh` en macOS / Linux, `https://intlayer.org/install.ps1` en Windows) y lo ejecuta con su terminal adjunto, por lo que el menú del instalador y el progreso se muestran sin cambios.

El instalador pregunta cómo desea ejecutar Intlayer:

- **Aplicación de escritorio**: descarga el panel de control nativo para su sistema operativo y CPU y lo abre o instala. La compilación de escritorio se comunica con el backend de Intlayer Cloud.
- **Docker todo en uno**: panel de control + API + MongoDB + Redis + MinIO en un solo contenedor respaldado por un volumen. Escribe `./intlayer.env` con los secretos generados y descarga la imagen `intlayer/cms-all`.
- **Docker Compose**: un contenedor por servicio, para un autoalojamiento escalable. Escribe `docker-compose.yml` y `.env` en `./intlayer/` y descarga las imágenes.

El instalador alojado es la única fuente de verdad para el flujo de instalación: la CLI lo ejecuta en lugar de reimplementar los mismos pasos, por lo que `npx intlayer init infra` y `curl -fsSL https://intlayer.org/install.sh | sh` hacen exactamente lo mismo.

## Uso

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

El mismo paso se ofrece en la lista de verificación de `npx intlayer init --interactive`, en **Infraestructura (aplicación de escritorio / autoalojamiento)**.

## Opciones

- `-m, --mode <mode>` - Opcional. Omita el menú del instalador y ejecute un modo directamente. Valores aceptados: `desktop`, `docker` (todo en uno) o `compose`. Cualquier otro valor sale con un error listando los modos aceptados.

## Ejemplos

### Seleccionar el modo de forma interactiva

```bash
npx intlayer init infra
```

### Instalar la aplicación de escritorio

```bash
npx intlayer init infra --mode desktop
```

### Autoalojar con el contenedor todo en uno

```bash
npx intlayer init infra --mode docker
```

### Autoalojar con Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Salida de ejemplo

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## Configuración del instalador

El instalador lee algunas variables de entorno, que la CLI pasa intactas. Configúrelas en su terminal antes de ejecutar el comando:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Variable                  | Predeterminado            | Aplica a | Descripción                                                            |
| ------------------------- | ------------------------- | -------- | ---------------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(solicitado)_            | todos    | `desktop`, `docker` o `compose`, igual que `--mode`                    |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop  | Dónde se guarda el instalador de la app                                |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker   | Imagen todo en uno a descargar                                         |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker   | Dónde escribir el archivo de entorno                                   |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker   | Nombre del contenedor                                                  |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker   | Volumen con nombre montado en `/data`                                  |
| `INTLAYER_APP_PORT`       | `3000`                    | docker   | Puerto del host para el panel                                          |
| `INTLAYER_API_PORT`       | `3100`                    | docker   | Puerto del host para la API                                            |
| `INTLAYER_S3_PORT`        | `9000`                    | docker   | Puerto del host para la API S3 MinIO                                   |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker   | Puerto del host para la consola MinIO                                  |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose  | Dónde se escriben `docker-compose.yml` y `.env`                        |
| `INTLAYER_SELFHOST_REF`   | `main`                    | ambos    | Referencia Git de la cual se obtienen el compose y la plantilla de env |

> Las variables de puerto solo cambian el lado del **host** del mapeo. Las imágenes publicadas tienen `http://localhost:3000`, `http://localhost:3100` y `http://localhost:9000` compilados en el paquete del panel, así que mantenga los valores predeterminados a menos que compile sus propias imágenes: consulte la [guía de autoalojamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md#limitations).

## Requisitos

- **La aplicación de escritorio** necesita [Node.js](https://nodejs.org): la app incorpora el servidor del panel y lo inicia con el binario `node` de la máquina.
- **Los modos Docker** necesitan [Docker](https://docs.docker.com/get-docker/) (Docker Desktop con backend WSL 2 en Windows). El modo Compose también necesita el plugin `docker compose`.

## Notas

- Reejecutar el comando es seguro: un archivo de entorno existente nunca se sobrescribe, por lo que sirve también como ruta de actualización (el instalador descarga las últimas imágenes y conserva sus secretos).
- El instalador se descarga en un directorio temporal y se elimina al salir, cualquiera sea el resultado.
- El código de salida del comando es el del instalador. Si la descarga falla, la CLI imprime el comando equivalente `curl … | sh` (o `irm … | iex`) para que pueda ejecutar el instalador directamente.
- Los modos Docker aún necesitan un servicio de correo para enviar correos de inicio de sesión. Una vez finalizado el instalador, configure Resend o SMTP en el archivo de entorno generado: consulte [Servicio de correo global](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md#global-mailer).

## Relacionado

- [Guía de autoalojamiento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/self_hosting.md) - Arquitectura, pasos iniciales y limitaciones de cada modo
- [Inicializar Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/init.md) - El comando principal `init` y su lista de verificación interactiva
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md) - Qué hace el panel que acaba de instalar
