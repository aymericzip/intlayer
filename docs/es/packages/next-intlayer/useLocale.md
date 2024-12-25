# Integración de Next.js: Documentación del Hook `useLocale` para `next-intlayer`

Esta sección ofrece documentación detallada sobre el hook `useLocale` adaptado para aplicaciones Next.js dentro de la biblioteca `next-intlayer`. Está diseñado para manejar cambios de locales y enrutamiento de manera eficiente.

## Importando `useLocale` en Next.js

Para utilizar el hook `useLocale` en tu aplicación Next.js, impórtalo como se muestra a continuación:

```javascript
import { useLocale } from "next-intlayer"; // Usado para gestionar locales y enrutamiento en Next.js
```

## Uso

Aquí te mostramos cómo implementar el hook `useLocale` dentro de un componente de Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

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
```

## Parámetros y Valores de Retorno

Cuando invocas el hook `useLocale`, devuelve un objeto que contiene las siguientes propiedades:

- **`locale`**: El locale actual configurado en el contexto de React.
- **`defaultLocale`**: El locale principal definido en la configuración.
- **`availableLocales`**: Una lista de todos los locales disponibles según lo definido en la configuración.
- **`setLocale`**: Una función para cambiar el locale de la aplicación y actualizar la URL en consecuencia. Se encarga de las reglas de prefijo, ya sea agregar el locale a la ruta o no, según la configuración. Utiliza `useRouter` de `next/navigation` para funciones de navegación como `push` y `refresh`.
- **`pathWithoutLocale`**: Una propiedad calculada que devuelve la ruta sin el locale. Es útil para comparar URLs. Por ejemplo, si el locale actual es `fr`, y la url `fr/my_path`, la ruta sin locale es `/my_path`. Utiliza `usePathname` de `next/navigation` para obtener la ruta actual.

## Conclusión

El hook `useLocale` de `next-intlayer` es una herramienta crucial para gestionar locales en aplicaciones Next.js. Ofrece un enfoque integrado para adaptar tu aplicación a múltiples locales manejando el almacenamiento de locales, la gestión del estado y las modificaciones de URL de manera fluida.
