---
docName: package__next-intlayer__useLocale
url: https://intlayer.org/doc/packages/next-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentación del hook useLocale | next-intlayer
description: Descubre cómo usar el hook useLocale para el paquete next-intlayer
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

# Integración con Next.js: Documentación del Hook `useLocale` para `next-intlayer`

Esta sección ofrece documentación detallada sobre el hook `useLocale` diseñado para aplicaciones Next.js dentro de la biblioteca `next-intlayer`. Está diseñado para manejar cambios de localización y enrutamiento de manera eficiente.

## Importando `useLocale` en Next.js

Para utilizar el hook `useLocale` en tu aplicación Next.js, impórtalo como se muestra a continuación:

```javascript
import { useLocale } from "next-intlayer"; // Usado para gestionar localizaciones y enrutamiento en Next.js
```

## Uso

A continuación, se muestra cómo implementar el hook `useLocale` dentro de un componente de Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Localización Actual: {locale}</h1>
      <p>Localización Predeterminada: {defaultLocale}</p>
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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Localización Actual: {locale}</h1>
      <p>Localización Predeterminada: {defaultLocale}</p>
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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Localización Actual: {locale}</h1>
      <p>Localización Predeterminada: {defaultLocale}</p>
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
```

## Parámetros y Valores de Retorno

Cuando invocas el hook `useLocale`, devuelve un objeto que contiene las siguientes propiedades:

- **`locale`**: La localización actual establecida en el contexto de React.
- **`defaultLocale`**: La localización principal definida en la configuración.
- **`availableLocales`**: Una lista de todas las localizaciones disponibles según lo definido en la configuración.
- **`setLocale`**: Una función para cambiar la localización de la aplicación y actualizar la URL en consecuencia. Se encarga de las reglas de prefijo, ya sea para agregar la localización al camino o no, según la configuración. Utiliza `useRouter` de `next/navigation` para funciones de navegación como `push` y `refresh`.
- **`pathWithoutLocale`**: Una propiedad calculada que devuelve el camino sin la localización. Es útil para comparar URLs. Por ejemplo, si la localización actual es `fr`, y la URL es `fr/my_path`, el camino sin localización es `/my_path`. Utiliza `usePathname` de `next/navigation` para obtener el camino actual.

## Conclusión

El hook `useLocale` de `next-intlayer` es una herramienta crucial para gestionar localizaciones en aplicaciones Next.js. Ofrece un enfoque integrado para adaptar tu aplicación a múltiples localizaciones manejando el almacenamiento de localización, la gestión del estado y las modificaciones de URL de manera fluida.
