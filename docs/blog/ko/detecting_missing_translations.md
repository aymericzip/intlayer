---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "사용자가 발견하기 전에 누락된 번역을 감지하는 방법"
description: 번역 누락은 조용히 발생합니다. 폴백이 이를 숨기는 이유, 실제로 작동하는 네 가지 감지 계층, 그리고 미번역 키가 있을 때 빌드를 중단시키는 방법.
keywords:
  - 누락된 번역 찾기
  - 누락된 번역 키
  - i18n 감사
  - 미번역 문자열
  - 번역 커버리지
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# 사용자가 발견하기 전에 누락된 번역을 감지하는 방법

번역이 누락되었다고 해서 애플리케이션이 오류를 던지는 일은 거의 없습니다. 설정에 따라 일본인 사용자에게 영어 문구가 노출되거나, 실제 배포된 화면에 `checkout.summary.total`이라는 키 이름이 그대로 출력됩니다. 두 경우 모두 코드 리뷰를 무사히 통과해 배포되고, 개발자가 아닌 고객에 의해 결함이 드러나게 됩니다.

## 목차

<TOC/>

## 라이브러리에 관계없이 적용 가능합니다

여기서 다루는 내용은 특정 기술 스택에 국한되지 않습니다. 아래의 감지 계층은 i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate, Lingui 등 모든 라이브러리에서 동일하게 동작합니다. 모두 동일한 방식으로 키를 조회하고 동일한 방식으로 실패하기 때문입니다.

도구 역시 이식성이 뛰어납니다. 번역 메시지가 현재 JSON 카탈로그에 저장되어 있다면, [Sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)을 통해 기존 파일을 그대로 유지한 채 Intlayer의 감사(audit), 채우기(fill), 테스트 명령어를 실행할 수 있습니다:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // 또는 next-intl / react-intl용 "icu"
    }),
  ],
};

export default config;
```

런타임 API를 기존과 동일하게 유지하고 싶다면, [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 통해 번들러 수준에서 `useTranslation`, `$t` 등을 별칭(alias) 처리할 수 있습니다. 어떤 방식이든 아래의 명령어들을 하나의 구체적인 구현 방안으로 이해하시면 됩니다.

## 번역 누락이 보이지 않는 이유

모든 i18n 라이브러리는 동일한 체인을 거쳐 키를 확인합니다: 활성 로케일에서 값을 찾고, 없으면 기본 로케일로 폴백하며, 거기서도 실패하면 키 자체를 문자열로 반환합니다. 바로 이 마지막 단계가 문제입니다. 에러도 발생하지 않고, 경고 로그도 남지 않으며, 테스트도 깨지지 않습니다. 파이프라인의 어떤 단계도 키 누락을 비정상적인 상황으로 인식하지 않기 때문입니다.

폴백 메커니즘은 문제를 해결하기보다 오히려 숨깁니다. 조용히 영어로 렌더링된 페이지는 영어를 사용하는 개발자와 모든 자동화 검사의 눈에는 정상으로 보입니다. 버그는 오직 해당 언어를 읽지 못하는 사용자에게만 보입니다.

따라서 고민해야 할 질문은 "런타임에서 누락된 번역을 어떻게 처리할 것인가"가 아니라, "어떻게 해야 누락된 번역이 머지되는 것을 원천 차단할 것인가"입니다.

## 문제를 사전에 잡아내는 4가지 계층

각 계층은 서로 다른 영역의 문제를 감지합니다. 여러 계층을 결합하여 사용하는 것이 좋습니다.

| 계층          | 잡아내는 것                                 | 놓치는 것                                     |
| :------------ | :------------------------------------------ | :-------------------------------------------- |
| 타입 (Types)  | 아예 존재하지 않는 키                       | 키는 존재하지만 `ja` 번역 값이 비어 있는 경우 |
| 린트 (Lint)   | 번역 대상으로 추출되지 않은 하드코딩 문자열 | 카탈로그에서 누락된 키                        |
| 감사 (Audit)  | 선언된 모든 키에 대한 로케일별 커버리지     | 애초에 다국어 처리가 되지 않은 원본 텍스트    |
| 렌더링 테스트 | 키는 존재하지만 렌더링이 잘못되는 케이스    | 테스트로 명시하지 않은 모든 UI 화면           |

대다수 팀이 겪는 공백은 세 번째 항목입니다. 키 이름이 올바르다는 것은 알지만, 18개 언어 모두에 실제로 번역 값이 채워져 있는지는 확인하지 못합니다.

## 계층 1: 키를 단순 문자열이 아닌 타입으로 만들기

`t("checkout.summry.total")`은 단순한 오타이지만 정상적으로 컴파일됩니다. 키가 일반 문자열이라면, 이름을 변경할 때마다 런타임 장애 위험이 따르고 삭제 시 고아 키가 남게 됩니다.

키에 타입을 부여하면 이러한 실수가 빌드 에러로 즉시 드러납니다. `react-i18next`는 선언 병합(declaration merging)을 통해, `next-intl`은 메시지 구조 추론을 통해, Lingui는 소스 텍스트로부터 ID를 생성하여, Intlayer는 콘텐츠 선언 파일로부터 엄격한 타입을 생성합니다.

다만 이 계층은 필수적이지만 완전하지는 않습니다. 타입은 기본 카탈로그의 구조만을 보증할 뿐, 한국어 번역에 해당 키의 값이 실제로 존재하는지까지는 보장하지 못합니다.

## 계층 2: 키로 변환되지 않은 하드코딩 문자열 린트하기

가장 찾기 힘든 번역 누락은 애초에 외부 파일로 분리되지 않은 텍스트입니다. 컴포넌트 내부에 하드코딩된 레이블은 카탈로그 감사 도구로는 절대 찾아낼 수 없습니다. 도구 입장에서는 해당 문자열이 아예 존재하지 않기 때문입니다.

Intlayer의 ESLint 플러그인은 `no-raw-text`를 통해 하드코딩된 텍스트를 잡아내며, 선언되었지만 더 이상 사용되지 않는 코드를 찾아내는 `no-unused-content` 규칙도 함께 제공합니다.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content`는 카탈로그가 불필요하게 비대해지는 것을 방지합니다. 사용되지 않는 키가 오류를 일으키지는 않지만, 외부 번역 에이전시 비용을 낭비하게 만듭니다. 자세한 규칙 목록은 [ESLint 플러그인 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)를 참고하세요.

## 계층 3: 로케일 커버리지 감사 (Audit)

이 계층이 핵심적인 질문에 대한 답을 제공합니다. Intlayer는 이를 CLI 명령어로 제공합니다:

```bash packageManager="npm"
npx intlayer content test
```

설정된 로케일과 선언된 딕셔너리를 읽어 들여, 어떤 파일의 어떤 키에서 어떤 언어가 누락되었는지를 상세히 보고합니다.

파이프라인에 연결하기 전에 알아두어야 할 점은, **이 CLI는 리포트를 출력하지만 종료 코드 0으로 정상 종료된다는 점입니다.** 따라서 단순히 이 명령만 넣으면 빌드가 성공하면서 로그 창에 아무도 보지 않는 텍스트만 남게 됩니다. 빌드를 중단시키려면 아래의 프로그래밍 방식 API를 사용해야 합니다.

## 계층 4: 테스트 스위트에서 어설션으로 차단하기

`listMissingTranslations()`는 동일한 감사 결과를 데이터 객체로 반환하므로 빌드 차단(gate)을 구현하기에 완벽합니다.

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("필수 로케일에 누락된 번역이 없다", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

반환되는 세 가지 필드의 차이를 이해하는 것이 중요합니다:

- `missingTranslations`: 각 키별로 어떤 언어가 어느 파일에서 누락되었는지를 나타내며, 테스트 실패 시 로그로 출력하기에 적합합니다.
- `missingLocales`: 모든 키에 걸쳐 누락이 발생한 언어들의 합집합입니다.
- `missingRequiredLocales`: 설정 파일의 `requiredLocales`로 한정된 누락 언어 목록입니다 (설정하지 않은 경우 전체 언어가 대상).

## `requiredLocales` 설정이 검사를 현실적으로 만듭니다

18개 언어를 지원한다고 해서 모든 언어가 100% 번역되어야만 배포할 수 있는 것은 아닙니다. 대부분의 팀에서는 배포를 반드시 막아야 하는 핵심 언어와, 점진적으로 채워 나갈 언어를 구분하여 관리합니다.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

`requiredLocales`를 설정하지 않으면 선언된 모든 언어가 필수 언어가 되어, 한 언어의 번역이 늦어질 때마다 모든 배포가 지연됩니다. 결국 팀에서는 이 검사 자체를 비활성화하게 되며, 이는 검사를 아예 두지 않는 것보다 위험합니다.

## 이미 배포된 환경에서 누락된 번역 찾기

위의 계층들은 새로운 누락이 유입되는 것을 방지합니다. 이미 서비스 중인 애플리케이션의 경우 다음 두 가지 방법이 효과적입니다.

**의사 현지화 (Pseudolocalization).** 모든 텍스트가 `[!!! Ĉĥéçķöũţ !!!]` 형태로 변형되는 가짜 로케일을 적용해 보세요. 여전히 일반 영어로 남아 있는 텍스트는 100% 코드에 하드코딩된 것입니다. 렌더링된 결과 자체를 검증하므로 카탈로그 감사 도구가 구조적으로 찾지 못하는 문제를 10분 만에 발견할 수 있습니다.

**자사 사이트 크롤링.** 로케일별 URL을 지원한다면 언어별 샘플 페이지를 요청한 뒤, HTML에서 기본 언어 문자열을 검색해 보세요. `/ja/` 경로의 페이지에 "Add to cart"라는 문구가 포함되어 있다면, 이는 번역이 누락되었거나 의도치 않은 폴백이 발생했다는 의미입니다.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## 빈틈 채우기

누락된 부분이 확인되면 `intlayer fill`을 통해 비어 있는 항목을 채울 수 있으며, `autoFill` 옵션을 통해 콘텐츠 선언 시점에 언어별 파일을 자동 생성할 수도 있습니다. 자세한 내용은 [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md) 문서를 참고하세요.

기계 번역 자동 채우기는 **보이던 공백을 보이지 않는 공백으로 바꿀 뿐**이라는 점을 명확히 인지해야 합니다. 키가 채워졌으므로 감사는 통과하지만, 그 문장을 검토한 사람은 아무도 없습니다. 배포를 진행하기 위한 임시 수단으로 활용하고, 구매 전환이나 결제에 직결되는 핵심 문구는 반드시 사람의 검토를 거치도록 하세요.

## 흔한 실수들

- **폴백을 안전망으로 착각하기.** 에러를 감추는 렌더링 방식일 뿐이며, 조용히 영어로 표시되는 것은 버그입니다.
- **CLI 리포트만으로 CI 차단 시도.** `intlayer content test`는 정상 종료되므로 테스트 코드 어설션을 활용해야 합니다.
- **모든 언어를 필수(required)로 지정.** 번역 하나 때문에 배포가 막혀 결국 검사 자체가 폐기됩니다.
- **카탈로그만 보고 렌더링 화면을 무시.** 하드코딩된 문자열은 카탈로그에서 절대 찾을 수 없습니다.
- **기본 로케일만 테스트.** 누락될 리가 없는 유일한 언어만 검사하는 꼴입니다.
- **자동 채우기만으로 프로세스 종료.** 감사는 통과하지만 검증되지 않은 텍스트가 남습니다.

## 더 알아보기

- [콘텐츠 테스트: CLI 감사, 프로그래밍 API 및 UI 단언문](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)
- [ESLint 플러그인 규칙 (`no-raw-text`, `no-unused-content`)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)
- [autoFill: 로케일별 선언 파일 자동 생성](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/autoFill.md)
- [설정 레퍼런스: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [프레임워크 간 벤치마크 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [i18next 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md)
- [국제화(i18n)의 실제 범위](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/what_is_internationalization.md)
- [컴포넌트 단위 i18n vs 중앙 집중식 i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/per-component_vs_centralized_i18n.md)
