---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del hook useLocale | react-intlayer
description: Descubre cómo usar el hook useLocale para el paquete react-intlayer
keywords:
  - useLocale
  - diccionario
  - clave
  - Intlayer
  - Internacionalización
  - Documentación
  - Next.js
  - JavaScript
  - React
---

# Integración con React: Documentación del Hook `useLocale`

Esta sección proporciona detalles completos sobre el hook `useLocale` de la biblioteca `react-intlayer`, diseñado para manejar la gestión de locales en aplicaciones React.

## Importando `useLocale` en React

Para integrar el hook `useLocale` en tu aplicación React, impórtalo desde su paquete correspondiente:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Usado en componentes React para la gestión de locales
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Usado en componentes React para la gestión de locales
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Usado en componentes React para la gestión de locales
```

## Descripción General

El hook `useLocale` ofrece una forma sencilla de acceder y manipular la configuración de locales dentro de los componentes React. Proporciona acceso al locale actual, el locale predeterminado, todos los locales disponibles y funciones para actualizar la configuración de locales.

## Uso

Aquí se muestra cómo puedes usar el hook `useLocale` dentro de un componente React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Actual: {locale}</h1>
      <p>Locale Predeterminado: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Actual: {locale}</h1>
      <p>Locale Predeterminado: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Actual: {locale}</h1>
      <p>Locale Predeterminado: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Parámetros y Valores de Retorno

Cuando invocas el hook `useLocale`, este devuelve un objeto que contiene las siguientes propiedades:

- **`locale`**: El locale actual configurado en el contexto de React.
- **`defaultLocale`**: El locale principal definido en la configuración.
- **`availableLocales`**: Una lista de todos los locales disponibles definidos en la configuración.
- **`setLocale`**: Una función para actualizar el locale actual dentro del contexto de la aplicación.

## Ejemplo

Este ejemplo muestra un componente que utiliza el hook `useLocale` para renderizar un selector de locales, permitiendo a los usuarios cambiar dinámicamente el locale de la aplicación:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Conclusión

El hook `useLocale` de `react-intlayer` es una herramienta esencial para gestionar locales en tus aplicaciones React, proporcionando la funcionalidad necesaria para adaptar tu aplicación a diversas audiencias internacionales de manera efectiva.
