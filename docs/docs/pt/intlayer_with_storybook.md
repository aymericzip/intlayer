---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Como configurar o Intlayer com o Storybook
description: Saiba como tornar o seu sistema de design multilíngue usando o Intlayer com o Storybook — compile declarações de conteúdo, adicione um seletor de local e visualize os seus componentes em qualquer idioma.
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
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer com Storybook

## Índice

<TOC/>

## O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas. Funciona ao **nível do componente** — cada componente possui as suas próprias declarações de conteúdo — mantendo as traduções localizadas junto ao código que as utiliza.

Com o Intlayer pode:

- **Gerir traduções de forma declarativa** com ficheiros de conteúdo por componente.
- **Obter suporte completo para TypeScript** através de tipos gerados automaticamente e autocompletar no IDE.
- **Alterar locais em tempo de execução** sem recarregar a página.
- **Traduzir automaticamente** com integrações integradas de fornecedores de IA.

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

### Passo 1: Instalar Dependências

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
| `intlayer`       | Core — configuração, compilação de conteúdo, CLI                       |
| `react-intlayer` | Bindings React — `IntlayerProvider`, hook `useIntlayer`                |
| `vite-intlayer`  | Plugin Vite — monitoriza e compila ficheiros de declaração de conteúdo |

---

### Passo 2: Criar uma Configuração do Intlayer

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

### Passo 3: Adicionar o Plugin Vite ao Storybook

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
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

O plugin `intlayer()` monitoriza os seus ficheiros `*.content.ts` e reconstrói os dicionários automaticamente sempre que houver alterações durante o desenvolvimento no Storybook.

---

### Passo 4: Adicionar o Decorador `IntlayerProvider` e uma Barra de Ferramentas de Local

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

</Tab>
<Tab value="Webpack Setup">

### Passo 1: Instalar Dependências

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

### Passo 2: Criar uma Configuração do Intlayer

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

### Passo 3: Configurar o Webpack do Storybook

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

### Passo 4: Adicionar o Decorador `IntlayerProvider` e uma Barra de Ferramentas de Local

O mesmo que na configuração Vite — adicione o decorador e o tipo de local global em `.storybook/preview.tsx`:

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

</Tab>
</Tabs>

---

## Declarar Conteúdo

Crie um ficheiro `*.content.ts` ao lado de cada componente. O Intlayer deteta-o automaticamente durante a compilação.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
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

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
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

/** Story padrão — altere o local na barra de ferramentas para visualizar as traduções. */
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
