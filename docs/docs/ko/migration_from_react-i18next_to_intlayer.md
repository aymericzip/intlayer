---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "react-i18next / i18next에서 Intlayer로 마이그레이션하기 | 국제화 (i18n)"
description: "기존 코드를 손상시키지 않고 단계별로 React 또는 Next.js 애플리케이션을 react-i18next 또는 i18next에서 Intlayer로 마이그레이션하는 방법을 알아봅니다. 원활한 전환을 위해 @intlayer/react-i18next 및 @intlayer/i18next 호환성 어댑터를 사용하세요."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - 마이그레이션
  - 국제화
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# react-i18next / i18next에서 Intlayer로 마이그레이션하기

## 왜 react-i18next / i18next에서 Intlayer로 마이그레이션해야 하나요?

<AccordionGroup>

<Accordion header="번들 크기">

거대한 JSON 파일을 페이지에 불러오는 대신, 필요한 콘텐츠만 불러옵니다. Intlayer는 **번들 및 페이지 크기를 최대 50%까지 줄이도록** 도와줍니다.

</Accordion>

<Accordion header="유지보수성">

애플리케이션 콘텐츠의 스코프를 나누면 대규모 애플리케이션의 **유지보수가 쉬워집니다**. 전체 콘텐츠 코드베이스를 검토할 필요 없이 기능 디렉토리를 복제하거나 삭제할 수 있습니다. 게다가 Intlayer는 콘텐츠의 정확성을 보장하기 위해 **강력한 타입이 적용**되어 있습니다.

Intlayer는 i18n 생태계에서 **가장 활발하게 개발되는** 솔루션이기도 합니다. 문제가 신속히 해결되고 새로운 프레임워크 어댑터가 주기적으로 추가되며, 실제 운영 환경의 피드백을 기반으로 핵심 API가 지속적으로 개선됩니다.

</Accordion>

<Accordion header="AI 에이전트">

콘텐츠의 위치를 통일(Colocation)하면 대규모 언어 모델(LLM)에 필요한 **컨텍스트가 줄어듭니다**. Intlayer에는 누락된 번역을 테스트하기 위한 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)** 및 **[에이전트 스킬](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)** 등 일련의 도구가 있어 AI 에이전트를 위한 개발자 경험(DX)이 훨씬 매끄러워집니다.

</Accordion>

<Accordion header="자동화">

AI 제공 업체의 비용만으로 원하는 LLM을 사용하여 CI/CD 파이프라인에서 번역을 자동화하세요. Intlayer는 콘텐츠 추출을 자동화하기 위한 **컴파일러**와 **백그라운드 번역**을 지원하는 [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)도 제공합니다.

</Accordion>

<Accordion header="성능">

거대한 JSON 파일을 컴포넌트에 연결하면 성능 및 반응성 문제가 발생할 수 있습니다. Intlayer는 빌드 시간에 콘텐츠를 불러오도록 최적화합니다.

</Accordion>

<Accordion header="비개발자와의 스케일업">

Intlayer는 단순한 i18n 솔루션을 넘어, 자체 호스팅이 가능한 **[시각적 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 다국어 콘텐츠를 **실시간**으로 관리할 수 있는 **[풀 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공합니다. 이를 통해 번역가, 카피라이터 및 기타 팀 구성원과 원활하게 협업할 수 있습니다. 콘텐츠는 로컬 및/또는 원격으로 저장될 수 있습니다.

</Accordion>

</AccordionGroup>

---

## 마이그레이션 전략

`react-i18next` / `i18next`에서 Intlayer로 마이그레이션하기 위한 두 가지 보완적 전략이 있습니다:

1. **호환성 어댑터 (기존 앱에 권장)** — `@intlayer/react-i18next` (React 컴포넌트용) 및/또는 `@intlayer/i18next` (핵심 `i18n` 인스턴스용)를 설치하세요. 이러한 패키지들은 `react-i18next` / `i18next`와 **정확히 동일한 API**를 제공하면서 모든 번역 작업을 Intlayer에 위임합니다. `useTranslation`, `Trans`, `withTranslation`, `i18next.t()`에 대한 기존 호출은 그대로 유지됩니다. 변경 사항은 가져오기 경로뿐입니다.

2. **전체 마이그레이션** — `react-i18next` API를 점진적으로 기본 Intlayer 훅(`useIntlayer`, `IntlayerProvider`)으로 교체하고 컴포넌트와 함께 `.content.ts` 파일 내에 콘텐츠를 배치합니다.

이 가이드에서는 먼저 **전략 1** (쉽게 도입할 수 있는 호환성 어댑터)에 대해 설명하고, 선택 사항인 전체 마이그레이션에 대해 알아봅니다.

---

## 목차

<TOC/>

---

## 빠른 마이그레이션

다음 단계는 코드를 변경하지 않고 기존 `react-i18next` 앱을 Intlayer에서 실행하기 위해 필요한 최소한의 작업입니다.

<Steps>

<Step number={1} title="의존성 설치">

Intlayer 핵심 패키지와 호환성 어댑터를 설치합니다:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
bun x intlayer init
```

> `react-i18next`와 `i18next`를 계속 설치해 둘 수 있습니다 — 호환성 어댑터는 TypeScript 타입을 위해 이를 선택적 `devDependencies` / `peerDependencies`로 사용합니다. `package.json`에서 peer 의존성을 변경할 필요가 없습니다.

</Step>

<Step number={2} title="Intlayer 설정">

`intlayer init` 명령어는 초기 `intlayer.config.ts` 파일을 만듭니다. 기존 로케일(언어)과 일치하도록 업데이트하고 `syncJSON` 플러그인이 메시지 파일을 가리키도록 설정하세요:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // 기존에 사용하던 모든 로케일을 여기에 추가하세요
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // react-i18next 플레이스홀더 구문인 {{name}}과 일치시킵니다.
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`**는 로케일을 해당 JSON 파일 경로로 매핑합니다. **`location`**은 Intlayer 관찰자(Watcher)에게 변경 사항을 모니터링할 폴더를 알려줍니다. `format: 'i18next'` 옵션은 `{{name}}`과 같은 플레이스홀더가 올바르게 분석되도록 보장합니다.

</Step>

<Step number={3} title="번들러에 Intlayer 플러그인 추가하기">

기존 번들러 구성을 호환성 플러그인으로 래핑하세요. 이는 핵심 Intlayer 플러그인을 결합하고 콘텐츠 관찰을 연결하며, 가장 중요하게는 **모듈 별칭을 주입**합니다. 따라서 기존의 `import … from 'react-i18next'` (및 `'i18next'`) 호출이 빌드 시 자동으로 `@intlayer/react-i18next` / `@intlayer/i18next`로 리디렉션됩니다. 소스 코드를 변경할 필요가 없습니다.

**Vite의 경우:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()`은 `vite-intlayer`의 `intlayer()` 플러그인을 래핑하며, `react-i18next` / `i18next` 별칭을 자동으로 추가합니다. 일반적인 `vite-intlayer`의 `intlayer()` 플러그인을 사용하면 사전은 컴파일되지만 별칭은 추가**되지 않습니다** — 이 경우 수동으로 `@intlayer/*`를 참조하도록 가져오기 경로를 이름을 변경해야 합니다(단계 4 참고).

**Next.js의 경우:**

`next-i18next` (Pages Router 통합)를 사용하는 경우 `@intlayer/next-i18next`와 `next-intlayer`를 설치하세요:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

그런 다음 `next.config.ts`에 호환성 플러그인을 추가합니다 (`next-i18next` / `react-i18next` / `i18next` 별칭이 주입됩니다):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  /* 귀하의 설정 옵션 */
};

export default withIntlayer(nextConfig);
```

> **`i18next.init()`나 수동 Provider 부트스트래핑이 더 이상 필요하지 않습니다.** Intlayer는 모든 사전을 **빌드 시간**에 컴파일하므로 런타임에 메시지를 불러오는 단계가 없습니다. 별칭으로 적용된 Provider가 초기화를 담당합니다.

</Step>

</Steps>

이것으로 빠른 마이그레이션이 완료되었습니다. 이제 앱은 모든 가져오기와 `react-i18next` API를 그대로 유지한 채 Intlayer에서 작동합니다.

> **자동화된 타입의 번역 키.** Intlayer가 사전을 컴파일하면 `useTranslation` 및 `getFixedT`는 실제 콘텐츠에 대해 타입 검사를 수행합니다. 키는 IDE에서 자동 완성되며 유효하지 않은 경로는 빌드 시에 TypeScript 오류로 나타납니다 — 추가 설정이 필요 없습니다.
>
> ```tsx
> // 'about'은 등록된 사전 키입니다 → t()는 유효한 경로만 수용합니다.
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ 자동 완성
> t("does.not.exist"); // ✗ TypeScript 오류
>
> // 서버 측 (i18next 인스턴스)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ 타입 적용됨
> ```

---

## 전체 마이그레이션

아래 단계는 선택 사항이며 점진적으로 수행할 수 있습니다. 이는 시각적 에디터, CMS, 타입이 있는 콘텐츠 파일, AI 지원 번역 자동화 등 Intlayer의 전체 기능을 열어줍니다.

<Steps>

<Step number={4} title="명시적으로 가져오기 이름 변경 (선택 사항)" isOptional={true}>

Intlayer 플러그인은 이미 번들러 수준에서 별칭 지정을 처리합니다. 소스 파일에서 명시적으로 의존성을 나타내고 싶다면 수동으로 가져오기 경로를 변경할 수 있습니다:

| 변경 전                                            | 변경 후                                                      |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Next.js (`next-i18next`)의 경우:

| 변경 전                                                                        | 변경 후                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>

<Step number={5} title="AI 기반 번역 자동화 활성화" isOptional={true}>

Intlayer 설정이 완료되면, CLI를 사용하여 누락된 번역을 자동으로 채울 수 있습니다:

```bash packageManager="npm"
# 누락된 번역 테스트 (CI에 추가)
npx intlayer test

# AI를 사용하여 누락된 번역 채우기
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

AI 구성을 `intlayer.config.ts`에 추가하세요:

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
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // 기본값
    // model: "gpt-4o-mini",   // 기본값
  },
};

export default config;
```

> 사용할 수 있는 모든 옵션은 [Intlayer CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)에서 확인하세요.

</Step>

</Steps>

---

## 마이그레이션 후 삭제할 수 있는 항목

호환성 어댑터가 제자리에 배치되면 기존에 사용하던 표준 `react-i18next` / `i18next` 상용구를 삭제할 수 있습니다:

| 파일 / 패턴                            | 더 이상 필요 없는 이유                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` 호출                  | Intlayer Provider는 모든 것을 자동으로 초기화하며 런타임에 불러오는 단계가 없습니다.                                                  |
| `I18nextProvider` / `initReactI18next` | Intlayer 플러그인이 내부적으로 의존성 주입(injection) 및 부트스트래핑을 담당합니다.                                                   |
| JSON 언어 번들 (`locales/*.json`)      | JSON 번들은 `syncJSON` 플러그인을 여전히 사용할 때만 필요합니다. `.content.ts` 파일로 이전을 완료하면 JSON 폴더를 삭제할 수 있습니다. |

한 단계 더 나아갈 준비가 되면 Intlayer는 **코드베이스 내의 모든 `.content.ts` 및 `.content.json` 파일을 자동으로 감지합니다**(기본적으로 `./src` 내의 어느 곳에서든). `MyComponent.tsx` 바로 옆에 `my-component.content.ts` 파일을 추가하기만 하면 Intlayer는 별도 설정 없이 컴파일 타임에 이를 감지합니다 — 가져오기, 등록, 중앙 인덱스 파일이 필요 없습니다. 페이지와 컴포넌트에서 번역의 위치 통일이 매우 매끄러워집니다.

---

## TypeScript 설정

Intlayer는 번역 키에 대해 전체 TypeScript IntelliSense(자동 완성)를 제공하기 위해 모듈 확장을 사용합니다. `tsconfig.json` 파일에 자동으로 생성된 타입이 포함되어 있는지 확인하세요:

```json5 fileName="tsconfig.json"
{
  // ... 기존 TypeScript 설정
  "include": [
    // ... 기존 TypeScript 설정
    ".intlayer/**/*.ts", // 자동으로 생성된 타입 포함
  ],
}
```

---

## Git 설정

Intlayer가 생성한 디렉토리를 `.gitignore`에 추가하세요:

```plaintext fileName=".gitignore"
# Intlayer에서 생성된 파일 무시
.intlayer
```

---

## 더 알아보기

- **시각적 에디터** — 브라우저에서 시각적으로 번역을 관리하세요: [Intlayer 시각적 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
- **CMS** — 콘텐츠를 외부로 분리하고 원격으로 관리하세요: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)
- **VS Code 확장** — 실시간 번역 자동 완성 및 오류 감지를 경험하세요: [Intlayer VS Code 확장](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/vs_code_extension.md)
- **CLI 레퍼런스** — 사용 가능한 CLI 명령어 목록: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)
- **Intlayer와 React** — React 전체 설정 가이드: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)
- **Intlayer와 Next.js** — Next.js 전체 설정 가이드: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md)
