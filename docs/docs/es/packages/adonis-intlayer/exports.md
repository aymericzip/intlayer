---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentación del paquete adonis-intlayer
description: Middleware de AdonisJS para Intlayer, que proporciona funciones de traducción y detección de locale.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentación inicial
---

# Paquete adonis-intlayer

El paquete `adonis-intlayer` proporciona un middleware para aplicaciones AdonisJS para manejar la internacionalización. Detecta el locale del usuario y proporciona funciones de traducción.

## Instalación

```bash
npm install adonis-intlayer
```

## Exportaciones

### Middleware

El paquete proporciona un middleware de AdonisJS para manejar la internacionalización.

| Función              | Descripción                                                                                                                                                                                                                                                                                                     | Doc relacionada                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Middleware de AdonisJS que detecta el locale del usuario y rellena el contexto de la solicitud con datos de Intlayer. También configura un espacio de nombres CLS (Async Local Storage) para el acceso al ciclo de vida de la solicitud, habilitando el uso de funciones globales como `t`, `getIntlayer`, etc. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/adonis-intlayer/intlayer.md) |

### Funciones

| Función         | Descripción                                                                                                                                                                                                                                   | Doc relacionada                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `t`             | Función de traducción que recupera el contenido para el locale actual. Funciona dentro del ciclo de vida de la solicitud gestionado por el middleware `intlayer`. Utiliza CLS (Async Local Storage) para acceder al contexto de la solicitud. | [traducción](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `getIntlayer`   | Recupera un diccionario por su clave de la declaración generada y devuelve su contenido para el locale especificado. Versión optimizada de `getDictionary`. Utiliza CLS para acceder al contexto de la solicitud.                             | -                                                                                                     |
| `getDictionary` | Procesa objetos de diccionario y devuelve el contenido para el locale especificado. Procesa traducciones `t()`, enumeraciones, markdown, HTML, etc. Utiliza CLS para acceder al contexto de la solicitud.                                     | -                                                                                                     |
| `getLocale`     | Recupera el locale actual del contexto de la solicitud usando CLS.                                                                                                                                                                            | -                                                                                                     |
