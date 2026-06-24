---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de i18n-js a Intlayer"
description: "Aprende cómo migrar tu aplicación desde i18n-js a Intlayer usando el adaptador de compatibilidad."
keywords:
  - i18n-js
  - intlayer
  - migración
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar historial"
author: aymericzip
---

# Migrar de i18n-js a Intlayer

Hacer la transición desde la biblioteca `i18n-js` a Intlayer es una migración altamente optimizada diseñada para descargar grandes configuraciones de traducciones en el sistema de resolución de archivos estructurados de Intlayer.

## Qué hacer

Ejecuta el siguiente comando de configuración en tu repositorio:

```bash
npx intlayer init
```

Con `intlayer.config.ts` preparado, puedes agregar el alias de Intlayer a tu configuración del empaquetador para que cualquier importación de `i18n-js` apunte al paquete de compatibilidad `@intlayer/i18n-js`.

## Qué hace bajo el capó

`i18n-js` accede a namespaces a través de expresiones como `i18n.t('scope.key', {name})` junto con fallbacks de locale y mapeos de plurales específicos.

Bajo el capó:

- **Interpolación:** El adaptador de compatibilidad analiza fácilmente mapeos `%{name}` en tu valor de diccionario de runtime objetivo.
- **Pluralización:** Reemplaza subclaves `one/other` y las asigna contra los poderosos mecanismos de plurales subyacentes de Intlayer (`Intl.PluralRules`), abstrayendo mapeos manuales.
- **Locales:** En lugar de cargar cargas de idioma monolíticas en el bootstrap, los diccionarios se sirven de manera óptima según la configuración de contexto actual a través de la configuración nativa de Intlayer.
