---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Inicio de sesión
description: Aprende a usar el comando login del CLI de Intlayer para autenticarte con el CMS de Intlayer y obtener credenciales de acceso.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
author: aymericzip
---

# Comando 'login' del CLI de Intlayer

---

## Descripción

El comando `login` del CLI de Intlayer te permite autenticarte con el CMS de Intlayer. Este comando abre automáticamente tu navegador por defecto para completar el proceso de autenticación y recibir las credenciales necesarias (Client ID y Client Secret) para usar los servicios de Intlayer.

## Uso

```bash packageManager="npm"
npx intlayer login [options]
```

```bash packageManager="yarn"
yarn intlayer login [options]
```

```bash packageManager="pnpm"
pnpm intlayer login [options]
```

```bash packageManager="bun"
bun x intlayer login [options]
```

o

```bash
intlayer login [options]
```

## Opciones

### `--cms-url <url>`

Especifica la URL del CMS de Intlayer con la que conectarse para la autenticación.

- **Tipo**: `string`
- **Por defecto**: El valor configurado en `intlayer.config.*` o `https://intlayer.org`
- **Ejemplo**:

```bash packageManager="npm"
npx intlayer login --cms-url https://intlayer.org
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://intlayer.org
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://intlayer.org
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://intlayer.org
```

### Opciones de configuración

También puedes usar las opciones de configuración comunes:

- `--env-file <path>`: Ruta al archivo de entorno
- `-e, --env <env>`: Entorno de ejecución
- `--base-dir <dir>`: Directorio base del proyecto
- `--verbose`: Habilitar salida detallada (por defecto: true)
- `--prefix <prefix>`: Prefijo para los logs

## Cómo funciona

1. **Inicio del servidor local**: El comando inicia un servidor HTTP local en un puerto aleatorio para recibir credenciales del CMS
2. **Apertura del navegador**: El comando abre automáticamente tu navegador predeterminado en la URL de inicio de sesión del CMS
3. **Autenticación**: Completa la autenticación en el navegador usando tu cuenta de Intlayer
4. **Recepción de credenciales**: El servidor local recibe el Client ID y el Client Secret desde el CMS
5. **Instrucciones**: El comando muestra instrucciones para configurar las credenciales en tu proyecto

## Salida

Después de un inicio de sesión exitoso, el comando mostrará:

1. **Las credenciales recibidas** (Client ID y Client Secret)
2. **Instrucciones para el archivo `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Instrucciones para el archivo de configuración de Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Mantener la clave de acceso segura

`intlayer login` emite una **clave de acceso**: un par `clientId` / `clientSecret` que cada comando autenticado (`push`, `pull`, `fill`, `configuration push`, `live`, …) utiliza para autenticarse.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

> **`clientSecret` es una credencial del lado del servidor.** Otorga acceso completo a la API con alcance de proyecto — lectura y escritura de tus diccionarios, tu proyecto y tu organización. Mantenlo en `.env` (ignorado por git) o en tu almacén de secretos de CI, y nunca lo incluyas en línea en el archivo de configuración.

Intlayer lo impone en lugar de solo documentarlo:

- `clientSecret` es **eliminado de la configuración que tu bundler incluye**, por lo que no puede llegar a un bundle del navegador sin importar qué integración de framework utilices. Solo se lee del lado del servidor, en tiempo de ejecución, desde el entorno.
- `clientId` es diferente: es la **clave pública** del proyecto, segura para distribuir, y utilizada por [`@intlayer/analytics`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/analytics.md#how-events-are-authenticated) para obtener un token de corta duración, solo para ingesta.

Comentar `clientId` es suficiente para desactivar cada comportamiento autenticado — obtención remota de diccionarios, acceso a CMS, análisis — incluso cuando las variables de entorno aún están definidas.

Para pipelines de CI, prefiere el [`comando ci`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/ci.md), que inyecta las credenciales durante la duración de una única ejecución en lugar de persistirlas.

## Configuración manual

Si el navegador no se abre automáticamente, puedes visitar manualmente la URL que se muestra en el terminal.

## Ejemplos

### Iniciar sesión con URL de CMS personalizada

```bash packageManager="npm"
npx intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="yarn"
yarn intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="pnpm"
pnpm intlayer login --cms-url https://custom-cms.example.com
```

```bash packageManager="bun"
bun x intlayer login --cms-url https://custom-cms.example.com
```

### Iniciar sesión con archivo de entorno específico

```bash packageManager="npm"
npx intlayer login --env-file .env.production
```

```bash packageManager="yarn"
yarn intlayer login --env-file .env.production
```

```bash packageManager="pnpm"
pnpm intlayer login --env-file .env.production
```

```bash packageManager="bun"
bun x intlayer login --env-file .env.production
```

### Iniciar sesión en modo verbose

```bash packageManager="npm"
npx intlayer login --verbose
```

```bash packageManager="yarn"
yarn intlayer login --verbose
```

```bash packageManager="pnpm"
pnpm intlayer login --verbose
```

```bash packageManager="bun"
bun x intlayer login --verbose
```

## Solución de problemas

### El navegador no se abre

Si el navegador no se abre automáticamente, copia la URL que se muestra en el terminal y ábrela manualmente en tu navegador.

### Problemas de conexión

Si encuentras problemas de conexión, verifica:

1. Que la URL del CMS sea correcta
2. Que tu conexión a internet funcione correctamente
3. Que no haya firewalls que bloqueen la conexión

### Credenciales no recibidas

Si no se reciben las credenciales:

1. Asegúrate de haber completado el proceso de autenticación en el navegador
2. Verifica que el puerto local no esté bloqueado
3. Intenta ejecutar el comando de nuevo

## Próximos pasos

Después de completar el inicio de sesión:

1. Añade las credenciales a tu archivo `.env`
2. Configura tu archivo `intlayer.config.*` con las credenciales
3. Usa los comandos de la CLI para gestionar tus diccionarios:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/push.md) - Enviar diccionarios al CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/pull.md) - Extraer diccionarios del CMS

## Véase también

- [Documentación del CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- [Configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)
