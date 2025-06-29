---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función t | next-intlayer
description: Descubre cómo usar la función t para el paquete next-intlayer
keywords:
  - t
  - traducción
  - Intlayer
  - next-intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Documentación: Función `t` en `next-intlayer`

La función `t` en el paquete `next-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de tu aplicación Next.js. Te permite definir traducciones directamente dentro de tus componentes, haciendo que sea sencillo mostrar contenido localizado basado en el idioma actual.

---

## Descripción General

La función `t` se utiliza para proporcionar traducciones para diferentes idiomas directamente en tus componentes. Al pasar un objeto que contiene traducciones para cada idioma soportado, `t` devuelve la traducción apropiada basada en el contexto del idioma actual en tu aplicación Next.js.

---

## Características Clave

- **Traducciones en Línea**: Ideal para texto rápido en línea que no requiere una declaración de contenido separada.
- **Selección Automática de Idioma**: Devuelve automáticamente la traducción correspondiente al idioma actual.
- **Soporte para TypeScript**: Proporciona seguridad de tipos y autocompletado cuando se usa con TypeScript.
- **Fácil Integración**: Funciona perfectamente tanto en componentes del cliente como del servidor en Next.js.

---

## Firma de la Función

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de idioma (por ejemplo, `en`, `fr`, `es`) y los valores son las cadenas traducidas correspondientes.

### Retorna

- Una cadena que representa el contenido traducido para el idioma actual.

---

## Ejemplos de Uso

### Usando `t` en un Componente del Cliente

Asegúrate de incluir la directiva `'use client';` en la parte superior de tu archivo de componente al usar `t` en un componente del lado del cliente.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    })}
  </p>
);
```

### Usando `t` en un Componente del Servidor

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Traducciones en Línea en Atributos

La función `t` es particularmente útil para traducciones en línea en atributos JSX. Al localizar atributos como `alt`, `title`, `href` o `aria-label`, puedes usar `t` directamente dentro del atributo.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Temas Avanzados

### Integración con TypeScript

La función `t` es segura para tipos cuando se usa con TypeScript, asegurando que se proporcionen todos los idiomas requeridos.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detección de Idioma y Contexto

En `next-intlayer`, el idioma actual se gestiona a través de proveedores de contexto: `IntlayerClientProvider` y `IntlayerServerProvider`. Asegúrate de que estos proveedores envuelvan tus componentes y que la propiedad `locale` se pase correctamente.

#### Ejemplo:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Tus componentes aquí */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Tus componentes aquí */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Tus componentes aquí */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Errores Comunes y Solución de Problemas

### `t` Devuelve Undefined o Traducción Incorrecta

- **Causa**: El idioma actual no está configurado correctamente o falta la traducción para el idioma actual.
- **Solución**:
  - Verifica que el `IntlayerClientProvider` o `IntlayerServerProvider` esté configurado correctamente con el idioma apropiado.
  - Asegúrate de que tu objeto de traducciones incluya todos los idiomas necesarios.

### Faltan Traducciones en TypeScript

- **Causa**: El objeto de traducciones no satisface los idiomas requeridos, lo que genera errores en TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para garantizar la completitud de tus traducciones.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es', lo que causará un error en TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es', lo que causará un error en TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es', lo que causará un error en TypeScript [!code error]
};

const text = t(translations);
```

---

## Consejos para un Uso Efectivo

1. **Usa `t` para Traducciones Simples en Línea**: Ideal para traducir pequeños fragmentos de texto directamente dentro de tus componentes.
2. **Prefiere `useIntlayer` para Contenido Estructurado**: Para traducciones más complejas y reutilización de contenido, define contenido en archivos de declaración y usa `useIntlayer`.
3. **Provisión Consistente de Idioma**: Asegúrate de que tu idioma se proporcione consistentemente en toda tu aplicación a través de los proveedores apropiados.
4. **Aprovecha TypeScript**: Usa tipos de TypeScript para detectar traducciones faltantes y garantizar la seguridad de tipos.

---

## Conclusión

La función `t` en `next-intlayer` es una herramienta poderosa y conveniente para gestionar traducciones en línea en tus aplicaciones Next.js. Al integrarla de manera efectiva, mejoras las capacidades de internacionalización de tu aplicación, proporcionando una mejor experiencia para usuarios de todo el mundo.

Para un uso más detallado y características avanzadas, consulta la [documentación de next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

---

**Nota**: Recuerda configurar correctamente tu `IntlayerClientProvider` y `IntlayerServerProvider` para garantizar que el idioma actual se pase correctamente a tus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.
