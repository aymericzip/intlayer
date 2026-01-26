---
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
description: Documentation for the useLocale hook in the next-intlayer package
createdAt: 2024-08-11
updatedAt: 2026-01-26
title: Documentación del Hook useLocale | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: `onLocaleChange` por defecto a `replace`
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

## Parámetros

El hook `useLocale` acepta los siguientes parámetros:

- **`onLocaleChange`**: Una cadena que determina cómo debe actualizarse la URL cuando cambia el locale. Puede ser `"replace"`, `"push"` o `"none"`.

  > Tomemos un ejemplo:
  >
  > 1. Estás en `/fr/home`
  > 2. Navegas a `/fr/about`
  > 3. Cambias el locale a `/es/about`
  > 4. Haces clic en el botón "atrás" del navegador
  >
  > El comportamiento variará según el valor de `onLocaleChange`:
  >
  > - `"replace"` (predeterminado): Reemplaza la URL actual con la nueva URL localizada y establece la cookie.
  >   -> El botón "atrás" irá a `/es/home`
  > - `"push"`: Agrega la nueva URL localizada al historial del navegador y establece la cookie.
  >   -> El botón "atrás" irá a `/fr/about`
  > - `"none"`: Solo actualiza el locale en el contexto del cliente y establece la cookie, sin cambiar la URL.
  >   -> El botón "atrás" irá a `/fr/home`
  > - `(locale) => void`: Establece la cookie y activa una función personalizada que se llamará cuando cambie el locale.
  >
  >   La opción `undefined` es el comportamiento predeterminado, ya que recomendamos usar el componente `Link` para navegar al nuevo locale.
  >   Ejemplo:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     Acerca de
  >   </Link>
  >   ```

## Valores de Retorno

- **`locale`**: La configuración regional actual establecida en el contexto de React.
- **`defaultLocale`**: La configuración regional principal definida en la configuración.
- **`availableLocales`**: Una lista de todas las configuraciones regionales disponibles según lo definido en la configuración.
- **`setLocale`**: Una función para cambiar la configuración regional de la aplicación y actualizar la URL en consecuencia. Se encarga de las reglas de prefijo, ya sea para añadir o no la configuración regional en la ruta según la configuración. Utiliza `useRouter` de `next/navigation` para funciones de navegación como `push` y `refresh`.
- **`pathWithoutLocale`**: Una propiedad calculada que devuelve la ruta sin la configuración regional. Es útil para comparar URLs. Por ejemplo, si la configuración regional actual es `fr`, y la URL es `fr/my_path`, la ruta sin configuración regional es `/my_path`. Utiliza `usePathname` de `next/navigation` para obtener la ruta actual.

## Conclusión

El hook `useLocale` de `next-intlayer` es una herramienta crucial para gestionar configuraciones regionales en aplicaciones Next.js. Ofrece un enfoque integrado para adaptar tu aplicación a múltiples configuraciones regionales manejando de manera fluida el almacenamiento de la configuración regional, la gestión del estado y las modificaciones de la URL.
