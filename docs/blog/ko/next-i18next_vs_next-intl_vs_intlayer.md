---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: Next.js 앱의 국제화(i18n)를 위해 next-i18next, next-intl, Intlayer를 비교합니다.
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - 국제화
  - 블로그
  - Next.js
  - 자바스크립트
  - 리액트
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Next.js 국제화 (i18n)

Next.js를 위한 세 가지 i18n 옵션인 next-i18next, next-intl, Intlayer의 유사점과 차이점을 살펴보겠습니다.

이 문서는 완전한 튜토리얼이 아니라 선택에 도움을 주기 위한 비교입니다.

우리는 **Next.js 13+ App Router** (및 **React Server Components**)에 중점을 두고 다음 항목들을 평가합니다:

1. **아키텍처 및 콘텐츠 구성**
2. **TypeScript 및 안정성**
3. **누락된 번역 처리**
4. **라우팅 및 미들웨어**
5. **성능 및 로딩 동작**
6. **개발자 경험(DX), 도구 및 유지보수**
7. **SEO 및 대규모 프로젝트 확장성**

> **요약**: 세 가지 모두 Next.js 앱을 현지화할 수 있습니다. 만약 **컴포넌트 범위 콘텐츠**, **엄격한 TypeScript 타입**, **빌드 시 누락 키 검사**, **트리 쉐이킹된 사전**, 그리고 **최고급 App Router + SEO 도우미**를 원한다면, **Intlayer**가 가장 완전하고 현대적인 선택입니다.

> 개발자들이 자주 혼동하는 점 중 하나는 `next-intl`이 `react-intl`의 Next.js 버전이라고 생각하는 것입니다. 그렇지 않습니다—`next-intl`은 [Amann](https://github.com/amannn)이 유지 관리하며, `react-intl`은 [FormatJS](https://github.com/formatjs/formatjs)가 유지 관리합니다.

---

## 요약

- **next-intl** - 가볍고 직관적인 메시지 포맷팅을 제공하며, 견고한 Next.js 지원을 갖추고 있습니다. 중앙 집중식 카탈로그가 일반적이며, 개발자 경험(DX)은 간단하지만 안전성과 대규모 유지 관리는 주로 사용자 책임입니다.
- **next-i18next** - Next.js 환경에 맞춘 i18next입니다. 성숙한 생태계와 플러그인(예: ICU)을 통한 기능을 제공하지만, 설정이 장황할 수 있으며 프로젝트가 커질수록 카탈로그가 중앙 집중화되는 경향이 있습니다.
- **Intlayer** - Next.js를 위한 컴포넌트 중심 콘텐츠 모델, **엄격한 TS 타이핑**, **빌드 시 검사**, **트리 쉐이킹**, **내장 미들웨어 및 SEO 도우미**, 선택적 **비주얼 에디터/CMS**, 그리고 **AI 지원 번역**을 제공합니다.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> 배지는 자동으로 업데이트됩니다. 스냅샷은 시간이 지남에 따라 달라질 수 있습니다.

---

## 나란히 기능 비교 (Next.js 중심)

| 기능                                      | `next-intlayer` (Intlayer)                                                                                               | `next-intl`                                                                              | `next-i18next`                                                                           |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **컴포넌트 근처 번역**                    | ✅ 예, 각 컴포넌트와 내용이 함께 위치                                                                                    | ❌ 아니요                                                                                | ❌ 아니요                                                                                |
| **TypeScript 통합**                       | ✅ 고급, 자동 생성 엄격한 타입                                                                                           | ✅ 좋음                                                                                  | ⚠️ 기본                                                                                  |
| **번역 누락 감지**                        | ✅ TypeScript 오류 하이라이트 및 빌드 타임 오류/경고                                                                     | ⚠️ 런타임 폴백                                                                           | ⚠️ 런타임 폴백                                                                           |
| **풍부한 콘텐츠 (JSX/Markdown/컴포넌트)** | ✅ 직접 지원                                                                                                             | ❌ 풍부한 노드를 위해 설계되지 않음                                                      | ⚠️ 제한적                                                                                |
| **AI 기반 번역**                          | ✅ 예, 여러 AI 제공자를 지원합니다. 자체 API 키를 사용하여 이용 가능하며, 애플리케이션과 콘텐츠 범위의 맥락을 고려합니다 | ❌ 아니요                                                                                | ❌ 아니요                                                                                |
| **비주얼 에디터**                         | ✅ 예, 로컬 비주얼 에디터 + 선택적 CMS; 코드베이스 콘텐츠 외부화 가능; 임베드 가능                                       | ❌ 아니요 / 외부 현지화 플랫폼을 통해 사용 가능                                          | ❌ 아니요 / 외부 현지화 플랫폼을 통해 사용 가능                                          |
| **현지화된 라우팅**                       | ✅ 예, 기본적으로 현지화된 경로 지원 (Next.js 및 Vite와 호환)                                                            | ✅ 내장, App Router가 `[locale]` 세그먼트 지원                                           | ✅ 내장                                                                                  |
| **동적 라우트 생성**                      | ✅ 예                                                                                                                    | ✅ 예                                                                                    | ✅ 예                                                                                    |
| **복수형 처리**                           | ✅ 열거형 기반 패턴                                                                                                      | ✅ 우수                                                                                  | ✅ 우수                                                                                  |
| **형식 지정 (날짜, 숫자, 통화)**          | ✅ 최적화된 포매터 (내부적으로 Intl 사용)                                                                                | ✅ 우수함 (Intl 헬퍼)                                                                    | ✅ 우수함 (Intl 헬퍼)                                                                    |
| **콘텐츠 형식**                           | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml 작업 중)                                                                     | ✅ .json, .js, .ts                                                                       | ⚠️ .json                                                                                 |
| **ICU 지원**                              | ⚠️ 작업 중                                                                                                               | ✅ 예                                                                                    | ⚠️ 플러그인 통해 (`i18next-icu`)                                                         |
| **SEO 도우미 (hreflang, 사이트맵)**       | ✅ 내장 도구: 사이트맵, robots.txt, 메타데이터 도우미                                                                    | ✅ 우수                                                                                  | ✅ 우수                                                                                  |
| **에코시스템 / 커뮤니티**                 | ⚠️ 작지만 빠르게 성장하고 반응성이 좋음                                                                                  | ✅ 좋음                                                                                  | ✅ 좋음                                                                                  |
| **서버 사이드 렌더링 & 서버 컴포넌트**    | ✅ 예, SSR / React 서버 컴포넌트에 최적화됨                                                                              | ⚠️ 페이지 단위로 지원되나 자식 서버 컴포넌트에 t-함수를 컴포넌트 트리를 통해 전달해야 함 | ⚠️ 페이지 단위로 지원되나 자식 서버 컴포넌트에 t-함수를 컴포넌트 트리를 통해 전달해야 함 |
| **트리 쉐이킹 (사용된 콘텐츠만 로드)**    | ✅ 예, Babel/SWC 플러그인을 통한 빌드 시 컴포넌트별                                                                      | ⚠️ 부분적 지원                                                                           | ⚠️ 부분적 지원                                                                           |
| **지연 로딩**                             | ✅ 예, 로케일별 / 사전별                                                                                                 | ✅ 예 (경로별/로케일별), 네임스페이스 관리 필요                                          | ✅ 예 (경로별/로케일별), 네임스페이스 관리 필요                                          |
| **사용하지 않는 콘텐츠 정리**             | ✅ 예, 빌드 시 사전별로                                                                                                  | ❌ 아니요, 네임스페이스 관리를 통해 수동으로 관리 가능                                   | ❌ 아니요, 네임스페이스 관리를 통해 수동으로 관리 가능                                   |
| **대규모 프로젝트 관리**                  | ✅ 모듈화 권장, 디자인 시스템에 적합                                                                                     | ✅ 설정과 함께 모듈화                                                                    | ✅ 설정과 함께 모듈화                                                                    |
| **누락된 번역 테스트 (CLI/CI)**           | ✅ CLI: `npx intlayer content test` (CI 친화적 감사)                                                                     | ⚠️ 내장되어 있지 않음; 문서에서는 `npx @lingual/i18n-check` 사용 권장                    | ⚠️ 내장되어 있지 않음; i18next 도구 또는 런타임 `saveMissing`에 의존                     |

---

## 소개

Next.js는 국제화된 라우팅(예: 로케일 세그먼트)을 기본적으로 지원합니다. 하지만 이 기능만으로는 번역을 수행하지 않습니다. 사용자에게 현지화된 콘텐츠를 렌더링하려면 여전히 라이브러리가 필요합니다.

많은 i18n 라이브러리가 존재하지만, 현재 Next.js 환경에서는 next-i18next, next-intl, 그리고 Intlayer 세 가지가 주목받고 있습니다.

---

## 아키텍처 및 확장성

- **next-intl / next-i18next**: 기본적으로 로케일별 **중앙 집중식 카탈로그**(그리고 i18next의 **네임스페이스**)를 사용합니다. 초기에는 잘 작동하지만, 점차 결합도가 높아지고 키 변경이 잦아지면서 큰 공유 영역이 되는 경우가 많습니다.
- **Intlayer**: 코드와 **공간적으로 함께 위치한** 컴포넌트별(또는 기능별) 사전을 권장합니다. 이는 인지 부하를 줄이고, UI 조각의 복제/이전을 쉽게 하며, 팀 간 충돌을 줄여줍니다. 사용하지 않는 콘텐츠는 자연스럽게 더 쉽게 발견하고 제거할 수 있습니다.

**중요한 이유:** 대규모 코드베이스나 디자인 시스템 설정에서는 **모듈화된 콘텐츠**가 단일 카탈로그보다 더 잘 확장됩니다.

---

## 번들 크기 및 의존성

애플리케이션을 빌드한 후, 번들은 브라우저가 페이지를 렌더링하기 위해 로드하는 자바스크립트입니다. 따라서 번들 크기는 애플리케이션 성능에 매우 중요합니다.

다국어 애플리케이션 번들 맥락에서 중요한 두 가지 구성 요소는 다음과 같습니다:

- 애플리케이션 코드
- 브라우저가 로드하는 콘텐츠

## 애플리케이션 코드

이 경우 애플리케이션 코드의 중요성은 미미합니다. 세 가지 솔루션 모두 트리 쉐이킹(tree-shakable)이 가능하여, 사용하지 않는 코드 부분은 번들에 포함되지 않습니다.

다음은 세 가지 솔루션을 사용한 다국어 애플리케이션에서 브라우저가 로드하는 자바스크립트 번들 크기 비교입니다.

애플리케이션에서 포매터가 필요하지 않은 경우, 트리 쉐이킹 후 내보내지는 함수 목록은 다음과 같습니다:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (번들 크기 180.6 kB -> 78.6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (번들 크기 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (번들 크기 80.7 kB -> 25.5 kB (gzip))

이 함수들은 React 컨텍스트/상태를 감싸는 래퍼에 불과하므로, i18n 라이브러리가 번들 크기에 미치는 전체 영향은 미미합니다.

> Intlayer는 `useIntlayer` 함수에 더 많은 로직이 포함되어 있어 `next-intl` 및 `next-i18next`보다 약간 더 큽니다. 이는 마크다운과 `intlayer-editor` 통합과 관련이 있습니다.

## 콘텐츠 및 번역

이 부분은 개발자들이 종종 무시하지만, 10개의 페이지와 10개의 언어로 구성된 애플리케이션의 경우를 생각해 봅시다. 계산을 단순화하기 위해 각 페이지가 100% 고유한 콘텐츠를 통합한다고 가정해 보겠습니다(실제로는 페이지 간에 중복되는 콘텐츠가 많습니다. 예: 페이지 제목, 헤더, 푸터 등).

`/fr/about` 페이지를 방문하려는 사용자는 특정 언어로 된 한 페이지의 콘텐츠를 로드하게 됩니다. 콘텐츠 최적화를 무시하면 애플리케이션 콘텐츠의 8,200% `((1 + (((10 페이지 - 1) × (10 언어 - 1)))) × 100)`를 불필요하게 로드하는 셈입니다. 문제를 이해하셨나요? 이 콘텐츠가 텍스트로만 남아 있더라도, 아마 사이트의 이미지 최적화를 더 신경 쓰고 싶겠지만, 전 세계에 불필요한 콘텐츠를 전송하고 사용자의 컴퓨터가 아무 쓸모 없이 이를 처리하게 만드는 것입니다.

두 가지 중요한 문제:

- **라우트별 분할:**

  > 내가 `/about` 페이지에 있다면, `/home` 페이지의 콘텐츠를 로드하고 싶지 않습니다.

- **로케일별 분할:**

  > 내가 `/fr/about` 페이지에 있다면, `/en/about` 페이지의 콘텐츠를 로드하고 싶지 않습니다.

다시 말하지만, 세 가지 솔루션 모두 이러한 문제를 인지하고 있으며 이러한 최적화를 관리할 수 있도록 합니다. 세 솔루션 간의 차이는 DX(개발자 경험)에 있습니다.

`next-intl`과 `next-i18next`는 중앙 집중식 접근 방식을 사용하여 번역을 관리하며, 로케일별 및 하위 파일별로 JSON을 분할할 수 있습니다. `next-i18next`에서는 JSON 파일을 '네임스페이스(namespaces)'라고 부르고, `next-intl`은 메시지를 선언할 수 있게 합니다. `intlayer`에서는 JSON 파일을 '사전(dictionaries)'이라고 부릅니다.

- `next-intl`의 경우, `next-i18next`와 마찬가지로, 콘텐츠가 페이지/레이아웃 수준에서 로드된 후 이 콘텐츠가 컨텍스트 프로바이더에 로드됩니다. 이는 개발자가 각 페이지에 로드될 JSON 파일을 수동으로 관리해야 함을 의미합니다.

> 실제로는 개발자들이 이 최적화를 종종 건너뛰고, 단순성을 위해 페이지의 컨텍스트 프로바이더에 모든 콘텐츠를 로드하는 방식을 선호합니다.

- `intlayer`의 경우, 모든 콘텐츠가 애플리케이션 내에서 로드됩니다. 그런 다음 플러그인(`@intlayer/babel` / `@intlayer/swc`)이 페이지에서 사용되는 콘텐츠만 로드하도록 번들을 최적화합니다. 따라서 개발자는 로드될 사전을 수동으로 관리할 필요가 없습니다. 이는 더 나은 최적화, 더 나은 유지보수성, 그리고 개발 시간 단축을 가능하게 합니다.

애플리케이션이 커질수록(특히 여러 개발자가 함께 작업할 때) 더 이상 사용되지 않는 콘텐츠를 JSON 파일에서 제거하는 것을 잊는 경우가 흔합니다.

> 모든 경우에 JSON이 모두 로드된다는 점에 유의하세요 (next-intl, next-i18next, intlayer).

이것이 Intlayer의 접근 방식이 더 성능이 좋은 이유입니다: 컴포넌트가 더 이상 사용되지 않으면 해당 사전은 번들에 로드되지 않습니다.

라이브러리가 폴백(fallback)을 처리하는 방식도 중요합니다. 애플리케이션이 기본적으로 영어로 설정되어 있고 사용자가 `/fr/about` 페이지를 방문한다고 가정해 봅시다. 프랑스어 번역이 없는 경우 영어 폴백을 고려합니다.

`next-intl` 및 `next-i18next`의 경우, 라이브러리는 현재 로케일과 폴백 로케일에 관련된 JSON을 모두 로드해야 합니다. 따라서 모든 콘텐츠가 번역되었다고 가정하면, 각 페이지는 100% 불필요한 콘텐츠를 로드하게 됩니다. **반면에, `intlayer`는 사전 빌드 시점에 폴백을 처리합니다. 따라서 각 페이지는 사용된 콘텐츠만 로드합니다.**

다음은 vite + react 애플리케이션에서 `intlayer`를 사용한 번들 크기 최적화의 영향 예시입니다:

| 최적화된 번들                                                                             | 최적화되지 않은 번들                                                                                             |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ![최적화된 번들](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png) | ![최적화되지 않은 번들](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png) |

---

## TypeScript 및 안전성

<Columns>
  <Column>

**next-intl**

- 견고한 TypeScript 지원을 제공하지만, **키는 기본적으로 엄격하게 타입 지정되지 않음**; 안전성 패턴을 수동으로 유지해야 합니다.

  </Column>
  <Column>

**next-i18next**

- 훅에 대한 기본 타입 정의 제공; **엄격한 키 타입 지정은 추가 도구/구성이 필요**합니다.

  </Column>
  <Column>

**intlayer**

- **콘텐츠에서 엄격한 타입을 생성합니다.** **IDE 자동완성**과 **컴파일 타임 오류**가 배포 전에 오타와 누락된 키를 잡아냅니다.

  </Column>
</Columns>

**중요한 이유:** 강력한 타입 지정은 실패를 **오른쪽(런타임)**이 아닌 **왼쪽(CI/빌드)**으로 이동시킵니다.

---

## 누락된 번역 처리

**next-intl**

- **런타임 폴백**에 의존합니다(예: 키 또는 기본 로케일 표시). 빌드는 실패하지 않습니다.

**next-i18next**

- **런타임 폴백**에 의존합니다(예: 키 또는 기본 로케일 표시). 빌드는 실패하지 않습니다.

**intlayer**

- 누락된 로케일이나 키에 대해 **빌드 타임 감지**와 **경고/오류**를 제공합니다.

**중요한 이유:** 빌드 중에 누락을 잡으면 프로덕션에서 “미스터리 문자열”을 방지하고 엄격한 릴리스 게이트와 일치합니다.

---

## 라우팅, 미들웨어 및 URL 전략

<Columns>
  <Column>

**next-intl**

- App Router에서 **Next.js 지역화 라우팅**과 함께 작동합니다.

  </Column>
  <Column>

**next-i18next**

- App Router에서 **Next.js 지역화 라우팅**과 함께 작동합니다.

  </Column>
  <Column>

**intlayer**

- 위의 모든 기능에 더해, **i18n 미들웨어**(헤더/쿠키를 통한 로케일 감지)와 지역화된 URL 및 `<link rel="alternate" hreflang="…">` 태그 생성을 위한 **도우미**를 제공합니다.

  </Column>
</Columns>

**중요한 이유:** 커스텀 연결 계층이 줄어들고, **일관된 사용자 경험(UX)**과 **깔끔한 SEO**를 지역별로 유지할 수 있습니다.

---

## 서버 컴포넌트(RSC) 정렬

<Columns>
  <Column>

**next-intl**

- Next.js 13+를 지원합니다. 하이브리드 설정에서 컴포넌트 트리를 통해 t-함수/포매터를 전달해야 하는 경우가 많습니다.

  </Column>
  <Column>

**next-i18next**

- Next.js 13+를 지원합니다. 경계 간에 번역 유틸리티를 전달하는 데 유사한 제약이 있습니다.

  </Column>
  <Column>

**intlayer**

- Next.js 13+를 지원하며, 일관된 API와 RSC 지향 프로바이더를 통해 **서버/클라이언트 경계**를 원활하게 처리하여 포매터나 t-함수를 전달하는 것을 방지합니다.

  </Column>
</Columns>

**중요한 이유:** 더 깔끔한 정신 모델과 하이브리드 트리에서의 예외 상황 감소.

---

## 개발자 경험(DX), 도구 및 유지보수

<Columns>
  <Column>

**next-intl**

- 외부 지역화 플랫폼 및 편집 워크플로우와 자주 함께 사용됩니다.

  </Column>
  <Column>

**next-i18next**

- 외부 지역화 플랫폼 및 편집 워크플로우와 자주 함께 사용됩니다.

  </Column>
  <Column>

**intlayer**

- **무료 비주얼 에디터**와 **선택적 CMS**(Git 친화적이거나 외부화 가능)를 제공하며, **VSCode 확장**과 자체 제공자 키를 사용하는 **AI 지원 번역**도 포함됩니다.

  </Column>
</Columns>

**중요한 이유:** 운영 비용을 낮추고 개발자와 콘텐츠 작성자 간의 피드백 주기를 단축합니다.

## 현지화 플랫폼(TMS)과의 통합

대규모 조직은 종종 **Crowdin**, **Phrase**, **Lokalise**, **Localizely**, 또는 **Localazy**와 같은 번역 관리 시스템(TMS)에 의존합니다.

- **기업이 관심을 가지는 이유**
  - **협업 및 역할 분담**: 개발자, 제품 관리자, 번역가, 검토자, 마케팅 팀 등 여러 이해관계자가 참여합니다.
  - **규모 및 효율성**: 지속적인 현지화와 맥락 내 리뷰가 가능합니다.

- **next-intl / next-i18next**
  - 일반적으로 **중앙 집중식 JSON 카탈로그**를 사용하므로 TMS와의 내보내기/가져오기가 간단합니다.
  - 위 플랫폼들에 대한 성숙한 생태계와 예제/통합 기능이 존재합니다.

- **Intlayer**
  - **분산형, 컴포넌트별 사전**을 권장하며 **TypeScript/TSX/JS/JSON/MD** 콘텐츠를 지원합니다.
  - 이는 코드의 모듈성을 향상시키지만, 도구가 중앙 집중식 평면 JSON 파일을 기대할 경우 플러그 앤 플레이 방식의 TMS 통합을 어렵게 만들 수 있습니다.
  - Intlayer는 대안으로 **AI 지원 번역**(자체 제공자 키 사용), **비주얼 에디터/CMS**, 그리고 **CLI/CI** 워크플로우를 제공하여 누락된 부분을 찾아 채울 수 있도록 합니다.

> 참고: `next-intl`과 `i18next`도 TypeScript 카탈로그를 지원합니다. 만약 팀에서 메시지를 `.ts` 파일에 저장하거나 기능별로 분산 관리한다면, 유사한 TMS 마찰을 겪을 수 있습니다. 하지만 많은 `next-intl` 설정은 여전히 `locales/` 폴더에 중앙 집중화되어 있어 TMS용 JSON으로 리팩토링하기가 조금 더 쉽습니다.

## 개발자 경험

이 부분에서는 세 가지 솔루션을 깊이 비교합니다. 각 솔루션의 '시작하기' 문서에 설명된 간단한 사례를 고려하기보다는, 실제 프로젝트와 더 유사한 실제 사용 사례를 고려할 것입니다.

### 앱 구조

앱 구조는 코드베이스의 유지보수성을 보장하는 데 중요합니다.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── public
│   └── locales
│       ├── en
│       │  ├── home.json
│       │  └── navbar.json
│       ├── fr
│       │  ├── home.json
│       │  └── navbar.json
│       └── es
│          ├── home.json
│          └── navbar.json
├── next-i18next.config.js
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
├── i18n.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home
    │       └── index.tsx
    │       └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### 비교

- **next-intl / next-i18next**: 중앙 집중식 카탈로그(JSON; 네임스페이스/메시지). 명확한 구조, 번역 플랫폼과 잘 통합되지만, 앱이 커질수록 여러 파일을 동시에 수정해야 할 가능성이 높아집니다.
- **Intlayer**: 컴포넌트별 `.content.{ts|js|json}` 사전을 컴포넌트와 함께 배치. 컴포넌트 재사용과 로컬 단위 이해가 용이하며, 파일이 추가되고 빌드 타임 도구에 의존합니다.

#### 설정 및 콘텐츠 로딩

앞서 언급했듯이, 각 JSON 파일이 코드에 어떻게 임포트되는지 최적화해야 합니다.
라이브러리가 콘텐츠 로딩을 처리하는 방식이 중요합니다.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/_app.tsx"
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { ClientComponent, ServerComponent } from "@components";

export default function HomePage({ locale }: { locale: string }) {
  // 이 컴포넌트에서 사용하는 네임스페이스를 명시적으로 선언합니다
  const resources = await loadMessagesFor(locale); // 로더 (JSON 등)

  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: ["common", "about"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

  const { t } = useTranslation("about");

  return (
    <I18nextProvider i18n={i18n}>
      <main>
        <h1>{t("title")}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </I18nextProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // 이 페이지에 필요한 네임스페이스만 미리 로드합니다
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
    },
  };
};
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// 공통 설정에서 가져올 수 있습니다
const locales = ["en", "fr", "es"];

export default getRequestConfig(async ({ locale }) => {
  // 들어오는 `locale` 매개변수가 유효한지 검증합니다
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import pick from "lodash/pick";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // 이 서버 렌더링(RSC)을 위한 활성 요청 로케일 설정
  unstable_setRequestLocale(locale);

  // 메시지는 src/i18n/request.ts를 통해 서버 측에서 로드됩니다
  // (next-intl 문서 참조). 여기서는 클라이언트 컴포넌트에 필요한
  // 일부 메시지만 클라이언트로 전달합니다 (페이로드 최적화).
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations } from "next-intl/server";
import { ClientComponent, ServerComponent } from "@components";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  // 엄격하게 서버 측에서만 로드됨 (클라이언트에 하이드레이션되지 않음)
  const t = await getTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
```

  </TabItem>
<TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
export default {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### 비교

세 가지 모두 로케일별 콘텐츠 로딩과 프로바이더를 지원합니다.

- **next-intl/next-i18next**를 사용할 경우, 일반적으로 경로별로 선택된 메시지/네임스페이스를 로드하고 필요한 위치에 프로바이더를 배치합니다.

- **Intlayer**는 빌드 시점 분석을 추가하여 사용을 추론하므로 수동 연결을 줄이고 단일 루트 프로바이더를 허용할 수 있습니다.

팀의 선호도에 따라 명시적 제어와 자동화 중에서 선택하세요.

### 클라이언트 컴포넌트에서의 사용법

카운터를 렌더링하는 클라이언트 컴포넌트 예제를 살펴보겠습니다.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**번역 (실제 JSON이어야 하며 `public/locales/...`에 위치해야 합니다)**

```json fileName="public/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="public/locales/fr/about.json"
{
  "counter": {
    "label": "카운터",
    "increment": "증가"
  }
}
```

**클라이언트 컴포넌트**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

const ClientComponentExample = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // next-i18next는 useNumber를 제공하지 않으므로 Intl.NumberFormat 사용
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> 페이지 serverSideTranslations에 "about" 네임스페이스를 추가하는 것을 잊지 마세요  
> 여기서는 react 19.x.x 버전을 사용하지만, 하위 버전에서는 useMemo를 사용하여 포매터 인스턴스를 저장해야 합니다. 이는 무거운 함수이기 때문입니다.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**번역 (형식 재사용; 원하는 대로 next-intl 메시지에 로드하세요)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**클라이언트 컴포넌트**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // 중첩된 객체에 직접 범위 지정
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> 페이지 클라이언트 메시지에 "about" 메시지를 추가하는 것을 잊지 마세요

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**내용**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ ko: "카운터", en: "Counter", fr: "Compteur" }),
    increment: t({ ko: "증가", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**클라이언트 컴포넌트**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // 문자열을 반환합니다
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### 비교

- **숫자 포맷팅**
  - **next-i18next**: `useNumber` 없음; `Intl.NumberFormat` (또는 i18next-icu) 사용.
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: 내장된 `useNumber()` 사용.

- **키**
  - 중첩 구조 유지 (`about.counter.label`) 및 훅 범위 지정 (`useTranslation("about")` + `t("counter.label")` 또는 `useTranslations("about.counter")` + `t("label")`).

- **파일 위치**
  - **next-i18next**는 `public/locales/{lng}/{ns}.json`에 JSON을 기대.
  - **next-intl**는 유연하며, 설정에 따라 메시지 로드 가능.
  - **Intlayer**는 TS/JS 딕셔너리에 콘텐츠를 저장하고 키로 해석.

---

### 서버 컴포넌트에서의 사용

UI 컴포넌트의 경우를 살펴보겠습니다. 이 컴포넌트는 서버 컴포넌트이며, 클라이언트 컴포넌트의 자식으로 삽입될 수 있어야 합니다. (페이지 (서버 컴포넌트) -> 클라이언트 컴포넌트 -> 서버 컴포넌트). 이 컴포넌트가 클라이언트 컴포넌트의 자식으로 삽입될 수 있으므로 비동기(async)일 수 없습니다.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/pages/about.tsx"
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { t, i18n } = useTranslation("about");
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  count: number;
  t: (key: string) => string;
};

const ServerComponent = ({ t, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(i18n.language).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("label")}>{t("increment")}</button>
    </div>
  );
};
```

> 서버 컴포넌트는 비동기(async)일 수 없으므로, 번역 함수와 포맷터 함수를 props로 전달해야 합니다.
>
> - `const t = await getTranslations("about.counter");`
> - `const format = await getFormatter();`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

const ServerComponent = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer는 `next-intlayer/server`를 통해 **서버 안전** 훅을 제공합니다. 작동을 위해 `useIntlayer`와 `useNumber`는 클라이언트 훅과 유사한 훅 형태의 문법을 사용하지만, 내부적으로는 서버 컨텍스트(`IntlayerServerProvider`)에 의존합니다.

### 메타데이터 / 사이트맵 / 로봇

콘텐츠 번역은 훌륭합니다. 하지만 사람들은 보통 국제화의 주요 목표가 웹사이트를 전 세계에 더 잘 보이게 하는 것임을 잊어버립니다. I18n은 웹사이트 가시성을 향상시키는 놀라운 수단입니다.

다국어 SEO와 관련된 좋은 실천 목록은 다음과 같습니다.

- `<head>` 태그에 hreflang 메타 태그 설정
  > 검색 엔진이 페이지에서 어떤 언어가 사용 가능한지 이해하는 데 도움을 줍니다
- `http://www.w3.org/1999/xhtml` XML 스키마를 사용하여 sitemap.xml에 모든 페이지 번역을 나열하세요.
  >
- robots.txt에서 접두사가 붙은 페이지를 제외하는 것을 잊지 마세요 (예: `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
  >
- 가장 현지화된 페이지로 리디렉션하기 위해 커스텀 Link 컴포넌트를 사용하세요 (예: 프랑스어의 경우 `<a href="/fr/about">A propos</a>`)
  >

개발자들은 종종 여러 로케일에 걸쳐 페이지를 올바르게 참조하는 것을 잊어버립니다.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // 올바른 JSON 파일을 동적으로 가져옵니다
  const messages = (
    await import("@/../public/locales/" + locale + "/about.json")
  ).default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>소개</h1>; // 페이지 제목을 한국어로 번역
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(), // 마지막 수정 날짜
      changeFrequency: "monthly", // 변경 빈도: 매월
      priority: 0.7, // 우선순위
      alternates: { languages }, // 대체 언어 경로
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... 페이지 코드의 나머지 부분
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... 페이지 나머지 코드
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer는 사이트맵을 위해 다국어 URL을 생성하는 `getMultilingualUrls` 함수를 제공합니다.

---

---

## 그리고 승자는…

간단하지 않습니다. 각 옵션마다 장단점이 있습니다. 제가 보는 관점은 다음과 같습니다:

<Columns>
  <Column>

**next-intl**

- 가장 간단하고 가벼우며, 강요되는 결정이 적습니다. **최소한의** 솔루션을 원하고 중앙 집중식 카탈로그에 익숙하며 앱이 **소규모에서 중간 규모**인 경우 적합합니다.

  </Column>
  <Column>

**next-i18next**

- 성숙하고 기능이 풍부하며 커뮤니티 플러그인이 많지만 설정 비용이 더 높습니다. **i18next의 플러그인 생태계**(예: 플러그인을 통한 고급 ICU 규칙)가 필요하고 팀이 이미 i18next를 알고 있으며 유연성을 위해 **더 많은 설정**을 감수할 수 있다면 적합합니다.

  </Column>
  <Column>

**Intlayer**

- 모듈식 콘텐츠, 타입 안전성, 도구 지원, 그리고 보일러플레이트가 적은 현대적인 Next.js를 위해 설계되었습니다. 특히 **Next.js App Router**, 디자인 시스템, 그리고 **대규모 모듈식 코드베이스**에 대해 **컴포넌트 범위 콘텐츠**, **엄격한 TypeScript**, **빌드 타임 보장**, **트리 쉐이킹**, 그리고 **기본 제공** 라우팅/SEO/에디터 도구를 중요하게 생각한다면 적합합니다.

  </Column>
</Columns>

최소한의 설정을 선호하고 일부 수동 연결을 감수할 수 있다면 next-intl이 좋은 선택입니다. 모든 기능이 필요하고 복잡성을 감수할 수 있다면 next-i18next가 적합합니다. 하지만 현대적이고 확장 가능하며 모듈식 솔루션과 내장 도구를 원한다면 Intlayer가 바로 그 요구를 충족시키고자 합니다.

> **기업 팀을 위한 대안**: **Crowdin**, **Phrase**와 같은 검증된 현지화 플랫폼이나 기타 전문 번역 관리 시스템과 완벽하게 작동하는 검증된 솔루션이 필요하다면, 성숙한 생태계와 검증된 통합 기능을 갖춘 **next-intl** 또는 **next-i18next**를 고려해 보세요.

> **향후 로드맵**: Intlayer는 또한 **i18next** 및 **next-intl** 솔루션 위에서 작동하는 플러그인 개발을 계획하고 있습니다. 이를 통해 자동화, 구문, 콘텐츠 관리 측면에서 Intlayer의 장점을 제공하면서도, 애플리케이션 코드에서 이러한 검증된 솔루션들이 제공하는 보안성과 안정성을 유지할 수 있습니다.

## GitHub STARs

GitHub 스타는 프로젝트의 인기, 커뮤니티 신뢰도, 그리고 장기적인 관련성을 강력하게 나타내는 지표입니다. 기술적 품질의 직접적인 척도는 아니지만, 얼마나 많은 개발자가 해당 프로젝트를 유용하다고 생각하고, 진행 상황을 팔로우하며, 채택할 가능성이 있는지를 반영합니다. 프로젝트의 가치를 평가할 때, 스타는 대안들 간의 관심도를 비교하고 생태계 성장에 대한 통찰을 제공하는 데 도움이 됩니다.

[![스타 히스토리 차트](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## 결론

세 가지 라이브러리 모두 핵심 로컬라이제이션에서는 성공적입니다. 차이점은 **현대적인 Next.js에서 견고하고 확장 가능한 설정을 달성하기 위해 얼마나 많은 작업을 해야 하는가**에 있습니다:

- **Intlayer**를 사용하면, **모듈화된 콘텐츠**, **엄격한 TS(타입스크립트)**, **빌드 타임 안전성**, **트리 쉐이킹된 번들**, 그리고 **일류 App Router + SEO 도구**가 **기본값**으로 제공되며, 번거로운 작업이 아닙니다.
- 다국어, 컴포넌트 기반 앱에서 **유지보수성과 속도**를 중요시하는 팀이라면, Intlayer가 오늘날 가장 **완벽한** 경험을 제공합니다.

자세한 내용은 ['Why Intlayer?' 문서](https://intlayer.org/doc/why)를 참조하세요.
