---
createdAt: 2026-07-30
updatedAt: 2026-07-30
title: Conteúdo Baseado em Seleção
description: Aprenda como usar o conteúdo baseado em seleção no Intlayer para exibir dinamicamente conteúdo com base em um valor de string arbitrário. Siga esta documentação para implementar eficientemente conteúdos do tipo switch no seu projeto.
keywords:
  - Conteúdo Baseado em Seleção
  - Select Content
  - Conteúdo Switch
  - ICU select
  - Renderização Dinâmica
  - Documentação
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - select
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "Introduzido o conteúdo baseado em seleção"
author: aymericzip
---

# Conteúdo Baseado em Seleção / Select no Intlayer

## Como o Select Funciona

No Intlayer, o conteúdo baseado em seleção é obtido através da função `select`, que mapeia valores de string arbitrários ao seu conteúdo correspondente. É o equivalente a uma mensagem `{value, select, …}` do ICU, ou a uma declaração `switch` no código da sua aplicação.

Use o `select` quando o discriminante for uma string de formato livre: um status, um plano, uma plataforma, um cargo. Para os demais discriminantes, o Intlayer fornece nós dedicados:

| Discriminante         | Nó         |
| --------------------- | ---------- |
| Uma quantidade        | `enu()`    |
| Um booleano           | `cond()`   |
| Um gênero             | `gender()` |
| Qualquer outra string | `select()` |

## Configurando Conteúdo Baseado em Seleção

Para configurar o conteúdo baseado em seleção no seu projeto Intlayer, crie um módulo de conteúdo que inclua as suas definições de seleção. Abaixo estão exemplos em vários formatos.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { select, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: "This post is a draft",
      published: "This post is live",
      scheduled: "This post is scheduled",
      fallback: "Unknown status", // Opcional
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "publishStatus": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "scheduled": "This post is scheduled",
        "fallback": "Unknown status", // Opcional
      },
    },
  },
}
```

> Se um `fallback` não for declarado, a última chave declarada será considerada o fallback quando o valor fornecido não corresponder a nenhum caso declarado: o mesmo contrato de `cond()` e `gender()`.

### Segurança de Tipo

O argumento aceito é inferido dos casos declarados:

- Sem um `fallback`, apenas os casos declarados são aceitos: um erro de digitação é um erro de tipo.
- Com um `fallback`, qualquer string é aceita (o fallback cobre os valores não correspondentes) enquanto os casos declarados continuam fornecendo o preenchimento automático (autocompletion).

## Por Que Não um Objeto Simples?

É tentador declarar um objeto simples e acessá-lo usando o valor em tempo de execução:

```tsx
// ❌ Não faça isso
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus[publishType]}</p>;
```

O compilador do Intlayer analisa o seu código fonte para descartar o conteúdo não utilizado e minificar as chaves restantes. Um acesso computado dinâmico (`obj[expr]`) não pode ser resolvido estaticamente, fazendo com que todo o ramo seja marcado como opaco: ele é mantido no pacote (bundle) e as suas chaves não são minificadas.

Com `select()`, a resolução do caso ocorre dentro de uma chamada de função e não como um acesso de propriedade. O compilador enxerga um único acesso de campo estático e otimiza o nó exatamente como faz com `enu()`, `cond()` ou `gender()`:

```tsx
// ✅ Faça isso
const { publishStatus } = useIntlayer("my_key");

return <p>{publishStatus(publishType)}</p>;
```

## Usando Conteúdo Baseado em Seleção

<Tabs group="framework">
  <Tab label="React" value="react">

Para utilizar o conteúdo baseado em seleção num componente React, importe e use o hook `useIntlayer` a partir do pacote `react-intlayer`. Este hook recupera o conteúdo da chave especificada e permite que você passe um valor para selecionar a saída apropriada.

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* Saída: This post is a draft */
          publishStatus("draft")
        }
      </p>
      <p>
        {
          /* Saída: This post is live */
          publishStatus("published")
        }
      </p>
      <p>
        {
          /* Saída: Unknown status */
          publishStatus("Archived")
        }
      </p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Next.js" value="nextjs">

Para usar o conteúdo baseado em seleção em componentes clientes do Next.js, recupere-o através do hook `useIntlayer`. Aqui está um exemplo:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Vue" value="vue">

Para usar o conteúdo baseado em seleção nos componentes Vue, recupere-o através do hook `useIntlayer`. Aqui está um exemplo:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const { publishStatus } = useIntlayer("my_key");
</script>

<template>
  <div>
    <p>{{ publishStatus("draft") }}</p>
    <p>{{ publishStatus("published") }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Para usar o conteúdo baseado em seleção nos componentes Svelte, recupere-o através do hook `useIntlayer`. A store é acessada com `$`. Aqui está um exemplo:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my_key");
</script>

<div>
  <p>{$content.publishStatus("draft")}</p>
  <p>{$content.publishStatus("published")}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

Para usar o conteúdo baseado em seleção em componentes Preact, recupere-o através do hook `useIntlayer`. Aqui está um exemplo:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const PostStatus: FC = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Solid" value="solid">

Para usar o conteúdo baseado em seleção em componentes SolidJS, recupere-o através do hook `useIntlayer`. Aqui está um exemplo:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const PostStatus: Component = () => {
  const { publishStatus } = useIntlayer("my_key");

  return (
    <div>
      <p>{publishStatus("draft")}</p>
      <p>{publishStatus("published")}</p>
    </div>
  );
};

export default PostStatus;
```

  </Tab>
  <Tab label="Angular" value="angular">

Para usar o conteúdo baseado em seleção em componentes Angular, recupere-o através do hook `useIntlayer`. Aqui está um exemplo:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-post-status",
  template: `
    <div>
      <p>{{ content().publishStatus("draft") }}</p>
      <p>{{ content().publishStatus("published") }}</p>
    </div>
  `,
})
export class PostStatusComponent {
  content = useIntlayer("my_key");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

Para usar o conteúdo baseado em seleção com `vanilla-intlayer`, recupere-o através do hook `useIntlayer`. Aqui está um exemplo:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("my_key").onChange((newContent) => {
  document.getElementById("status")!.textContent =
    newContent.publishStatus("draft");
});

// Renderização inicial
document.getElementById("status")!.textContent = content.publishStatus("draft");
```

  </Tab>
</Tabs>

## Combinando Select com Outros Nós

Cada caso contém um nó de conteúdo completo, de forma que o `select` pode ser composto com `t()`, `insert()`, `md()` e outros:

```typescript fileName="**/*.content.ts" codeFormat="typescript"
import { insert, select, t, type Dictionary } from "intlayer";

const myPostContent = {
  key: "my_key",
  content: {
    publishStatus: select({
      draft: insert(
        t({
          en: "{{name}} saved a draft",
          fr: "{{name}} a enregistré un brouillon",
          pt: "{{name}} salvou um rascunho",
        })
      ),
      published: insert(
        t({
          en: "{{name}} published the post",
          fr: "{{name}} a publié l’article",
          pt: "{{name}} publicou o post",
        })
      ),
      fallback: insert(
        t({
          en: "{{name}} updated the post",
          fr: "{{name}} a mis à jour l’article",
          pt: "{{name}} atualizou o post",
        })
      ),
    }),
  },
} satisfies Dictionary;

export default myPostContent;
```

```tsx
publishStatus("draft")({ name: "Alice" }); // Saída: Alice salvou um rascunho
```

## Migrando do ICU `select`

Mensagens que usam o argumento ICU `select` são importadas como nós `select`:

```text
{publishType, select, draft {draft} published {published} other {Unknown}}
```

torna-se

```typescript
select(
  {
    draft: "draft",
    published: "published",
    fallback: "Unknown",
  },
  "publishType"
);
```

O caso ICU `other` é renomeado para `fallback`, que é o nome canônico do Intlayer para o caso "pega-tudo" (catch-all). O segundo argumento registra o nome da variável ICU para que a mensagem seja revertida exatamente à mesma string do ICU no momento da exportação.

> Um `select` do ICU em que os casos são valores de gênero (`male` / `female` / `other`) é, ao invés disso, importado como um nó [`gender`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md).

## Recursos Adicionais

Para informações mais detalhadas sobre configuração e uso, consulte os seguintes recursos:

- [Documentação CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- [Documentação React do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)
- [Documentação Next do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)

Esses recursos oferecem mais detalhes sobre como configurar e usar o Intlayer em vários ambientes e frameworks.
