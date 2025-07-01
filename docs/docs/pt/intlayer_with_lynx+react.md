---
docName: intlayer_with_lynx_react
url: https://intlayer.org/doc/environment/lynx-and-react
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_lynx+react.md
createdAt: 2025-03-09
updatedAt: 2025-06-29
title: Traduza o seu aplicativo móvel Lynx e React (i18n)
description: Descubra como tornar seu aplicativo móvel Lynx e React multilíngue. Siga a documentação para internacionalizar (i18n) e traduzi-lo.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vite
  - React
  - Lynx
  - JavaScript
---

# Introdução à Internacionalização (i18n) com Intlayer, Lynx e React

Veja o [Modelo de Aplicação](https://github.com/aymericzip/intlayer-lynx-template) no GitHub.

## O que é o Intlayer?

**Intlayer** é uma **biblioteca inovadora e de código aberto para internacionalização (i18n)** que simplifica o suporte multilíngue em aplicações modernas. Ela funciona em diversos ambientes JavaScript/TypeScript, **incluindo Lynx** (por meio do pacote `react-intlayer`).

Com o Intlayer, você pode:

- **Gerenciar traduções facilmente** utilizando dicionários declarativos no nível de componente.
- **Garantir suporte a TypeScript** com tipos gerados automaticamente.
- **Localizar conteúdo dinamicamente**, incluindo **strings de interface** (e, no React para web, também pode localizar metadados HTML, etc.).
- **Aproveitar recursos avançados**, como detecção e troca dinâmica de localidade (locale).

---

## Passo 1: Instale as dependências

A partir do seu projeto Lynx, instale os seguintes pacotes:

```bash packageManager="npm"
npm install intlayer react-intlayer lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer lynx-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer lynx-intlayer
```

### Pacotes

- **intlayer**  
  A ferramenta principal de i18n para configuração, conteúdo de dicionários, geração de tipos e comandos de CLI.

- **react-intlayer**  
  Integração com React que fornece os context providers e hooks React que você usará no Lynx para obter e trocar localidade.

- **lynx-intlayer**  
  Integração com Lynx que fornece o plugin para integrar o Intlayer com o bundler do Lynx.

---

## Passo 2: Crie um arquivo de configuração do Intlayer

No diretório raiz do seu projeto (ou em outro local conveniente), crie um arquivo de **configuração do Intlayer**. Ele pode se parecer com isto:

```ts fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Adicione quaisquer outros locales necessários
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Adicione quaisquer outros locales necessários
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```js fileName="intlayer.config.js" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Dentro desta configuração, você pode:

- Configurar sua **lista de locais (locales) suportados**.
- Definir uma localidade **padrão**.
- Posteriormente, pode adicionar opções mais avançadas (por exemplo, logs, diretórios de conteúdo personalizados, etc.).
- Consulte a [documentação de configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais detalhes.

## Passo 3: Adicione o plugin do Intlayer ao bundler do Lynx

Para usar o Intlayer com Lynx, você precisa adicionar o plugin ao seu arquivo `lynx.config.ts`:

```ts fileName="lynx.config.ts"
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... outros plugins
    pluginIntlayerLynx(),
  ],
});
```

## Passo 4: Adicione o provider do Intlayer

Para manter a linguagem do usuário sincronizada em todo o seu aplicativo, você precisa envolver seu componente raiz com o componente `IntlayerProvider` do `react-intlayer`.

Além disso, você precisa adicionar a função `intlayerPolyfill` para garantir que o Intlayer funcione corretamente.

```tsx fileName="src/index.tsx"
import { root } from "@lynx-js/react";

import { App } from "./App.js";
import { IntlayerProvider } from "react-intlayer";
import { intlayerPolyfill } from "lynx-intlayer";

intlayerPolyfill();

root.render(
  <IntlayerProvider>
    <App />
  </IntlayerProvider>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
```

## Passo 5: Declare o seu conteúdo

Crie arquivos de **declaração de conteúdo** em qualquer lugar do seu projeto (normalmente dentro de `src/`), usando qualquer um dos formatos de extensão que o Intlayer suporta:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- etc.

Exemplo:

```tsx fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
      pt: "no Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
      pt: "Toque o logo e divirta-se!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
        pt: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
        pt: "para ver atualizações!",
      }),
    ],
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" contentDeclarationFormat="esm"
import { t } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
      pt: "no Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
      pt: "Toque o logo e divirta-se!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
        pt: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
        pt: "para ver atualizações!",
      }),
    ],
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    title: "React",
    subtitle: t({
      en: "on Lynx",
      fr: "sur Lynx",
      es: "en Lynx",
      pt: "no Lynx",
    }),
    description: t({
      en: "Tap the logo and have fun!",
      fr: "Appuyez sur le logo et amusez-vous!",
      es: "¡Toca el logo y diviértete!",
      pt: "Toque o logo e divirta-se!",
    }),
    hint: [
      t({
        en: "Edit",
        fr: "Modifier",
        es: "Editar",
        pt: "Editar",
      }),
      " src/App.tsx ",
      t({
        en: "to see updates!",
        fr: "pour voir les mises à jour!",
        es: "para ver actualizaciones!",
        pt: "para ver atualizações!",
      }),
    ],
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "React",
    "subtitle": {
      "nodeType": "translation",
      "translation": {
        "en": "on Lynx",
        "fr": "sur Lynx",
        "es": "en Lynx",
        "pt": "no Lynx"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Tap the logo and have fun!",
        "fr": "Appuyez sur le logo et amusez-vous!",
        "es": "¡Toca el logo y diviértete!",
        "pt": "Toque o logo e divirta-se!"
      }
    },
    "hint": [
      {
        "nodeType": "translation",
        "translation": {
          "en": "Edit",
          "fr": "Modifier",
          "es": "Editar",
          "pt": "Editar"
        }
      },
      " src/App.tsx ",
      {
        "nodeType": "translation",
        "translation": {
          "en": "to see updates!",
          "fr": "pour voir les mises à jour!",
          "es": "para ver actualizaciones!",
          "pt": "para ver atualizações!"
        }
      }
    ]
  }
}
```

> Para mais detalhes sobre declarações de conteúdo, consulte a [documentação de conteúdo do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md).

---

## Passo 4: Use o Intlayer em seus componentes

Use o hook `useIntlayer` nos componentes filhos para obter o conteúdo localizado.

```tsx fileName="src/App.tsx"
import { useCallback, useState } from "@lynx-js/react";
import { useIntlayer } from "react-intlayer";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { LocaleSwitcher } from "./components/LocaleSwitcher.jsx";

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false);
  const { title, subtitle, description, hint } = useIntlayer("app");
  const onTap = useCallback(() => {
    "background only";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">{title}</text>
          <text className="Subtitle">{subtitle}</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow" />
          <text className="Description">{description}</text>
          <text className="Hint">
            {hint[0]}
            <text style={{ fontStyle: "italic" }}>{hint[1]}</text>
            {hint[2]}
          </text>
        </view>
        <LocaleSwitcher />
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
};
```

> Ao usar `content.someKey` em props baseadas em string (por exemplo, a prop `title` de um botão ou o `children` de um componente `Text`), **chame `content.someKey.value`** para obter a string real.

---

## (Opcional) Passo 5: Alterar o locale do aplicativo

Para trocar o locale dentro dos seus componentes, você pode usar o método `setLocale` do hook `useLocale`:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales, locale } = useLocale();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {availableLocales.map((localeEl) => (
        <text
          key={localeEl}
          style={{
            color: localeEl === locale ? "#fff" : "#888",
            fontSize: "12px",
          }}
          bindtap={() => setLocale(localeEl)}
        >
          {getLocaleName(localeEl)}
        </text>
      ))}
    </view>
  );
};
```

Isso dispara uma nova renderização de todos os componentes que usam conteúdo do Intlayer, mostrando agora as traduções para o novo locale.

> Consulte a [documentação do `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md) para mais detalhes.

## Configure o TypeScript (se você usa TypeScript)

O Intlayer gera definições de tipos em uma pasta oculta (por padrão `.intlayer`) para melhorar a auto-completação e detectar erros de tradução:

```json5
// tsconfig.json
{
  // ... sua configuração TS existente
  "include": [
    "src", // seu código fonte
    ".intlayer/types/**/*.ts", // <-- garanta que os tipos auto-gerados estejam incluídos
    // ... qualquer outra coisa que você já inclua
  ],
}
```

Isso possibilita recursos como:

- **Auto-completação** para as chaves do seu dicionário.
- **Verificação de tipos** que avisa se você acessar uma chave inexistente ou incompatível com o tipo.

---

Para evitar o commit de arquivos gerados automaticamente pelo Intlayer, adicione o seguinte ao seu `.gitignore`:

```plaintext
# Ignore os arquivos gerados pelo Intlayer
.intlayer
```

---

### Extensão para VS Code

Para melhorar sua experiência de desenvolvimento com o Intlayer, você pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instale a partir do Marketplace do VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão oferece:

- **Auto-completação** para as chaves de tradução.
- **Detecção de erros em tempo real** para traduções ausentes.
- **Pré-visualizações inline** do conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.
  Para mais detalhes sobre como usar a extensão, consulte a [documentação da Extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Vá Além

- **Editor Visual**: Use o [Editor Visual do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) para gerenciar traduções visualmente.
- **Integração com CMS**: Você também pode externalizar e buscar o conteúdo do seu dicionário a partir de um [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).
- **Comandos CLI**: Explore o [CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md) para tarefas como **extrair traduções** ou **verificar chaves faltantes**.

---

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
