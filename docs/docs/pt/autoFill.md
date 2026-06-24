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
history:
  - version: 7.0.0
    date: 2025-10-23
    changes: "Renomear `fill` para `fill` e atualizar comportamento"
  - version: 6.0.0
    date: 2025-09-20
    changes: "Adicionada configuração global"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Adicionada variável `{{fileName}}`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Histórico inicial"
author: aymericzip
---

# Traduzir Traduções de Arquivo de Declaração de Conteúdo

**Arquivos de declaração de conteúdo com preenchimento automático** são uma forma de acelerar seu fluxo de trabalho de desenvolvimento.

## Entender o comportamento

O comando `fill` inclui dois modos:

- **Completo**: Preenche automaticamente todo o conteúdo faltante para cada localidade e edita o arquivo atual ou outro arquivo se especificado. Ou seja, o modo completo irá pular a tradução do conteúdo existente, se já foi traduzido.
- **Revisão**: Preenche automaticamente **todo** o conteúdo para cada localidade e gera para um arquivo específico ou outro arquivo se especificado.

O comando fill irá processar todos os seus arquivos de declaração de conteúdo de localidade. Ou seja, não irá processar seu conteúdo remoto do CMS. O CMS inclui seu próprio gerenciamento de traduções.
Se você usar plugins como `@intlayer/sync-json-plugin`, o Intlayer transformará os arquivos JSON em arquivos de declaração de conteúdo por localidade. Ou seja, eles serão processados pelo comando `fill`.

Os novos arquivos gerados incluem uma instrução `filled` como metadados do dicionário. Esta instrução será usada pelo Intlayer para saber se o arquivo foi preenchido automaticamente ou não e pular este arquivo de ser traduzido novamente se presente.

O Intlayer também considerará a seguinte instrução para preenchimento automático:

- Do seu `.content.{ts|js|json}` → instrução `fill`
- Do seu arquivo de configuração `.intlayer.config.ts` → instrução `dictionary.fill`
- Será definido como `true` por padrão caso contrário

Para arquivos de declaração de conteúdo por localidade, a instrução `true` será substituída por `./{{fileName}}.fill.content.json`. Isto é porque um arquivo de declaração de conteúdo por localidade não pode receber conteúdo localizado adicional. Portanto, irá gerar um novo arquivo para não sobrescrever o arquivo existente.

## Comportamento Padrão

Por padrão, `fill` é definido como `true` globalmente, o que significa que o Intlayer irá preencher automaticamente todos os arquivos de conteúdo e editar o arquivo em si. Este comportamento pode ser customizado de várias formas:

### Opções de Configuração Global

1. **`fill: true` (padrão)** - Preenche automaticamente todas as localidades e edita o arquivo atual
2. **`fill: false`** - Desabilita preenchimento automático para este arquivo de conteúdo
3. **`fill: "./relative/path/to/file"`** - Cria/atualiza o arquivo especificado sem editar o arquivo atual apontando para um caminho relativo resolvido com base na localização do arquivo atual
4. **`fill: "/absolute/path/to/file"`** - Cria/atualiza o arquivo especificado sem editar o arquivo atual apontando para um caminho relativo resolvido com base na localização do diretório base (campo `baseDir` no arquivo de configuração `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`** - Cria/atualiza o arquivo especificado sem editar o arquivo atual apontando para um caminho absoluto resolvido com base no seu sistema operacional
6. **`fill: { [key in Locales]?: string }`** - Cria/atualiza o arquivo especificado para cada localidade

### Mudanças de Comportamento v7

Na v7, o comportamento do comando `fill` foi atualizado:

- **`fill: true`** - Reescreve o arquivo atual com conteúdo preenchido para todas as localidades
- **`fill: "path/to/file"`** - Preenche o arquivo especificado sem modificar o arquivo atual
- **`fill: false`** - Desabilita preenchimento automático completamente

Ao usar uma opção de caminho para escrever em outro arquivo, o mecanismo de preenchimento funciona através de uma relação _mestre-escravo_ entre arquivos de declaração de conteúdo. O arquivo principal (mestre) serve como fonte da verdade e, quando é atualizado, o Intlayer aplicará automaticamente essas alterações aos arquivos de declaração derivados (preenchidos) especificados pelo caminho.

### Customização Por Localidade

Você também pode customizar o comportamento para cada localidade usando um objeto:

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  content: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
      defaultLocale: Locales.ENGLISH,
      requiredLocales: [Locales.ENGLISH], // Recomendado para evitar a propriedade 'pl' está faltando no tipo '{ en: string; xxx } na sua função t
    },
  },
  dictionary: {
    fill: {
      en: true, // Preenche e edita o arquivo atual para Inglês
      fr: "./translations/fr.json", // Cria arquivo separado para Francês
      es: false, // Desabilita preenchimento para Espanhol
    },
  },
};
```

Isto permite que você tenha comportamentos de preenchimento diferentes para diferentes localidades dentro do mesmo projeto.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  fill: "./example.content.json",
  content: {
    contentExample: "Este é um exemplo de conteúdo",
  },
} satisfies Dictionary;

// Exporta o conteúdo de exemplo
export default exampleContent;
```

Aqui está um [arquivo de declaração de conteúdo por localidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/per_locale_file.md) usando a instrução `fill`.

Então, quando você executar o seguinte comando:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
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

## Configuração Global

Você pode configurar a configuração de preenchimento automático global no arquivo `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Gera automaticamente traduções faltantes para todos os dicionários
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // gera automaticamente traduções faltantes para todos os dicionários como usando "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Você ainda pode ajustar melhor por dicionário usando o campo `fill` em arquivos de conteúdo. O Intlayer irá primeiro considerar a configuração por dicionário e então voltar para a configuração global.

## Formato do Arquivo Preenchido Automaticamente

O formato recomendado para arquivos de declaração preenchidos automaticamente é **JSON**, que ajuda a evitar restrições de formatação. No entanto, o Intlayer também suporta `.ts`, `.js`, `.mjs`, `.cjs` e outros formatos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "./example.filled.content.ts",
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

O campo `fill` também suporta caminhos absolutos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/example.content.json",
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

O campo `fill` também suporta a geração de arquivos de declaração de conteúdo **por localidade**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
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

Usar um objeto para o campo `fill` permite aplicar filtros e gerar apenas arquivos de localidades específicas.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar apenas o arquivo de tradução em francês.

## Variáveis de Caminho

Você pode usar variáveis dentro do caminho `fill` para resolver dinamicamente os caminhos de destino para os arquivos gerados.

**Variáveis disponíveis:**

- `{{locale}}` – Código da localidade (ex.: `fr`, `es`)
- `{{fileName}}` – Nome do arquivo (ex.: `index`)
- `{{key}}` – Chave do dicionário (ex.: `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/{{locale}}/{{key}}.content.json",
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
  fill: "./{{fileName}}.content.json",
  content: {
    // Seu conteúdo
  },
};
```

Isso irá gerar:

- `./index.content.json`
- `./index.content.json`
