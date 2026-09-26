---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentación del hook useLocale | astro-intlayer
description: Descubre cómo usar el hook useLocale en aplicaciones Astro para acceder y administrar el locale actual.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internacionalización
  - documentación
slugs:
  - doc
  - packages
  - astro-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc inicial"
author: aymericzip
---

# Documentación del hook useLocale

El hook `useLocale` de `astro-intlayer` proporciona acceso al locale de solicitud actual, al locale predeterminado configurado y a todos los locales disponibles en aplicaciones Astro.

Se comporta de manera consistente en el frontmatter de `.astro` renderizado en el servidor y en los bloques `<script>` del lado del cliente.

## Uso

### En el Frontmatter de componentes (Renderizado en Servidor)

```astro fileName="src/layouts/Layout.astro"
---
import { useLocale } from "astro-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

const { locale, defaultLocale, availableLocales } = useLocale();
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <title>Astro + Intlayer</title>
  </head>
  <body>
    <header>
      <span>Actual: {locale}</span>
      <span>Predeterminado: {defaultLocale}</span>
      <nav>
        <ul>
          {availableLocales.map((localeItem) => (
            <li key={localeItem} className="p-1">
              <a
                href={getLocalizedUrl(pathWithoutLocale, localeItem)}
                aria-current={localeItem === locale ? "page" : undefined}
              >
                {localeItem.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <slot />
  </body>
</html>
```

### En `<script>` del cliente (Interactivo)

```astro fileName="src/components/LocaleSwitcher.astro"
---
import { useLocale } from "astro-intlayer";

const { locale, availableLocales } = useLocale();
---

<select id="locale-select">
  {availableLocales.map((loc) => (
    <option value={loc} selected={loc === locale}>
      {loc.toUpperCase()}
    </option>
  ))}
</select>

<script>
  import { useLocale, setLocaleInStorage } from "astro-intlayer";

  const { setLocale } = useLocale();

  document.getElementById("locale-select")?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
  });
</script>
```

## Valores de retorno

El hook devuelve un objeto de tipo `UseLocaleResult`:

| Propiedad          | Tipo                                   | Descripción                                                                           |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`                      | El locale activo.                                                                     |
| `defaultLocale`    | `DeclaredLocales`                      | El locale de respaldo predeterminado configurado en `intlayer.config.ts`.             |
| `availableLocales` | `DeclaredLocales[]`                    | Matriz de todos los locales admitidos configurados para el proyecto.                  |
| `setLocale`        | `(locale: LocalesValues) => void`      | Función para actualizar el locale. (Interactiva en `<script>`, advierte durante SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Se suscribe a los cambios de locale en el lado del cliente.                           |

## Comportamiento Servidor vs Cliente

- **Durante SSR / Renderizado en Servidor**: Una solicitud se procesa una vez con parámetros fijos. Llamar a `setLocale()` durante un renderizado de servidor no tiene efecto y emite una advertencia; el cambio de locale debe realizarse en el cliente o navegando a la URL del locale de destino.
- **En scripts de cliente**: `setLocale` actualiza el store del cliente y actualiza las cookies persistidas o el almacenamiento local de acuerdo con tu configuración de Intlayer.

## Documentación relacionada

- [Integración `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/astro-intlayer/useDictionary.md)
