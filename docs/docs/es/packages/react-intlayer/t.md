---
docName: package__react-intlayer__t
url: https://intlayer.org/doc/packages/react-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación de la función t | react-intlayer
description: Descubre cómo usar la función t para el paquete react-intlayer
keywords:
  - t
  - traducción
  - Intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Documentación: Función `t` en `react-intlayer`

La función `t` en el paquete `react-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de tu aplicación React. Te permite definir traducciones directamente dentro de tus componentes, haciendo que sea sencillo mostrar contenido localizado basado en el idioma actual.

---

## Descripción General

La función `t` se utiliza para proporcionar traducciones para diferentes idiomas directamente en tus componentes. Al pasar un objeto que contiene traducciones para cada idioma soportado, `t` devuelve la traducción adecuada basada en el contexto de idioma actual en tu aplicación React.

---

## Características Principales

- **Traducciones en Línea**: Ideal para texto rápido en línea que no requiere una declaración de contenido separada.
- **Selección Automática de Idioma**: Devuelve automáticamente la traducción correspondiente al idioma actual.
- **Soporte para TypeScript**: Proporciona seguridad de tipos y autocompletado cuando se usa con TypeScript.
- **Fácil Integración**: Funciona perfectamente dentro de los componentes de React.

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

### Uso Básico de `t` en un Componente

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
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

La función `t` es segura en cuanto a tipos cuando se usa con TypeScript, asegurando que se proporcionen todos los idiomas requeridos.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detección de Idioma y Contexto

En `react-intlayer`, el idioma actual se gestiona a través del `IntlayerProvider`. Asegúrate de que este proveedor envuelve tus componentes y que la propiedad `locale` se pasa correctamente.

#### Ejemplo:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Tus componentes aquí */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Tus componentes aquí */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Tus componentes aquí */}
  </IntlayerProvider>
);
```

---

## Errores Comunes y Solución de Problemas

### `t` Devuelve Undefined o Traducción Incorrecta

- **Causa**: El idioma actual no está configurado correctamente o falta la traducción para el idioma actual.
- **Solución**:
  - Verifica que el `IntlayerProvider` esté configurado correctamente con el idioma adecuado.
  - Asegúrate de que tu objeto de traducciones incluya todos los idiomas necesarios.

### Faltan Traducciones en TypeScript

- **Causa**: El objeto de traducciones no satisface los idiomas requeridos, lo que genera errores en TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para garantizar la completitud de tus traducciones.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es', lo que causará un error en TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es', lo que causará un error en TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Falta 'es', lo que causará un error en TypeScript
};

const text = t(translations);
```

---

## Consejos para un Uso Efectivo

1. **Usa `t` para Traducciones Simples en Línea**: Ideal para traducir pequeños fragmentos de texto directamente dentro de tus componentes.
2. **Prefiere `useIntlayer` para Contenido Estructurado**: Para traducciones más complejas y reutilización de contenido, define el contenido en archivos de declaración y usa `useIntlayer`.
3. **Provisión Consistente de Idioma**: Asegúrate de que tu idioma se proporcione de manera consistente en toda tu aplicación a través del `IntlayerProvider`.
4. **Aprovecha TypeScript**: Usa tipos de TypeScript para detectar traducciones faltantes y garantizar la seguridad de tipos.

---

## Conclusión

La función `t` en `react-intlayer` es una herramienta poderosa y conveniente para gestionar traducciones en línea en tus aplicaciones React. Al integrarla de manera efectiva, mejoras las capacidades de internacionalización de tu aplicación, proporcionando una mejor experiencia para usuarios de todo el mundo.

Para un uso más detallado y características avanzadas, consulta la [documentación de react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

---

**Nota**: Recuerda configurar correctamente tu `IntlayerProvider` para asegurarte de que el idioma actual se pase correctamente a tus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.
