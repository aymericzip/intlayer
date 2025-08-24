---
createdAt: 2024-08-13
updatedAt: 2025-08-20
title: 포매터
description: 숫자, 백분율, 통화, 날짜, 상대 시간, 단위 및 축약 표기법에 대해 Intl 기반의 로케일 인식 포매팅 유틸리티. 캐시된 Intl 헬퍼 포함.
keywords:
  - 포매터
  - Intl
  - 숫자
  - 통화
  - 백분율
  - 날짜
  - 상대 시간
  - 단위
  - 축약
  - 리스트
  - 국제화
slugs:
  - doc
  - formatters
---

# Intlayer 포매터

## 개요

Intlayer는 네이티브 `Intl` API 위에 구축된 경량 헬퍼 세트와 무거운 포매터를 반복 생성하지 않도록 하는 캐시된 `Intl` 래퍼를 제공합니다. 이 유틸리티들은 완전한 로케일 인식을 지원하며 메인 `intlayer` 패키지에서 사용할 수 있습니다.

### 임포트

```ts
import {
  Intl,
  number,
  percentage,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getLocalisedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

React를 사용하는 경우, 훅도 제공됩니다; `react-intlayer/format`을 참조하세요.

## 캐시된 Intl

내보내진 `Intl`은 전역 `Intl`을 감싼 얇은 캐시 래퍼입니다. 이는 `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat`, `ListFormat`, `DisplayNames`, `Collator`, `PluralRules` 인스턴스를 메모이제이션하여 동일한 포매터를 반복 생성하는 것을 방지합니다.

포매터 생성은 상대적으로 비용이 많이 들기 때문에, 이 캐싱은 동작을 변경하지 않으면서 성능을 향상시킵니다. 이 래퍼는 네이티브 `Intl`과 동일한 API를 제공하므로 사용법도 동일합니다.

- 캐싱은 프로세스별로 이루어지며 호출자에게 투명합니다.

> 환경에 `Intl.DisplayNames`가 없으면, 개발자 전용 경고가 한 번 출력됩니다(폴리필 사용을 고려하세요).

예시:

```ts
import { Intl } from "intlayer";

// 숫자 포맷팅
const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"

// 언어, 지역 등의 표시 이름
const displayNames = new Intl.DisplayNames("fr", { type: "language" });
displayNames.of("en"); // "anglais"

// 정렬을 위한 콜레이션
const collator = new Intl.Collator("fr", { sensitivity: "base" });
collator.compare("é", "e"); // 0 (동일)

// 복수형 규칙
const pluralRules = new Intl.PluralRules("fr");
pluralRules.select(1); // "one"
pluralRules.select(2); // "other"
```

## 추가 Intl 유틸리티

포매터 헬퍼 외에도, 캐시된 Intl 래퍼를 직접 사용하여 다른 Intl 기능을 활용할 수 있습니다:

### `Intl.DisplayNames`

언어, 지역, 통화, 스크립트의 현지화된 이름을 위한 기능:

```ts
import { Intl } from "intlayer";

const languageNames = new Intl.DisplayNames("en", { type: "language" });
languageNames.of("fr"); // "French"

const regionNames = new Intl.DisplayNames("fr", { type: "region" });
regionNames.of("US"); // "États-Unis"
```

### `Intl.Collator`

로케일 인식 문자열 비교 및 정렬을 위해:

```ts
import { Intl } from "intlayer";

const collator = new Intl.Collator("de", {
  sensitivity: "base",
  numeric: true,
});

const words = ["äpfel", "zebra", "100", "20"];
words.sort(collator.compare); // ["20", "100", "äpfel", "zebra"]
```

### `Intl.PluralRules`

다양한 로케일에서 복수형을 결정하기 위해:

```ts
import { Intl } from "intlayer";

const pluralRules = new Intl.PluralRules("ar");
pluralRules.select(0); // "zero"
pluralRules.select(1); // "one"
pluralRules.select(2); // "two"
pluralRules.select(3); // "few"
pluralRules.select(11); // "many"
```

## 로케일 유틸리티

### `getLocaleName(displayLocale, targetLocale?)`

다른 로케일에서 로케일의 현지화된 이름을 가져옵니다:

```ts
import { getLocaleName } from "intlayer";

getLocaleName("fr", "en"); // "French"
getLocaleName("en", "fr"); // "anglais"
getLocaleName("de", "es"); // "alemán"
```

- **displayLocale**: 이름을 가져올 로케일
- **targetLocale**: 이름을 표시할 로케일 (기본값은 displayLocale)

### `getLocaleLang(locale?)`

로케일 문자열에서 언어 코드를 추출합니다:

```ts
import { getLocaleLang } from "intlayer";

getLocaleLang("en-US"); // "en"
getLocaleLang("fr-CA"); // "fr"
getLocaleLang("de"); // "de"
```

- **locale**: 언어를 추출할 로케일 (기본값은 현재 로케일)

### `getLocaleFromPath(inputUrl)`

URL 또는 경로명에서 로케일 부분을 추출합니다:

```ts
import { getLocaleFromPath } from "intlayer";

getLocaleFromPath("/en/dashboard"); // "en"
getLocaleFromPath("/fr/dashboard"); // "fr"
getLocaleFromPath("/dashboard"); // "en" (기본 로케일)
getLocaleFromPath("https://example.com/es/about"); // "es"
```

- **inputUrl**: 처리할 전체 URL 문자열 또는 경로명
- **returns**: 감지된 로케일 또는 로케일이 없을 경우 기본 로케일

### `getPathWithoutLocale(inputUrl, locales?)`

URL 또는 경로명에서 로케일 세그먼트를 제거합니다:

```ts
import { getPathWithoutLocale } from "intlayer";

getPathWithoutLocale("/en/dashboard"); // "/dashboard"
getPathWithoutLocale("/fr/dashboard"); // "/dashboard"
getPathWithoutLocale("https://example.com/en/about"); // "https://example.com/about"
```

- **inputUrl**: 처리할 전체 URL 문자열 또는 경로명
- **locales**: 선택적 지원 로케일 배열 (기본값은 구성된 로케일)
- **returns**: 로케일 세그먼트가 제거된 URL

### `getLocalizedUrl(url, currentLocale, locales?, defaultLocale?, prefixDefault?)`

현재 로케일에 맞는 로컬라이즈된 URL을 생성합니다:

```ts
import { getLocalizedUrl } from "intlayer";

getLocalizedUrl("/about", "fr", ["en", "fr"], "en", false); // "/fr/about"
getLocalizedUrl("/about", "en", ["en", "fr"], "en", false); // "/about"
getLocalizedUrl("https://example.com/about", "fr", ["en", "fr"], "en", true); // "https://example.com/fr/about"
```

- **url**: 로컬라이즈할 원본 URL
- **currentLocale**: 현재 로케일
- **locales**: 선택적 지원 로케일 배열 (기본값은 구성된 로케일)
- **defaultLocale**: 선택적 기본 로케일 (구성된 기본 로케일을 기본값으로 사용)
- **prefixDefault**: 기본 로케일에 접두사를 붙일지 여부 (구성된 값을 기본값으로 사용)

### `getHTMLTextDir(locale?)`

로케일에 대한 텍스트 방향을 반환합니다:

```ts
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir("en-US"); // "ltr"
getHTMLTextDir("ar"); // "rtl"
getHTMLTextDir("he"); // "rtl"
```

- **locale**: 텍스트 방향을 가져올 로케일 (기본값은 현재 로케일)
- **returns**: `"ltr"`, `"rtl"`, 또는 `"auto"`

## 콘텐츠 처리 유틸리티

### `getContent(node, nodeProps, locale?)`

모든 사용 가능한 플러그인(번역, 열거, 삽입 등)을 사용하여 콘텐츠 노드를 변환합니다:

```ts
import { getContent } from "intlayer";

const content = getContent(
  contentNode,
  { dictionaryKey: "common", dictionaryPath: "/path/to/dict" },
  "fr"
);
```

- **node**: 변환할 콘텐츠 노드
- **nodeProps**: 변환 컨텍스트를 위한 속성
- **locale**: 선택적 로케일 (기본값은 구성된 기본 로케일)

### `getLocalisedContent(node, locale, nodeProps, fallback?)`

번역 플러그인만 사용하여 콘텐츠 노드를 변환합니다:

```ts
import { getLocalisedContent } from "intlayer";

const content = getLocalisedContent(
  contentNode,
  "fr",
  { dictionaryKey: "common" },
  true // 번역이 없을 경우 기본 로케일로 대체
);
```

- **node**: 변환할 콘텐츠 노드
- **locale**: 번역에 사용할 로케일
- **nodeProps**: 변환 컨텍스트를 위한 속성
- **fallback**: 기본 로케일로 대체할지 여부 (기본값은 false)

### `getTranslation(languageContent, locale?, fallback?)`

언어 콘텐츠 객체에서 특정 로케일의 콘텐츠를 추출합니다:

```ts
import { getTranslation } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
    de: "Hallo",
  },
  "fr",
  true
); // "Bonjour"
```

- **languageContent**: 로케일을 콘텐츠에 매핑한 객체
- **locale**: 대상 로케일 (기본값은 설정된 기본 로케일)
- **fallback**: 기본 로케일로 대체할지 여부 (기본값은 true)

### `getIntlayer(dictionaryKey, locale?, plugins?)`

키로 사전에서 콘텐츠를 가져오고 변환합니다:

```ts
import { getIntlayer } from "intlayer";

const content = getIntlayer("common", "fr");
const nestedContent = getIntlayer("common", "fr", customPlugins);
```

- **dictionaryKey**: 가져올 사전의 키
- **locale**: 선택적 로케일 (기본 설정된 기본 로케일 사용)
- **plugins**: 선택적 사용자 정의 변환 플러그인 배열

### `getIntlayerAsync(dictionaryKey, locale?, plugins?)`

원격 사전에서 비동기적으로 콘텐츠를 가져옵니다:

```ts
import { getIntlayerAsync } from "intlayer";

const content = await getIntlayerAsync("common", "fr");
```

- **dictionaryKey**: 가져올 사전의 키
- **locale**: 선택적 로케일 (기본 설정된 기본 로케일 사용)
- **plugins**: 선택적 사용자 정의 변환 플러그인 배열

## 포매터(Formatters)

아래의 모든 헬퍼는 `intlayer`에서 내보내집니다.

### `number(value, options?)`

로케일 인식 그룹화 및 소수점 표기를 사용하여 숫자 값을 포맷합니다.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

예시:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (en-US 기준)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

숫자를 백분율 문자열로 포맷합니다.

동작: 1보다 큰 값은 전체 백분율로 해석되어 정규화됩니다 (예: `25` → `25%`, `0.25` → `25%`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

예시:

```ts
import { percentage } from "intlayer";

percentage(0.25); // "25%"
percentage(25); // "25%"
percentage(0.237, { minimumFractionDigits: 1 }); // "23.7%"
```

### `currency(value, options?)`

값을 현지화된 통화 형식으로 포맷합니다. 기본값은 소수점 두 자리의 `USD`입니다.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 일반 필드: `currency` (예: `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

예시:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
```

### `date(date, optionsOrPreset?)`

`Intl.DateTimeFormat`을 사용하여 날짜/시간 값을 포맷합니다.

- **date**: `Date | string | number`
- **optionsOrPreset**: `Intl.DateTimeFormatOptions & { locale?: LocalesValues }` 또는 다음 프리셋 중 하나:
  - 프리셋: `"short" | "long" | "dateOnly" | "timeOnly" | "full"`

예시:

```ts
import { date } from "intlayer";

date(new Date(), "short"); // 예: "08/02/25, 14:30"
date("2025-08-02T14:30:00Z", { locale: "fr", month: "long", day: "numeric" }); // "2 août"
```

### `relativeTime(from, to = new Date(), options?)`

`Intl.RelativeTimeFormat`을 사용하여 두 시점 간의 상대 시간을 포맷합니다.

- 첫 번째 인수로 "now"를 전달하고 두 번째 인수로 대상 시점을 전달하면 자연스러운 표현을 얻을 수 있습니다.
- **from**: `Date | string | number`
- **to**: `Date | string | number` (기본값은 `new Date()`)
- **options**: `{ locale?: LocalesValues; unit?: Intl.RelativeTimeFormatUnit; numeric?: Intl.RelativeTimeFormatNumeric; style?: Intl.RelativeTimeFormatStyle }`
  - 기본 `unit`은 `"second"`입니다.

예시:

```ts
import { relativeTime } from "intlayer";

const now = new Date();
const in3Days = new Date(now.getTime() + 3 * 864e5);
relativeTime(now, in3Days, { unit: "day" }); // "3일 후"

const twoHoursAgo = new Date(now.getTime() - 2 * 3600e3);
relativeTime(now, twoHoursAgo, { unit: "hour", numeric: "auto" }); // "2시간 전"
```

### `units(value, options?)`

`Intl.NumberFormat`의 `style: 'unit'`을 사용하여 숫자 값을 현지화된 단위 문자열로 포맷합니다.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 공통 필드: `unit` (예: `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - 기본값: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

예제:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (로케일에 따라 다름)
```

### `compact(value, options?)`

숫자를 축약 표기법(예: `1.2K`, `1M`)으로 포맷합니다.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (`notation: 'compact'`를 내부적으로 사용)

예제:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

### `list(values, options?)`

`Intl.ListFormat`을 사용하여 값 배열을 현지화된 목록 문자열로 포맷합니다.

- **values**: `(string | number)[]`
- **options**: `Intl.ListFormatOptions & { locale?: LocalesValues }`
  - 공통 필드: `type` (`"conjunction" | "disjunction" | "unit"`), `style` (`"long" | "short" | "narrow"`)
  - 기본값: `type: 'conjunction'`, `style: 'long'`

예시:

```ts
import { list } from "intlayer";

list(["apple", "banana", "orange"]); // "apple, banana, and orange"
list(["red", "green", "blue"], { locale: "fr", type: "disjunction" }); // "rouge, vert ou bleu"
list([1, 2, 3], { type: "unit" }); // "1, 2, 3"
```

## 참고 사항

- 모든 헬퍼는 `string` 입력을 허용하며, 내부적으로 숫자나 날짜로 강제 변환됩니다.
- 로케일이 제공되지 않으면 구성된 `internationalization.defaultLocale`이 기본값으로 사용됩니다.
- 이 유틸리티들은 얇은 래퍼이며, 고급 포맷팅이 필요할 경우 표준 `Intl` 옵션을 직접 전달하세요.

## 진입점 및 재내보내기 (`@index.ts`)

포매터들은 코어 패키지에 존재하며, 런타임 전반에 걸쳐 임포트를 편리하게 하기 위해 상위 패키지에서 재내보내기됩니다:

예시:

```ts
// 앱 코드 (권장)
import {
  number,
  currency,
  date,
  relativeTime,
  units,
  compact,
  list,
  Intl,
  getLocaleName,
  getLocaleLang,
  getLocaleFromPath,
  getPathWithoutLocale,
  getLocalizedUrl,
  getHTMLTextDir,
  getContent,
  getLocalisedContent,
  getTranslation,
  getIntlayer,
  getIntlayerAsync,
} from "intlayer";
```

### React

클라이언트 컴포넌트:

```tsx
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "react-intlayer/format";
// 또는 Next.js 앱에서
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/client/format";

const MyComponent = () => {
  const number = useNumber();
  const currency = useCurrency();
  const date = useDate();
  const percentage = usePercentage();
  const compact = useCompact();
  const list = useList();
  const relativeTime = useRelativeTime();
  const unit = useUnit();

  return (
    <div>
      <p>{number(123456.789)}</p>
      <p>{currency(1234.5, { currency: "EUR" })}</p>
      <p>{date(new Date(), "short")}</p>
      <p>{percentage(0.25)}</p>
      <p>{compact(1200)}</p>
      <p>{list(["apple", "banana", "orange"])}</p>
      <p>{relativeTime(new Date(), new Date() + 1000)}</p>
      <p>{unit(123456.789, { unit: "kilometer" })}</p>
    </div>
  );
};
```

서버 컴포넌트(또는 React 서버 런타임):

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "intlayer/server/format";
// 또는 Next.js 앱에서는
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "next-intlayer/server/format";
```

> 이 훅들은 `IntlayerProvider` 또는 `IntlayerServerProvider`에서 설정된 로케일을 고려합니다.

### Vue

클라이언트 컴포넌트:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

> 이 컴포저블들은 주입된 `IntlayerProvider`에서 로케일을 고려합니다.

## 문서 변경 이력

| 버전  | 날짜       | 변경 사항        |
| ----- | ---------- | ---------------- |
| 5.8.0 | 2025-08-20 | vue 포매터 추가  |
| 5.8.0 | 2025-08-18 | 포매터 문서 추가 |

클라이언트 컴포넌트:

```ts
import {
  useNumber,
  useCurrency,
  useDate,
  usePercentage,
  useCompact,
  useList,
  useRelativeTime,
  useUnit,
} from "vue-intlayer/format";
```

> 이 컴포저블들은 주입된 `IntlayerProvider`에서 로케일을 고려합니다.

## 문서 이력

| 버전  | 날짜       | 변경 사항                                                                 |
| ----- | ---------- | ------------------------------------------------------------------------- |
| 5.8.0 | 2025-08-20 | Vue 포매터 추가                                                           |
| 5.8.0 | 2025-08-18 | 포매터 문서 추가                                                          |
| 5.8.0 | 2025-08-20 | 리스트 포매터 문서 추가                                                   |
| 5.8.0 | 2025-08-20 | 추가 Intl 유틸리티 추가 (DisplayNames, Collator, PluralRules)             |
| 5.8.0 | 2025-08-20 | 로케일 유틸리티 추가 (getLocaleName, getLocaleLang, getLocaleFromPath 등) |
| 5.8.0 | 2025-08-20 | 콘텐츠 처리 유틸리티 추가 (getContent, getTranslation, getIntlayer 등)    |
