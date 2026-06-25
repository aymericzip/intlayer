---
createdAt: 2026-03-20
updatedAt: 2026-05-31
title: "Storybook i18n - Guia completo para traduzir seu aplicativo"
description: "Sem mais i18next. O guia 2026 para criar uma aplicação Storybook multilíngue (i18n). Traduza com agentes de IA e otimize o tamanho do bundle, SEO e desempenho."
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Atualizar o uso da API useIntlayer do Solid para acesso direto a propriedades"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
author: aymericzip
---

# Intlayer com Storybook

## Índice

<TOC/>

## Por que Intlayer em vez de alternativas?

Comparado com soluções principais como `storybook-react-i18next` ou `i18next`, Intlayer é uma solução que vem com otimizações integradas como:

<AccordionGroup>

<Accordion header="Cobertura completa do livro de histórias">

O Intlayer é otimizado para funcionar perfeitamente com o Storybook, oferecendo **decoradores de histórias multilíngues**, **alteração de local** e todos os recursos necessários para dimensionar a internacionalização (i18n) em seu sistema de design.

</Accordion>

<Accordion header="Tamanho do bundle">

Em vez de carregar arquivos JSON enormes em suas páginas, carregue apenas o conteúdo necessário. O Intlayer ajuda a **reduzir o tamanho do bundle e das páginas em até 50%**.

</Accordion>

<Accordion header="Manutenção">

Definir o escopo do conteúdo do seu aplicativo **facilita a manutenção** de aplicativos de grande escala. Você pode duplicar ou excluir uma única pasta de recursos sem o fardo mental de revisar toda a base de código de seu conteúdo. Além disso, o Intlayer é **totalmente tipado (fully typed)** para garantir a precisão do seu conteúdo.

</Accordion>

<Accordion header="Agente de IA">

A co-localização de conteúdo **reduz o contexto necessário** pelos Large Language Models (LLMs). O Intlayer também vem com um conjunto de ferramentas, como uma **CLI** para testar traduções ausentes,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md)**, e **[habilidades do agente](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/agent_skills.md)**, para tornar a experiência do desenvolvedor (DX) ainda mais tranquila para os agentes de IA.

</Accordion>

<Accordion header="Automação">

Use a automação para traduzir seu pipeline de CI/CD usando o LLM de sua escolha às custas de seu provedor de IA. O Intlayer também oferece um **compilador** para automatizar a extração de conteúdo, bem como uma [plataforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para ajudar a **traduzir em segundo plano**.

</Accordion>

<Accordion header="Desempenho">

Conectar arquivos JSON enormes a componentes pode levar a problemas de desempenho e reatividade. O Intlayer otimiza o carregamento do seu conteúdo no momento da construção.

</Accordion>

<Accordion header="Escalonamento sem nenhum desenvolvedor">

Mais do que apenas uma solução i18n, o Intlayer fornece um **[editor visual] auto-hospedado(https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md)** e um **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md)** para ajudá-lo a gerenciar seu conteúdo multilíngue em **tempo real**, facilitando a colaboração com tradutores, redatores e outros membros da equipe. O conteúdo pode ser armazenado local e/ou remotamente.

</Accordion>
</AccordionGroup>

---

## Porquê usar o Intlayer com o Storybook?

O Storybook é a ferramenta padrão da indústria para desenvolver e documentar componentes de UI isoladamente. Combiná-lo com o Intlayer permite-lhe:

- **Visualizar cada local** diretamente dentro do canvas do Storybook usando um seletor na barra de ferramentas.
- **Detetar traduções em falta** antes de chegarem à produção.
- **Documentar componentes multilíngues** com conteúdo real e seguro em termos de tipos, em vez de strings codificadas rigidamente.

---

## Configuração Passo a Passo

<Tabs>
<Tab value="Vite Setup">

<Steps>

<Step number={1} title="Instalar Dependências">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Pacote           | Função                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| `intlayer`       | Core - configuração, compilação de conteúdo, CLI                       |
| `react-intlayer` | Bindings React - `IntlayerProvider`, hook `useIntlayer`                |
| `vite-intlayer`  | Plugin Vite - monitoriza e compila ficheiros de declaração de conteúdo |

---

</Step>

<Step number={2} title="Criar uma Configuração do Intlayer">

Crie `intlayer.config.ts` na raiz do seu projeto (ou dentro do seu pacote de design system):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // adicione mais locais conforme necessário
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // onde os seus ficheiros *.content.ts residem
  },
};

export default config;
```

> Para a lista completa de opções, consulte a [referência de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

---

</Step>

<Step number={3} title="Adicionar o Plugin Vite ao Storybook">

O hook `viteFinal` do Storybook permite-lhe estender a configuração interna do Vite. Importe e adicione o plugin `intlayer()` aqui:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …outros addons
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [
        intlayer({
          proxy: {
            ignore: (req) => req.url?.startsWith("/api"),
          },
        }),
      ],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

O plugin `intlayer()` monitoriza os seus ficheiros `*.content.ts` e reconstrói os dicionários automaticamente sempre que houver alterações durante o desenvolvimento no Storybook.

---

</Step>

<Step number={4} title="Adicionar o Decorador `IntlayerProvider` e uma Barra de Ferramentas de Local">

O ficheiro `preview` do Storybook é o local ideal para envolver cada story com o `IntlayerProvider` e expor um seletor de local na barra de ferramentas:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Envolver cada story dentro do IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Expor um seletor de local na barra de ferramentas do Storybook
  globalTypes: {
    locale: {
      description: "Local ativo",
      defaultValue: "en",
      toolbar: {
        title: "Local",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> Os valores de `locale` devem coincidir com os locais declarados no seu `intlayer.config.ts`.

</Step>
</Steps>
</Tab>
<Tab value="Webpack Setup">
<Steps>

<Step number={1} title="Instalar Dependências">

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

</Step>

<Step number={2} title="Criar uma Configuração do Intlayer">

Crie `intlayer.config.ts` na raiz do seu projeto:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

</Step>

<Step number={3} title="Configurar o Webpack do Storybook">

Para configurações do Storybook baseadas em Webpack (por exemplo, `@storybook/react-webpack5`), estenda a configuração do webpack através de `webpackFinal` para adicionar os aliases e o loader do Intlayer:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

---

</Step>

<Step number={4} title="Adicionar o Decorador `IntlayerProvider` e uma Barra de Ferramentas de Local">

O mesmo que na configuração Vite - adicione o decorador e o tipo de local global em `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Local ativo",
      defaultValue: "en",
      toolbar: {
        title: "Local",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Step>
</Steps>
</Tab>
</Tabs>

## Declarar Conteúdo

Crie um ficheiro `*.content.ts` ao lado de cada componente. O Intlayer deteta-o automaticamente durante a compilação.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

> Para mais formatos e funcionalidades de declaração de conteúdo, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

---

## Usar `useIntlayer` num Componente

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Copiar
    </button>
  );
};
```

O `useIntlayer` retorna o dicionário compilado para o local atual fornecido pelo `IntlayerProvider` mais próximo. Alterar o local na barra de ferramentas do Storybook volta a renderizar automaticamente a story com as traduzioni atualizadas.

---

## Escrever Stories para Componentes Internacionalizados

Com o decorador `IntlayerProvider` configurado, as suas stories funcionam exatamente como antes. A barra de ferramentas de local controla o local ativo para todo o canvas:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Story padrão - altere o local na barra de ferramentas para visualizar as traduções. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Renderiza o botão dentro de um bloco de código, um caso de uso comum no mundo real. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Cada story herda a variável global `locale` da barra de ferramentas, para que possa verificar cada local sem alterar qualquer código da story.

---

## Testar Traduções em Stories

Use as funções `play` do Storybook para garantir que o texto traduzido corretamente é renderizado para um determinado local:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Verificar se o botão tem um nome acessível não vazio
    await expect(button).toHaveAccessibleName();
    // Verificar se o botão não está desativado
    await expect(button).not.toBeDisabled();
    // Verificar a acessibilidade do teclado
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Recursos Adicionais

- [Referência de configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
- [Documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md)
- [Documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md)
- [Documentação do Storybook](https://storybook.js.org/docs)
