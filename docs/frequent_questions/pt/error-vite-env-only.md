---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` e Intlayer – falso positivo: erro `node:fs` negado
description: Por que o vite-env-only reporta uma importação `node:fs` negada com Intlayer + React-Router + Vite e o que fazer.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only nega `node:fs` com Intlayer

Se você usou o plugin **vite-env-only** (conforme mencionado em sugestões antigas do React-Router v7) e vir:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…mesmo que não haja **`node:fs` no bundle do cliente**, isto é um **falso positivo**.

## O que causa

`vite-env-only` executa uma verificação baseada em Babel **cedo na resolução do grafo do Vite**, _antes de_:

- aliasing (incluindo os mapeamentos browser vs node do Intlayer),
- eliminação de código morto,
- resolução SSR vs client,
- módulos virtuais como os do React-Router.

Os pacotes do Intlayer contêm código que pode funcionar tanto no Node como no browser. Numa fase _intermédia_, um builtin do Node como `node:fs` pode aparecer no grafo **antes** do Vite o remover do build do cliente. O `vite-env-only` vê isso e gera um erro imediatamente, mesmo que o bundle final não o contenha.

## React-Router e Módulos de Servidor

Na documentação do React-Router sobre as **convenções de módulos de servidor**
(https://reactrouter.com/api/framework-conventions/server-modules), a equipe **sugere explicitamente usar `vite-env-only`** para evitar que importações exclusivas do servidor vazem para o bundle do cliente.

Porém, essas convenções dependem do aliasing do Vite, das conditional exports e do tree-shaking para remover o código exclusivo do servidor. Embora o aliasing e as conditional exports já estejam aplicados, alguns utilitários baseados em Node ainda estão presentes em pacotes como `@intlayer/core` nessa fase (mesmo que nunca sejam importados pelo cliente). Como o tree-shaking ainda não foi executado, essas funções ainda são analisadas pelo Babel, e o `vite-env-only` detecta suas importações `node:` e gera um falso positivo — mesmo que elas sejam corretamente purgadas do bundle final do cliente.

## Como corrigir / contornar

### Recomendado: Remover `vite-env-only`

Simplesmente remova o plugin. Em muitos casos você não precisa dele — o Vite já lida com importações cliente vs servidor através da sua própria resolução.

Isto corrige o erro falso de `node:fs` sem alterações no Intlayer.

### Validar o build final em vez disso

Se ainda quiser garantir que não há built-ins do Node no cliente, faça isso **após o build**, por exemplo:

```bash
pnpm build
grep -R "node:" dist/
```

Se não houver resultados, os bundles do cliente estão limpos.

## Resumo

- `vite-env-only` pode gerar erro sobre `node:fs` porque verifica cedo demais.
- O Vite + Intlayer + as convenções de server modules do React-Router normalmente removem corretamente as referências server-only.
- Remover o plugin ou verificar o _final output_ normalmente é a melhor solução.
