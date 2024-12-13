# Documentación de la integración Next.js: Hook `useLocale` para `next-intlayer`

Esta sección ofrece documentación detallada sobre el hook `useLocale`, diseñado para aplicaciones Next.js dentro de la biblioteca `next-intlayer`. Está pensado para manejar cambios de idioma y enrutamiento de forma eficiente.

## Importación de `useLocale` en Next.js

Para utilizar el hook `useLocale` en tu aplicación Next.js, impórtalo de la siguiente manera:

```javascript
import { useLocale } from "next-intlayer"; // Usado para gestionar idiomas y enrutamiento en Next.js
```

## Uso

Aquí tienes un ejemplo de cómo implementar el hook `useLocale` en un componente Next.js:

```jsx
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Idioma actual: {locale}</h1>
      <p>Idioma predeterminado: {defaultLocale}</p>
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

## Parámetros y valores devueltos

Al invocar el hook `useLocale`, devuelve un objeto con las siguientes propiedades:

- **`locale`**: El idioma actual definido en el contexto de React.
- **`defaultLocale`**: El idioma principal definido en la configuración.
- **`availableLocales`**: Una lista de todos los idiomas disponibles definidos en la configuración.
- **`setLocale`**: Una función para cambiar el idioma de la aplicación y actualizar la URL en consecuencia. Se encarga de las reglas de prefijos, ya sea agregando o no el idioma en la ruta según la configuración. Utiliza `useRouter` de `next/navigation` para funciones de navegación como `push` y `refresh`.
- **`pathWithoutLocale`**: Una propiedad calculada que devuelve la ruta sin el idioma. Es útil para comparar URLs. Por ejemplo, si el idioma actual es `es` y la URL es `es/mi_ruta`, la ruta sin idioma será `/mi_ruta`. Utiliza `usePathname` de `next/navigation` para obtener la ruta actual.

## Conclusión

El hook `useLocale` de `next-intlayer` es una herramienta esencial para gestionar idiomas en aplicaciones Next.js. Ofrece un enfoque integrado para adaptar tu aplicación a múltiples idiomas, manejando el almacenamiento del idioma, la gestión de estados y las modificaciones de URL de manera transparente.
