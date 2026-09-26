---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentação do hook useLocale | astro-intlayer
description: Veja como usar o hook useLocale em aplicações Astro para acessar e gerenciar o locale atual.
keywords:
  - useLocale
  - locale
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - internacionalização
  - documentação
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

# Documentação do hook useLocale

O hook `useLocale` de `astro-intlayer` fornece acesso ao locale da requisição atual, ao locale padrão configurado e a todos os locales disponíveis em aplicações Astro.

Ele se comporta de maneira consistente no frontmatter `.astro` renderizado no servidor e em blocos `<script>` do lado do cliente.

## Utilização

### No Frontmatter de componentes (Renderizado no Servidor)

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
      <span>Atual: {locale}</span>
      <span>Padrão: {defaultLocale}</span>
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

### Em `<script>` do cliente (Interativo)

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

O hook retorna um objeto do tipo `UseLocaleResult`:

| Propriedade        | Tipo                                   | Descrição                                                                      |
| ------------------ | -------------------------------------- | ------------------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`                      | O locale ativo.                                                                |
| `defaultLocale`    | `DeclaredLocales`                      | O locale de fallback padrão configurado em `intlayer.config.ts`.               |
| `availableLocales` | `DeclaredLocales[]`                    | Array de todos os locales suportados configurados para o projeto.              |
| `setLocale`        | `(locale: LocalesValues) => void`      | Função para atualizar o locale. (Interativa no `<script>`, avisa durante SSR). |
| `subscribe`        | `(callback: () => void) => () => void` | Inscreve-se nas alterações de locale no lado do cliente.                       |

## Comportamento Servidor vs Cliente

- **Durante SSR / Renderização no Servidor**: Uma requisição é renderizada uma vez com parâmetros fixos. Chamar `setLocale()` durante a renderização no servidor não tem efeito e emite um aviso; a alteração de locale deve ser feita no cliente ou navegando para a URL do locale desejado.
- **Em scripts do cliente**: `setLocale` atualiza a store do cliente e atualiza cookies persistidos ou o armazenamento local de acordo com sua configuração do Intlayer.

## Documentação relacionada

- [Integração `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useIntlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useDictionary.md)
