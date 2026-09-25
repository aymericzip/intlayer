---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs @intlayer/i18next: 동일한 API, 완전히 다른 번들 크기"
description: React 또는 Next.js 앱이 기존의 i18next, react-i18next, next-i18next 호출을 그대로 유지하면서 @intlayer/i18next 어댑터를 통해 제공될 때 무엇이 달라지는지 알아봅니다. 동일한 코드에서 측정한 페이지별 JavaScript 용량, 컴포넌트 크기, 문자열 누수 및 하이드레이션 성능과 어댑터의 지원 범위를 상세히 분석합니다.
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - 호환 어댑터
  - 마이그레이션
  - 국제화
  - i18n
  - 벤치마크
  - 번들 크기
  - 블로그
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | 동일한 API, 완전히 다른 번들 크기

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next`, `@intlayer/next-i18next`는 호환성 어댑터입니다. 기존 코드에서 이미 사용 중인 `i18next` API(`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations` 등)를 그대로 노출하면서, Intlayer가 컴파일한 딕셔너리로부터 번역 데이터를 공급합니다. 컴포넌트는 단 한 줄도 바꿀 필요가 없으며, 그 밑에서 동작하는 런타임만 교체됩니다.

이 글은 동일한 Next.js 애플리케이션을 `next-i18next`와 `@intlayer/next-i18next`로 각각 빌드하여 측정한 결과를 다룹니다. 측정 수치는 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)에서 추출되었습니다. 라이브러리 자체의 기능 비교는 [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_intlayer.md)를 참고하세요. 본 글은 기존 코드를 그대로 유지할 때 어댑터가 무엇을 바꾸어 놓는지를 집중 조명합니다.

<TOC/>

> **핵심 요약 (tl;dr)**: 동일한 Next.js 애플리케이션에서 `next-i18next`를 `@intlayer/next-i18next`로 교체한 결과, 페이지당 다운로드되는 gzip JavaScript가 **218.5 KB에서 150.7 KB**로 대폭 감소했으며(초기 설정 기준), 완전히 최적화된 `next-i18next` 설정(163.4 KB)보다도 **12.7 KB** 더 가벼웠습니다. 컴포넌트의 평균 크기는 **78.5 KB에서 9.7 KB**로 줄어들었고, 다른 페이지의 번역 문자열 누수는 **~90%에서 0%**로 사라졌으며, 하이드레이션 시간은 **15.6 ms에서 11.3 ms**로 단축되었고, 런타임 용량은 **19.7 KB에서 9.4 KB**로 축소되었습니다. 컴포넌트 코드는 수정되지 않았으며 Provider 파일 하나만 변경되었습니다. `i18next` 플러그인(백엔드, 언어 감지기)은 선언할 수 있지만 런타임에 로드하거나 감지할 대상이 없으므로 아무 동작도 하지 않습니다.

## `@intlayer/i18next`의 정체

`i18next`는 런타임 프레임워크입니다. `i18n.init({ resources })` 또는 백엔드 플러그인이 `locales/{lng}/{ns}.json`을 전역 인스턴스로 로드하고, `useTranslation("about")`이 컴포넌트를 구독시키며, `t("title")`이 렌더링 시점에 키를 조회합니다. 네임스페이스 분할, 지연 로딩, 페이지별 네임스페이스 목록, 타입 안정성 유지는 모두 개발자가 직접 구성하고 관리해야 합니다.

어댑터는 기존 API를 그대로 보존하면서 전역 인스턴스 구조를 제거합니다.

1. **임포트 별칭(Aliasing).** `@intlayer/next-i18next/plugin`의 `createNextI18nPlugin()`(또는 `withI18next`)이 `withIntlayer`를 감싸고 Webpack / Turbopack 별칭을 추가하여, `next-i18next`, `react-i18next`, `i18next`가 각각의 `@intlayer/*` 패키지로 해석되도록 합니다. Vite 환경에서는 `@intlayer/react-i18next/plugin`의 `reactI18nextVitePlugin()`이 같은 역할을 담당합니다. 임포트 경로를 수정할 필요가 없습니다.
2. **단일 진실 공급원(SSOT)으로서의 JSON.** `syncJSON` 플러그인이 기존의 `locales/{lng}/{ns}.json` 파일을 `format: "i18next"`로 읽어 들이고(`{{name}}`, `$t()` 중첩, `_one` / `_other`, 컨텍스트 접미사 정상 파싱), CLI나 CMS가 업데이트할 때 번역을 다시 기록합니다.
3. **호출 위치 바인딩.** Intlayer 최적화 단계가 `useTranslation("about")`을 재작성하여, 활성 로케일의 `about` 딕셔너리를 직접 전달받는 호출로 변환합니다. 컴포넌트는 전역 스토어에 접근하지 않게 됩니다.

```tsx fileName="components/About.tsx"
// 기존 코드 그대로 유지
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="컴파일러가 생성하는 코드 (단순화)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

이 컴파일러 재작성이 컴포넌트 크기를 혁신적으로 줄이고 페이지 문자열 누수를 완전히 제거하는 핵심 원리입니다.

## 어댑터의 지원 범위: 유지, 무시, 대체 불가 항목

| `i18next` API                                                                   | `@intlayer/*` 적용 시 동작                                                                           |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ 유지. 빌드 타임에 `ns` 딕셔너리에 바인딩되며, 실제 콘텐츠를 기반으로 엄격하게 타입 추론됨         |
| `t("key", { name })`, `{{interpolation}}`, `$t(key)` 중첩                       | ✅ 유지                                                                                              |
| 복수형 `key_one` / `key_other`, 컨텍스트 `key_male`, `returnObjects`            | ✅ 유지. 복수형은 `Intl.PluralRules`로 평가됨                                                        |
| `components`, 번호 태그 `<1>...</1>`, `values`를 포함한 `<Trans>`               | ✅ 유지                                                                                              |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ 유지                                                                                              |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ 유지. `changeLanguage`가 Intlayer의 로케일을 전환함                                               |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ 유지                                                                                              |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()`는 플러그인의 `init`을 호출하고 종료됨. 런타임에 로드하거나 감지할 데이터가 없음           |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources`는 개발 경고와 함께 **무시**됨. 번들 감소 효과를 누리려면 JSON 임포트를 제거해야 함    |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ `IntlayerProvider`를 렌더링하며 `i18n` prop은 무시됨. App Router에서는 locale을 전달함(아래 참고) |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ 기대하는 규격의 객체를 반환하며 아무것도 로드하지 않음. 남겨두어도 무방하고 삭제해도 안전함       |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ 유지                                                                                              |
| `next-i18next.config.js`                                                        | ⚠️ 읽히지 않음. 로케일 설정은 `intlayer.config.ts`에서 관리함                                        |
| 네임스페이스를 지정하지 않은 `useTranslation()`                                 | ✅ 파일 전체 `translation` 딕셔너리를 대상으로 정상 동작함 (`splitKeys: false`)                      |

## 벤치마크 분석

### 측정 환경 및 방식

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 테스트 스위트는 모든 구성에서 **완벽하게 동일한 애플리케이션**을 빌드했습니다. **10개 페이지**(home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10개 로케일**(`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트와 동일한 텍스트로 구성되며, `en`과 `fr` 페이지를 정밀 측정했습니다.

`next-i18next`는 모든 언어의 JSON을 `resources`에 인라인하는 방식(`static`)부터 백엔드를 통해 경로별로 지연 로딩하는 방식(`scoped-dynamic`)까지 4가지 전략으로 테스트되었습니다. 어댑터는 **기본 설정과 완전히 동일한 컴포넌트** 위에서 `next.config.ts`, `intlayer.config.ts`, Provider 파일만 교체하여 빌드되었습니다. 컴파일러가 컴포넌트 단위로 번역 범위를 제한하므로 별도의 수동 "scoped" 변형이 필요하지 않습니다.

측정 항목:

- **Lib size**: i18n 라이브러리만 임포트한 빈 컴포넌트의 gzip 크기.
- **Page JS**: 전 페이지와 전 로케일에 걸쳐 다운로드된 페이지당 평균 gzip JavaScript 용량.
- **Locale leak %**: 다운로드된 JS 중 사용자가 **보고 있지 않은** 언어의 문자열이 차지하는 비율.
- **Page leak %**: 다운로드된 JS 중 사용자가 **방문하지 않은** 페이지의 문자열이 차지하는 비율.
- **Component avg**: 격리 컴파일된 각 컴포넌트의 평균 gzip 크기.
- **E2E reactivity**: 새 로케일을 선택한 시점부터 DOM의 `html[lang]`이 갱신되기까지의 실측 시간(Playwright, 5회 반복).
- **Hydration**: React 하이드레이션 단계 소요 시간.

> 아래 수치는 **2026-09-12** 기준이며, `next-i18next` 16.3.0(`react-i18next` 17.0.13, `i18next` 26.4.2) 및 `@intlayer/next-i18next` 9.5.1을 사용했습니다. 테스트 앱은 비교를 명확히 하기 위해 작게 설계되었으므로(언어당 수십 개 문자열), 누수 백분율은 **경향성**을 보여줍니다. 즉, 콘텐츠가 늘어날수록 누수량은 기하급수적으로 커집니다.

### Next.js 벤치마크 결과

관심 있는 메트릭과 라이브러리를 선택하세요:

<I18nBenchmark framework="nextjs" vertical/>

| 설정                         | 전략           | Lib 크기 (gz) | 페이지 JS 평균 (gz) | 로케일 누수 | 페이지 누수 | 컴포넌트 평균 (gz) | E2E 반응속도 | 하이드레이션 |
| ---------------------------- | -------------- | ------------: | ------------------: | ----------: | ----------: | -----------------: | -----------: | -----------: |
| **base** (i18n 미사용)       | -              |        0.0 KB |            141.0 KB |        0.0% |        0.0% |             0.9 KB |      13.4 ms |      11.8 ms |
| `next-i18next`               | static         |       19.7 KB |            218.5 KB |        0.0% |       89.8% |            78.5 KB |      16.4 ms |      15.6 ms |
| `next-i18next`               | dynamic        |       19.7 KB |            169.5 KB |       50.0% |       89.8% |            26.1 KB |      15.4 ms |      27.7 ms |
| `next-i18next`               | scoped-static  |       19.7 KB |            220.1 KB |        0.0% |       89.8% |            78.9 KB |      16.4 ms |      14.7 ms |
| `next-i18next`               | scoped-dynamic |       19.7 KB |            163.4 KB |        0.0% |        0.0% |            27.1 KB |      15.9 ms |      15.1 ms |
| **`@intlayer/next-i18next`** | static         |    **9.4 KB** |        **150.7 KB** |    **0.0%** |    **0.0%** |         **9.7 KB** |  **10.7 ms** |  **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |    **9.4 KB** |        **150.7 KB** |    **0.0%** |    **0.0%** |         **9.7 KB** |  **11.9 ms** |  **10.6 ms** |
| `next-intlayer` (네이티브)   | static         |        5.5 KB |            141.3 KB |        0.0% |        0.0% |             8.5 KB |      15.5 ms |      16.9 ms |
| `next-intlayer` (네이티브)   | dynamic        |        5.5 KB |            141.3 KB |        0.0% |        0.0% |             6.9 KB |      15.3 ms |      15.9 ms |

**데이터 해석**

- **기본 설정 대비 페이지당 68 KB 감소.** `resources: { en, fr, ... }` 설정은 모든 로케일과 모든 네임스페이스를 모든 페이지로 전송하여 **218.5 KB**에 도달합니다. 어댑터를 적용한 빌드는 **150.7 KB**로 대폭 줄어듭니다. 또한 `i18next` 런타임 단독 무게만 19.7 KB인 것에 비해 어댑터는 9.4 KB에 불과하므로, `next-i18next`의 가장 정교한 최적화 설정(163.4 KB)보다도 12.7 KB 더 가볍습니다.
- **컴포넌트 수정 없이 누수율 0% 달성.** 수동 분할된 설정을 제외하면 기존 `next-i18next`는 다른 페이지 문자열의 약 90%를 불필요하게 번들에 포함합니다. `dynamic` 전략은 페이지 누수를 잡지 못할 뿐 아니라, 로케일별 백엔드가 `translation` 네임스페이스 전체를 가져오므로 **50%의 로케일 누수**까지 유발합니다. 어댑터는 기존 코드 그대로 0% / 0%를 달성합니다.
- **컴포넌트 크기 8배 축소.** 격리 컴파일된 `useTranslation()` 컴포넌트는 `t`가 전역 스토어에 바인딩되어 인라인 `resources` 사용 시 평균 **78.5 KB**, 백엔드 사용 시 **26~27 KB**에 달합니다. 어댑터를 거치면 평균 **9.7 KB**로 축소됩니다.
- **하이드레이션 및 로케일 전환 속도 개선.** 하이드레이션 시간은 15.6 ms에서 **11.3 ms**로 단축됩니다(백엔드 조회가 렌더링 경로를 막는 `dynamic`의 27.7 ms와 비교하면 큰 폭의 차이). 로케일 전환도 15~16 ms에서 **11~12 ms**로 빨라집니다.
- **어댑터와 네이티브 런타임의 차이.** `next-intlayer`는 기본 앱 대비 단 +0.3 KB 늘어난 **141.3 KB**를 기록합니다. 어댑터는 Intlayer 코어 위에 `i18next` API 규격(보간 문법, 복수형/컨텍스트 해석, `<Trans>` 태그 파싱)을 탑재하므로 네이티브 대비 +9.4 KB를 가집니다. 어댑터는 완벽한 이전을 위한 다리이지 최종 종착지가 아닙니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 모든 라이브러리와 전략이 포함된 전체 표는 [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)에서 확인하세요.

> Vite / TanStack Start 환경에서의 `react-i18next` 어댑터는 이번 벤치마크에 포함되지 않았습니다. TanStack Start 기준 수치는 [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_intlayer.md)에서 확인할 수 있습니다.

## 수치가 개선되는 이유

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

`components/` 디렉터리의 소스 코드는 전혀 바뀌지 않았습니다. 모든 차이는 `useTranslation`이 무엇에 바인딩되는지에서 기인합니다.

**`i18next`의 경우**, 바인딩 대상은 전역 인스턴스입니다. 인스턴스에 로드된 모든 데이터(`static`의 모든 로케일, `dynamic`의 해당 언어 전체 네임스페이스)는 `useTranslation()`을 호출하는 모든 컴포넌트에서 접근 가능합니다. 번들러는 인스턴스가 쥐고 있는 단위 이하로 코드를 쪼갤 수 없으며, 런타임 역시 렌더링 시점에 어떤 키가 호출될지 알 수 없습니다.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # 모든 페이지의 번역 텍스트
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

인스턴스가 보유한 모든 것이 모든 페이지로 전송되며, 낭비는 페이지와 로케일이라는 두 축에서 증가합니다:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**`@intlayer/next-i18next`의 경우**, 바인딩 대상은 딕셔너리 그 자체입니다. `syncJSON`이 각 네임스페이스 파일을 딕셔너리로 변환하고, 최적화 단계가 컴포넌트에 해당 딕셔너리만을 직결 임포트로 넘겨주므로, 번들러가 페이지별, 로케일별로 안전하게 코드를 분할할 수 있습니다.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # 변경 없음, 여전히 원본 소스 역할
│   └── fr/translation.json
├── .intlayer/                        # 생성물: 네임스페이스별, 로케일별 독립 딕셔너리
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← 코드 변경 없음
```

기존 `i18n/i18n.ts` 파일과 `resources` 임포트는 쓸모없는 데드 코드가 되어 번들에서 제외됩니다. 바로 이 부분에서 68 KB의 절감이 이루어집니다.

## 3단계 마이그레이션 가이드

<Steps>
<Step number={1} title="설치">

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

명령어가 `i18next` / `react-i18next` / `next-i18next`를 감지하여 `intlayer`, 프레임워크 패키지(`next-intlayer` 또는 `react-intlayer`), 대응하는 `@intlayer/*` 어댑터 및 `@intlayer/sync-json-plugin`을 설치하고 `intlayer.config.ts`를 기본 구성합니다. 기존 패키지는 피어 의존성 및 타입 공급을 위해 그대로 설치해 두어야 합니다.

</Step>
<Step number={2} title="로케일 파일 경로 연결">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // i18next 문법: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // 네임스페이스별 파일 구조: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

언어별로 단일 `translation.json` 파일만 사용하는 구조(i18next의 기본 네임스페이스)라면 `splitKeys: false`를 지정하여 파일 전체가 하나의 딕셔너리로 유지되도록 설정합니다.

</Step>
<Step number={3} title="플러그인 활성화">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

App Router 환경에서 클라이언트 컴포넌트는 `[locale]` 세그먼트에서 로케일을 수신합니다. 어댑터의 `I18nextProvider`는 locale 파라미터를 받지 않으므로, Provider 파일에서 한 번만 교체합니다.

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

하위의 모든 컴포넌트는 기존과 동일하게 `useTranslation()`을 호출합니다.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()`은 `vite-intlayer`를 래핑하여 `react-i18next`와 `i18next`의 별칭을 설정합니다. React가 아닌 프로젝트에서는 `@intlayer/i18next/plugin`의 `i18nextVitePlugin()`을 사용하여 `i18next`만을 단독으로 별칭화할 수 있습니다.

</Tab>
</Tabs>

</Step>
</Steps>

### 마이그레이션 후 제거 가능한 항목

| 파일 / 패턴                                            | 제거 가능한 이유                                                        |
| ------------------------------------------------------ | ----------------------------------------------------------------------- |
| `resources: { en, fr, ... }` 및 관련 JSON 임포트       | 어댑터에 의해 무시됩니다. 68 KB의 원인이 여기에 있었습니다              |
| `i18next-http-backend`, `i18next-resources-to-backend` | 런타임에 원격에서 가져올 대상이 없어집니다                              |
| `i18next-browser-languagedetector`                     | 언어 감지는 Intlayer 라우팅 설정(URL 접두사, 쿠키, 헤더)으로 처리됩니다 |
| `getStaticProps` 내의 `serverSideTranslations()`       | 빈 껍데기 객체만 반환하며, 삭제해도 동작에 지장이 없습니다              |
| `next-i18next.config.js`                               | 읽히지 않습니다. 모든 언어 설정은 `intlayer.config.ts`로 일원화됩니다   |
| 페이지별 `ns: [...]` 수동 목록                         | 컴파일러가 컴포넌트별로 필요한 네임스페이스를 자동으로 파악합니다       |

### 번들 크기 외에 얻을 수 있는 이점

- **타입 안전한 키.** `useTranslation("about")`은 컴파일된 `about` 딕셔너리를 기반으로 타입이 추론되며, 존재하지 않는 키 `t("does.not.exist")`는 문자열이 아닌 TypeScript 컴파일 에러를 즉각 발생시킵니다.
- **`npx intlayer test`** 명령을 통해 누락된 번역 키가 있을 경우 CI 빌드를 실패시킬 수 있습니다. 또한 **`npx intlayer fill`**을 통해 자체 API 키(OpenAI, Anthropic, Mistral, Gemini 등)를 사용하여 미번역 키를 자동 생성하고 `locales/{lng}/{ns}.json`에 반영할 수 있습니다.
- **시각적 편집기(Visual Editor) 및 CMS**가 동일한 JSON 위에서 작동하므로, 번역팀이 UI를 통해 작업하면 저장소의 파일이 자동으로 동기화됩니다.
- **`.content.ts`로 점진적 전환 가능.** 특정 컴포넌트만 컴포넌트 레벨 콘텐츠 파일과 함께 `useTranslation("about")`에서 `useIntlayer("about")`으로 손쉽게 전환할 수 있습니다. JSON과 `.content.ts` 딕셔너리는 충돌 없이 공존합니다.

## 시작 전 알아두어야 할 한계

<AccordionGroup>
<Accordion header="백엔드 및 감지기는 비활성 상태임">

`i18n.use(HttpBackend)`는 플러그인의 init만 호출할 뿐 다른 작업은 수행하지 않습니다. 앱이 런타임에 CMS에서 번역을 가져오는 데 의존했다면 해당 흐름은 사라집니다. 대신 [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md) 또는 `intlayer pull` / `push` 명령을 사용하세요. 언어 감지는 Intlayer의 라우팅 설정(URL 접두사, 쿠키, 헤더)으로 대체됩니다.

</Accordion>
<Accordion header="resources는 병합되지 않고 무시됨">

다른 어댑터와 달리 `@intlayer/i18next`는 인라인 `resources`를 폴백으로 사용하지 않습니다. 모든 키는 동기화된 사전에 존재해야 하며, 이는 `intlayer test`를 통해 검증됩니다.

</Accordion>
<Accordion header="App Router는 공급자 수정이 필요함">

위에 표시된 단 하나의 파일만 수정하면 됩니다. `appWithTranslation`을 사용하는 Pages Router는 아무런 수정도 필요하지 않습니다.

</Accordion>
<Accordion header="next-i18next.config.js는 읽히지 않음">

`localePath`, `fallbackLng`, `reloadOnPrerender` 등은 해당 사항이 없습니다. 로케일 및 폴백은 `intlayer.config.ts`에서 가져옵니다.

</Accordion>
<Accordion header="어댑터가 완전히 무료는 아님">

`next-intlayer`에 비해 9.4 KB의 런타임 및 페이지당 +9.4 KB의 오버헤드가 발생합니다. 모든 컴포넌트가 `useIntlayer`로 전환되면 어댑터를 제거하세요.

</Accordion>
</AccordionGroup>

## 어떤 선택을 해야 할까?

<AccordionGroup>
<Accordion header="i18next 유지">

애플리케이션이 런타임 백엔드(요청 시 CMS에서 제공하는 번역), 플러그인 생태계 또는 어댑터가 지원하지 않는 비 React 환경에 의존하는 경우.

</Accordion>
<Accordion header="@intlayer/* 사용">

`react-i18next` / `next-i18next`를 사용 중이며 코드 재작성 없이 68 KB 절감, 8배 더 작은 컴포넌트, 0% 누수, 타입 정의된 키 및 CI 검사를 원하는 경우. 기존 `i18next` 코드베이스의 진입점입니다.

</Accordion>
<Accordion header="네이티브로 전환 (next-intlayer / react-intlayer)">

새 프로젝트이거나 어댑터가 역할을 다한 경우 적합합니다. 가장 가벼운 런타임(5.5 KB, 페이지당 +0.3 KB)을 제공하며 동기식 Server Components 및 컴포넌트별 `.content.ts` 파일을 지원합니다. [Next.js와 함께 사용하는 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_16.md) 또는 [Vite 및 React와 함께](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md) 시작하세요.

</Accordion>
</AccordionGroup>

## 자주 묻는 질문

<FAQ>

<Question title="68 KB의 절감 효과는 어디서 나오나요?">

`resources: { en, fr, ... }`에서 나옵니다. 기본적인 `next-i18next` 설정은 각 로케일의 JSON을 `init()`으로 가져오므로 모든 페이지가 모든 언어의 모든 네임스페이스를 끌어옵니다(페이지당 **218.5 KB**). 어댑터는 해당 블록을 번들로 묶지 않으며, 각 컴포넌트가 활성 로케일에서 지정한 사전만 전달합니다.

</Question>

<Question title="<Trans> 컴포넌트가 계속 작동하나요?">

네, `components`, 번호가 지정된 `<1>...</1>` 태그 및 `values`를 지원합니다. `{{interpolation}}`, `$t(key)` 중첩, `key_one` / `key_other` 복수형(`Intl.PluralRules`로 평가됨), 컨텍스트 접미사 및 `returnObjects`도 지원됩니다.

</Question>

<Question title="로케일당 단일 translation.json을 사용하는 경우는 어떻게 되나요?">

`syncJSON` 플러그인에서 `splitKeys: false`로 설정하세요. 전체 파일이 하나의 사전으로 유지되며 기본 `useTranslation()` 호출이 이에 대해 계속 확인됩니다.

</Question>

<Question title="이것이 Intlayer로 완전히 마이그레이션하는 것과 같나요?">

아닙니다. 이것은 가교 역할을 합니다. 어댑터는 `i18next` API를 유지하며 9.4 KB의 런타임 비용이 듭니다. 네이티브 `next-intlayer`는 5.5 KB의 비용이 들며 동기식 Server Components와 동일 위치의 `.content.ts` 파일을 추가합니다. JSON과 `.content.ts` 사전이 공존하므로 컴포넌트별로 점진적 전환이 가능합니다.

</Question>

<Question title="번역가가 현재 작업 방식을 유지할 수 있나요?">

네. `locales/{lng}/{ns}.json`이 단일 진실 공급원으로 유지됩니다. `syncJSON`이 i18next 문법으로 이를 읽고 CLI 또는 CMS가 업데이트할 때 번역을 다시 기록합니다.

</Question>

</FAQ>

## 관련 비교 자료

동일한 어댑터 시리즈:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer-vue-i18n.md)

직접 비교된 라이브러리:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/is_i18next_outdated.md)

참조 문서:

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md)

## 결론

`i18next`는 이번 벤치마크에서 가장 무거운 런타임이지만, 호환 어댑터를 적용하면 기존 API를 전혀 변경하지 않고도 대부분의 군더더기를 제거할 수 있습니다. 동일한 Next.js 앱에서 설정 파일 하나와 플러그인 한 줄, Provider 한 곳의 수정만으로 **페이지당 68 KB 절감**, 수동 최적화 버전 대비 **12.7 KB 추가 절감**, **컴포넌트 크기 8배 축소**, **누수율 0%**, **하이드레이션 4 ms 단축**을 즉시 누릴 수 있습니다.

모든 원시 측정 데이터와 테스트 앱, 실행 스크립트는 [Benchmark Bloom 저장소](https://github.com/intlayer-org/benchmark-bloom)에 투명하게 공개되어 있습니다.

더 자세한 정보는 [왜 Intlayer인가?](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md) 문서를 확인하세요.
