---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: Testando seu conteúdo
description: Descubra como testar seu conteúdo com Intlayer.
keywords:
  - Testes
  - Intlayer
  - Internacionalização
  - CMS
  - Sistema de Gestão de Conteúdo
  - Editor Visual
slugs:
  - doc
  - testing
---

# Testando seu conteúdo

Este guia mostra como verificar automaticamente se seus dicionários estão completos, detectar traduções faltantes antes do lançamento e testar a interface localizada em seu aplicativo.

---

## O que você pode testar

- **Traduções faltantes**: falhar no CI se algum idioma obrigatório estiver faltando em qualquer dicionário.
- **Renderização da interface localizada**: renderizar componentes com um provedor de idioma específico e verificar textos/atributos visíveis.
- **Auditorias em tempo de build**: executar uma auditoria rápida localmente via CLI.

---

## Início rápido: auditoria via CLI

Execute a auditoria a partir da raiz do seu projeto:

```bash
npx intlayer content test
```

Flags úteis:

- `--env-file [caminho]`: carrega variáveis de ambiente a partir de um arquivo.
- `-e, --env [nome]`: seleciona um perfil de ambiente.
- `--base-dir [caminho]`: define o diretório base do app para resolução.
- `--verbose`: exibe logs detalhados.
- `--prefix [rótulo]`: prefixa as linhas de log.

Nota: o CLI imprime um relatório detalhado, mas não retorna código de erro em caso de falhas. Para controle em CI, adicione um teste unitário (abaixo) que assegure que não há locais obrigatórios faltando.

---

## Teste programático (Vitest/Jest)

Use a API do CLI do Intlayer para garantir que não há traduções faltando para os locais obrigatórios.

```ts file=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("traduções", () => {
  it("não possui locais obrigatórios faltando", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Útil quando o teste falha localmente ou no CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Equivalente em Jest:

```ts file=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("não possui locais obrigatórios faltando", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Como funciona:

- O Intlayer lê sua configuração (locales, requiredLocales) e os dicionários declarados, então reporta:
  - `missingTranslations`: por chave, quais locais estão faltando e de qual arquivo.
  - `missingLocales`: união de todos os locais faltantes.
  - `missingRequiredLocales`: subconjunto limitado a `requiredLocales` (ou todos os locais se `requiredLocales` não estiver definido).

---

## Testando UI localizada (React / Next.js)

Renderize componentes dentro de um provedor Intlayer e faça asserções no conteúdo visível.

Exemplo React (Testing Library):

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Título esperado em inglês")).toBeInTheDocument();
});
```

Exemplo Next.js (App Router): use o wrapper do framework:

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("renderiza título localizado em francês", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Dicas:

- Quando precisar dos valores brutos das strings para atributos (ex.: `aria-label`), acesse o campo `.value` retornado por `useIntlayer` no React.
- Mantenha os dicionários localizados junto com os componentes para facilitar os testes unitários e a limpeza.

---

## Integração Contínua

Adicione um teste que falhe a build quando traduções obrigatórias estiverem faltando.

`package.json`:

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Exemplo GitHub Actions:

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Opcional: execute a auditoria CLI para um resumo legível por humanos junto com os testes:

```bash
npx intlayer content test --verbose
```

---

## Solução de Problemas

- Certifique-se de que sua configuração do Intlayer define `locales` e (opcionalmente) `requiredLocales`.
- Se seu aplicativo usa dicionários dinâmicos ou remotos, execute os testes em um ambiente onde os dicionários estejam disponíveis.
- Para monorepos mistos, use `--base-dir` para apontar o CLI para a raiz correta da aplicação.

---

## Histórico do Documento

| Versão | Data       | Alterações            |
| ------ | ---------- | --------------------- |
| 6.0.0  | 2025-09-20 | Introdução dos testes |
