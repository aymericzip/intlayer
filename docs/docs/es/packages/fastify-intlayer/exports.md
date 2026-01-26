---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete fastify-intlayer
description: Plugin de Fastify para Intlayer, que proporciona funciones de traducción y detección de locale.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete fastify-intlayer

El paquete `fastify-intlayer` proporciona un plugin para aplicaciones Fastify para gestionar la internacionalización. Detecta el locale del usuario y decora el objeto request.

## Instalación

```bash
npm install fastify-intlayer
```

## Exportaciones

### Plugin

Importación:

```tsx
import "fastify-intlayer";
```

| Función    | Descripción                                                                                                                                                                                                                                                                                                                                     | Documento relacionado                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin de Fastify que integra Intlayer en tu aplicación Fastify. Gestiona la detección de locale desde el almacenamiento (cookies, headers), decora el objeto request con datos `intlayer` que contienen `t`, `getIntlayer` y `getDictionary`, y configura un namespace de CLS para acceso programático durante el ciclo de vida de la request. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/fastify-intlayer/intlayer.md) |

### Funciones

Importar:

```tsx
import "fastify-intlayer";
```

| Función         | Descripción                                                                                                                                                                                                                                                                          | Documento relacionado                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Función global de traducción que obtiene contenido para la localidad actual en Fastify. Utiliza CLS (Async Local Storage) y debe usarse dentro de un contexto de petición gestionado por el plugin `intlayer`. También se puede acceder mediante `req.intlayer.t`.                   | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `getIntlayer`   | Recupera un diccionario por su clave desde la declaración generada y devuelve su contenido para la localidad especificada. Versión optimizada de `getDictionary`. Utiliza CLS para acceder al contexto de la petición. También se puede acceder mediante `req.intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Procesa objetos de diccionario y devuelve el contenido para la locale especificada. Procesa traducciones `t()`, enumeraciones, Markdown, HTML, etc. Utiliza CLS para acceder al contexto de la solicitud. También puede accederse vía `req.intlayer.getDictionary`.                  | -                                                                                                      |
