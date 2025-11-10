---
createdAt: 2024-03-07
updatedAt: 2025-09-30
title: Tornar um componente multilíngue (biblioteca i18n) em React e Next.js
description: Aprenda como declarar e recuperar conteúdo localizado para construir um componente multilíngue em React ou Next.js com Intlayer.
keywords:
  - i18n
  - componente
  - react
  - multilíngue
  - next.js
  - intlayer
slugs:
  - doc
  - component
  - i18n
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
---

# Como tornar um componente multilíngue (i18n) com Intlayer

Este guia mostra os passos mínimos para tornar um componente de interface multilíngue em duas configurações comuns:

- React (Vite/SPA)
- Next.js (App Router)

Você primeiro declarará seu conteúdo, depois o recuperará no seu componente.

## 1) Declare seu conteúdo (compartilhado para React e Next.js)

Crie um arquivo de declaração de conteúdo próximo ao seu componente. Isso mantém as traduções próximas de onde são usadas e permite segurança de tipos.

```ts fileName="component.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    description: t({
      en: "A multilingual React component",
      fr: "Un composant React multilingue",
      es: "Un componente React multilingüe",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

JSON também é suportado se você preferir arquivos de configuração.

```json fileName="component.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": { "en": "Hello", "fr": "Bonjour", "es": "Hola" }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "A multilingual React component",
        "fr": "Un composant React multilingue",
        "es": "Un componente React multilingüe"
      }
    }
  }
}
```

## 2) Recupere seu conteúdo

### Caso A — Aplicação React (Vite/SPA)

Abordagem padrão: use `useIntlayer` para recuperar pelo key. Isso mantém os componentes enxutos e tipados.

```tsx fileName="ComponentExample.tsx"
import { useIntlayer } from "react-intlayer";

export function ComponentExample() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Renderização do lado servidor ou fora do provider: use `react-intlayer/server` e passe um `locale` explícito quando necessário.

```tsx fileName="ServerRenderedExample.tsx"
import { useIntlayer } from "react-intlayer/server";

export function ServerRenderedExample({ locale }: { locale: string }) {
  const content = useIntlayer("component-example", locale);
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

Alternativa: `useDictionary` pode ler um objeto declarado inteiro se você preferir colocar a estrutura no local da chamada.

```tsx fileName="ComponentWithDictionary.tsx"
import { useDictionary } from "react.intlayer";
import componentContent from "./component.content";

export function ComponentWithDictionary() {
  const { title, description } = useDictionary(componentContent);
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Caso B — Next.js (App Router)

Prefira componentes de servidor para segurança dos dados e desempenho. Use `useIntlayer` de `next-intlayer/server` em arquivos de servidor, e `useIntlayer` de `next-intlayer` em componentes cliente.

```tsx fileName="app/[locale]/example/ServerComponent.tsx"
import { useIntlayer } from "next-intlayer/server";

export default function ServerComponent() {
  const content = useIntlayer("component-example");
  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </>
  );
}
```

```tsx fileName="app/[locale]/example/ClientComponent.tsx"
"use client";

import { useIntlayer } from "next-intlayer";

export function ClientComponent() {
  const content = useIntlayer("component-example");
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
}
```

Dica: Para metadados de página e SEO, você também pode buscar conteúdo usando `getIntlayer` e gerar URLs multilíngues via `getMultilingualUrls`.

## Por que a abordagem de componentes do Intlayer é a melhor

- **Colocação**: Declarações de conteúdo ficam próximas aos componentes, reduzindo desvios e melhorando o reuso em sistemas de design.
- **Segurança de tipos**: Chaves e estruturas são fortemente tipadas; traduções ausentes aparecem em tempo de build, e não em tempo de execução.
- **Server-first**: Funciona nativamente em componentes de servidor para melhor segurança e desempenho; hooks do cliente permanecem ergonômicos.
- **Tree-shaking**: Apenas o conteúdo usado pelo componente é incluído no pacote, mantendo os tamanhos pequenos em grandes aplicações.
- **DX & ferramentas**: Middleware embutido, auxiliares de SEO e traduções opcionais via Editor Visual/IA agilizam o trabalho diário.

Veja as comparações e padrões no resumo focado em Next.js: https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

## Guias e referências relacionadas

- Configuração React (Vite): https://intlayer.org/doc/environment/vite-and-react
- React Router v7: https://intlayer.org/doc/environment/vite-and-react/react-router-v7
- Início TanStack: https://intlayer.org/doc/environment/vite-and-react/tanstack-start
- Configuração do Next.js: https://intlayer.org/doc/environment/nextjs
- Por que Intlayer vs. next-intl vs. next-i18next - https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer

Estas páginas incluem configuração completa, provedores, roteamento e auxiliares de SEO.
