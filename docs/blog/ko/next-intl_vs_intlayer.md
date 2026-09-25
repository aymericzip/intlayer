---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs Intlayer: 2026 벤치마크 및 비교"
description: "Next.js App Router와 TanStack Start에서 next-intl과 Intlayer를 비교 측정했습니다. 번들 크기, 콘텐츠 누출, 컴포넌트 크기, 하이드레이션, 로케일 전환 속도 및 개발자 경험."
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | React & Next.js 국제화(i18n) 벤치마크

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl`은 Next.js에서 가장 널리 사용되는 i18n 라이브러리입니다. Intlayer는 컴파일러 기반의 컴포넌트 스코프 대안입니다. 두 라이브러리 모두 App Router 애플리케이션을 현지화합니다. 질문은 앱이 빌드된 후 각각의 비용이 얼마인가 하는 것입니다.

이 기사는 튜토리얼이 아닙니다. 각 라이브러리로 동일한 애플리케이션을 빌드하고 브라우저가 실제로 다운로드하고 실행하는 것을 측정하는 오픈 소스 벤치마크 스위트인 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)의 수치로 뒷받침된 비교입니다.

<TOC/>

> **요약 (tl;dr)**: `next-intl`은 런타임 비용만으로도 페이지당 최소 **+12.6 KB gzip**을 추가하며, 표준 설정(`static` 및 `dynamic`)에서 **다른 페이지 문자열의 약 90%를 누출**합니다. 이 누출을 제거하려면 카탈로그를 네임스페이스로 분할하고 페이지별로 수동 선택해야 하는 번거로운 작업이 필요합니다. 반면 `Intlayer` 컴파일러는 추가 설정 없이도 **누출 0%**, **3배 더 작은 컴포넌트 크기**, 기본 앱 대비 단 **+0.3 KB** 증가만을 보장합니다.

## 한눈에 보기

- **next-intl** - Next.js 커뮤니티의 표준. 언어별 중앙 집중식 JSON 사전, 완전한 ICU MessageFormat 지원, Next.js 요청 처리 및 라우팅과의 긴밀한 통합.
- **Intlayer** - 컴포넌트 중심 콘텐츠 모델. `.content.ts` 파일이 담당 컴포넌트 바로 옆에 위치하며, 빌드 타임 컴파일러가 컴포넌트 및 로케일별로 트리 셰이킹과 지연 로딩을 수행하고 엄격한 TypeScript 타입을 자동으로 생성합니다.

| 라이브러리            | GitHub 스타                                                                                                                                                                    | 총 커밋 수                                                                                                                                                                         | 최근 커밋                                                                                                                                           | 첫 릴리스  | NPM 버전                                                                                                      | NPM 다운로드 수                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024년 4월 | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | 2021년 3월 | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> 배지는 자동으로 업데이트됩니다.

## 기능별 직접 비교

| 기능                                          | Intlayer (`react-intlayer` / `next-intlayer`)                                | next-intl (`next-intl` / `use-intl`)                       |
| --------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **컴포넌트 인근 번역 파일 배치**              | ✅ 예, 각 컴포넌트와 함께 `.content.ts` 위치                                 | ❌ `messages/` 폴더 내 중앙 집중식 JSON 사전               |
| **TypeScript 통합**                           | ✅ 콘텐츠로부터 자동 생성되는 엄격한 타입                                    | ⚠️ 메시지 경로에 대한 수동 `global.d.ts` 설정을 통해 지원  |
| **누락된 번역 감지**                          | ✅ TypeScript 오류 + 빌드 타임 오류/경고                                     | ⚠️ 런타임에서 누락된 키를 반환하거나 설정에 따라 오류 발생 |
| **풍부한 콘텐츠 (JSX / Markdown / 컴포넌트)** | ✅ 직접 지원                                                                 | ⚠️ 컴포넌트 매핑을 포함한 `t.rich()`를 통해 지원           |
| **ICU MessageFormat 지원**                    | ⚠️ 개발 중                                                                   | ✅ 예, 완전한 ICU 지원                                     |
| **동기식 서버 컴포넌트 지원**                 | ✅ `next-intlayer/server`의 `useIntlayer`가 자식 서버 컴포넌트에서 즉시 작동 | ❌ 비동기 서버 부모로부터 props를 통해 번역을 전달해야 함  |
| **트리 셰이킹 (Tree-shaking)**                | ✅ 컴포넌트 및 로케일별로 컴파일러가 자동 수행                               | ⚠️ 네임스페이스를 수동 분할하고 `pick()`을 사용해야 함     |
| **지연 로딩 (Lazy loading)**                  | ✅ 단 한 줄의 설정 (`importMode: 'dynamic'`)                                 | ⚠️ `getRequestConfig`에서 수동 동적 import 필요            |
| **비주얼 에디터 / CMS**                       | ✅ 무료 비주얼 에디터 + 선택적 CMS                                           | ❌ 없음                                                    |
| **AI 기반 자동 번역**                         | ✅ 내장 기능, 자체 API 키 사용                                               | ❌ 없음                                                    |
| **MCP 서버 및 에이전트 스킬**                 | ✅ 지원                                                                      | ❌ 없음                                                    |

## 벤치마크

### 측정 항목

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 테스트 스위트는 각 라이브러리로 **동일한 애플리케이션**을 빌드합니다. **10개 페이지**(home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10개 언어**(`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트 및 동일한 콘텐츠로 구성됩니다. 페이지는 `en`과 `fr`로 측정됩니다. 각 라이브러리는 최대 4가지 **로딩 전략**으로 구현되었습니다.

| 전략               | 설명                                                                | 대상 사용자                   |
| ------------------ | ------------------------------------------------------------------- | ----------------------------- |
| **static**         | 모든 로케일과 모든 페이지를 시작 시 함께 번들링하여 로드            | 빠른 프로토타입, AI 생성 코드 |
| **dynamic**        | 활성 로케일만 로드하지만, 모든 페이지를 한 번에 가져옴              | 대부분의 프로젝트             |
| **scoped-static**  | 라우트별 네임스페이스 분할, 지연 로딩 없음                          | 드문 경우                     |
| **scoped-dynamic** | 라우트별 네임스페이스 + 지연 로딩. 현재 로케일의 현재 페이지만 전송 | 엄격한 성능 예산이 필요한 앱  |

Intlayer에는 "scoped" 변형이 없습니다. 컴파일러가 콘텐츠 범위를 **컴포넌트별로** 자동 제한하므로 `static` 및 `dynamic` 행이 이미 스코프화되어 있습니다.

각 빌드에 대해 스위트는 다음을 기록합니다:

- **라이브러리 크기 (Lib size)**: i18n 라이브러리만 가져오는 빈 컴포넌트의 gzip 크기.
- **페이지 JS (Page JS)**: 페이지당 다운로드된 gzip JavaScript 크기.
- **로케일 누출률 (Locale leak %)**: 사용자가 보지 않는 로케일에 속한 문자열의 비율.
- **페이지 누출률 (Page leak %)**: 사용자가 머물고 있지 않은 페이지에 속한 문자열의 비율.
- **컴포넌트 평균 크기 (Component avg)**: 격리되어 컴파일된 각 컴포넌트의 평균 gzip 크기.
- **E2E 반응성**: 새 언어 선택부터 DOM의 `html[lang]` 업데이트까지의 시간.
- **하이드레이션 (Hydration)**: React 하이드레이션 단계의 소요 시간.

> 아래 수치는 `next-intl` 4.14.2 및 `intlayer` 9.5.1을 사용한 **2026-09-12** 실행 결과입니다.

### Next.js (App Router) 결과

관심 있는 메트릭과 라이브러리를 선택하세요:

<I18nBenchmark framework="nextjs" vertical/>

| 라이브러리                   | 전략           | 라이브러리 크기 (gz) | 평균 페이지 JS (gz) | 로케일 누출 | 페이지 누출 | 평균 컴포넌트 (gz) |  E2E 반응성 | 하이드레이션 |
| ---------------------------- | -------------- | -------------------: | ------------------: | ----------: | ----------: | -----------------: | ----------: | -----------: |
| **기본 앱** (i18n 없음)      | -              |               0.0 KB |            141.0 KB |        0.0% |        0.0% |             0.9 KB |     13.4 ms |      11.8 ms |
| `next-intl`                  | static         |              14.7 KB |            153.6 KB |        4.2% |       89.8% |            21.8 KB |     16.0 ms |      14.7 ms |
| `next-intl`                  | dynamic        |              14.7 KB |            153.6 KB |        9.7% |       89.9% |            21.8 KB |     15.6 ms |      14.8 ms |
| `next-intl`                  | scoped-static  |              14.7 KB |            153.6 KB |        0.0% |        0.0% |            80.1 KB |     17.9 ms |      17.4 ms |
| `next-intl`                  | scoped-dynamic |              14.7 KB |            153.6 KB |        0.0% |        0.0% |            22.9 KB |     17.8 ms |      16.8 ms |
| **`next-intlayer`**          | static         |           **5.5 KB** |        **141.3 KB** |    **0.0%** |    **0.0%** |         **8.5 KB** | **15.5 ms** |      16.9 ms |
| **`next-intlayer`**          | dynamic        |           **5.5 KB** |        **141.3 KB** |    **0.0%** |    **0.0%** |         **6.9 KB** | **15.3 ms** |      15.9 ms |
| `@intlayer/next-intl` (호환) | static         |               8.0 KB |            147.5 KB |        0.0% |        0.0% |             8.1 KB |     14.5 ms |      12.8 ms |
| `@intlayer/next-intl` (호환) | dynamic        |               8.0 KB |            148.7 KB |        0.0% |        0.0% |             8.1 KB |     11.7 ms |      12.8 ms |

**결과 해석**

- **런타임 비용.** 기본 앱은 페이지당 141.0 KB입니다. `next-intl`은 이를 153.6 KB(**모든 페이지에서 +12.6 KB gzip**)로 늘리지만, Intlayer는 141.3 KB(**+0.3 KB**)로 거의 차이가 없습니다.
- **콘텐츠 누출.** 가장 흔히 사용되는 설정(`static` 및 `dynamic`)에서 `next-intl`은 전체 `en.json`이 클라이언트 공급자에 들어가기 때문에 페이지마다 **다른 페이지 문자열의 약 90%**를 전송합니다. 이를 0%로 만들려면 복잡한 수동 네임스페이스 분할이 필요하지만, Intlayer는 기본적으로 0%입니다.
- **컴포넌트 크기.** `useTranslations()`를 호출하는 컴포넌트는 평균 21.8 KB로 컴파일되지만, `useIntlayer()`를 사용하는 동일한 컴포넌트는 단 6.9 KB입니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 모든 라이브러리와 전략이 포함된 전체 표는 [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)에서 확인하세요.

### TanStack Start (`use-intl`) 결과

`use-intl`은 `next-intl`의 프레임워크 독립적인 핵심 코어입니다. 동일한 API, 동일한 메시지 형식을 사용합니다. TanStack Start에서 이를 `intlayer`와 비교하면 방정식에서 Next.js 관련 요소를 배제할 수 있습니다.

| 라이브러리                  | 전략           | 라이브러리 크기 (gz) | 평균 페이지 JS (gz) | 로케일 누출 | 페이지 누출 | 평균 컴포넌트 (gz) | E2E 반응성 |
| --------------------------- | -------------- | -------------------: | ------------------: | ----------: | ----------: | -----------------: | ---------: |
| **기본 앱** (i18n 없음)     | -              |               0.0 KB |            111.0 KB |        0.0% |        0.0% |             0.7 KB |     8.1 ms |
| `use-intl`                  | static         |              14.1 KB |            179.8 KB |       50.0% |       89.8% |            76.0 KB |     6.7 ms |
| `use-intl`                  | dynamic        |              14.1 KB |            119.4 KB |        0.0% |       89.8% |            75.9 KB |     7.0 ms |
| `use-intl`                  | scoped-static  |              14.1 KB |            128.7 KB |        0.0% |        0.0% |            87.1 KB |    20.9 ms |
| `use-intl`                  | scoped-dynamic |              14.1 KB |            128.7 KB |        0.0% |        0.0% |            87.1 KB |    13.3 ms |
| **`intlayer`**              | static         |           **5.0 KB** |        **125.8 KB** |       50.0% |    **0.0%** |         **8.1 KB** | **3.2 ms** |
| **`intlayer`**              | dynamic        |           **5.0 KB** |        **118.6 KB** |    **0.0%** |    **0.0%** |         **6.3 KB** | **3.6 ms** |
| `@intlayer/use-intl` (호환) | dynamic        |               7.3 KB |            129.7 KB |        0.0% |        0.0% |             9.3 KB |     8.7 ms |

**결과 해석**

- 단순한 `use-intl` 설정은 기본 앱보다 **페이지당 68.8 KB 더 많은 JS**를 전송합니다.
- `dynamic` 모드에서도 `use-intl`은 119.4 KB에 달하며 여전히 **89.8%의 페이지 누출**을 유지합니다.
- 아키텍처의 차이는 **컴포넌트 크기**에서 명확히 드러납니다. `use-intl`의 76-87 KB 대비 Intlayer는 6-8 KB에 불과합니다.
- **로케일 전환 속도**는 Intlayer가 2~4배 더 빠릅니다(3 ms vs 7-21 ms).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> 전체 표는 [TanStack Start 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)에서 확인하세요.

## 왜 이런 차이가 발생하는가? 중앙 집중식 카탈로그 vs 컴파일된 사전

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl`은 전통적인 방식을 따릅니다. 로케일당 하나의 JSON 파일이 `getRequestConfig`에서 로드되고, `NextIntlClientProvider`에 전달되며, `t("namespace.key")`로 읽힙니다.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

런타임은 페이지에서 어떤 키가 사용될지 미리 알 수 없으므로 전체 카탈로그를 전송하는 것이 유일하게 안전한 기본값입니다.

최적화에 도달하지 못할 때 발생하는 비용은 페이지와 언어라는 두 축에서 동시에 증가합니다:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer는 이 구조를 완전히 뒤집습니다. 콘텐츠는 컴포넌트 바로 옆에 선언됩니다.

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

빌드 시 컴파일러는 어떤 컴포넌트가 어떤 사전을 가져오는지 감지하여 활성 로케일에 필요한 사전만 번들링합니다.

> `dynamic` 행의 수치를 얻으려면 `intlayer.config.ts`에서 `dictionary.importMode: 'dynamic'`을 설정하세요. [번들 최적화 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참조하세요.

## 개발자 경험

### 클라이언트 컴포넌트

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/ClientCounter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> 이 컴포넌트를 렌더링하는 모든 페이지에서 `NextIntlClientProvider`에 전달되는 메시지에 `counter` 네임스페이스를 포함해야 합니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

페이지에 등록할 것이 전혀 없습니다: 컴포넌트가 자체 콘텐츠를 직접 가져옵니다.

</Tab>
</Tabs>
### 동기식 서버 컴포넌트

디자인 시스템 요소(내비게이션 바, 바닥글, 카드 등)는 클라이언트 컴포넌트의 자식으로 렌더링되는 서버 컴포넌트인 경우가 많으므로 비동기(`async`)일 수 없습니다.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

페이지에서 `await getTranslations("counter")` 및 `await getFormatter()`를 실행한 다음 결과를 props로 전달해야 합니다. 컴포넌트는 더 이상 독립적이지 않습니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>
### 메타데이터

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## next-intl API 유지 및 Intlayer 출력 획득

위의 벤치마크 결과를 얻기 위해 기존 컴포넌트를 모두 다시 작성할 필요는 없습니다. `@intlayer/next-intl`은 드롭인 어댑터입니다. `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, ICU 복수형을 그대로 유지하면서 Intlayer 컴파일러로 컴파일된 Intlayer 사전에서 콘텐츠를 제공합니다.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

벤치마크에서 동일한 앱의 호환 빌드는 애플리케이션 코드를 전혀 수정하지 않고도 페이지당 **153.6 KB에서 147.5 KB**로, 컴포넌트당 **21.8 KB에서 8.1 KB**로 줄었으며, 페이지 누출은 **약 90%에서 0%**로 개선되었습니다. 기존 `messages/{locale}.json` 파일은 [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/next-intl.md)을 통해 계속 단일 소스로 유지할 수 있습니다.

자세한 단계는 [next-intl 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md)를 참조하세요.

## 언제 무엇을 선택해야 할까요?

<AccordionGroup>
<Accordion header="next-intl 선택">

Next.js의 생태계 표준을 원하고, ICU MessageFormat에 의존하며, 앱이 중소 규모이거나 중앙 집중식 JSON을 요구하는 번역 플랫폼(Crowdin, Phrase, Lokalise...)과 연동하는 경우. 성능이 중요하다면 카탈로그를 네임스페이스로 나누고 페이지별로 `pick()`을 통해 메시지를 선별하는 시간을 고려해야 합니다.

</Accordion>
<Accordion header="Intlayer 선택">

**컴포넌트 스코프 콘텐츠**, **엄격한 TypeScript**, **빌드 타임 누락 키 에러**, **노력 없는 트리 쉐이킹 및 지연 로딩**, 동기식 서버 컴포넌트, 내장 편집 툴([비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md), [AI 번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md), [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md))을 원하는 경우. 특히 대규모 모듈식 코드베이스 및 디자인 시스템에 적합합니다.

</Accordion>
<Accordion header="@intlayer/next-intl 선택">

이미 `next-intl`을 사용 중이며 코드 재작성 없이 번들 크기를 줄이고자 하는 경우. [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/next-intl.md)는 기존 import 구문과 `messages/{locale}.json` 파일을 단일 진실 공급원으로 유지합니다. [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-intl_vs_intlayer-next-intl.md)에서 나란히 측정되었습니다.

</Accordion>
</AccordionGroup>

## 자주 묻는 질문 (FAQ)

<FAQ>

<Question title="next-intl은 Intlayer보다 느린가요?">

렌더링 시점에는 그렇지 않습니다. 차이점은 클라이언트에 전달되는 번들 크기에 있습니다. `next-intl`은 각 페이지마다 **+12.6 KB gzip**의 런타임 비용이 발생하며, 일반적인 설정에서는 다른 페이지의 문자열 중 약 90%를 함께 전송합니다. 언어 전환 및 하이드레이션 시간은 Next.js에서 유사합니다(15-18 ms). TanStack Start에서는 `use-intl`이 7-21 ms 걸리는 반면 Intlayer는 3-4 ms에 불과합니다.

</Question>

<Question title="next-intl로 누출률 0%를 달성할 수 있나요?">

네, `scoped-dynamic` 설정을 통해 가능합니다. `messages/{locale}.json`을 라우트당 하나의 네임스페이스로 분할한 다음 각 페이지에서 `pick(messages, [...])`을 사용하고 컴포넌트 변경 시 이 매핑을 정확하게 유지해야 합니다. 벤치마크의 `scoped-*` 행이 바로 이러한 작업의 결과입니다. Intlayer는 컴파일러가 컴포넌트별로 콘텐츠 범위를 지정하므로 별도 작업 없이 기본적으로 0%에 도달합니다. [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참조하세요.

</Question>

<Question title="마이그레이션하려면 컴포넌트를 다시 작성해야 하나요?">

아닙니다. `@intlayer/next-intl`은 `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, ICU 복수형 및 네비게이션 헬퍼를 유지하며, 컴파일된 딕셔너리에서 이를 제공합니다. `next.config.ts`에 플러그인 한 줄만 추가하면 됩니다. 단계별 안내는 [next-intl 마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md)를 참조하세요.

</Question>

<Question title="Intlayer는 ICU MessageFormat을 지원하나요?">

네이티브 API에서 ICU 지원은 지속적으로 확장 중입니다. 호환 어댑터(`@intlayer/next-intl`, `@intlayer/use-intl`)는 이미 ICU를 지원합니다: 복수형, `select`, `selectordinal`, `#`, `{ts, date, long}`은 Intlayer의 ICU 리졸버를 통해 처리됩니다. 자세한 내용은 [ICU 메시지 포맷 설명](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)을 참조하세요.

</Question>

<Question title="messages/{locale}.json 파일을 그대로 유지할 수 있나요?">

네. [JSON 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/next-intl.md)이 해당 파일을 읽어 최상위 키를 딕셔너리로 분할하고, CLI나 CMS가 번역을 업데이트할 때 동일한 파일에 다시 기록합니다. 번역 팀의 워크플로는 변경되지 않습니다.

</Question>

</FAQ>

## 관련 비교

동일한 벤치마크, 다른 라이브러리:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/react-i18next_vs_react-intl_vs_intlayer.md)

next-intl 심층 분석:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-intl_vs_intlayer-next-intl.md), 동일한 앱에서 측정된 어댑터
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_next-intl_outdated.md)
- [Using Intlayer with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/intlayer_with_next-intl.md)
- [How to internationalize a Next.js app with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_using_next-intl.md)

참고 문서:

- [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md) 및 [TanStack Start 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)
- [호환 어댑터: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/next-intl.md) 및 [마이그레이션 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-intl_to_intlayer.md)
- [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md) 및 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)
- [컴포넌트별 vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
- [컴파일러 기반 vs 선언적 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)

## GitHub STARS

GitHub 스타 수는 프로젝트의 인기, 커뮤니티의 신뢰 및 장기적인 지속 가능성을 보여주는 강력한 지표입니다.

[![스타 히스토리 차트](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## 결론

`next-intl`은 탄탄하고 잘 유지 관리되는 라이브러리이며, 벤치마크에서도 Next.js 환경에서 결코 나쁜 선택이 아님을 확인할 수 있습니다. 하지만 중앙 집중식 카탈로그 모델은 최적화의 모든 부담을 개발자에게 전가합니다. 단순한 설정에서는 다른 페이지 콘텐츠가 약 90% 누출되며, 런타임 자체만으로도 모든 페이지에서 +12.6 KB gzip의 비용이 발생합니다.

Intlayer는 이 모든 작업을 컴파일러로 이전합니다. 컴포넌트별 사전, 로케일별 지연 로딩, 미사용 콘텐츠 정리는 규칙이 아닌 자동 빌드 결과물입니다. 동일한 앱에서 얻은 결과는 **페이지당 +0.3 KB**, **누출 0%**, **3배 더 작은 컴포넌트**, TanStack Start에서 **2~4배 더 빠른 로케일 전환**이었습니다.

모든 원시 데이터, 테스트 앱 및 스크립트는 [Benchmark Bloom 저장소](https://github.com/intlayer-org/benchmark-bloom)에 공개되어 있습니다. 직접 실행해 보세요.

자세한 내용은 ['Why Intlayer?' 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참조하세요.
