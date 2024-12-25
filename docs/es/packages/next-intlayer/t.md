# Documentación: `t` Función en `next-intlayer`

La función `t` en el paquete `next-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de tu aplicación Next.js. Te permite definir traducciones directamente dentro de tus componentes, facilitando la visualización de contenido localizado según la configuración regional actual.

---

## Descripción

La función `t` se utiliza para proporcionar traducciones para diferentes configuraciones regionales directamente en tus componentes. Al pasar un objeto que contiene traducciones para cada locale soportado, `t` devuelve la traducción apropiada según el contexto de la configuración regional actual en tu aplicación Next.js.

---

## Características Clave

- **Traducciones en Línea**: Ideal para texto rápido en línea que no requiere una declaración de contenido separada.
- **Selección Automática de Locale**: Devuelve automáticamente la traducción correspondiente a la configuración regional actual.
- **Soporte para TypeScript**: Proporciona seguridad de tipos y autocompletar cuando se usa con TypeScript.
- **Fácil Integración**: Funciona sin problemas tanto en componentes de cliente como de servidor en Next.js.

---

## Firma de Función

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parámetros

- `translations`: Un objeto donde las claves son códigos de configuración regional (por ejemplo, `en`, `fr`, `es`) y los valores son las cadenas traducidas correspondientes.

### Retornos

- Una cadena que representa el contenido traducido para la configuración regional actual.

---

## Ejemplos de Uso

### Usando `t` en un Componente de Cliente

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

### Usando `t` en un Componente de Servidor

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

La función `t` es segura para tipos cuando se usa con TypeScript, asegurando que se proporcionen todos los locales requeridos.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detección de Locale y Contexto

En `next-intlayer`, la configuración regional actual se gestiona a través de proveedores de contexto: `IntlayerClientProvider` y `IntlayerServerProvider`. Asegúrate de que estos proveedores envuelvan tus componentes y que la propiedad `locale` se pase correctamente.

#### Ejemplo:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

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

### `t` Retorna Undefined o Traducción Incorrecta

- **Causa**: La configuración regional actual no está correctamente establecida, o falta la traducción para la configuración regional actual.
- **Solución**:
  - Verifica que `IntlayerClientProvider` o `IntlayerServerProvider` esté configurado correctamente con el `locale` apropiado.
  - Asegúrate de que tu objeto de traducciones incluya todos los locales necesarios.

### Traducciones Faltantes en TypeScript

- **Causa**: El objeto de traducciones no satisface los locales requeridos, lo que lleva a errores de TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para hacer cumplir la integridad de tus traducciones.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es' causará un error de TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es' causará un error de TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es' causará un error de TypeScript [!code error]
};

const text = t(translations);
```

---

## Consejos para un Uso Efectivo

1. **Usa `t` para Traducciones Simples en Línea**: Ideal para traducir piezas pequeñas de texto directamente dentro de tus componentes.
2. **Prefiere `useIntlayer` para Contenido Estructurado**: Para traducciones más complejas y reutilización de contenido, define contenido en archivos de declaración y usa `useIntlayer`.
3. **Provisión Consistente de Locale**: Asegúrate de que tu locale se proporcione de manera consistente a lo largo de tu aplicación a través de los proveedores apropiados.
4. **Aprovecha TypeScript**: Usa tipos de TypeScript para detectar traducciones faltantes y asegurar la seguridad de tipos.

---

## Conclusión

La función `t` en `next-intlayer` es una herramienta poderosa y conveniente para gestionar traducciones en línea en tus aplicaciones Next.js. Al integrarla de manera efectiva, mejoras las capacidades de internacionalización de tu aplicación, proporcionando una mejor experiencia para los usuarios en todo el mundo.

Para un uso más detallado y características avanzadas, consulta la [documentación de next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/es/intlayer_editor.md).

---

**Nota**: Recuerda configurar correctamente tu `IntlayerClientProvider` y `IntlayerServerProvider` para asegurar que la configuración regional actual se pase correctamente a tus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.
