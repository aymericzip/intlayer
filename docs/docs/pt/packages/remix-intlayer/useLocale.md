---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentação do Hook useLocale | remix-intlayer
description: Veja como usar o hook useLocale em aplicações Remix 3 para obter o locale da requisição atual, locale padrão e locales disponíveis.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
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

# Documentação do Hook useLocale

O hook `useLocale` de `remix-intlayer` fornece acesso ao locale da requisição HTTP atualmente processada, juntamente com o locale padrão e os locales disponíveis configurados no projeto.

## Utilização

Em um componente Remix (por exemplo, um seletor de idioma):

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

Em um manipulador de rota:

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

## Valores de Retorno

O hook retorna um objeto do tipo `UseLocaleResult`:

| Propriedade        | Tipo                | Descrição                                                                   |
| ------------------ | ------------------- | --------------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | O locale resolvido para a requisição atual.                                 |
| `defaultLocale`    | `DeclaredLocales`   | O locale padrão de fallback configurado em `intlayer.config.ts`.            |
| `availableLocales` | `DeclaredLocales[]` | Array de todos os locales disponíveis configurados em `intlayer.config.ts`. |

## Descrição

1. **Resolução no Escopo da Requisição**: Em uma requisição ativa gerenciada pelo middleware `intlayer()`, o `useLocale` lê o locale resolvido a partir do armazenamento da requisição.
2. **Fallback Gracioso**: Se chamado fora do contexto de uma requisição (como durante scripts de inicialização ou testes unitários), ele retorna por padrão o `defaultLocale` configurado.

## Documentação Relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useDictionary.md)
