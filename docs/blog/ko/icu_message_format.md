---
createdAt: 2026-09-02
updatedAt: 2026-09-26
priority: 8
title: "ICU MessageFormat: 구문, 복수형 및 Select 완벽 가이드"
description: ICU MessageFormat 실전 가이드, 인자 보간, 복수형 및 select 분기, 언어별 CLDR 복수형 규칙, 개발자가 자주 겪는 함정을 정리합니다.
keywords:
  - icu message format
  - icu messageformat
  - cldr 복수형 규칙
  - 복수형 카테고리
  - selectordinal
  - i18n 복수형
  - 메시지 구문
slugs:
  - blog
  - icu-message-format
author: aymericzip
---

# ICU MessageFormat: 구문과 자주 겪는 함정

ICU MessageFormat은 번역 문자열 자체에 조건 분기 로직(복수형, 성별에 따른 형태, 숫자 및 날짜 서식)을 직접 포함할 수 있도록 해주는 문자열 구문 규격입니다. 문법 처리는 `if (count === 1)`을 작성하는 개발자가 아니라 번역가의 영역이어야 한다는 원칙에 기반합니다. 이 글에서는 기본 구문, 단순한 구현을 망가뜨리는 언어별 특징, 그리고 JavaScript 생태계가 이를 처리하는 방식을 살펴봅니다.

## 목차

<TOC/>

## 문제 상황 살펴보기

대부분의 개발자가 처음 작성하는 코드는 다음과 같습니다.

```ts
const label = count + " " + (count === 1 ? t("item") : t("items"));
```

이 코드는 영어에서는 잘 동작하지만 다른 거의 모든 언어에서는 문제가 발생합니다.

- **러시아어와 폴란드어**에서는 2개가 아닌 3~4개의 형태가 필요합니다.
- **한국어와 일본어**에서는 복수 구분이 필요 없으며, 문자열 결합으로 붙인 공백이 부자연스러울 수 있습니다.
- **아랍어**에서는 6개의 형태가 필요하며, 숫자 자체도 해당 로케일의 숫자 표기 체계로 렌더링되어야 합니다.
- **프랑스어**에서는 특정 문장 부호 앞에 줄바꿈 없는 공백(non-breaking space)을 넣어야 하는데, `+ " "` 결합 방식이 이를 깨뜨립니다.

더 근본적인 문제는 문장이 여러 조각으로 파편화된다는 점입니다. 번역가는 문맥이 없는 `item`과 `items`만을 보게 되며, 문장의 어순을 유연하게 조정할 수 없습니다. ICU MessageFormat은 전체 문장을 단일 번역 문자열로 유지하면서 번역가에게 분기 연산자를 제공하여 이 문제를 해결합니다.

## 단순 인자 보간

가장 작은 단위는 단일 중괄호로 묶인 플레이스홀더입니다.

```text
Hello, {name}!
```

포맷 시점에 `{ name: "Alice" }`를 넘겨주면 `Hello, Alice!`가 생성됩니다. 중괄호는 ICU에서 유일한 특수 문자입니다. 문자 그대로의 중괄호를 출력하려면 작은따옴표로 감싸야 합니다(예: `'{'`).

이것이 보간(interpolation)의 기본 원리이며, ICU의 다른 모든 기능은 이 위에 구축됩니다.

## 복수형 (plural)

`plural`은 숫자를 기준으로 알맞은 분기를 선택합니다.

```text
{count, plural,
  one {You have one unread message}
  other {You have # unread messages}
}
```

반드시 알아두어야 할 세 가지 규칙:

- **`#`** 기호는 로케일 서식이 적용된 `count` 값으로 치환됩니다. 예를 들어 `1234`는 `en-US`에서는 `1,234`가 되고 `ko-KR`에서도 `1,234`로 서식화됩니다.
- **`other`는 필수입니다.** 모든 ICU 구현체는 `other`가 누락되면 오류를 발생시키거나 검증에 실패합니다. 어떤 카테고리에도 일치하지 않을 때 사용하는 폴백 역할을 합니다.
- **`=0`, `=1` 등은 정확한 값과 일치**하며, CLDR 카테고리보다 _먼저_ 평가됩니다. 이는 `one`을 대체하는 용도가 아니라 "메시지가 없습니다"와 같은 특수한 문구를 표현할 때 사용합니다.

```text
{count, plural,
  =0 {No unread messages}
  one {One unread message}
  other {# unread messages}
}
```

### offset

`offset:n`은 카테고리 판별 및 `#` 치환을 수행하기 전에 숫자에서 `n`을 차감합니다. "앨리스 외 3명이 좋아합니다"와 같은 패턴에 유용합니다.

```text
{count, plural, offset:1
  =0 {No one liked this}
  =1 {{name} liked this}
  one {{name} and one other liked this}
  other {{name} and # others liked this}
}
```

`count: 4`가 전달되면 `#` 자리에 `3`이 렌더링됩니다. `offset`은 유용하지만 런타임에 따라 지원 편차가 있으므로 사용 전 확인이 필요합니다.

## 언어마다 다른 복수형 카테고리

가장 많은 오해가 발생하는 부분입니다. `zero`, `one`, `two`, `few`, `many`, `other` 카테고리 이름은 모든 언어에 동일하게 적용되는 공통 규격이 아닙니다. 각 로케일은 [CLDR 복수형 규칙](https://cldr.unicode.org/index/cldr-spec/plural-rules)에 정의된 _일부_만을 사용하며, 이는 수학적 직관이 아닌 문법 규칙에 근거합니다.

| 언어     | 태그 | 사용 카테고리                    | 총 개수 |
| -------- | ---- | -------------------------------- | ------- |
| 한국어   | `ko` | other                            | 1       |
| 일본어   | `ja` | other                            | 1       |
| 중국어   | `zh` | other                            | 1       |
| 영어     | `en` | one, other                       | 2       |
| 독일어   | `de` | one, other                       | 2       |
| 프랑스어 | `fr` | one, many, other                 | 3       |
| 체코어   | `cs` | one, few, many, other            | 4       |
| 폴란드어 | `pl` | one, few, many, other            | 4       |
| 러시아어 | `ru` | one, few, many, other            | 4       |
| 아랍어   | `ar` | zero, one, two, few, many, other | 6       |
| 웨일스어 | `cy` | zero, one, two, few, many, other | 6       |

주의해야 할 두 가지 결과:

- **`one`이 숫자 "1"만을 의미하지 않습니다.** 러시아어에서 `one`은 11로 끝나는 경우를 제외하고 1, 21, 31, 101 등 1로 끝나는 모든 수를 포함합니다. 프랑스어에서는 `0`도 `one`에 속합니다.
- **영어 원문에 카테고리를 추가해도 다른 언어에 자동으로 적용되지 않습니다.** 영어 메시지는 `one`과 `other`만 있으면 충분하지만, 폴란드어 번역은 4개의 분기가 필요하며 이 구조는 폴란드어 문자열 안에 직접 정의되어야 합니다. 모든 로케일이 동일한 키 구조를 갖도록 강제하는 도구는 이러한 다국어 구조에서 충돌을 일으킵니다.

별도의 라이브러리 설치 없이 현재 런타임의 동작 방식을 직접 확인할 수 있습니다.

```ts
new Intl.PluralRules("pl").select(2); // "few"
new Intl.PluralRules("pl").select(5); // "many"
new Intl.PluralRules("ru").select(21); // "one"
new Intl.PluralRules("ar").select(0); // "zero"
```

모든 모던 브라우저와 Node.js 환경의 `Intl.PluralRules`에는 CLDR 데이터가 기본 탑재되어 있습니다. CLDR 복수형을 지원하는 라이브러리들은 대부분 내부적으로 이 표준 API를 호출합니다.

## select 와 selectordinal

`select`는 성별, 역할, 상태, 구독 등 임의의 문자열을 기준으로 분기합니다.

```text
{gender, select,
  female {She updated her profile}
  male {He updated his profile}
  other {They updated their profile}
}
```

키 값은 정확히 일치해야 하며 여기서도 `other`는 필수입니다. 언어마다 문장 구조에 영향을 미치는 열거형 값이 다르기 때문에, 문법적 변화가 필요한 경우 `select`가 최적의 도구입니다.

`selectordinal`은 `plural`과 형태가 같지만, 기수가 아닌 **서수(1st, 2nd 등)** 규칙을 따릅니다.

```text
{rank, selectordinal,
  one {#st place}
  two {#nd place}
  few {#rd place}
  other {#th place}
}
```

영어는 기수에서는 2개의 카테고리만 사용하지만, 서수에서는 4개(1st, 2nd, 3rd, 4th)를 사용합니다. 이러한 비대칭성 때문에 두 연산자가 분리되어 존재합니다.

## 숫자, 날짜 및 시간 서식

ICU는 보간되는 값을 직접 서식화할 수 있습니다.

```text
Total: {price, number, currency}
Published {publishedAt, date, long} at {publishedAt, time, short}
Conversion: {rate, number, percent}
```

현대적인 방식은 ICU 60에서 도입된 `::` 접두사 기반의 **스켈레톤(skeleton)**입니다. 스켈레톤은 기존 레거시 스타일에 비해 훨씬 풍부한 표현력을 가집니다.

```text
{price, number, ::currency/EUR}
{value, number, ::percent scale/100}
{amount, number, ::compact-short}
{distance, number, ::unit/kilometer unit-width-narrow}
```

생태계 내 스켈레톤 지원 현황은 라이브러리마다 상이합니다. FormatJS는 이를 온전히 지원하지만 다른 런타임은 레거시 형태(`number, currency`나 `date, long`)만 지원할 수 있습니다. 프로덕션 환경에 배포하기 전 실제 런타임의 지원 여부를 확인하세요.

## 중첩 구조와 가독성

ICU는 조합이 가능합니다. 복수형 분기 안에 select를 포함하고, 그 안에 다시 다른 복수형을 넣을 수 있습니다.

```text
{hostGender, select,
  female {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    =1 {{host} invites {guest} to her party}
    other {{host} invites {guest} and # other people to her party}
  }}
  other {{guestCount, plural, offset:1
    =0 {{host} does not give a party}
    other {{host} invites {guest} and # other people to their party}
  }}
}
```

이 코드는 전형적인 ICU 예제이면서 과도한 중첩을 피해야 하는 이유를 잘 보여줍니다. 2단계를 넘어가면 번역가가 괄호 실수를 저지르기 쉬우며 TMS 에디터의 보조 기능도 한계에 부딪힙니다. 중첩은 최대 2단계까지만 유지하고, 3단계가 필요하다면 문장을 두 개의 개별 메시지로 나누는 것이 현명합니다.

## JavaScript 라이브러리별 ICU 지원 현황

| 라이브러리            | ICU 지원 수준       | 실제 작성하는 코드 형태                                                  |
| --------------------- | ------------------- | ------------------------------------------------------------------------ |
| react-intl (FormatJS) | 네이티브, 완전 지원 | 스켈레톤 및 리치 텍스트 태그를 포함한 ICU 문자열                         |
| next-intl             | 네이티브            | FormatJS의 `intl-messageformat` 기반 ICU 문자열                          |
| i18next               | 플러그인 필요       | `key_one` / `key_other` 접미사 및 `{{name}}`; ICU는 `i18next-icu`로 지원 |
| vue-i18n              | 부분적 / 독자 규격  | `{name}` 보간 및 파이프로 구분된 복수형 분기                             |
| Angular (`$localize`) | 하위 집합           | 템플릿 내부의 ICU `plural` / `select`, XLIFF로 추출                      |

표를 읽을 때 참고해야 할 사항:

- **i18next의 기본 구문은 ICU가 아니며**, 이것이 단점을 의미하지는 않습니다. 접미사 키(`item_one`, `item_few`)는 `Intl.PluralRules` 카테고리에 매핑되며 플랫 JSON에서 편집하기 더 수월합니다. 다만 `select`나 중첩 분기는 지원하지 않으므로 `i18next-icu`를 추가하거나 코드 레벨에서 처리해야 합니다.
- **vue-i18n의 파이프 복수형**은 기본적으로 CLDR 규칙 대신 로케일별 규칙 함수를 사용합니다. 동작에는 문제가 없지만 규칙이 데이터가 아닌 애플리케이션 설정에 종속됩니다.
- **FormatJS는 JS 생태계의 레퍼런스**입니다. JavaScript 진영에서 "ICU MessageFormat"을 언급할 때는 통상 FormatJS가 수용하는 표준을 의미합니다.

## Intlayer의 해결 방식

Intlayer는 문자열 DSL을 사용하지 않습니다. 조건 분기 연산자들이 타입 안전한 콘텐츠 선언 파일 내의 함수로 제공되므로, 구조가 견고하게 유지되고 각 로케일은 자신의 문법에 필요한 카테고리만을 선언할 수 있습니다.

```typescript fileName="**/*.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const openingsContent = {
  key: "total_openings",
  content: {
    totalOpenings: t({
      en: plural({
        one: "{{count}} opening",
        other: "{{count}} openings",
      }),
      ko: plural({
        other: "{{count}}개의 채용 공고",
      }),
      pl: plural({
        one: "{{count}} oferta",
        few: "{{count}} oferty",
        many: "{{count}} ofert",
        other: "{{count}} ofert",
      }),
    }),
  },
} satisfies Dictionary;

export default openingsContent;
```

```tsx fileName="**/*.tsx"
const { totalOpenings } = useIntlayer("total_openings");

totalOpenings(5); // 한국어 로케일 → "5개의 채용 공고"
```

ICU 개념과의 매핑 관계는 직관적입니다.

| ICU 구조                      | Intlayer 대응 방식                           |
| ----------------------------- | -------------------------------------------- |
| `{name}`                      | `insert("Hello {{name}}")` 또는 자동 감지    |
| `{count, plural, …}`          | `plural({ one, few, many, other })`          |
| `{value, select, …}`          | `select({ draft, published, fallback })`     |
| `select`의 성별 분기          | `gender({ male, female, fallback })`         |
| `select`의 불리언 분기        | `cond({ true, false })`                      |
| 숫자 범위(비CLDR)             | `enu({ "0": …, ">5": …, fallback: … })`      |
| `{n, number, ::currency/EUR}` | `useCurrency()(1234.5, { currency: "EUR" })` |

`plural`은 카테고리 판별을 `Intl.PluralRules`에 위임하므로 앞서 살펴본 CLDR 테이블이 그대로 적용됩니다. 숫자, 날짜, 통화, 목록 서식화는 메시지 문자열에 섞지 않고 [포맷터 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)을 통해 관심사를 분리하여 처리합니다.

- [포맷터 훅](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)

고려해야 할 한계점:

- Intlayer는 빌드 단계가 필요합니다. 컴파일러가 빌드 타임에 콘텐츠 선언을 추출합니다. 런타임에 단순 JSON을 동적으로 불러오는 모델과는 방향성이 다릅니다.
- 현재 `plural` 분기 내부에 `t()`를 직접 중첩할 수 없습니다. `t()` 내부에서 `plural`을 호출하는 구조를 사용해야 합니다.
- i18next에 비해 상대적으로 신생 생태계이므로 TMS 도구 연동이나 커뮤니티 레퍼런스가 축적되는 단계에 있습니다.

기존에 작성된 ICU 문자열이 있는 프로젝트를 마이그레이션할 경우, [react-intl 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-intl.md)가 `plural`, `select`, `selectordinal`, `#`, 레거시 `number` / `date` / `time` 구문을 직접 해석합니다. 스켈레톤 및 `offset:`은 현재 해당 리졸버에서 지원되지 않으므로 마이그레이션 시 검토가 필요합니다. [i18next 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md)는 접미사 형식(`key_one`, `key_male`)을 `Intl.PluralRules`를 통해 처리합니다.

- [react-intl 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-intl.md)
- [i18next 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/i18next.md)

## 흔히 범하는 실수

- **자바스크립트 코드 내에 복수형 삼항 연산자를 하드코딩하는 것.** `count === 1 ? a : b` 구문은 위 표에 있는 10개 언어 중 8개 언어에서 잘못된 문법을 출력합니다. 삼항 연산자가 코드에 고정되면 번역가가 이를 수정할 방법이 없습니다.
- **번역된 텍스트 조각들을 문자열로 이어 붙이는 것.** 어순, 성수 일치, 문장 부호 앞뒤 공백 규칙은 로케일마다 다릅니다. 항상 문장 단위로 온전하게 번역해야 합니다.
- **`other`를 빠뜨리는 것.** 이는 권장 사항이 아니라 표준 규격의 필수 요구사항입니다. 대부분의 파서는 에러를 발생시키며, 그렇지 않은 경우에도 빈 문자열만 출력됩니다.
- **모든 언어의 카테고리 구성이 같을 것이라 가정하는 것.** 영어 원문이 `one`과 `other` 2개라고 해서 폴란드어 번역도 2개일 수는 없습니다. 각 언어가 고유한 분기를 선언할 수 있어야 합니다. [로케일별 콘텐츠 선언 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/per_locale_file.md)를 참고하세요.
- **`one` 대신 `=1`을 사용하는 것.** `=1`은 정확히 숫자 1에만 매칭됩니다. 러시아어에서 21은 `one` 카테고리에 속하지만 `=1`에는 결코 일치하지 않습니다.
- **`#`을 복수형 분기 외부에 배치하는 것.** `#`은 `plural`이나 `selectordinal` 내부에서만 특수한 치환자로 작동합니다. 그 외 위치에서는 단순한 해시 기호로 취급됩니다.
- **`#`이 이미 로케일 서식화되었음을 간과하는 것.** 천 단위 구분 기호가 없는 순수 숫자가 필요한 경우 인자 이름을 직접 지정하여 보간하세요.

## 더 알아보기

- [Intlayer의 복수형 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/plurial.md)
- [Select 기반 콘텐츠](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/select.md)
- [삽입 플레이스홀더](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/insertion.md)
- [i18n 라이브러리 벤치마크](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/react-i18next_vs_react-intl_vs_intlayer.md)
- [국제화(i18n)란 무엇인가?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/what_is_internationalization.md)
