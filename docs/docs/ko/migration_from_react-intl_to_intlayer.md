---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "react-intl (FormatJS)에서 Intlayer로 마이그레이션"
description: "React 앱을 react-intl에서 Intlayer로 단계별로 마이그레이션하세요. compat adapter @intlayer/react-intl로 useIntl, FormattedMessage, 모든 Formatted* 컴포넌트가 그대로 동작합니다."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - internationalization
  - i18n
  - ICU
  - React
  - Vite
slugs:
  - doc
  - migration
  - react-intl
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# react-intl (FormatJS)에서 Intlayer로 마이그레이션

## react-intl에서 Intlayer로 마이그레이션하는 이유

<AccordionGroup>
<Accordion header="번들 크기">

react-intl에서는 로케일의 모든 메시지가 `IntlProvider`에 전달되므로 모든 페이지가 카탈로그 전체를 들고 다닙니다. Intlayer는 각 페이지가 사용하는 사전만 전달하므로 **번들과 페이지 크기를 최대 50%까지 줄여 줍니다**.

</Accordion>
<Accordion header="유지보수성">

메시지 id는 사전에 대해 **타입이 지정**되어 있어 잘못된 id는 빌드 시 실패합니다. 콘텐츠는 이를 사용하는 컴포넌트 옆에 둘 수 있습니다.

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

1. **Compat adapter (기존 앱에 권장)**: `@intlayer/react-intl`을 설치합니다. `react-intl`과 동일한 API(`IntlProvider`, `useIntl`, `FormattedMessage`, `FormattedNumber`, `FormattedDate`, `defineMessages`, `createIntl`…)를 노출하고 메시지를 Intlayer 사전에서 제공합니다. ICU MessageFormat, 복수형, select, rich text 태그는 이전처럼 동작합니다.
2. **전체 마이그레이션**: react-intl 호출을 `useIntlayer`와 컴포넌트 옆의 `.content.ts` 파일로 점진적으로 교체합니다.

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
npm install intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-intl @intlayer/sync-json-plugin
```

> `react-intl`은 설치된 상태로 두세요. TypeScript 타입을 제공합니다.

</Step>
<Step number={2} title="Intlayer 설정">

`syncJSON` 플러그인이 기존 메시지 파일을 가리키도록 설정하세요. react-intl 카탈로그는 점으로 구분된 id의 평평한 맵입니다.

```json fileName="src/lang/en.json"
{
  "home.title": "Welcome",
  "home.greeting": "Hello {name}",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // react-intl uses ICU MessageFormat
      format: "icu",
      source: ({ locale }) => `./src/lang/${locale}.json`,
      // 'home.title' → dictionary `home`, key `title`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

> 각 id의 첫 번째 세그먼트(`home`)가 Intlayer 사전이 되므로, 각 페이지는 사용하는 사전만 로드합니다. Intlayer가 번역을 다시 기록할 때도 파일은 평평한 형태를 유지합니다.

</Step>
<Step number={3} title="Vite 플러그인 추가">

`reactIntlVitePlugin()`은 Intlayer 빌드를 실행하고 `react-intl`을 `@intlayer/react-intl`로 alias하므로 소스 파일을 수정할 필요가 없습니다.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactIntlVitePlugin } from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

> 다른 번들러를 사용하나요? import를 `@intlayer/react-intl`로 변경하고(5단계 참고) 사용하는 번들러용 Intlayer 플러그인을 쓰세요. 예를 들어 Next.js라면 `next-intlayer`의 `withIntlayer`입니다.

</Step>
<Step number={4} title="IntlProvider에 메시지 전달 중단">

`IntlProvider`는 계속 동작하지만 이제 메시지는 Intlayer가 로드합니다. `messages` prop과 카탈로그 import를 제거하세요.

```tsx fileName="src/main.tsx"
import { IntlProvider } from "react-intl";

export const App = ({ locale }: { locale: string }) => (
  <IntlProvider locale={locale} defaultLocale="en">
    <Home />
  </IntlProvider>
);
```

> `messages`를 계속 전달하면 무시되며 개발 환경에서 경고가 출력됩니다.

</Step>
</Steps>

컴포넌트는 타입이 지정된 id와 함께 변경 없이 계속 동작합니다.

```tsx fileName="src/Home.tsx"
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export const Home = () => {
  const intl = useIntl();

  return (
    <main>
      <h1>{intl.formatMessage({ id: "home.title" })}</h1>
      <FormattedMessage id="home.greeting" values={{ name: "Ada" }} />
      <FormattedNumber value={42} style="currency" currency="EUR" />
    </main>
  );
};
```

## 전체 마이그레이션

<Steps>
<Step number={5} title="명시적인 import 이름 변경 (선택)" isOptional={true}>

alias는 이미 Vite 플러그인이 처리합니다. 의존성을 명시적으로 드러내려면:

| 이전                                            | 이후                                                      |
| ----------------------------------------------- | --------------------------------------------------------- |
| `import { IntlProvider } from 'react-intl'`     | `import { IntlProvider } from '@intlayer/react-intl'`     |
| `import { useIntl } from 'react-intl'`          | `import { useIntl } from '@intlayer/react-intl'`          |
| `import { FormattedMessage } from 'react-intl'` | `import { FormattedMessage } from '@intlayer/react-intl'` |
| `import { defineMessages } from 'react-intl'`   | `import { defineMessages } from '@intlayer/react-intl'`   |
| `import { createIntl } from 'react-intl'`       | `import { createIntl } from '@intlayer/react-intl'`       |

</Step>
<Step number={6} title="콘텐츠를 .content.ts 파일로 옮기기" isOptional={true}>

새 컴포넌트는 기존 react-intl 호출과 함께 네이티브 Intlayer 콘텐츠를 사용할 수 있습니다.

```typescript fileName="src/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```tsx fileName="src/Home.tsx"
import { useIntlayer } from "react-intlayer";

export const Home = () => {
  const { title } = useIntlayer("home");

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

채워진 번역은 JSON 파일에 다시 기록됩니다. AI 설정은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참고하세요.

</Step>
</Steps>

## 마이그레이션 후 삭제할 수 있는 항목

| 파일 / 패턴                       | 더 이상 필요 없는 이유                                          |
| --------------------------------- | --------------------------------------------------------------- |
| `messages` prop 및 카탈로그 로딩  | 사전은 Intlayer가 컴파일하고 로드합니다.                        |
| `formatjs compile` 단계           | Intlayer가 JSON 파일에서 직접 ICU 메시지를 파싱합니다.          |
| `babel-plugin-formatjs`의 id 생성 | 각 id가 사전에 매핑되도록 점으로 구분된 명시적 id를 사용하세요. |

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

- [react-intl compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-intl.md)
- [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)
- [Vite, React와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- [react-i18next에서 마이그레이션](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_react-i18next_to_intlayer.md)
- [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
