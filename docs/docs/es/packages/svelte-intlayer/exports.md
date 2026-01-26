---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete svelte-intlayer
description: Integración específica para Svelte de Intlayer, que proporciona funciones de configuración y stores para aplicaciones Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internacionalización
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete svelte-intlayer

El paquete `svelte-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones Svelte. Incluye funciones de configuración y stores para manejar contenido multilingüe.

## Instalación

```bash
npm install svelte-intlayer
```

## Exportaciones

### Configuración

Importar:

```tsx
import "svelte-intlayer";
```

| Función         | Descripción                                               |
| --------------- | --------------------------------------------------------- |
| `setupIntlayer` | Función para configurar Intlayer en tu aplicación Svelte. |

### Store

Importación:

```tsx
import "svelte-intlayer";
```

| Store           | Descripción                                                |
| --------------- | ---------------------------------------------------------- |
| `intlayerStore` | Store de Svelte que contiene el estado actual de Intlayer. |

### Hooks (Contexto)

Importación:

```tsx
import "svelte-intlayer";
```

| Función                | Descripción                                                                                                                                      | Documento relacionado                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Basado en `useDictionary`, pero inyecta una versión optimizada del diccionario a partir de la declaración generada.                              | -                                                                                                                        |
| `useDictionary`        | Procesa objetos que se parecen a diccionarios (clave, contenido). Procesa traducciones `t()`, enumeraciones, etc.                                | -                                                                                                                        |
| `useDictionaryAsync`   | Igual que `useDictionary`, pero maneja diccionarios asíncronos.                                                                                  | -                                                                                                                        |
| `useDictionaryDynamic` | Igual que `useDictionary`, pero maneja diccionarios dinámicos.                                                                                   | -                                                                                                                        |
| `useLocale`            | Devuelve la locale actual y una función para establecerla.                                                                                       | -                                                                                                                        |
| `useRewriteURL`        | Función del lado del cliente para gestionar reescrituras de URL. Actualiza automáticamente la URL si existe una regla de reescritura localizada. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Devuelve el objeto Intl para la locale actual.                                                                                                   | -                                                                                                                        |

### Markdown

Importar:

```tsx
import "svelte-intlayer";
```

| Función               | Descripción                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `setIntlayerMarkdown` | Función para establecer el contexto de Markdown en tu aplicación Svelte. |
