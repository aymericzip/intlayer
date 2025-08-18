---
createdAt: 2024-08-13
updatedAt: 2025-08-18
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
  - 국제화
slugs:
  - doc
  - formatters
---

# Intlayer 포매터

## 개요

Intlayer는 네이티브 `Intl` API 위에 구축된 가벼운 헬퍼 세트와, 무거운 포매터를 반복 생성하지 않도록 캐시된 `Intl` 래퍼를 제공합니다. 이 유틸리티들은 완전히 로케일 인식이 가능하며, 메인 `intlayer` 패키지에서 사용할 수 있습니다.

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
} from "intlayer";
```

React를 사용하는 경우, 훅도 제공됩니다; `react-intlayer/format`을 참조하세요.

## 캐시된 Intl

내보내진 `Intl`은 전역 `Intl`을 감싼 얇은 캐시 래퍼입니다. `NumberFormat`, `DateTimeFormat`, `RelativeTimeFormat` 인스턴스를 메모이제이션하여 동일한 포매터를 반복 생성하는 것을 방지합니다.

포매터 생성은 비교적 비용이 크기 때문에, 이 캐싱은 동작을 변경하지 않으면서 성능을 향상시킵니다. 이 래퍼는 네이티브 `Intl`과 동일한 API를 제공하므로 사용법도 동일합니다.

- 캐싱은 프로세스 단위로 이루어지며 호출자에게 투명합니다.

> 환경에 `Intl.DisplayNames`가 없으면, 개발자 전용 경고가 한 번 출력됩니다 (폴리필 사용을 고려하세요).

예시:

```ts
import { Intl } from "intlayer";

const numberFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
numberFormat.format(1234.5); // "£1,234.50"
```

## 포매터

아래 모든 헬퍼들은 `intlayer`에서 내보내집니다.

### `number(value, options?)`

로케일에 맞는 그룹화와 소수점 처리를 사용하여 숫자 값을 포맷합니다.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`

예시:

```ts
import { number } from "intlayer";

number(123456.789); // "123,456.789" (en-US 기준)
number("1000000", { locale: "fr" }); // "1 000 000"
number(1234.5, { minimumFractionDigits: 2 }); // "1,234.50"
```

### `percentage(value, options?)`

숫자를 백분율 문자열로 포맷합니다.

동작: 1보다 큰 값은 전체 백분율로 해석되어 정규화됩니다(예: `25` → `25%`, `0.25` → `25%`).

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
  - 공통 필드: `currency` (예: `"EUR"`), `currencyDisplay` (`"symbol" | "code" | "name"`)

예시:

```ts
import { currency } from "intlayer";

currency(1234.5, { currency: "EUR" }); // "€1,234.50"
currency("5000", { locale: "fr", currency: "CAD", currencyDisplay: "code" }); // "5 000,00 CAD"
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

- 자연스러운 표현을 위해 첫 번째 인수로 "now"를 전달하고 두 번째 인수로 대상 시간을 전달하세요.
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

`Intl.NumberFormat`의 `style: 'unit'`을 사용하여 숫자 값을 현지화된 단위 문자열로 형식화합니다.

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }`
  - 공통 필드: `unit` (예: `"kilometer"`, `"byte"`), `unitDisplay` (`"short" | "narrow" | "long"`)
  - 기본값: `unit: 'day'`, `unitDisplay: 'short'`, `useGrouping: false`

예시:

```ts
import { units } from "intlayer";

units(5, { unit: "kilometer", unitDisplay: "long", locale: "en-GB" }); // "5 kilometers"
units(1024, { unit: "byte", unitDisplay: "narrow" }); // "1,024B" (로케일에 따라 다름)
```

### `compact(value, options?)`

숫자를 축약 표기법으로 형식화합니다 (예: `1.2K`, `1M`).

- **value**: `number | string`
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (내부적으로 `notation: 'compact'` 사용)

예시:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
```

## 참고 사항

- 모든 헬퍼는 `string` 입력을 허용하며 내부적으로 숫자나 날짜로 변환됩니다.
- 로케일이 제공되지 않으면 구성된 `internationalization.defaultLocale`이 기본값으로 사용됩니다.
- 이 유틸리티들은 얇은 래퍼이며, 고급 포맷팅이 필요할 경우 표준 `Intl` 옵션을 직접 전달하세요.

## 진입점 및 재내보내기 (`@index.ts`)

포맷터들은 코어 패키지에 위치하며, 런타임 전반에 걸쳐 임포트를 편리하게 하기 위해 상위 패키지에서 재내보내기 됩니다:

예시:

````ts
// 앱 코드 (권장)
- **options**: `Intl.NumberFormatOptions & { locale?: LocalesValues }` (내부적으로 `notation: 'compact'` 사용)

예시:

```ts
import { compact } from "intlayer";

compact(1200); // "1.2K"
compact("1000000", { locale: "fr", compactDisplay: "long" }); // "1 million"
````

## 참고 사항

- 모든 헬퍼는 `string` 입력을 허용하며 내부적으로 숫자나 날짜로 변환됩니다.
- 로케일이 제공되지 않으면 구성된 `internationalization.defaultLocale`가 기본값으로 사용됩니다.
- 이 유틸리티들은 얇은 래퍼이며, 고급 포맷팅이 필요할 경우 표준 `Intl` 옵션을 직접 전달하세요.

## 진입점 및 재내보내기 (`@index.ts`)

포맷터들은 코어 패키지에 위치하며, 런타임 전반에 걸쳐 임포트가 편리하도록 상위 패키지에서 재내보내기 됩니다:

예시:

```ts
// 앱 코드 (권장)
import { number, currency, date, Intl } from "intlayer";
```

### React

클라이언트 컴포넌트:

```ts
import { useNumber, useCurrency, useDate } from "react-intlayer/format";
// 또는 Next.js 앱에서는
import { useNumber, useCurrency, useDate } from "next-intlayer/client/format";
```

서버 컴포넌트 (또는 React 서버 런타임):

```ts
import { useNumber, useCurrency, useDate } from "intlayer/server/format";
// 또는 Next.js 앱에서는
import { useNumber, useCurrency, useDate } from "next-intlayer/server/format";
```

> 해당 훅들은 `IntlayerProvider` 또는 `IntlayerServerProvider`에서 로케일을 참조합니다.

## 문서 이력

| 버전  | 날짜       | 변경 사항        |
| ----- | ---------- | ---------------- |
| 5.8.0 | 2025-08-18 | 포맷터 문서 추가 |
