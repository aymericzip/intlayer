---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentación del paquete react-intlayer
description: Implementación específica para React de Intlayer, que proporciona hooks y providers para aplicaciones React.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Documentación unificada para todas las exportaciones
---

# Paquete react-intlayer

El paquete `react-intlayer` proporciona las herramientas necesarias para integrar Intlayer en aplicaciones React. Incluye providers de contexto, hooks y componentes para manejar contenido multilingüe.

## Instalación

```bash
npm install react-intlayer
```

## Exportaciones

### Proveedores

Importar:

```tsx
import "react-intlayer";
```

| Componente                | Descripción                                                                                                                          | Documento relacionado                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | El proveedor principal que envuelve tu aplicación y proporciona el contexto de Intlayer. Incluye soporte para el editor por defecto. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Un componente proveedor centrado en el contenido sin las funcionalidades del editor. Úsalo cuando no necesites el editor visual.     | -                                                                                                                             |
| `HTMLProvider`            | Proveedor para la configuración de internacionalización relacionada con HTML. Permite sobrescribir componentes para etiquetas HTML.  | -                                                                                                                             |

### Hooks

Importar:

```tsx
import "react-intlayer";
```

| Hook                   | Descripción                                                                                                                                                 | Documento relacionado                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useHTMLRenderer`      | Hook para obtener una función de renderizado de HTML preconfigurada.                                                                                        | -                                                                                                                       |
| `useMarkdownRenderer`  | Hook para obtener una función de renderizado de Markdown preconfigurada.                                                                                    | -                                                                                                                       |
| `useIntlayer`          | Hook del lado del cliente que selecciona un diccionario por su clave y devuelve su contenido. Usa la locale del contexto si no se proporciona.              | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook que transforma un objeto de diccionario y devuelve el contenido para la locale actual. Procesa traducciones `t()`, enumeraciones, etc.                 | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook que gestiona diccionarios asíncronos. Acepta un mapa de diccionarios basado en Promise y lo resuelve para la locale actual.                            | -                                                                                                                       |
| `useDictionaryDynamic` | Hook que gestiona diccionarios dinámicos cargados por clave. Utiliza React Suspense internamente para los estados de carga.                                 | -                                                                                                                       |
| `useLocale`            | Hook del lado del cliente para obtener la locale actual, la locale predeterminada, las locales disponibles y una función para actualizar la locale.         | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook para obtener la locale actual y todos los campos relacionados (locale, defaultLocale, availableLocales, setLocale) desde el contexto.                  | -                                                                                                                       |
| `useRewriteURL`        | Hook del lado del cliente para gestionar reescrituras de URL. Si existe una regla de reescritura para el pathname y la locale actuales, actualizará la URL. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook que proporciona una función de traducción `t()` para acceder a contenido anidado mediante clave. Emula el patrón de i18next/next-intl.                 | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook que proporciona un objeto `Intl` ligado a la locale. Inyecta automáticamente la locale actual y utiliza caching optimizado.                            | -                                                                                                                       |
| `useLocaleStorage`     | Hook que proporciona persistencia de la locale en localStorage o cookies. Devuelve funciones getter y setter.                                               | -                                                                                                                       |
| `useLocaleCookie`      | Obsoleto. Usa `useLocaleStorage` en su lugar. Hook que gestiona la persistencia de la locale en cookies.                                                    | -                                                                                                                       |
| `useLoadDynamic`       | Hook para cargar diccionarios dinámicos usando React Suspense. Acepta una key y una promise; almacena en caché los resultados.                              | -                                                                                                                       |
| `useIntlayerContext`   | Hook que proporciona los valores actuales del contexto del cliente Intlayer (locale, setLocale, etc.).                                                      | -                                                                                                                       |
| `useHTMLContext`       | Hook para acceder a las anulaciones de componentes HTML desde el contexto HTMLProvider.                                                                     | -                                                                                                                       |

### Funciones

Importar:

```tsx
import "react-intlayer";
```

| Función              | Descripción                                                                                                                                                    | Documento relacionado                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `renderHTML`         | Utilidad independiente para renderizar HTML fuera de componentes.                                                                                              | -                                                                                                      |
| `renderMarkdown`     | Utilidad independiente para renderizar Markdown fuera de componentes.                                                                                          | -                                                                                                      |
| `t`                  | Función de traducción en cliente que devuelve la traducción del contenido multilingüe proporcionado. Usa el locale del contexto si no se indica.               | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/dictionary/translation.md) |
| `getDictionary`      | Procesa objetos de diccionario y devuelve el contenido para el locale especificado. Procesa traducciones `t()`, enumeraciones, Markdown, HTML, etc.            | -                                                                                                      |
| `getIntlayer`        | Recupera un diccionario por su clave desde la declaración generada y devuelve su contenido para el locale especificado. Versión optimizada de `getDictionary`. | -                                                                                                      |
| `setLocaleInStorage` | Establece la locale en el almacenamiento (localStorage o cookie según la configuración).                                                                       | -                                                                                                      |
| `setLocaleCookie`    | Obsoleto. Usa `setLocaleInStorage` en su lugar. Establece la locale en una cookie.                                                                             | -                                                                                                      |
| `localeInStorage`    | Obtiene el locale desde el almacenamiento (local storage o cookie).                                                                                            | -                                                                                                      |
| `localeCookie`       | Obsoleto. Usa `localeInStorage` en su lugar. Obtiene el locale desde la cookie.                                                                                | -                                                                                                      |

### Componentes

Importar:

```tsx
import "react-intlayer";
```

o

```tsx
import "react-intlayer/markdown";
```

| Componente         | Descripción                                                                                                                                              | Documento relacionado                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `HTMLRenderer`     | Renderiza contenido HTML con componentes personalizados.                                                                                                 | -                                                                                                                             |
| `MarkdownProvider` | Proveedor para el contexto de renderizado de markdown. Permite anular componentes personalizados para los elementos de markdown.                         | -                                                                                                                             |
| `MarkdownRenderer` | Renderiza contenido markdown con componentes personalizados. Admite todas las características estándar de markdown y la sintaxis específica de Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/react-intlayer/MarkdownRenderer.md) |

### Tipos

Importación:

```tsx
import "react-intlayer";
```

| Tipo           | Descripción                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Tipo que representa un nodo en el árbol de contenido de Intlayer. Usado para la manipulación de contenido con tipado seguro. |

### Lado del servidor (react-intlayer/server)

Importar:

```tsx
import "react-intlayer/server";
```

| Exportación              | Tipo        | Descripción                                                     |
| ------------------------ | ----------- | --------------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | Proveedor para renderizado del lado del servidor.               |
| `IntlayerServer`         | `Component` | Envoltorio del lado del servidor para el contenido de Intlayer. |
| `t`                      | `Function`  | Versión del lado del servidor de la función de traducción.      |
| `useLocale`              | `Hook`      | Hook para acceder al locale en el lado del servidor.            |
| `useIntlayer`            | `Hook`      | Versión del lado del servidor de `useIntlayer`.                 |
| `useDictionary`          | `Hook`      | Versión del lado del servidor de `useDictionary`.               |
| `useI18n`                | `Hook`      | Versión del lado del servidor de `useI18n`.                     |
| `locale`                 | `Function`  | Función para obtener o establecer el locale en el servidor.     |
