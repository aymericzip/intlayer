---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación de la función t | react-intlayer
description: Vea cómo usar la función t para el paquete react-intlayer
keywords:
  - t
  - traducción
  - Intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
---

# Documentación: Función `t` en `react-intlayer`

La función `t` en el paquete `react-intlayer` es una herramienta fundamental para la internacionalización en línea dentro de su aplicación React. Le permite definir traducciones directamente dentro de sus componentes, facilitando la visualización de contenido localizado según la configuración regional actual.

---

## Descripción general

La función `t` se utiliza para proporcionar traducciones para diferentes configuraciones regionales directamente en sus componentes. Al pasar un objeto que contiene traducciones para cada configuración regional compatible, `t` devuelve la traducción apropiada basada en el contexto de la configuración regional actual en su aplicación React.

---

## Características clave

- **Traducciones en línea**: Ideal para texto rápido en línea que no requiere una declaración de contenido separada.
- **Selección automática de configuración regional**: Devuelve automáticamente la traducción correspondiente a la configuración regional actual.
- **Soporte para TypeScript**: Proporciona seguridad de tipos y autocompletado cuando se usa con TypeScript.
- **Integración sencilla**: Funciona perfectamente dentro de los componentes de React.

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

### Uso básico de `t` en un componente

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

### Traducciones en línea en atributos

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
      en: "Un hermoso paisaje",
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
// Definición de las traducciones con tipos para asegurar la seguridad de tipos
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detección de Locale y Contexto

En `react-intlayer`, la locale actual se gestiona a través del `IntlayerProvider`. Asegúrate de que este proveedor envuelva tus componentes y que la propiedad `locale` se pase correctamente.

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

- **Causa**: La configuración del locale actual no es correcta, o falta la traducción para el locale actual.
- **Solución**:
  - Verifica que el `IntlayerProvider` esté configurado correctamente con el `locale` apropiado.
  - Asegúrate de que tu objeto de traducciones incluya todos los locales necesarios.

### Traducciones faltantes en TypeScript

- **Causa**: El objeto de traducciones no cumple con los locales requeridos, lo que genera errores en TypeScript.
- **Solución**: Usa el tipo `IConfigLocales` para asegurar la completitud de tus traducciones.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La falta de 'es' causará un error en TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La ausencia de 'es' causará un error en TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // La ausencia de 'es' causará un error en TypeScript
};

const text = t(translations);
```

---

## Consejos para un Uso Efectivo

1. **Usa `t` para Traducciones Simples en Línea**: Ideal para traducir pequeños fragmentos de texto directamente dentro de tus componentes.
2. **Prefiere `useIntlayer` para Contenido Estructurado**: Para traducciones más complejas y reutilización de contenido, define el contenido en archivos de declaración y usa `useIntlayer`.
3. **Provisión Consistente de Locales**: Asegúrate de que tu locale se proporcione de manera consistente en toda tu aplicación a través del `IntlayerProvider`.
4. **Aprovecha TypeScript**: Usa los tipos de TypeScript para detectar traducciones faltantes y garantizar la seguridad de tipos.

---

## Conclusión

La función `t` en `react-intlayer` es una herramienta poderosa y conveniente para gestionar traducciones en línea en tus aplicaciones React. Al integrarla de manera efectiva, mejoras las capacidades de internacionalización de tu aplicación, proporcionando una mejor experiencia para usuarios en todo el mundo.

Para un uso más detallado y características avanzadas, consulta la [documentación de react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_visual_editor.md).

---

**Nota**: Recuerda configurar correctamente tu `IntlayerProvider` para asegurar que el locale actual se pase adecuadamente a tus componentes. Esto es crucial para que la función `t` devuelva las traducciones correctas.

## Historial del Documento

- 5.5.10 - 2025-06-29: Historial inicial
