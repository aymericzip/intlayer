# Integración con React: Documentación del Hook `useLocale`

Esta sección proporciona detalles completos sobre el hook `useLocale` de la biblioteca `react-intlayer`, diseñado para manejar la configuración de idiomas en aplicaciones React.

## Importar `useLocale` en React

Para integrar el hook `useLocale` en tu aplicación React, impórtalo desde el paquete correspondiente:

```javascript
import { useLocale } from "react-intlayer"; // Usado en componentes React para la gestión de idiomas
```

## Descripción general

El hook `useLocale` ofrece una forma sencilla de acceder y manipular la configuración de idioma dentro de los componentes React. Proporciona acceso al idioma actual, al idioma predeterminado, a todos los idiomas disponibles y funciones para actualizar estos ajustes.

## Uso

A continuación, se muestra cómo usar el hook `useLocale` en un componente React:

```jsx
import React from "react";
import { useLocale } from "react-intlayer";

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

Cuando se invoca el hook `useLocale`, devuelve un objeto con las siguientes propiedades:

- **`locale`**: El idioma actual definido en el contexto de React.
- **`defaultLocale`**: El idioma principal definido en la configuración.
- **`availableLocales`**: Una lista de todos los idiomas disponibles definidos en la configuración.
- **`setLocale`**: Una función para actualizar el idioma actual dentro del contexto de la aplicación.

## Ejemplo

Este ejemplo muestra un componente que utiliza el hook `useLocale` para renderizar un selector de idiomas, permitiendo a los usuarios cambiar dinámicamente el idioma de la aplicación:

```jsx
import { useLocale } from "react-intlayer";

function LocaleSelector() {
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
}

export default LocaleSelector;
```

## Conclusión

El hook `useLocale` de `react-intlayer` es una herramienta esencial para gestionar la configuración de idiomas en tus aplicaciones React, proporcionando la funcionalidad necesaria para adaptar eficazmente tu aplicación a diferentes audiencias internacionales.
