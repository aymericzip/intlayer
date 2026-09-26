---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "Lingui vs Intlayer: 2026년 벤치마크 및 종합 비교"
description: "Next.js 및 TanStack Start 환경에서 측정된 두 컴파일러 기반 i18n 라이브러리. 번들 크기, 콘텐츠 누수, 컴포넌트 크기, 하이드레이션, 언어 전환 반응성 및 개발자 경험 비교."
keywords:
  - Lingui
  - Intlayer
  - 국제화
  - i18n
  - 벤치마크
  - 번들 크기
  - 컴파일러
  - 블로그
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | React & Next.js 국제화 (i18n) 벤치마크 비교

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui와 Intlayer는 이번 벤치마크에서 단순한 런타임 대신 **컴파일러**를 기반으로 작동하는 두 라이브러리입니다. Lingui는 빌드 시 매크로에서 메시지를 추출하여 언어별 카탈로그를 컴파일합니다. Intlayer는 컴포넌트 단위로 딕셔너리를 컴파일하고 언어별로 Tree-shaking을 적용합니다. 이론상 두 라이브러리의 성능은 매우 유사해야 하지만, 실제 측정 데이터는 명확한 차이점을 보여줍니다.

본 데이터는 각 라이브러리를 사용해 동일한 애플리케이션을 빌드하고 브라우저가 실제로 다운로드하여 실행하는 리소스를 기록하는 오픈소스 테스트 도구인 [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)에서 추출되었습니다.

<TOC/>

> **요약 (tl;dr)**: 순수 페이지당 JavaScript 크기 측면에서 Lingui는 Intlayer에 가장 근접합니다. 지연 로딩을 설정한 TanStack Start에서는 **115~120 KB** 대 **118.6 KB**, Next.js에서는 **148.6 KB** 대 **141.3 KB**를 기록했습니다. 그러나 다른 지표들에서 격차가 벌어집니다. 단독 컴파일된 컴포넌트 크기는 Intlayer의 **6~8 KB**에 비해 Lingui는 **58~153 KB**에 달하고, 하이드레이션 시간은 Intlayer의 **11~14 ms** 대비 **28~34 ms**가 소요되며, 최적화된 설정에서도 기본 영어 폴백 문자열이 프랑스어 페이지로 **3~15%** 누수됩니다. 또한 이러한 최적화를 구현하려면 라우트별 카탈로그를 수동으로 추출, 컴파일, 분할해야 합니다. Intlayer는 설정 없이도 이를 기본 제공합니다.

## 핵심 요약

- **Lingui** - 매크로 기반(`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, `.po` / JSON 카탈로그, `lingui extract` + `lingui compile` 워크플로우. 메시지 ID를 짧은 해시로 컴파일하고 언어별 동적 카탈로그 로딩을 지원. 오랜 기간 검증되었으며 프레임워크에 독립적이고, `.po` 기반의 번역 툴체인이 탄탄함.
- **Intlayer** - 컴포넌트 중심 콘텐츠 모델. `.content.ts` 딕셔너리가 해당 컴포넌트 바로 옆에 위치하며, 빌드 타임 컴파일러가 컴포넌트 및 언어 단위로 Tree-shaking과 지연 로딩을 자동 처리. 콘텐츠로부터 엄격한 TypeScript 타입을 자동 생성하고 누락된 번역은 빌드 에러로 감지. 미들웨어, SEO 헬퍼, 비주얼 에디터 / CMS 및 AI 번역 기능 기본 탑재.

| 라이브러리            | GitHub Stars                                                                                                                                                                   | 총 커밋 수                                                                                                                                                                         | 최근 커밋                                                                                                                                           | 최초 릴리스 | NPM 버전                                                                                                            | NPM 다운로드 수                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | 2024년 4월  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | 2016년 12월 | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> 배지는 자동으로 업데이트됩니다. 스냅샷 수치는 시간에 따라 달라질 수 있습니다.

## 주요 기능 일대일 비교

| 기능                                        | Intlayer (`react-intlayer` / `next-intlayer`)                                | Lingui (`@lingui/core` / `@lingui/react`)                                            |
| ------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **컴포넌트 인근 번역 관리**                 | ✅ 지원, 각 컴포넌트와 동일한 위치에 `.content.ts` 배치                      | ⚠️ JSX 내 매크로로 소스 문자열 작성, 번역문은 중앙 집중식 `.po` 카탈로그에서 관리    |
| **TypeScript 통합**                         | ✅ 콘텐츠를 바탕으로 엄격한 타입 자동 생성                                   | ⚠️ 매크로는 타입이 지정되지만 메시지 ID는 미지정, 카탈로그 누락 키는 감지 불가       |
| **누락된 번역 감지**                        | ✅ TypeScript 오류 + 빌드 타임 오류/경고                                     | ⚠️ `lingui extract`가 통계를 출력하며, 런타임에는 영어 원문으로 자동 대체됨          |
| **리치 콘텐츠 (JSX / Markdown / 컴포넌트)** | ✅ 기본 네이티브 지원                                                        | ✅ 컴포넌트 중첩이 가능한 `<Trans>` 제공                                             |
| **ICU 지원**                                | ⚠️ 개발 진행 중                                                              | ✅ 지원 (`plural`, `select`, `selectOrdinal` 매크로)                                 |
| **포맷팅 (날짜, 숫자, 통화)**               | ✅ `useNumber`, `useDate`, ... (내부적으로 `Intl` 활용)                      | ✅ `i18n.date()`, `i18n.number()`                                                    |
| **지역화된 라우팅 및 미들웨어**             | ✅ 내장 프록시/미들웨어, `getMultilingualUrls` 유틸리티 제공                 | ❌ 코어 미지원                                                                       |
| **SEO 헬퍼 (hreflang, sitemap, robots)**    | ✅ 내장 헬퍼 기본 탑재                                                       | ❌ 수동 구현 필요                                                                    |
| **동기식 서버 컴포넌트 (RSC)**              | ✅ `next-intlayer/server`의 `useIntlayer`가 모든 하위 서버 컴포넌트에서 동작 | ⚠️ 요청마다 `I18n` 인스턴스 필요 (Props 전달 또는 `setI18n` 사용)                    |
| **Tree-shaking (사용된 콘텐츠만 배포)**     | ✅ 컴포넌트별, 언어별로 컴파일러가 전자동 처리                               | ⚠️ `lingui compile`을 통한 언어별 분리 지원, 라우트별 분리는 카탈로그 수동 분할 필요 |
| **지연 로딩 (Lazy loading)**                | ✅ `importMode: 'dynamic'` (설정 한 줄로 완료)                               | ⚠️ 컴파일된 카탈로그 `import()` 및 `i18n.load()` / `i18n.activate()` 수동 호출 필요  |
| **미사용 콘텐츠 정리**                      | ✅ 사용되지 않는 딕셔너리는 빌드 시 제거                                     | ✅ `lingui extract --clean`으로 오래된 메시지 정리 가능                              |
| **누락 번역 테스트 (CLI / CI)**             | ✅ `npx intlayer content test`                                               | ⚠️ `lingui extract` 통계 확인 (기본적으로 실패 종료 코드를 반환하지 않음)            |
| **빌드 파이프라인**                         | ✅ 플러그인 1개 (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)      | ⚠️ 매크로 플러그인(Babel 또는 SWC) + `extract` + `compile` 개별 단계 필요            |
| **AI 번역 자동화**                          | ✅ 기본 내장, 보유한 API 키 사용 (OpenAI, Anthropic, Mistral 등)             | ❌ 미지원                                                                            |
| **비주얼 에디터 / CMS**                     | ✅ 무료 Visual Editor + 선택형 CMS                                           | ❌ 미지원 (`.po` 파일로 외부 TMS와 연동)                                             |
| **MCP 서버 및 에이전트 스킬**               | ✅ 지원                                                                      | ❌ 미지원                                                                            |
| **생태계 및 커뮤니티**                      | ⚠️ 신생이나 가파르게 성장 중                                                 | ✅ 검증됨, 프레임워크 독립적                                                         |

## 벤치마크 테스트

### 무엇을 측정했는가

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) 제품군은 각 라이브러리로 **완전히 동일한 애플리케이션**을 빌드합니다: **10개 페이지**(home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10개 언어**(`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), 동일한 컴포넌트 및 동일한 콘텐츠. 페이지 측정은 `en`과 `fr`을 대상으로 진행되었습니다. 각 라이브러리는 최대 4가지 **로딩 전략**으로 빌드되었습니다:

| 전략               | 설명                                                                         | 일반적인 적용 사례              |
| ------------------ | ---------------------------------------------------------------------------- | ------------------------------- |
| **static**         | 모든 언어의 컴파일된 카탈로그를 초기에 한 번에 임포트하여 로드               | 빠른 프로토타입, AI 생성 코드   |
| **dynamic**        | 활성 언어의 카탈로그만 `import()`하지만, 사이트 전체 페이지가 포함됨         | 대부분의 일반 프로젝트          |
| **scoped-static**  | 라우트별로 카탈로그를 분할하되, 초기 번들에 모두 포함시킴                    | 드문 경우                       |
| **scoped-dynamic** | 라우트별 카탈로그 분할 + 지연 `import()`. 현재 페이지와 현재 언어만 다운로드 | 엄격한 번들 크기 제한이 있는 앱 |

Intlayer는 별도의 "scoped" 버전이 필요하지 않습니다. 컴파일러가 **컴포넌트 단위**로 콘텐츠를 자동 분할하므로 `static`과 `dynamic` 행 자체가 이미 최적으로 분할되어 있습니다.

각 빌드별로 다음 지표를 기록합니다:

- **Lib size**: i18n 라이브러리만 임포트하는 빈 컴포넌트의 gzip 크기 (고정 런타임 비용).
- **Page JS**: 전체 페이지 및 언어 평균으로 페이지당 다운로드된 gzip JavaScript 크기.
- **Locale leak %**: 다운로드된 JS 중 사용자가 조회하지 **않는** 언어에 속한 번역 문자열의 비율.
- **Page leak %**: 다운로드된 JS 중 사용자가 머물고 있지 **않는** 페이지에 속한 번역 문자열의 비율.
- **Component avg**: 각 컴포넌트를 독립적으로 컴파일했을 때의 평균 gzip 크기.
- **E2E reactivity**: 새로운 언어를 선택한 시점부터 DOM에서 `html[lang]`이 갱신될 때까지의 실측 소요 시간(Playwright, 5회 반복 평균).
- **Hydration**: React 하이드레이션 단계 소요 시간.

> 아래 수치는 `@lingui/react` 6.6.0 및 `intlayer` 9.5.1을 사용한 **2026-09-12** 측정 결과입니다. 테스트 애플리케이션은 간결하게 구성되었으므로, 누수율은 콘텐츠 규모가 커질수록 심화되는 **구조적 패턴**을 드러냅니다.

### Next.js 측정 결과

관심 있는 지표와 라이브러리를 선택하세요:

<I18nBenchmark framework="nextjs" vertical/>

| 라이브러리           | 전략           | Lib size (gz) | Page JS 평균 (gz) | 언어 누수율 | 페이지 누수율 | 컴포넌트 평균 (gz) |  E2E 반응성 | 하이드레이션 |
| -------------------- | -------------- | ------------: | ----------------: | ----------: | ------------: | -----------------: | ----------: | -----------: |
| **base** (i18n 없음) | -              |        0.0 KB |          141.0 KB |        0.0% |          0.0% |             0.9 KB |     13.4 ms |      11.8 ms |
| Lingui               | static         |       11.9 KB |          207.4 KB |       50.0% |         90.0% |            73.3 KB |     15.3 ms |      15.2 ms |
| Lingui               | dynamic        |       11.9 KB |          145.4 KB |        2.8% |         89.9% |            19.9 KB |     15.7 ms |      12.7 ms |
| Lingui               | scoped-static  |       11.9 KB |          148.2 KB |        2.7% |         89.1% |            20.4 KB |     15.1 ms |      13.1 ms |
| Lingui               | scoped-dynamic |       11.9 KB |          148.6 KB |       14.8% |          0.0% |           152.6 KB |     16.1 ms |      14.8 ms |
| **`next-intlayer`**  | static         |    **5.5 KB** |      **141.3 KB** |    **0.0%** |      **0.0%** |         **8.5 KB** |     15.5 ms |      16.9 ms |
| **`next-intlayer`**  | dynamic        |    **5.5 KB** |      **141.3 KB** |    **0.0%** |      **0.0%** |         **6.9 KB** | **15.3 ms** |      15.9 ms |

**지표 분석**

- **런타임 고정 비용.** 빈 컴포넌트 기준 Lingui는 11.9 KB gzip, Intlayer는 5.5 KB를 차지합니다. 전체 페이지 기준 Lingui의 최적 구성은 Intlayer 대비 **+7.3 KB**(148.6 KB 대 141.3 KB)이며, Intlayer는 i18n이 없는 기본 앱 대비 불과 **+0.3 KB** 증가에 그쳤습니다.
- **단순 구성의 치명적 오버헤드.** 모든 카탈로그를 사전에 로드하면 **페이지당 207.4 KB**로 기본 앱 대비 +66 KB가 늘어납니다. 문자열의 절반은 필요 없는 언어이고, 90%는 다른 페이지의 콘텐츠입니다.
- **동적 로딩은 언어만 해결할 뿐 페이지는 해결하지 못함.** 언어별 단일 카탈로그 방식에서는 페이지 누수율이 약 90%로 유지됩니다. 프랑스어 전체 카탈로그가 모든 개별 페이지에 전송되기 때문입니다. Lingui에서 페이지 누수를 0%로 만들려면 `scoped-dynamic`(라우트별로 카탈로그를 수동 추출 및 컴파일하여 각 페이지에 지정 로드)을 구성해야 합니다.
- **영어 원문 폴백의 번들 유입.** 최적화된 설정에서도 **프랑스어 페이지에 3~15%의 영어 문자열이 항상 포함**됩니다. Lingui 매크로는 만약을 대비해 원문 문자열을 번들에 보관하기 때문입니다. Intlayer는 빌드 시점에 폴백을 처리하므로 활성 언어만 전달합니다.
- **`scoped-dynamic`에서 컴포넌트 크기 급증.** 개별 컴파일된 컴포넌트는 평균 **152.6 KB**에 달합니다. 임포트 체인을 통해 라우트 카탈로그 전체에 접근 가능해지기 때문입니다. 동일 컴포넌트를 `useIntlayer()`로 구성하면 평균 **6.9 KB**에 불과합니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> 모든 라이브러리와 전략이 포함된 전체 표는 [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md)에서 확인하세요.

### TanStack Start 측정 결과

| 라이브러리                  | 전략           | Lib size (gz) | Page JS 평균 (gz) | 언어 누수율 | 페이지 누수율 | 컴포넌트 평균 (gz) | E2E 반응성 | 하이드레이션 |
| --------------------------- | -------------- | ------------: | ----------------: | ----------: | ------------: | -----------------: | ---------: | -----------: |
| **base** (i18n 없음)        | -              |        0.0 KB |          111.0 KB |        0.0% |          0.0% |             0.7 KB |     8.1 ms |      21.6 ms |
| Lingui                      | static         |       11.2 KB |          152.2 KB |       50.0% |         90.0% |            58.0 KB |     3.9 ms |      19.9 ms |
| Lingui                      | dynamic        |       11.2 KB |          115.2 KB |        9.3% |          0.0% |            85.5 KB |     5.9 ms |      28.0 ms |
| Lingui                      | scoped-static  |       11.2 KB |          120.8 KB |        4.0% |          0.0% |           147.9 KB |     7.1 ms |      33.9 ms |
| Lingui                      | scoped-dynamic |       11.2 KB |          120.2 KB |        8.6% |          0.0% |            83.7 KB |    42.1 ms |      32.9 ms |
| **`intlayer`**              | static         |    **5.0 KB** |      **125.8 KB** |       50.0% |      **0.0%** |         **8.1 KB** | **3.2 ms** |  **11.5 ms** |
| **`intlayer`**              | dynamic        |    **5.0 KB** |      **118.6 KB** |    **0.0%** |      **0.0%** |         **6.3 KB** |     3.6 ms |  **14.1 ms** |
| `@intlayer/lingui` (어댑터) | dynamic        |       10.3 KB |          137.0 KB |        9.9% |          0.0% |            12.8 KB | **2.9 ms** |      19.7 ms |

**지표 분석**

- **페이지당 JS 크기는 Lingui가 미세하게 우세.** `dynamic` 모드의 Lingui는 **115.2 KB**로 Intlayer의 118.6 KB보다 3.4 KB 가볍습니다. 해시 기반의 컴파일된 카탈로그가 고밀도로 압축되며, TanStack Start 라우터가 페이지를 효과적으로 분할하여 `dynamic` 단계에서 이미 페이지 누수율이 0%가 됩니다.
- **그 외 모든 영역에서는 Intlayer가 확실한 우위.** 하이드레이션 시간은 Lingui가 **28~34 ms**인 반면 Intlayer는 **11~14 ms**입니다. `i18n.load()` + `i18n.activate()`가 React 하이드레이션 전에 클라이언트에서 처리되어야 하기 때문입니다. 개별 컴포넌트 크기 역시 Lingui가 **58~148 KB**인 반면 Intlayer는 **6~8 KB**이며, 언어 누수율도 폴백 구조로 인해 Lingui는 0%가 될 수 없습니다.
- **최적화 설정에서 언어 전환 시 지연 발생.** `scoped-dynamic` Lingui는 라우트 카탈로그를 가져와 파싱하고 활성화할 때까지 화면 갱신이 멈추므로 `html[lang]` 변경에 **42 ms**가 소요됩니다. Intlayer는 두 모드 모두에서 **3~4 ms**만에 즉각 반응합니다.
- **Intlayer의 `static`은 이미 페이지 누수 0% 달성.** 해당 페이지의 컴포넌트가 실제로 사용하는 딕셔너리만 번들링하기 때문입니다. 설정에 `importMode: 'dynamic'`을 추가하면 언어 누수까지 완벽히 제거됩니다.
- **`@intlayer/lingui`**는 Lingui의 매크로 구문을 유지하면서 Intlayer 딕셔너리를 통해 데이터를 서빙합니다. 페이지 크기(매크로 런타임 유지로 인해 137 KB)를 소폭 양보하는 대신 훨씬 가벼운 컴포넌트(12.8 KB)와 빠른 하이드레이션을 얻을 수 있어 훌륭한 전환 경로가 됩니다.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> 전체 표는 [TanStack Start 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)에서 확인하세요.

## 왜 이런 격차가 발생하는가? 두 컴파일러의 서로 다른 작업 단위

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

두 도구 모두 컴파일러를 사용합니다. 핵심 차이는 **무엇을** 컴파일하는가에 있습니다.

**Lingui는 카탈로그를 컴파일합니다.** 소스 내 매크로는 언어별 `.po` 파일로 추출된 후 언어별 JS 모듈로 컴파일됩니다. 기본 단위는 **로케일(언어 전체)**입니다. 라우트나 컴포넌트 단위로 세분화하려면 여러 카탈로그를 생성하고, `lingui.config.ts`에서 각 파일을 별도 추출하도록 매핑한 후, 각 라우트에서 수동으로 로드해야 합니다. `I18n` 인스턴스는 전역 상태이며, 모든 `useLingui()`가 컴포넌트를 이 전역 인스턴스에 종속시킵니다.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compile 결과물
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer는 딕셔너리를 컴파일합니다.** 각 `.content.ts` 파일은 특정 키에 결합된 개별 딕셔너리입니다. 컴파일러는 어떤 컴포넌트가 어떤 키를 임포트하는지 추적하여, 딕셔너리별 및 언어별로 해당 컴포넌트에 필요한 최소한의 JSON만 생성합니다. 기본 단위는 **컴포넌트**입니다. 라우트 스코프 분할은 이 구조의 자연스러운 결과물이며, 페이지는 오직 렌더링에 필요한 컴포넌트의 딕셔너리만 가져옵니다.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

이것이 바로 `scoped-dynamic` 패턴이 Intlayer에서는 기본 빌드 결과물인 반면, Lingui에서는 복잡한 수동 엔지니어링 프로젝트가 되는 근본적인 이유입니다. 그 격차는 페이지와 로케일이라는 두 축에서 동시에 벌어집니다:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> `dynamic` 행의 측정 결과를 재현하려면 `intlayer.config.ts`에서 `dictionary.importMode: 'dynamic'`을 설정하십시오. 자세한 내용은 [번들 최적화 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md)를 참고하시기 바랍니다.

## 개발자 경험 (DX)

### 초기 설정

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

이후 번들러에 `@lingui/babel-plugin-lingui-macro`(또는 `@lingui/swc-plugin`)를 추가하고, 소스 수정 후 `lingui extract`, 빌드 전 `lingui compile`을 실행하며, 최상위 트리를 `<I18nProvider i18n={i18n}>`으로 감싸야 합니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

`vite.config.ts`에 `intlayer()` 플러그인을 추가(Next.js의 경우 `next.config.ts`에 `withIntlayer()`)하고 트리를 `<IntlayerProvider>`로 감싸기만 하면 됩니다. 별도의 추출 및 컴파일 명령어 없이 번들러 실행 시 자동으로 빌드됩니다.

</Tab>
</Tabs>
### 컴포넌트 작성

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

영어 텍스트는 컴포넌트 내부에 직접 작성되며, 프랑스어 번역은 `lingui extract` 실행 후 `src/locales/fr/messages.po` 파일에 해시 ID 형태로 저장됩니다. 추출 또는 컴파일을 잊어버리면 조용히 영어 원문으로 대체됩니다.

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
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

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

두 언어가 컴포넌트 바로 옆 단일 파일에 함께 위치합니다. 프랑스어 값이 누락되면 빌드가 실패하며, 키 이름을 잘못 입력하면 TypeScript가 즉시 오류를 감지합니다.

</Tab>
</Tabs>
### 컴포넌트 외부에서의 사용

메타데이터, 로더, 서버 함수 등 React 트리가 존재하지 않는 곳에서의 사용 방식입니다.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

호출마다 새로운 `I18n` 인스턴스를 생성하고, 적합한 카탈로그를 수동 임포트한 뒤, `t` 대신 `msg` + `i18n._()`를 조합해야 합니다. [벤치마크 노트](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md)에서도 지적하듯, 상황에 맞춰 `t`, `` t` ` ``, `i18n.t()`, `msg`, `<Trans>`를 선택하는 것은 매우 비직관적입니다.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Lingui 매크로는 유지하고 Intlayer 딕셔너리로 서빙하기

`@intlayer/lingui`는 `@lingui/core` 및 `@lingui/react`를 위한 원클릭 호환 어댑터입니다. 매크로는 기존처럼 컴파일되며 생성된 `i18n._()` 호출은 Intlayer 딕셔너리에서 서빙됩니다. `.po` 동기화 플러그인이 기존 카탈로그를 단일 진실 공급원으로 유지해주며, ICU 복수형 및 분기문도 완벽히 호환됩니다.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

빌드 설정에서 Intlayer 컴파일러 이전에 `@lingui/babel-plugin-lingui-macro` 또는 `@lingui/swc-plugin`이 실행되도록 구성하십시오. 자세한 내용은 [Lingui 호환성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)를 참조하십시오.

## 언제 어떤 라이브러리를 선택해야 하는가?

<AccordionGroup>
<Accordion header="Lingui 선택하기">

타입 안전한 매크로가 포함된 **ICU MessageFormat**을 원하고, 번역가가 기존 TMS 파이프라인과 함께 **`.po`** 파일로 작업하며, JSX 내 인라인 소스 문자열을 선호하고, 팀이 추출 / 컴파일 / 카탈로그 분할 워크플로를 직접 관리하는 데 익숙한 경우. 지연 로딩을 설정하면 페이지당 JS 크기가 매우 경쟁력 있습니다.

</Accordion>
<Accordion header="Intlayer 선택하기">

**컴포넌트 스코프 콘텐츠**, **엄격한 TypeScript**, **빌드 타임 누락 키 오류**, **노력 없는 트리 쉐이킹 및 지연 로딩**, 가벼운 컴포넌트, 빠른 수화, 즉각적인 로케일 전환 및 내장 편집 도구([비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md), [AI 번역](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md), [MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md))를 원하는 경우. 대규모 모듈식 코드베이스와 디자인 시스템에 특히 적합합니다.

</Accordion>
<Accordion header="@intlayer/lingui 선택하기">

이미 Lingui를 사용 중이며 매크로를 수정하지 않고 점진적으로 Intlayer 사전으로 마이그레이션하려는 경우. [PO 동기화 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)을 통해 `.po` 카탈로그를 신뢰할 수 있는 단일 소스로 유지합니다. [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer-lingui.md)에서 나란히 측정되었습니다.

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Lingui도 컴파일을 수행합니다. 출력이 왜 이렇게 다른가요?">

컴파일 단위가 다르기 때문입니다. Lingui는 **로케일당 하나의 카탈로그**를 컴파일합니다. 그 하위의 모든 작업(경로별 카탈로그 분할, 지연 로딩, 번들에서 폴백 제거)은 설정의 영역입니다. Intlayer는 **컴포넌트당 하나의 사전**을 컴파일하므로 빌드 시 경로 스코프가 자동으로 처리됩니다. 이것이 격리되어 컴파일된 Lingui 컴포넌트가 6-8 KB 대비 58-153 KB에 달하는 이유입니다.

</Question>

<Question title="Lingui에서 로케일 누출이 0%에 도달하지 않는 이유는 무엇인가요?">

매크로는 런타임 폴백으로 소스 메시지를 보존하므로 영어 문자열이 번역과 함께 번들에 포함됩니다. 벤치마크는 모든 최적화 설정에서 **`fr` 페이지 내에 3-15%의 `en` 문자열**이 포함됨을 측정했습니다. Intlayer는 빌드 시점에 폴백을 처리하고 활성 로케일만 제공합니다.

</Question>

<Question title="Lingui의 페이지당 JavaScript는 실제로 경쟁력이 있나요?">

네, TanStack Start에서는 아주 근소하게 앞섭니다: Intlayer의 118.6 KB 대비 `dynamic`에서 115.2 KB입니다. 해시된 ID가 있는 컴파일된 카탈로그는 매우 간결합니다. 다만 비용은 다른 부분에서 발생합니다: 11-14 ms 대비 28-34 ms의 수화 시간, `scoped-dynamic` 설정에서 **42 ms**가 소요되는 로케일 전환이 그 예입니다.

</Question>

<Question title="마이그레이션하려면 매크로를 포기해야 하나요?">

아닙니다. `@intlayer/lingui`는 `` t`...` ``, `<Trans>`, `msg`, `plural`, `select`, `selectOrdinal`을 기존과 동일하게 컴파일합니다; `i18n._()`가 확인하는 대상만 바뀝니다. 빌드에서 `@lingui/babel-plugin-lingui-macro` 또는 `@lingui/swc-plugin`을 계속 유지하세요. [Lingui 호환성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)를 참조하세요.

</Question>

<Question title="추출 및 컴파일 단계는 어떻게 되나요?">

매크로에는 그대로 유지되지만 Intlayer 자체 콘텐츠에서는 제거됩니다. `.content.ts` 사전은 번들러가 실행될 때 별도의 CLI 단계 없이 생성되며, [`intlayer test`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)는 소스 문자열로 조용히 폴백하는 대신 누락된 키가 있을 때 CI를 실패시킵니다.

</Question>

</FAQ>

## 관련 비교 자료

동일한 벤치마크, 다른 라이브러리:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-intl_vs_intlayer.md)
- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18next_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/react-i18next_vs_react-intl_vs_intlayer.md)

더 알아보기:

- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/lingui_vs_intlayer-lingui.md), 동일한 앱에서 측정된 어댑터
- [Compiler-driven vs declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/compiler_vs_declarative_i18n.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
- [ICU message format explained](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)

참조 문서:

- [Next.js 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/nextjs.md) 및 [TanStack Start 벤치마크 보고서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/tanstack.md)
- [Compat adapter: Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/lingui.md)
- [번들 최적화](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/bundle_optimization.md) 및 [Intlayer 컴파일러](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compiler.md)

## GitHub 스타 추이

GitHub 스타 수는 프로젝트의 인지도, 커뮤니티 신뢰 및 장기적인 지속 가능성을 가늠할 수 있는 중요한 척도입니다. 코드 품질을 직접 평가하는 것은 아니지만, 얼마나 많은 개발자가 프로젝트를 지지하고 채택하는지 보여줍니다.

[![스타 히스토리 차트](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## 결론

Lingui는 이번 벤치마크에서 런타임과 컴파일러를 결합한 가장 우수한 전통적 라이브러리입니다. 해시 기반의 압축된 카탈로그 덕분에 페이지당 JavaScript 크기를 Intlayer 수준에 근접하게 유지하며, TanStack Start에서는 아주 근소하게 앞서기도 합니다. 페이지당 원시 바이트 수만 평가한다면 사실상 무승부에 가깝습니다.

하지만 평가 기준은 그것만이 아닙니다. Lingui 컴파일러는 언어 단위에서 멈추며, 그 이하 단계(라우트별 카탈로그 분할, 지연 로딩, 폴백 문자열 분리)는 모두 수동 설정의 몫으로 남습니다. 벤치마크는 이러한 구조적 한계의 비용을 적나라하게 보여줍니다: **10~20배 무거운 컴포넌트**, **2~3배 느린 하이드레이션**, 구조적으로 남는 **3~15%의 언어 누수**, 최적화 설정에서 발생하는 **42 ms**의 언어 전환 지연. 반면 Intlayer 컴파일러는 컴포넌트 단위로 정밀 작동하여 별도의 복잡한 설정 없이도 **6~8 KB**, **11~14 ms**, **0%**, **3~4 ms**를 완벽히 구현합니다.

모든 원시 측정 데이터, 테스트 애플리케이션 및 스크립트는 [Benchmark Bloom 저장소](https://github.com/intlayer-org/benchmark-bloom)에서 직접 확인하고 실행해 보실 수 있습니다.

더 자세한 정보는 ['왜 Intlayer인가?' 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/interest_of_intlayer.md)를 참고하시기 바랍니다.
