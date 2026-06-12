---
createdAt: 2026-05-04
updatedAt: 2026-05-04
title: Plural
description: Descubra como declarar e usar conteúdo plural sensível à localidade (baseado em CLDR) em seu site multilíngue. Siga as etapas nesta documentação on-line para configurar seu projeto em poucos minutos.
keywords:
  - Plural
  - Pluralização
  - CLDR
  - Internacionalização
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - plural
history:
  - version: 8.8.0
    date: 2026-05-04
    changes: "Init history"
author: aymericzip
---

# Conteúdo Plural / Plural no Intlayer

## Como o Plural Funciona

No Intlayer, o conteúdo plural é alcançado através da função `plural`, que mapeia as categorias plurais do CLDR, `zero`, `one`, `two`, `few`, `many`, `other`, ao seu conteúdo correspondente. A categoria correta é selecionada automaticamente com base na localidade ativa e em um valor de contagem, usando a API [`Intl.PluralRules`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) integrada à plataforma.

Ao contrário do [`enu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration.md), que seleciona o conteúdo com base em intervalos numéricos definidos por você mesmo, o `plural` delega a seleção às regras do CLDR. É isso que o torna escalável para idiomas com regras complexas de pluralização, como russo, polonês, árabe ou galês, sem ter que escrever manualmente a lógica de módulo.

## Quando usar `plural` vs `enu`

| Caso de uso                                                                         | Auxiliar |
| ----------------------------------------------------------------------------------- | -------- |
| Formas plurais gramaticais sensíveis à localidade (uma maçã / duas maçãs / 5 maçãs) | `plural` |
| Intervalos numéricos personalizados (`<5`, `>=10`) ou buckets não-CLDR              | `enu`    |

Se você visa apenas o inglês ou o português (que têm apenas `one` / `other`), ambos funcionam. Para qualquer idioma com distinções de `few` / `many` / `two`, prefira o `plural`.

## Configurando Conteúdo Plural

Para configurar o conteúdo plural no seu projeto Intlayer, crie um módulo de conteúdo que use o auxiliar `plural`. A categoria `other` é obrigatória e é usada como fallback quando uma localidade não define uma categoria mais específica.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      pt: plural({
        one: "{{count}} vaga",
        other: "{{count}} vagas",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "total_openings",
  "content": {
    "totalOpenings": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} opening",
            "other": "{{count}} openings"
          }
        },
        "pt": {
          "nodeType": "plural",
          "plural": {
            "one": "{{count}} vaga",
            "other": "{{count}} vagas"
          }
        }
      }
    }
  }
}
```

> As categorias suportadas são `zero`, `one`, `two`, `few`, `many`, `other`. Você só precisa declarar as categorias que seu idioma de destino usa, o Intlayer volta para `other` quando nenhuma categoria específica corresponde.
>
> O marcador `{{count}}` é substituído automaticamente pela contagem que você passa em tempo de execução. Você também pode incluir outros marcadores (veja [Marcadores personalizados](#custom-placeholders) abaixo).

## Usando Conteúdo Plural com React Intlayer

Para usar conteúdo plural dentro de um componente React, recupere-o através do hook `useIntlayer` e chame-o com uma contagem. A localidade ativa e a contagem são combinadas para escolher a categoria CLDR correspondente.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const OpeningsComponent: FC<{ count: number }> = ({ count }) => {
  const { totalOpenings } = useIntlayer("total_openings");

  return (
    <div>
      {/* Em inglês:                                  */}
      {/*  count=0  → "0 openings"   (other)           */}
      {/*  count=1  → "1 opening"    (one)             */}
      {/*  count=2  → "2 openings"   (other)           */}
      {/*  count=21 → "21 openings"  (other)           */}
      <p>{totalOpenings(count)}</p>
    </div>
  );
};

export default OpeningsComponent;
```

Você pode chamar a função retornada de duas maneiras equivalentes:

```tsx
totalOpenings(21); // atalho: apenas contagem
totalOpenings({ count: 21 }); // forma explícita
```

## Marcadores personalizados

Strings plurais podem incluir marcadores diferentes de `{{count}}`. Passe-os na forma de objeto junto com `count`:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { plural, type Dictionary } from "intlayer";

const inboxContent = {
  key: "inbox_summary",
  content: {
    summary: plural({
      one: "{{name}}, você tem {{count}} nova mensagem",
      other: "{{name}}, você tem {{count}} novas mensagens",
    }),
  },
} satisfies Dictionary;

export default inboxContent;
```

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
const { summary } = useIntlayer("inbox_summary");

summary({ count: 1, name: "Alice" });
// → "Alice, você tem 1 nova mensagem"

summary({ count: 7, name: "Alice" });
// → "Alice, você tem 7 novas mensagens"
```

## Categorias CLDR em um relance

Diferentes idiomas usam diferentes subconjuntos das categorias CLDR. Alguns casos comuns:

| Idioma           | Categorias usadas                            |
| ---------------- | -------------------------------------------- |
| Inglês (`en`)    | `one`, `other`                               |
| Francês (`fr`)   | `one`, `many`, `other`                       |
| Russo (`ru`)     | `one`, `few`, `many`, `other`                |
| Polonês (`pl`)   | `one`, `few`, `many`, `other`                |
| Árabe (`ar`)     | `zero`, `one`, `two`, `few`, `many`, `other` |
| Japonês / Chinês | apenas `other`                               |

Você não precisa memorizar isso, declare as categorias para as quais você tem traduções, e o Intlayer voltará para `other` quando necessário.

## Limitação

Em comparação com outros nós, o `plural` ainda não pode ser aninhado com nós filhos.

Exemplo:

Válido:

```ts
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      fr: plural({
        one: "{{count}} offre",
        other: "{{count}} offres",
      }),
    }),
```

Inválido:

```ts
totalOpenings: plural({
  one: t({
    en: "{{count}} opening",
    fr: "{{count}} offre",
  }),
  other: t({
    en: "{{count}} openings",
    fr: "{{count}} offres",
  }),
}),
```

## Recursos Adicionais

Para informações mais detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação de Enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration.md)
- [Documentação de Inserção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md)
- [Documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- [Documentação do React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)
- [Documentação do Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)

Estes recursos oferecem mais insights sobre a configuração e o uso do Intlayer em vários ambientes e frameworks.
