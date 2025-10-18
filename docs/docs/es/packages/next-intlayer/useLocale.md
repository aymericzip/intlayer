---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentación del Hook useLocale | next-intlayer
description: Vea cómo usar el hook useLocale para el paquete next-intlayer
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historial inicial
---

# Integración con Next.js: Documentación del Hook `useLocale` para `next-intlayer`

Esta sección ofrece documentación detallada sobre el hook `useLocale` diseñado para aplicaciones Next.js dentro de la biblioteca `next-intlayer`. Está pensado para manejar cambios de idioma y enrutamiento de manera eficiente.

## Importando `useLocale` en Next.js

Para utilizar el hook `useLocale` en tu aplicación Next.js, impórtalo como se muestra a continuación:

```javascript
import { useLocale } from "next-intlayer"; // Usado para gestionar locales y enrutamiento en Next.js
```

## Uso

Aquí se muestra cómo implementar el hook `useLocale` dentro de un componente Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Idioma Actual: {locale}</h1>
      <p>Idioma Predeterminado: {defaultLocale}</p>
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
      <h1>Idioma Actual: {locale}</h1>
      <p>Idioma Predeterminado: {defaultLocale}</p>
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
      <h1>Idioma Actual: {locale}</h1>
      <p>Idioma Predeterminado: {defaultLocale}</p>
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

Cuando invocas el hook `useLocale`, este retorna un objeto que contiene las siguientes propiedades:

- **`locale`**: La configuración regional actual establecida en el contexto de React.
- **`defaultLocale`**: La configuración regional principal definida en la configuración.
- **`availableLocales`**: Una lista de todas las configuraciones regionales disponibles según lo definido en la configuración.
- **`setLocale`**: Una función para cambiar la configuración regional de la aplicación y actualizar la URL en consecuencia. Se encarga de las reglas de prefijo, ya sea para añadir o no la configuración regional en la ruta según la configuración. Utiliza `useRouter` de `next/navigation` para funciones de navegación como `push` y `refresh`.
- **`pathWithoutLocale`**: Una propiedad calculada que devuelve la ruta sin la configuración regional. Es útil para comparar URLs. Por ejemplo, si la configuración regional actual es `fr`, y la URL es `fr/my_path`, la ruta sin configuración regional es `/my_path`. Utiliza `usePathname` de `next/navigation` para obtener la ruta actual.

## Conclusión

El hook `useLocale` de `next-intlayer` es una herramienta crucial para gestionar configuraciones regionales en aplicaciones Next.js. Ofrece un enfoque integrado para adaptar tu aplicación a múltiples configuraciones regionales manejando de manera fluida el almacenamiento de la configuración regional, la gestión del estado y las modificaciones de la URL.
