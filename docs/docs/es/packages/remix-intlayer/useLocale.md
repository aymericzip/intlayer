---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentación del hook useLocale | remix-intlayer
description: Vea cómo utilizar el hook useLocale en aplicaciones Remix 3 para obtener la locale de la solicitud actual, la locale predeterminada y las locales disponibles.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internacionalización
  - Documentación
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentación del hook useLocale

El hook `useLocale` de `remix-intlayer` proporciona acceso a la locale de la solicitud HTTP que se está procesando actualmente, junto con la locale predeterminada y las locales disponibles configuradas en el proyecto.

## Uso

En un componente de Remix (por ejemplo, un selector de idioma):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

En un controlador de ruta:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## Valores de retorno

El hook devuelve un objeto de tipo `UseLocaleResult`:

| Propiedad          | Tipo                | Descripción                                                                   |
| ------------------ | ------------------- | ----------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | La locale resuelta para la solicitud actual.                                  |
| `defaultLocale`    | `DeclaredLocales`   | La locale de respaldo predeterminada configurada en `intlayer.config.ts`.     |
| `availableLocales` | `DeclaredLocales[]` | Matriz de todas las locales disponibles configuradas en `intlayer.config.ts`. |

## Descripción

1. **Resolución con alcance de solicitud**: En una solicitud activa procesada por el middleware `intlayer()`, `useLocale` lee la locale resuelta desde el almacenamiento de solicitudes.
2. **Respaldo limpio**: Si se llama fuera de un contexto de solicitud (como durante scripts de inicialización o pruebas unitarias), recurre por defecto a la `defaultLocale` configurada.

## Documentación relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/packages/remix-intlayer/useDictionary.md)
