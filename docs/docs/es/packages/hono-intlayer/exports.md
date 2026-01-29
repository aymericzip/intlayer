---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentación del Paquete hono-intlayer
description: Middleware de Hono para Intlayer, proporcionando funciones de traducción y detección de idioma.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Documentación unificada para todas las exportaciones
---

# Paquete hono-intlayer

El paquete `hono-intlayer` proporciona un middleware para aplicaciones Hono para manejar la internacionalización. Detecta el idioma del usuario y rellena el objeto de contexto.

## Instalación

```bash
npm install hono-intlayer
```

## Exportaciones

### Middleware

Importar:

```tsx
import { intlayer } from "hono-intlayer";
```

| Función    | Descripción                                                                                                                                                                                                                                                                                                            | Doc Relacionada                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Middleware de Hono que integra Intlayer en su aplicación Hono. Maneja la detección de idioma desde el almacenamiento (cookies, encabezados), rellena el contexto con `t`, `getIntlayer` y `getDictionary`, y configura el espacio de nombres CLS para el acceso programático durante el ciclo de vida de la solicitud. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/hono-intlayer/intlayer.md) |

### Funciones

Importar:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Función         | Descripción                                                                                                                                                                                                                                                       | Doc Relacionada                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `t`             | Función de traducción global que recupera contenido para el idioma actual en Hono. Utiliza CLS (Async Local Storage) y debe usarse dentro de un contexto de solicitud gestionado por el middleware `intlayer`. También se puede acceder a través del contexto.    | [traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `getIntlayer`   | Recupera un diccionario por su clave de la declaración generada y devuelve su contenido para el idioma especificado. Versión optimizada de `getDictionary`. Utiliza CLS para acceder al contexto de la solicitud. También se puede acceder a través del contexto. | -                                                                                                     |
| `getDictionary` | Procesa objetos de diccionario y devuelve el contenido para el idioma especificado. Procesa traducciones `t()`, enumeraciones, markdown, HTML, etc. Utiliza CLS para acceder al contexto de la solicitud. También se puede acceder a través del contexto.         | -                                                                                                     |
