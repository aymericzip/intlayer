---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "Lingui에서 Intlayer로 마이그레이션"
description: "React 앱을 Lingui에서 Intlayer로 단계별로 마이그레이션하세요. compat adapter @intlayer/lingui로 Lingui 매크로, useLingui, <Trans>가 그대로 동작합니다."
keywords:
  - lingui
  - "@lingui/react"
  - "@lingui/core"
  - intlayer
  - migration
  - internationalization
  - i18n
  - React
  - Vite
slugs:
  - doc
  - migration
  - lingui
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# Lingui에서 Intlayer로 마이그레이션

## Lingui에서 Intlayer로 마이그레이션하는 이유

<AccordionGroup>
<Accordion header="번들 크기">

Lingui는 로케일마다 앱의 모든 메시지를 담은 컴파일된 카탈로그를 하나씩 로드합니다. Intlayer는 콘텐츠를 사전 단위로 나누고 각 페이지가 사용하는 것만 전달하므로 **번들과 페이지 크기를 최대 50%까지 줄여 줍니다**.

</Accordion>
<Accordion header="유지보수성">

Intlayer 사전은 **완전히 타입이 지정**되어 있으며, 이를 사용하는 컴포넌트 옆에 둘 수 있습니다. `extract` / `compile` 단계를 기억할 필요가 없습니다. 사전은 번들러 플러그인이 빌드합니다.

</Accordion>
<Accordion header="AI 에이전트">

컴포넌트 옆에 있는 콘텐츠는 LLM에 **필요한 컨텍스트를 줄여 줍니다**. Intlayer는 누락된 번역을 검사하는 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**, **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**를 제공합니다.

</Accordion>
<Accordion header="자동화">

원하는 LLM으로 CI/CD 파이프라인에서 누락된 메시지를 번역하거나, [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)에서 백그라운드로 번역하세요.

</Accordion>
<Accordion header="비개발자와 함께 확장">

Intlayer는 셀프 호스팅 **[비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[완전한 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공하여 번역가와 카피라이터가 실시간으로 콘텐츠를 편집할 수 있습니다.

</Accordion>
</AccordionGroup>

> 이 라이브러리들이 어디서 왔는지 알고 싶다면 [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)를 읽어 보세요.

## 마이그레이션 전략

1. **Compat adapter (기존 앱에 권장)**: `@intlayer/lingui`를 설치합니다. `@lingui/core`, `@lingui/react`와 동일한 API(`i18n`, `setupI18n`, `I18nProvider`, `useLingui`, `Trans`)를 노출하고 메시지를 Intlayer 사전에서 제공합니다. 매크로(`` t`…` ``, `<Trans>`, `msg`, `plural`)는 이전과 똑같이 컴파일됩니다.
2. **전체 마이그레이션**: Lingui 호출을 `useIntlayer`와 컴포넌트 옆의 `.content.ts` 파일로 점진적으로 교체합니다.

## 목차

<TOC/>

## 빠른 마이그레이션

<Steps>
<Step number={1} title="의존성 설치">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트라면 `intlayer-cli init`을 사용하세요.

이 명령은 환경을 감지하고 필요한 package를 설치합니다. 예:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/lingui @intlayer/sync-po-plugin
```

> `@lingui/core`, `@lingui/react`, 매크로 플러그인(`@lingui/babel-plugin-lingui-macro` 또는 `@lingui/swc-plugin`)은 설치된 상태로 두세요. 매크로는 계속 실행되며 Lingui package가 TypeScript 타입을 제공합니다.

</Step>
<Step number={2} title="Intlayer 설정">

Intlayer는 Lingui 카탈로그를 단일 진실 공급원으로 읽습니다. Lingui 기본 구조(`src/locales/{locale}/messages.po`)라면 `syncPO` 플러그인이 해당 파일을 가리키도록 설정하세요.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      // ./src/locales/en/messages.po → dictionary `messages`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

<Accordion header="JSON 카탈로그 사용">

`@lingui/format-json`을 사용한다면 ICU 형식으로 `syncJSON`을 사용하세요.

```typescript fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

// ...
plugins: [
  syncJSON({
    format: "icu",
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
],
```

</Accordion>

> 명시적인 메시지 id(`t({ id: "hero.title", message: "Welcome" })` 또는 `<Trans id="hero.title">`)를 사용하세요. 원본 텍스트에서 생성된 id는 카탈로그와 매칭되지 않습니다.

</Step>
<Step number={3} title="Lingui Vite 플러그인 교체">

`@lingui/vite-plugin`을 `@intlayer/lingui/plugin`으로 바꾸세요. 바인딩은 `lingui()` 그대로입니다. Intlayer 빌드를 실행하고 `@lingui/core`와 `@lingui/react`를 `@intlayer/lingui`로 alias하므로 소스 파일을 수정할 필요가 없습니다.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin"; // was "@lingui/vite-plugin"

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

> 매크로 플러그인은 React 플러그인(Babel 또는 `@lingui/swc-plugin`)에 그대로 두세요. 그래야 Intlayer가 처리하기 전에 매크로가 `i18n._()` 호출로 컴파일됩니다.

</Step>
</Steps>

컴포넌트는 변경 없이 계속 동작합니다.

```tsx fileName="src/Hero.tsx"
import { Trans, useLingui } from "@lingui/react/macro";

export const Hero = ({ name }: { name: string }) => {
  const { t } = useLingui();

  return (
    <header>
      <h1>{t({ id: "hero.title", message: "Welcome" })}</h1>
      <Trans id="hero.greeting">Hello {name}</Trans>
    </header>
  );
};
```

로케일 전환은 여전히 `i18n.activate(locale)`로 하며, 모든 `useLingui()` 사용처가 업데이트됩니다.

## 전체 마이그레이션

<Steps>
<Step number={4} title="런타임 카탈로그 로딩 제거" isOptional={true}>

이제 메시지는 빌드 시 컴파일되는 Intlayer 사전에서 제공됩니다. `i18n.load()` / `i18n.loadAndActivate()` 호출은 fallback 역할만 하며 개발 환경에서 경고를 출력합니다. `i18n.activate(locale)`로 교체하고 `lingui compile` 단계를 제거하세요. 새 메시지 id를 수집하려면 `lingui extract`는 계속 사용하세요.

</Step>
<Step number={5} title="명시적인 import 이름 변경 (선택)" isOptional={true}>

alias는 이미 Vite 플러그인이 처리합니다. 의존성을 명시적으로 드러내려면:

| 이전                                               | 이후                                                  |
| -------------------------------------------------- | ----------------------------------------------------- |
| `import { i18n } from '@lingui/core'`              | `import { i18n } from '@intlayer/lingui'`             |
| `import { setupI18n } from '@lingui/core'`         | `import { setupI18n } from '@intlayer/lingui'`        |
| `import { I18nProvider } from '@lingui/react'`     | `import { I18nProvider } from '@intlayer/lingui'`     |
| `import { useLingui, Trans } from '@lingui/react'` | `import { useLingui, Trans } from '@intlayer/lingui'` |

</Step>
<Step number={6} title="콘텐츠를 .content.ts 파일로 옮기기" isOptional={true}>

새 컴포넌트는 기존 Lingui 호출과 함께 네이티브 Intlayer 콘텐츠를 사용할 수 있습니다.

```typescript fileName="src/hero.content.ts"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default heroContent;
```

```tsx fileName="src/Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

</Step>
<Step number={7} title="AI 기반 번역 활성화" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

채워진 번역은 Lingui 카탈로그에 다시 기록됩니다. AI 설정은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참고하세요.

</Step>
</Steps>

## 마이그레이션 후 삭제할 수 있는 항목

| 파일 / 패턴                                 | 더 이상 필요 없는 이유                               |
| ------------------------------------------- | ---------------------------------------------------- |
| `i18n.load()` / 카탈로그 동적 import        | 사전은 Intlayer가 컴파일하고 로드합니다.             |
| `lingui compile` 및 컴파일된 `.js` 카탈로그 | Intlayer가 카탈로그에서 직접 사전을 빌드합니다.      |
| `@lingui/vite-plugin`                       | `@intlayer/lingui/plugin`의 `lingui()`로 대체됩니다. |

## TypeScript 설정

생성된 타입을 `tsconfig.json`에 포함하세요.

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git 설정

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [Lingui compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)
- [sync PO 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-po.md)
- [Vite, React와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
