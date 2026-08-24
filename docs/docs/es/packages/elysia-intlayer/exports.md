---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentación del paquete elysia-intlayer
description: Plugin de Elysia para Intlayer, que proporciona funciones de traducción y detección de locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Documentación unificada para todas las exportaciones"
author: aymericzip
---

# Paquete elysia-intlayer

El paquete `elysia-intlayer` proporciona un plugin para aplicaciones Elysia para gestionar la internacionalización. Detecta el locale del usuario e inyecta un objeto `intlayer` en el contexto de la ruta.

## Instalación

```bash
npm install elysia-intlayer
```

## Exportaciones

### Plugin

Importación:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Función    | Descripción                                                                                                                                                                                                                                                                                                                                       | Documento relacionado                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin de Elysia que integra Intlayer en tu aplicación Elysia. Gestiona la detección del locale desde el storage (cookies, headers) y luego desde `Accept-Language`, inyecta un objeto `intlayer` que expone `locale`, `t`, `getIntlayer` y `getDictionary` en el contexto de la ruta, y configura el contexto de request de `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/elysia-intlayer/intlayer.md) |

### Funciones

Importación:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Función         | Descripción                                                                                                                                                                                                                                                                     | Documento relacionado                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Función de traducción global que recupera el contenido para el locale actual en Elysia. Usa `AsyncLocalStorage` para acceder al contexto de request configurado por el plugin `intlayer`, y recurre al locale por defecto fuera de él. También accesible mediante `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `getIntlayer`   | Recupera un diccionario por su clave desde la declaración generada y devuelve su contenido para el locale actual. Versión optimizada de `getDictionary`. Usa `AsyncLocalStorage` para acceder al contexto de la request. También accesible mediante `intlayer.getIntlayer`.     | -                                                                                                      |
| `getDictionary` | Procesa objetos de diccionario y devuelve el contenido para el locale actual. Procesa traducciones `t()`, enumeraciones, markdown, HTML, etc. Usa `AsyncLocalStorage` para acceder al contexto de la request. También accesible mediante `intlayer.getDictionary`.              | -                                                                                                      |

### Tipos

Importación:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tipo                | Descripción                                                                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Forma del objeto `intlayer` inyectado en cada contexto de ruta: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Firma de la función de traducción, que convierte un locale map en el contenido correspondiente al locale de la request actual.                                       |
