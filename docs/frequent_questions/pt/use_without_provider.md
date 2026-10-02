---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "Posso usar o Intlayer sem um provider global?"
description: "Ler o conteúdo do Intlayer sem montar um provider, como o locale é resolvido no servidor e no navegador, e a diferença de performance em relação a um provider."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - performance
  - hidratação
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Posso usar o Intlayer sem um provider global?

Sim. `getIntlayer` e `getDictionary` são funções simples que não precisam de nenhum provider, e `useIntlayer` também funciona fora de um.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Nenhum locale passado
```

## Qual locale é usado?

Um locale passado explicitamente sempre tem prioridade. Caso contrário, o locale é resolvido nesta ordem:

1. **O locale da requisição atual**, no servidor, quando uma integração do Intlayer a trata: os middlewares de `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` e `astro-intlayer`, ou o `IntlayerProvider` nos React Server Components.
2. **O locale armazenado no navegador** (cookie, `localStorage`, `sessionStorage`), aquele que o seu seletor de idioma persiste.
3. **O `defaultLocale`** da sua configuração.

Cada requisição é resolvida a partir dos seus próprios cookies e headers, e mantida em um escopo próprio da requisição. Usuários simultâneos com locales diferentes nunca compartilham o locale.

A mesma resolução se aplica a `getDictionary`, às chamadas reescritas pela [otimização do build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md), e a `useIntlayer` e `useDictionaryDynamic` renderizados fora de um provider.

- [otimização do build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)

Os [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md) (`number`, `date`, `list`…) e seus hooks (`useNumber`, `useDate`, `useList`…) seguem a mesma ordem quando nenhuma `locale` é passada.

- [formatadores](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md)

### Server Components do Next.js

No Next.js, o locale da requisição só pode ser lido de forma assíncrona, por `headers()` e `cookies()`. Use [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayerAsync.md), que o aguarda da mesma forma que `getLocale()` de `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale da requisição

  return { title };
};
```

Ler os headers faz a rota passar para renderização dinâmica. Quando o `IntlayerProvider` já fornece o locale, os headers não são lidos e a rota continua estática.

## Performance: com ou sem provider

O conteúdo é o mesmo. A diferença está na reatividade e no custo de renderização.

|                          | Com um provider                                                    | Sem provider                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Troca de locale          | Os componentes são renderizados novamente no lugar, sem recarregar | Nada é renderizado novamente; o novo locale aparece na próxima chamada (navegação, recarregamento)                                   |
| Custo de uma leitura     | Leitura do contexto e inscrição no locale                          | Uma chamada de função memoizada, mesmo objeto para a mesma `key + locale`                                                            |
| Custo de uma troca       | Nova renderização de cada consumidor                               | Nenhum                                                                                                                               |
| Renderização no servidor | O servidor e o navegador renderizam o mesmo locale                 | Fora de uma integração de requisição, o servidor renderiza o `defaultLocale` e o navegador o armazenado: possível hydration mismatch |
| Bundle                   | O código do provider                                               | Cerca de 100 bytes (gzip) para ler o locale armazenado, em cache até a próxima troca                                                 |

Mantenha o provider em apps interativos que trocam de locale no lugar ou renderizam no servidor. Dispense-o em backends, scripts, páginas estáticas cujo locale vem da URL (passe-o explicitamente) ou código que lê o conteúdo uma única vez.

Veja [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md) para mais detalhes.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md)
