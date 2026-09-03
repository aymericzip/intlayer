---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Intl을 사용해 로케일별로 날짜와 숫자 포맷팅하기"
description: 별도의 포맷팅 라이브러리는 필요하지 않을 수 있습니다. Intl이 언어별 날짜, 숫자, 통화, 목록을 처리하는 방식, 캐싱 비용, 그리고 프로덕션에서만 발생하는 타임존 버그를 설명합니다.
keywords:
  - 로케일별 날짜 포맷
  - Intl.DateTimeFormat
  - Intl.NumberFormat
  - toLocaleDateString
  - 통화 포맷 로케일
  - 상대적 시간 포맷
slugs:
  - blog
  - date-time-number-formatting-locales
author: aymericzip
---

# Intl을 사용해 로케일별로 날짜와 숫자 포맷팅하기

텍스트 번역은 다국어화(i18n)의 눈에 보이는 절반에 불과합니다. 버그 리포트의 단골 원인이 되는 나머지 절반은 포맷팅입니다. 독일 사용자가 `1.234,56` 대신 `1,234.56`을 보거나, 일본 사용자가 `08/02/2026`을 보고 8월로 오해하거나, 서버와 클라이언트의 렌더링 결과가 달라 React 하이드레이션 에러로 화면이 멈추는 현상이 대표적입니다.

이러한 문제를 해결하기 위해 서드파티 라이브러리를 설치할 필요는 없습니다. 최신 자바스크립트 런타임 환경에는 `Intl` API가 기본으로 탑재되어 있습니다.

## 목차

<TOC/>

## 직접 작성한 날짜 헬퍼 함수부터 삭제하세요

거의 모든 프로젝트에는 다국어 지원을 고민하기 전에 작성된 `formatDate` 함수가 존재합니다. 순서, 구분 기호, 그리고 대개 영어 월 이름이 코드에 직접 고정되어 있습니다.

```ts
// 지금 바로 지워야 할 코드
const formatDate = (d: Date) =>
  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
```

`Intl.DateTimeFormat`은 이를 완전히 대체하며, 모든 로케일에서 표준에 맞게 동작합니다:

```ts
new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(date);
// "2. August 2026"
new Intl.DateTimeFormat("ja-JP", { dateStyle: "long" }).format(date);
// "2026年8月2日"
```

숫자도 마찬가지입니다. `toFixed(2)`는 전 세계 어디서나 `1234.56`을 출력하지만, 이는 유럽 대부분의 국가 표기법과 맞지 않습니다.

## `Intl`이 지원하는 기능

| API                       | 주 용도                                             |
| :------------------------ | :-------------------------------------------------- |
| `Intl.DateTimeFormat`     | 날짜와 시간 (`dateStyle` / `timeStyle` 프리셋 지원) |
| `Intl.NumberFormat`       | 소수점, 통화, 백분율, 단위, 축약 표기               |
| `Intl.RelativeTimeFormat` | "3일 전", "2시간 후" 등의 상대 시간 표현            |
| `Intl.ListFormat`         | "사과, 바나나 및 오렌지" 등의 목록 나열 결합        |
| `Intl.PluralRules`        | 수치에 따른 복수형 규칙 판별                        |
| `Intl.Collator`           | 언어별 규칙에 따른 올바른 문자열 정렬               |

특히 자주 간과되는 것이 `Intl.Collator`입니다. 문자열에 일반적인 `array.sort()`를 실행하면 유니코드 코드 포인트 기준으로 정렬되어 악센트 문자가 `z` 뒤로 밀리고 스웨덴어 `ö`가 엉뚱한 위치에 배치됩니다. 사용자에게 노출되는 목록을 정렬할 때는 반드시 collator를 사용해야 합니다.

```ts
["zebra", "édouard", "apple"].sort(new Intl.Collator("ko").compare);
// ["apple", "édouard", "zebra"]
```

## 직접 조합하기보다 프리셋을 우선 활용하세요

`dateStyle`과 `timeStyle`을 사용하면 해당 로케일에 알맞은 논리적 순서와 구분 기호가 자동으로 결정됩니다. `year`, `month`, `day`를 수동으로 조합하는 것은 추천하지 않습니다. 지역마다 고유한 순서 규칙이 다른데, 이를 자의적인 추측으로 덮어써 CLDR의 표준 데이터를 망가뜨릴 수 있기 때문입니다.

```ts
// 로케일에 맞추어 자동으로 레이아웃이 결정됩니다
new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(d);

// 수동으로 구조를 강제하면 다른 지역에서 잘못된 형식이 됩니다
new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(d);
```

좁은 테이블 열처럼 고정된 너비가 절대적으로 요구되는 특별한 디자인 케이스가 아니라면 항상 프리셋을 사용하는 것이 좋습니다.

## 포맷터 생성 비용에 유의하세요

성능 최적화에서 매우 중요한 포인트입니다. `Intl.NumberFormat` 인스턴스를 생성할 때는 방대한 로케일 데이터를 메모리에 불러오기 때문에, 이후의 `.format()` 호출에 비해 훨씬 많은 자원을 소모합니다. 테이블의 1,000개 행을 순회하면서 매번 인스턴스를 생성하면 눈에 띄는 렌더링 지연이 발생합니다.

```ts
// 매 행마다 포맷터를 새로 생성 (비효율적)
rows.map((r) => new Intl.NumberFormat(locale).format(r.total));

// 한 번만 생성하여 재사용 (효율적)
const nf = new Intl.NumberFormat(locale);
rows.map((r) => nf.format(r.total));
```

`toLocaleDateString()`과 `toLocaleString()`도 내부적으로 동일한 메커니즘으로 동작합니다. 단일 값을 바꿀 때는 문제없지만, 리스트를 순회할 때는 적합하지 않습니다.

로케일과 옵션 조합을 키로 활용하여 캐시해 두세요:

```ts
const cache = new Map<string, Intl.NumberFormat>();

const getNumberFormat = (
  locale: string,
  options: Intl.NumberFormatOptions = {}
) => {
  const key = `${locale}:${JSON.stringify(options)}`;
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    cache.set(key, formatter);
  }
  return formatter;
};
```

## 프로덕션 환경에서만 터지는 타임존 버그

많은 개발자들이 골치를 앓는 문제입니다. SSR 단계에서 서버가 날짜를 렌더링하고 브라우저가 이를 하이드레이션할 때, 양쪽에서 생성한 문자열이 달라 React가 Hydration Mismatch 오류를 내며 멈춰 버립니다.

원인은 `Intl.DateTimeFormat`에 타임존을 명시하지 않으면 운영체제의 기본 타임존을 참조하기 때문입니다. 배포 서버는 통상 UTC로 설정되어 있지만, 로컬 개발 장비는 사용자의 현지 시간대입니다. 따라서 로컬에서는 재현되지 않고 프로덕션에서만 문제가 발생합니다.

```ts
// 서버(UTC)와 브라우저(KST) 결과가 불일치하여 하이드레이션 실패
new Intl.DateTimeFormat(locale, { dateStyle: "short" }).format(d);

// 타임존을 고정하여 양쪽 결과를 완벽히 일치시킵니다
new Intl.DateTimeFormat(locale, { dateStyle: "short", timeZone: "UTC" }).format(
  d
);
```

실질적인 3가지 해결책:

- **서버 타임존을 고정**하고 명시적으로 전달합니다. 안전하고 결정론적이지만 모두에게 UTC 시간이 노출됩니다.
- **클라이언트 전용으로 렌더링**하고 서버 렌더링 시에는 안정적인 플레이스홀더를 보여줍니다. 사용자에게 정확하지만 초기 렌더링 시 깜빡임이 있을 수 있습니다.
- **사용자의 타임존을 저장**하여 서버와 클라이언트 양쪽에 전달합니다. 가장 이상적이지만 부가적인 관리가 필요합니다.

어떤 전략을 선택하든, 서버와 클라이언트 양쪽에서 렌더링되는 날짜에는 반드시 `timeZone`을 명시해야 합니다. 타임존이 생략된 날짜는 두 개의 서로 다른 값을 가지는 잠재적 버그입니다.

## 통화에는 로케일이 아니라 통화 코드가 필요합니다

로케일과 통화는 별개의 개념입니다. `fr-FR`이 무조건 유로화를 의미하지는 않습니다. 프랑스 사용자가 미국 달러 청구서를 조회할 수도 있습니다.

```ts
new Intl.NumberFormat("fr-FR", { style: "currency", currency: "USD" }).format(
  1234.5
);
// "1 234,50 $US"
```

로케일은 구분 기호, 자릿수 그룹화, 기호의 위치를 제어합니다. 통화 자체는 비즈니스 데이터로부터 주어져야 합니다. 로케일로부터 통화를 임의로 유추하는 것은 회계 오류를 유발합니다.

또한 `currencyDisplay` 옵션도 유용합니다. 여러 달러 통화가 공존하는 화면에서 `"code"`를 지정하면 미국, 캐나다, 호주 달러 간의 혼선을 확실하게 방지할 수 있습니다.

## 절대적 시각보다 상대적 시간이 읽기 쉽습니다

최근 발생한 일이라면 복잡한 타임스탬프보다 "2시간 전"이 훨씬 직관적이며, `Intl.RelativeTimeFormat`이 이를 자연스럽게 현지화합니다.

```ts
new Intl.RelativeTimeFormat("ko", { numeric: "auto" }).format(-1, "day");
// "어제"
```

`numeric: "auto"`를 지정하면 "1일 전" 대신 "어제"라는 자연스러운 표현을 얻을 수 있습니다.

## Intlayer가 제공하는 편의성

Intlayer는 이러한 API들을 캐싱이 내장된 유틸리티 함수로 감싸 두어 개발자가 직접 Map 캐시를 관리할 필요가 없으며, 매번 인자로 전달하지 않아도 현재 활성화된 로케일을 기본값으로 적용해 줍니다.

```ts
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
} from "intlayer";

number(1234.5); // "1,234.5"
currency(1234.5, { currency: "EUR" }); // "€1,234.50"
date(new Date(), "short");
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2시간 전"
units(5, { unit: "kilometer", unitDisplay: "long" }); // "5킬로미터"
compact(1200); // "1.2천"
list(["사과", "바나나", "오렌지"]); // "사과, 바나나, 오렌지"
```

`date()` 함수는 간편한 프리셋(`"short"`, `"long"`, `"dateOnly"`, `"timeOnly"`, `"full"`)을 지원합니다. React와 Vue를 위한 훅 및 컴포저블도 제공되어 컨텍스트로부터 현재 로케일을 자동으로 해석합니다.

이는 표준 플랫폼 API 위에 캐싱 계층과 로케일 주입 기능을 더한 것으로, 실제 포맷팅 연산은 온전히 `Intl`을 따릅니다. 전체 시그니처는 [포맷터 공식 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)를 확인하세요.

## 흔한 실수들

- **로케일을 지정하지 않은 `toLocaleDateString()`.** 런타임 호스트의 로케일을 사용하므로 서버 환경에 따라 결과가 달라집니다.
- **캐싱 없이 루프 내에서 매번 생성.** 포맷터 인스턴스 생성이 성능 병목의 대부분을 차지합니다.
- **동형(isomorphic) 날짜 렌더링 시 `timeZone` 누락.** 로컬에서는 발견되지 않는 하이드레이션 오류의 주범입니다.
- **로케일로부터 통화를 섣불리 유추.** `fr-FR`이 반드시 유로화 결제를 의미하지 않습니다.
- **화면 표시용 문자열에 기본 `sort()` 사용.** 항상 `Intl.Collator`를 사용하세요.
- **월이나 요일 이름을 직접 하드코딩.** 모든 언어의 표준 데이터가 이미 CLDR에 등록되어 있습니다.
- **상대 시간에서 `numeric: "always"` 방치.** "어제"라는 명확한 단어가 있음에도 기계적인 "1일 전"을 출력하게 됩니다.

## 더 알아보기

- [포맷터 및 로케일 유틸리티: `number`, `currency`, `date`, `relativeTime`, `list`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/formatters.md)
- [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)
- [프레임워크 간 벤치마크 리포트](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/benchmark/index.md)
- [react-intl 호환 어댑터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/react-intl.md)
- [ICU 메시지 포맷: 복수형, 선택문 및 숫자 스켈레톤](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/icu_message_format.md)
- [포맷터와 복수형을 포함한 번역 테스트 전략](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/i18n_testing_strategies.md)
- [국제화(i18n)가 실제로 포괄하는 영역](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/what_is_internationalization.md)
