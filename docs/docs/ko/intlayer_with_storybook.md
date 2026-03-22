---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Storybook에서 Intlayer를 설정하는 방법
description: Intlayer와 Storybook을 사용하여 디자인 시스템을 다국어화하는 방법을 배워보세요 — 콘텐츠 선언 컴파일, 로케일 스위처 추가, 그리고 모든 언어에서 컴포넌트 미리보기.
keywords:
  - 국제화
  - 문서
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

# Storybook과 함께하는 Intlayer

## 목차

<TOC/>

## Intlayer란 무엇인가요?

**Intlayer**는 현대적인 웹 애플리케이션에서 다국어 지원을 간소화하기 위해 설계된 혁신적이고 오픈 소스인 국제화(i18n) 라이브러리입니다. **컴포넌트 수준**에서 작동하며, 각 컴포넌트가 자체 콘텐츠 선언을 소유하여 번역을 사용하는 코드와 함께 배치할 수 있습니다.

Intlayer를 사용하면 다음을 수행할 수 있습니다:

- **선언적으로 번역 관리**: 컴포넌트별 콘텐츠 파일을 사용합니다.
- **전체 TypeScript 지원**: 자동 생성된 유형 및 IDE 자동 완성을 통한 지원.
- **런타임 시 로케일 전환**: 페이지 새로 고침 없이 전환 가능.
- **자동 번역**: 내장된 AI 제공업체 통합을 통해 가능.

---

## 왜 Storybook에서 Intlayer를 사용해야 하나요?

Storybook은 UI 컴포넌트를 독립적으로 개발하고 문서화하기 위한 업계 표준 도구입니다. Intlayer와 결합하면 다음과 같은 이점이 있습니다:

- **모든 로케일 미리보기**: 도구 모음 스위처를 사용하여 Storybook 캔버스 내부에서 직접 확인할 수 있습니다.
- **누락된 번역 감지**: 프로덕션에 도달하기 전에 번역 누락을 확인할 수 있습니다.
- **다국어 컴포넌트 문서화**: 하드코딩된 문자열 대신 실제 형식이 안전한(type-safe) 콘텐츠를 사용하여 문서화할 수 있습니다.

---

## 단계별 설정

<Tabs>
<Tab value="Vite Setup">

### 1단계: 종속성 설치

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

| 패키지           | 역할                                                |
| ---------------- | --------------------------------------------------- |
| `intlayer`       | 코어 — 구성, 콘텐츠 컴파일, CLI                     |
| `react-intlayer` | React 바인딩 — `IntlayerProvider`, `useIntlayer` 훅 |
| `vite-intlayer`  | Vite 플러그인 — 콘텐츠 선언 파일을 감시하고 컴파일  |

---

### 2단계: Intlayer 구성 생성

프로젝트 루트(또는 디자인 시스템 패키지 내부)에 `intlayer.config.ts`를 생성합니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 필요한 로케일을 추가하세요
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // *.content.ts 파일이 있는 위치
  },
};

export default config;
```

> 전체 옵션 목록은 [구성 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 확인하세요.

---

### 3단계: Storybook에 Vite 플러그인 추가

Storybook의 `viteFinal` 훅을 사용하면 내부 Vite 구성을 확장할 수 있습니다. 여기에 `intlayer()` 플러그인을 가져와서 추가합니다:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …기타 애드온
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

`intlayer()` 플러그인은 `*.content.ts` 파일을 감시하고 Storybook 개발 중에 변경 사항이 생길 때마다 자동으로 사전을 다시 빌드합니다.

---

### 4단계: `IntlayerProvider` 데코레이터 및 로케일 도구 모음 추가

Storybook의 `preview` 파일은 모든 스토리를 `IntlayerProvider`로 감싸고 도구 모음에 로케일 스위처를 노출하기에 적합한 장소입니다:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // 모든 스토리를 IntlayerProvider 내부에 래핑
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

  // Storybook 도구 모음에 로케일 스위처 노출
  globalTypes: {
    locale: {
      description: "활성 로케일",
      defaultValue: "en",
      toolbar: {
        title: "로케일",
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

> `locale` 값은 `intlayer.config.ts`에 선언된 로케일과 일치해야 합니다.

</Tab>
<Tab value="Webpack Setup">

### 1단계: 종속성 설치

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

### 2단계: Intlayer 구성 생성

프로젝트 루트에 `intlayer.config.ts`를 생성합니다:

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

### 3단계: Storybook의 Webpack 구성

Webpack 기반 Storybook 설정(예: `@storybook/react-webpack5`)의 경우, `webpackFinal`을 통해 webpack 구성을 확장하여 Intlayer 별칭(alias) 및 로더를 추가합니다:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### 4단계: `IntlayerProvider` 데코레이터 및 로케일 도구 모음 추가

Vite 설정과 동일하게 `.storybook/preview.tsx`에 데코레이터와 전역 로케일 유형을 추가합니다:

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
      description: "활성 로케일",
      defaultValue: "en",
      toolbar: {
        title: "로케일",
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

## 콘텐츠 선언

각 컴포넌트 옆에 `*.content.ts` 파일을 생성합니다. Intlayer는 컴파일 중에 이를 자동으로 감지합니다.

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

> 더 많은 콘텐츠 선언 형식과 기능은 [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)를 참조하세요.

---

## 컴포넌트에서 `useIntlayer` 사용하기

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
      복사
    </button>
  );
};
```

`useIntlayer`는 가장 가까운 `IntlayerProvider`에서 제공하는 현재 로케일에 대한 컴파일된 사전을 반환합니다. Storybook 도구 모음에서 로케일을 전환하면 업데이트된 번역으로 스토리가 자동으로 다시 렌더링됩니다.

---

## 국제화된 컴포넌트를 위한 스토리 작성

`IntlayerProvider` 데코레이터가 설정되면 스토리는 이전과 동일하게 작동합니다. 로케일 도구 모음은 전체 캔버스의 활성 로케일을 제어합니다:

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

/** 기본 스토리 — 번역을 미리 보려면 도구 모음에서 로케일을 전환하세요. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** 일반적인 실제 사용 사례인 코드 블록 내부에 버튼을 렌더링합니다. */
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

> 각 스토리는 도구 모음에서 `locale` 전역 변수를 상속하므로 스토리 코드를 변경하지 않고도 모든 로케일을 확인할 수 있습니다.

---

## 스토리에서 번역 테스트하기

Storybook의 `play` 기능을 사용하여 특정 로케일에 대해 올바른 번역 텍스트가 렌더링되었는지 확인하세요:

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

    // 버튼에 비어 있지 않은 접근 가능한 이름이 있는지 확인
    await expect(button).toHaveAccessibleName();
    // 버튼이 비활성화되지 않았는지 확인
    await expect(button).not.toBeDisabled();
    // 키보드 접근성 확인
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## 추가 리소스

- [Intlayer 구성 참조](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [콘텐츠 선언 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)
- [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- [Storybook 문서](https://storybook.js.org/docs)
