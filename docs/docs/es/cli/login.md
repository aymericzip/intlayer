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
---

# Comando 'login' del CLI de Intlayer

---

## Descripción

El comando `login` del CLI de Intlayer te permite autenticarte con el CMS de Intlayer. Este comando abre automáticamente tu navegador por defecto para completar el proceso de autenticación y recibir las credenciales necesarias (Client ID y Client Secret) para usar los servicios de Intlayer.

## Uso

```bash
npx intlayer login [options]
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

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Opciones de configuración

También puedes usar opciones de configuración comunes:

- `--env-file <path>`: Ruta al archivo de entorno
- `-e, --env <env>`: Entorno de ejecución
- `--base-dir <dir>`: Directorio base del proyecto
- `--verbose`: Habilitar salida detallada (por defecto: true)
- `--prefix <prefix>`: Prefijo para los logs

## Cómo funciona

1. **Inicio de servidor local**: El comando inicia un servidor HTTP local en un puerto aleatorio para recibir las credenciales desde el CMS

Especifica la URL del CMS de Intlayer al que conectarse para la autenticación.

- **Tipo**: `string`
- **Por defecto**: El valor configurado en `intlayer.config.*` o `https://intlayer.org`
- **Ejemplo**:

```bash
npx intlayer login --cms-url https://intlayer.org
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

## Configuración manual

Si el navegador no se abre automáticamente, puedes visitar manualmente la URL que se muestra en el terminal.

## Ejemplos

### Iniciar sesión con URL de CMS personalizada

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Iniciar sesión con archivo de entorno específico

```bash
npx intlayer login --env-file .env.production
```

### Iniciar sesión en modo verbose

```bash
npx intlayer login --verbose
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

- [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/fill.md) - Rellenar traducciones faltantes

## Véase también

- [Documentación del CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/cli/index.md)
- [Configuración de Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_CMS.md)
