---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función t | next-intlayer
description: Vea cómo usar la función t para el paquete next-intlayer
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
slugs:
  - doc
  - packages
  - next-intlayer
  - t
---

# Documentación: Función `t` en `next-intlayer`

La función `t` en el paquete `next-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de su aplicación Next.js. Le permite definir traducciones directamente dentro de sus componentes, facilitando la visualización de contenido localizado según la configuración regional actual.

---

## Visión general

La función `t` se utiliza para proporcionar traducciones para diferentes configuraciones regionales directamente en sus componentes. Al pasar un objeto que contiene traducciones para cada configuración regional compatible, `t` devuelve la traducción adecuada según el contexto de la configuración regional actual en su aplicación Next.js.

---

## Características clave

- **Traducciones en línea**: Ideal para texto rápido y en línea que no requiere una declaración de contenido separada.
- **Selección automática de configuración regional**: Devuelve automáticamente la traducción correspondiente a la configuración regional actual.
- **Soporte para TypeScript**: Proporciona seguridad de tipos y autocompletado cuando se usa con TypeScript.
- **Integración sencilla**: Funciona perfectamente tanto en componentes cliente como en componentes servidor en Next.js.

---

## Firma de la función

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de configuración regional (por ejemplo, `en`, `fr`, `es`) y los valores son las cadenas traducidas correspondientes.

### Retorna

- Una cadena que representa el contenido traducido para la configuración regional actual.

---

## Ejemplos de uso

### Uso de `t` en un componente cliente

Asegúrate de incluir la directiva `'use client';` en la parte superior del archivo de tu componente cuando uses `t` en un componente del lado del cliente.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
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

### Uso de `t` en un Componente del Servidor

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

### Traducciones en línea en atributos

La función `t` es particularmente útil para traducciones en línea en atributos JSX.
Al localizar atributos como `alt`, `title`, `href` o `aria-label`, puedes usar `t` directamente dentro del atributo.

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

La función `t` es segura en cuanto a tipos cuando se usa con TypeScript, asegurando que se proporcionen todas las locales requeridas.

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

### Detección de Localización y Contexto

En `next-intlayer`, la localización actual se gestiona a través de proveedores de contexto: `IntlayerClientProvider` y `IntlayerServerProvider`. Asegúrate de que estos proveedores envuelvan tus componentes y que la propiedad `locale` se pase correctamente.

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

### `t` Devuelve Traducción Indefinida o Incorrecta

- **Causa**: La configuración del locale actual no es correcta, o falta la traducción para el locale actual.
- **Solución**:
  - Verifica que `IntlayerClientProvider` o `IntlayerServerProvider` estén configurados correctamente con el `locale` adecuado.
  - Asegúrate de que tu objeto de traducciones incluya todos los locales necesarios.

### Traducciones Faltantes en TypeScript

- **Causa**: El objeto de traducciones no satisface los locales requeridos, lo que provoca errores en TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para garantizar la completitud de tus traducciones.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La ausencia de 'es' causará un error de TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La ausencia de 'es' causará un error de TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La ausencia de 'es' causará un error de TypeScript [!code error]
};

const text = t(translations);
```

---

## Consejos para un Uso Efectivo

1. **Usa `t` para Traducciones Simples en Línea**: Ideal para traducir pequeños fragmentos de texto directamente dentro de tus componentes.
2. **Prefiera `useIntlayer` para Contenido Estructurado**: Para traducciones más complejas y reutilización de contenido, defina el contenido en archivos de declaración y use `useIntlayer`.
3. **Provisión Consistente de la Configuración Regional**: Asegúrese de que su configuración regional se proporcione de manera consistente en toda su aplicación a través de los proveedores adecuados.
4. **Aproveche TypeScript**: Use los tipos de TypeScript para detectar traducciones faltantes y garantizar la seguridad de tipos.

---

## Conclusión

La función `t` en `next-intlayer` es una herramienta poderosa y conveniente para gestionar traducciones en línea en sus aplicaciones Next.js. Al integrarla de manera efectiva, mejora las capacidades de internacionalización de su aplicación, proporcionando una mejor experiencia para los usuarios en todo el mundo.

Para un uso más detallado y características avanzadas, consulte la [documentación de next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

---

**Nota**: Recuerde configurar correctamente su `IntlayerClientProvider` y `IntlayerServerProvider` para asegurar que la configuración regional actual se transmita correctamente a sus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
