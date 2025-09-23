---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Preenchimento Automático
description: Aprenda a usar a funcionalidade de preenchimento automático no Intlayer para popular conteúdo automaticamente com base em padrões predefinidos. Siga esta documentação para implementar recursos de preenchimento automático de forma eficiente em seu projeto.
keywords:
  - Preenchimento Automático
  - Automação de Conteúdo
  - Conteúdo Dinâmico
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
---

# Traduções de Arquivos de Declaração de Conteúdo com Preenchimento Automático

**Arquivos de declaração de conteúdo com preenchimento automático** são uma forma de acelerar seu fluxo de trabalho de desenvolvimento.

O mecanismo de preenchimento automático funciona através de uma relação _mestre-escravo_ entre arquivos de declaração de conteúdo. Quando o arquivo principal (mestre) é atualizado, o Intlayer aplicará automaticamente essas alterações aos arquivos de declaração derivados (preenchidos automaticamente).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "Este é um exemplo de conteúdo",
  },
} satisfies Dictionary;

// Exporta o conteúdo de exemplo
export default exampleContent;
```

Aqui está um [arquivo de declaração de conteúdo por localidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) usando a instrução `autoFill`.

Então, quando você executar o seguinte comando:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

O Intlayer irá gerar automaticamente o arquivo de declaração derivado em `src/components/example/example.content.json`, preenchendo todos os locais que ainda não foram declarados no arquivo principal.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Posteriormente, ambos os arquivos de declaração serão mesclados em um único dicionário, acessível usando o hook padrão `useIntlayer("example")` (react) / composable (vue).

## Formato do Arquivo Preenchido Automaticamente

O formato recomendado para arquivos de declaração preenchidos automaticamente é **JSON**, que ajuda a evitar restrições de formatação. No entanto, o Intlayer também suporta `.ts`, `.js`, `.mjs`, `.cjs` e outros formatos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar o arquivo em:

```
src/components/example/example.filled.content.ts
```

> A geração de arquivos `.js`, `.ts` e similares funciona da seguinte forma:
>
> - Se o arquivo já existir, o Intlayer irá analisá-lo usando AST (Árvore de Sintaxe Abstrata) para localizar cada campo e inserir quaisquer traduções faltantes.
> - Se o arquivo não existir, o Intlayer irá gerá-lo usando o template padrão de arquivo de declaração de conteúdo.

## Caminhos Absolutos

O campo `autoFill` também suporta caminhos absolutos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar o arquivo em:

```
/messages/example.content.json
```

## Geração Automática de Arquivos de Declaração de Conteúdo Por Localidade

O campo `autoFill` também suporta a geração de arquivos de declaração de conteúdo **por localidade**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar dois arquivos separados:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> Neste caso, se o objeto não contiver todas as localidades, o Intlayer pula a geração das localidades restantes.

## Filtrar Autofill para Localidade Específica

Usar um objeto para o campo `autoFill` permite aplicar filtros e gerar apenas arquivos de localidades específicas.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar apenas o arquivo de tradução em francês.

## Variáveis de Caminho

Você pode usar variáveis dentro do caminho `autoFill` para resolver dinamicamente os caminhos de destino para os arquivos gerados.

**Variáveis disponíveis:**

- `{{locale}}` – Código da localidade (ex.: `fr`, `es`)
- `{{fileName}}` – Nome do arquivo (ex.: `index`)
- `{{key}}` – Chave do dicionário (ex.: `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./{{fileName}}.content.json",
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar:

- `./index.content.json`
- `./index.content.json`

## Histórico do Documento

| Versão  | Data       | Alterações                  |
| ------- | ---------- | --------------------------- |
| 6.0.0   | 2025-09-20 | Adicionada configuração global |
| 6.0.0   | 2025-09-17 | Adicionada variável `{{fileName}}` |
| 5.5.10  | 2025-06-29 | Histórico inicial           |
