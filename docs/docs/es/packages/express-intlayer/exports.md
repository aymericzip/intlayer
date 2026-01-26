---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete express-intlayer
description: Middleware de Express para Intlayer, que proporciona funciones de traducción y detección de la configuración regional.
keywords:
  - express-intlayer
  - express
  - middleware
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete express-intlayer

El paquete `express-intlayer` proporciona un middleware para aplicaciones Express para manejar la internacionalización. Detecta la configuración regional del usuario y proporciona funciones de traducción.

## Instalación

```bash
npm install express-intlayer
```

## Exportaciones

### Middleware

Importación:

```tsx
import "express-intlayer";
```

| Función    | Descripción                                                                                                                                                                                                                                                                                                        | Documento relacionado                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware de Express que detecta la locale del usuario y rellena `res.locals` con datos de Intlayer. Realiza la detección de la locale a partir de cookies/headers, inyecta `t`, `getIntlayer` y `getDictionary` en `res.locals`, y configura el namespace de CLS para el acceso al ciclo de vida de la petición. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/express-intlayer/intlayer.md) |

### Funciones

Importar:

```tsx
import "express-intlayer";
```

| Función         | Descripción                                                                                                                                                                                                                                | Documento relacionado                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Función de traducción que recupera contenido para la locale actual. Funciona dentro del ciclo de vida de la solicitud gestionado por el middleware `intlayer`. Utiliza CLS (Async Local Storage) para acceder al contexto de la solicitud. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `getIntlayer`   | Recupera un diccionario por su clave desde la declaración generada y devuelve su contenido para el locale especificado. Versión optimizada de `getDictionary`. Usa CLS para acceder al contexto de la solicitud.                           | -                                                                                                      |
| `getDictionary` | Procesa objetos de diccionario y devuelve contenido para el locale especificado. Procesa traducciones `t()`, enumeraciones, markdown, HTML, etc. Usa CLS para acceder al contexto de la solicitud.                                         | -                                                                                                      |
