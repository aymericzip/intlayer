---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "깨지기 쉬운 테스트 없이 번역을 검증하는 방법"
description: 다국어(i18n) 앱에서 테스트할 가치가 있는 것과 그렇지 않은 것. Provider 기반 렌더링 테스트, 의사 현지화(pseudolocalization), RTL 및 복수형 커버리지, 스냅샷의 함정.
keywords:
  - 번역 테스트
  - i18n 테스트
  - testing library i18n
  - 의사 현지화
  - 로케일 프로바이더 테스트
  - 스냅샷 테스트 i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# 깨지기 쉬운 테스트 없이 번역을 검증하는 방법

대부분의 i18n 테스트 스위트는 두 가지 원인으로 인해 실패합니다. 하나는 리터럴 문구를 검증하여 문구가 조금만 바뀌어도 50개의 테스트가 깨지고 결국 팀이 테스트를 지워버리는 경우입니다. 다른 하나는 기본 로케일로만 모든 것을 렌더링하여 나머지 17개 언어에 대해서는 아무것도 입증하지 못하는 경우입니다. 두 방식 모두 누구도 신뢰하지 않는 테스트 스위트로 귀결됩니다.

## 목차

<TOC/>

## 라이브러리에 구애받지 않는 패턴

아래의 모든 패턴은 어떤 i18n 스택에서도 동일하게 작동합니다. Provider를 `I18nextProvider`, `NextIntlClientProvider` 또는 `IntlProvider`로 변경해도 라이브러리 API가 아닌 렌더링된 결과물을 검증하므로 테스트 코드는 동일합니다.

커버리지 도구 역시 마찬가지로 적용할 수 있습니다. 기존 카탈로그를 가리키는 [Sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)이나 현재 import를 별칭(alias) 처리하는 [호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/index.md)를 사용하면 기존 JSON 파일에 대해 커버리지 검증을 즉시 수행할 수 있습니다.

## 실제로 무엇을 테스트할지 정의하기

번역 품질은 코드로 테스트할 수 있는 대상이 아닙니다. 어떤 어설션도 독일어 표현이 자연스러운지 판단할 수 없으며, 이를 시도하면 테스트 코드에 하드코딩된 문자열만 넘쳐나게 됩니다.

기계적으로 테스트할 가치가 있는 항목은 다음과 같습니다:

| 테스트할 가치가 있는 것                    | 테스트할 가치가 없는 것       |
| :----------------------------------------- | :---------------------------- |
| 필수 로케일에 값이 모두 존재하는지         | 문구가 세련되고 자연스러운지  |
| 컴포넌트에 올바른 로케일이 전달되는지      | 각 레이블의 정확한 문자열     |
| 각 카테고리별 복수형이 올바르게 처리되는지 | 번역가가 작업을 꼼꼼히 했는지 |
| RTL 로케일에서 텍스트 방향 및 미러링 적용  | 모든 로케일의 모든 문자열     |
| 서식화된 날짜와 숫자가 로케일을 따르는지   | `Intl` 내부 구현의 정확성     |

커버리지 확인은 컴포넌트 단위 테스트가 아닌 단일 데이터 기반 테스트로 처리해야 합니다. 이는 [누락된 번역 감지하기](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md)에서 다루고 있으며, 이 글에서는 그 외의 항목을 다룹니다.

## Provider 하위에서 렌더링하고 역할(role)로 검증하기

핵심 패턴은 컴포넌트를 로케일 프로바이더 내부에서 마운트하고 텍스트 내용 대신 역할(role) 또는 테스트 ID로 요소를 찾는 것입니다.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("프랑스어로 요약 헤딩을 렌더링한다", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

`getByRole("heading")`을 사용하면 텍스트가 수정되어도 테스트가 유지됩니다. 반면 `getByText("Récapitulatif")`는 단어가 바뀌면 즉시 깨집니다. 문자열 자체를 명시적으로 검증해야 하는 드문 상황에서만 리터럴을 사용하세요.

`aria-label` 같은 속성의 경우 렌더링 가능한 노드가 아니라 원본 문자열이 필요합니다. React에서 `useIntlayer` 항목은 이를 위해 `.value` 필드를 제공합니다.

## 로케일 전반에 걸쳐 테스트 매개변수화하기

언어마다 테스트를 하나씩 작성하는 것보다 하나의 테스트 로직을 모든 로케일에 걸쳐 실행하는 것이 훨씬 가치 있습니다.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("키 이름으로 폴백되지 않고 렌더링된다", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // 키가 그대로 렌더링되었다면 조회가 실패했음을 의미합니다.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("올바른 텍스트 방향을 설정한다", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

첫 번째 단언문은 간단하면서도 강력합니다. 키 조회가 실패하여 라이브러리가 키 이름을 표시하면 DOM에 `cart.summary.title`과 같은 형태가 남습니다. 이를 통해 개별 텍스트를 나열하지 않고도 많은 버그를 걸러낼 수 있습니다.

## 의사 현지화(Pseudolocalization)로 카탈로그의 사각지대 찾기

모든 문자열을 변형하는 가짜 로케일을 추가하세요 (예: `Checkout`을 `[!!! Çĥéçķöũţ !!!]`로 변환). 그런 다음 해당 로케일로 페이지를 렌더링합니다.

여전히 일반 영어로 남아 있는 문자열은 코드에 하드코딩된 것입니다. 도구 입장에서는 해당 문자열이 존재하지 않으므로 카탈로그 기반 검사로는 이를 찾을 수 없습니다. 대괄호는 텍스트를 약 30% 늘려주므로, 독일어 등 긴 언어에서 레이아웃이 깨지는 문제를 사전에 발견하는 효과도 있습니다.

이 작업은 텍스트가 아닌 화면의 시각적 이상을 감지하는 것이므로 유닛 테스트보다는 시각적 회귀 또는 E2E 테스트로 실행하는 것이 좋습니다.

## 복수형은 언어별이 아니라 카테고리별로 테스트하기

영어에는 단수와 복수 두 가지 형태만 있어 대부분의 개발자가 두 가지만 확인하기 때문에 복수형 버그가 자주 숨어 있습니다. 폴란드어는 4가지, 아랍어는 6가지 형식을 가집니다.

```ts fileName="plural.test.ts"
// 아랍어는 zero, one, two, few, many, other를 모두 사용합니다.
describe.each([0, 1, 2, 3, 11, 100])("개수 %i", (count) => {
  it("아랍어에서 빈 문자열이 아닌 결과를 반환한다", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

모든 곳에서 단순히 1과 2만 테스트하지 말고, 가장 복잡한 언어의 각 CLDR 카테고리에 해당하는 숫자를 선택하세요. `Intl.PluralRules`를 사용하면 숫자가 어떤 카테고리에 속하는지 알 수 있으므로 추측하지 않고 표본을 구성할 수 있습니다. 카테고리에 관한 자세한 내용은 [ICU 메시지 포맷 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/icu_message_format.md)에서 확인하세요.

## 스냅샷(Snapshot)의 함정

스냅샷과 i18n은 어울리지 않습니다. 다국어 컴포넌트의 스냅샷은 내부의 모든 텍스트를 저장합니다. 번역가가 포르투갈어 오타를 수정하면 성공하던 테스트가 실패하고, 리뷰어는 변경된 내용을 제대로 평가할 수 없게 됩니다. 이런 일이 몇 번 반복되면 누구나 diff를 읽지 않고 `-u`를 실행하게 되어 스냅샷은 무의미해집니다.

스냅샷을 사용하려면 단 하나의 로케일에서만 생성하고, 내용 검사가 아닌 구조적 검사로만 다루세요. 로케일별 세부 내용은 명시적인 어설션으로 검증해야 합니다.

## 렌더링뿐만 아니라 로케일 협상(Negotiation)도 테스트하기

프로덕션에서 가장 흔한 i18n 버그는 번역 누락이 아닙니다. 바로 잘못된 로케일이 선택되는 것입니다. URL은 `/fr/`인데 클라이언트가 `navigator.language`를 읽어 서로 충돌하는 경우입니다.

컴포넌트와 분리하여 순수 함수로 로케일 결정 순서를 직접 테스트하세요:

```ts fileName="locale-resolution.test.ts"
it("저장된 기본 설정보다 URL을 우선시한다", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("URL에 접두사가 없으면 헤더로 폴백한다", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

이 테스트는 대부분의 코드베이스에서 놓치고 있는 가장 가치 있는 i18n 테스트이며, DOM도 필요하지 않습니다.

## 테스트 단계별 실행 전략

- **Unit**: 로케일 협상, 포매터, 복수형 카테고리. 빠르고 DOM 불필요.
- **Component**: 로케일당 1회 Provider 기반 렌더링, 역할(role) 및 원시 키 노출 여부 검증.
- **Coverage**: 필수 로케일 누락이 없음을 검증하는 단일 데이터 기반 테스트.
- **Visual / E2E**: 의사 현지화 및 RTL 페이지 검증 (시각적 결함 감지).

앞의 세 가지는 매 커밋마다 CI 파이프라인에서 실행하세요. 마지막 항목은 매 push마다 돌리기엔 무거우므로 야간 빌드에 적합합니다.

## 흔한 실수들

- **모든 곳에서 리터럴 텍스트 검증하기.** 몇 달 안에 테스트 스위트를 포기하게 만드는 주원인입니다.
- **다국어 컴포넌트 스냅샷 생성하기.** 번역 수정 때마다 빌드가 깨지고 검토가 형식적으로 변합니다.
- **기본 로케일만 테스트하기.** 유일하게 누락될 일이 없는 언어만 검사하는 셈입니다.
- **복수형을 1과 2로만 테스트하기.** 영어 외 언어에 존재하는 다양한 카테고리를 놓칩니다.
- **i18n 라이브러리를 통째로 모킹하기.** 이 경우 모의 객체가 문자열을 반환하는지만 검증할 뿐입니다.
- **협상 로직을 테스트하지 않기.** 실서비스에서 가장 자주 발생하며 가장 테스트하기 쉬운 항목입니다.

## 더 알아보기

- [콘텐츠 테스트: CLI 감사, 프로그래밍 API 및 UI 단언문](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/testing.md)
- [ESLint 플러그인: 하드코딩된 문자열 및 미사용 콘텐츠 감지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/eslint.md)
- [포매터 및 로케일 유틸리티 (`getHTMLTextDir` 포함)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)
- [프레임워크별 벤치마크 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [react-i18next 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-i18next.md)
- [누락된 번역 감지하기](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/detecting_missing_translations.md)
- [ICU 메시지 포맷: 복수형, select 및 스켈레톤](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/icu_message_format.md)
