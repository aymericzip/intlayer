---
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
description: Documentation for the useLocale hook in the next-intlayer package
createdAt: 2025-08-23
updatedAt: 2026-01-26
title: useLocale 훅 문서 | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: `onLocaleChange` 기본값을 `replace`로 설정
  - version: 5.5.10
    date: 2025-06-29
    changes: 초기 이력
---

# Next.js 통합: `next-intlayer`용 `useLocale` 훅 문서

이 섹션에서는 `next-intlayer` 라이브러리 내 Next.js 애플리케이션에 맞춤화된 `useLocale` 훅에 대한 자세한 문서를 제공합니다. 이 훅은 로케일 변경과 라우팅을 효율적으로 처리하도록 설계되었습니다.

## Next.js에서 `useLocale` 가져오기

Next.js 애플리케이션에서 `useLocale` 훅을 사용하려면 아래와 같이 가져오세요:

```javascript
import { useLocale } from "next-intlayer"; // Next.js에서 로케일 및 라우팅 관리를 위해 사용
```

## 사용법

다음은 Next.js 컴포넌트 내에서 `useLocale` 훅을 구현하는 방법입니다:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>현재 로케일: {locale}</h1>
      <p>기본 로케일: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>현재 로케일: {locale}</h1>
      <p>기본 로케일: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>현재 로케일: {locale}</h1>
      <p>기본 로케일: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## 매개변수

`useLocale` 훅은 다음 매개변수를 허용합니다:

- **`onLocaleChange`**: 로케일이 변경될 때 URL을 업데이트하는 방법을 결정하는 문자열입니다. `"replace"`, `"push"` 또는 `"none"`이 될 수 있습니다.

  > 예시를 들어보겠습니다:
  >
  > 1. 현재 `/fr/home`에 있습니다.
  > 2. `/fr/about`으로 이동합니다.
  > 3. 로케일을 `/es/about`으로 변경합니다.
  > 4. 브라우저의 "뒤로 가기" 버튼을 클릭합니다.
  >
  > `onLocaleChange` 값에 따라 동작이 달라집니다:
  >
  > - `"replace"` (기본값): 현재 URL을 새로운 로컬 URL로 교체하고 쿠키를 설정합니다.
  >   -> "뒤로 가기" 버튼을 누르면 `/es/home`으로 이동합니다.
  > - `"push"`: 새로운 로컬 URL을 브라우저 기록에 추가하고 쿠키를 설정합니다.
  >   -> "뒤로 가기" 버튼을 누르면 `/fr/about`으로 이동합니다.
  > - `"none"`: URL을 변경하지 않고 클라이언트 컨텍스트의 로케일만 업데이트하고 쿠키를 설정합니다.
  >   -> "뒤로 가기" 버튼을 누르면 `/fr/home`으로 이동합니다.
  > - `(locale) => void`: 쿠키를 설정하고 로케일이 변경될 때 호출될 커스텀 함수를 트리거합니다.
  >
  >   `undefined` 옵션은 기본 동작이며, 새로운 로케일로 이동할 때는 `Link` 컴포넌트를 사용하는 것을 권장합니다.
  >   예시:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     정보
  >   </Link>
  >   ```

## 반환 값

- **`locale`**: React 컨텍스트에 설정된 현재 로케일입니다.
- **`defaultLocale`**: 구성에서 정의된 기본 로케일입니다.
- **`availableLocales`**: 구성에서 정의된 사용 가능한 모든 로케일 목록입니다.
- **`setLocale`**: 애플리케이션의 로케일을 변경하고 URL을 이에 맞게 업데이트하는 함수입니다. 구성에 따라 경로에 로케일을 추가할지 여부 및 접두사 규칙을 처리합니다. `next/navigation`의 `useRouter`를 사용하여 `push` 및 `refresh`와 같은 내비게이션 기능을 활용합니다.
- **`pathWithoutLocale`**: 로케일이 제거된 경로를 반환하는 계산된 속성입니다. URL을 비교할 때 유용합니다. 예를 들어, 현재 로케일이 `fr`이고 URL이 `fr/my_path`인 경우, 로케일이 없는 경로는 `/my_path`입니다. 현재 경로를 가져오기 위해 `next/navigation`의 `usePathname`을 사용합니다.

## 결론

- **`setLocale`**: 애플리케이션의 로케일을 변경하고 URL을 이에 맞게 업데이트하는 함수입니다. 구성에 따라 경로에 로케일을 추가할지 여부와 접두사 규칙을 처리합니다. `next/navigation`의 `useRouter`를 사용하여 `push` 및 `refresh`와 같은 내비게이션 기능을 활용합니다.
- **`pathWithoutLocale`**: 로케일이 제거된 경로를 반환하는 계산된 속성입니다. URL 비교에 유용합니다. 예를 들어 현재 로케일이 `fr`이고 URL이 `fr/my_path`인 경우, 로케일이 제거된 경로는 `/my_path`가 됩니다. `next/navigation`의 `usePathname`을 사용하여 현재 경로를 가져옵니다.

## 결론

`next-intlayer`의 `useLocale` 훅은 Next.js 애플리케이션에서 로케일을 관리하는 데 중요한 도구입니다. 로케일 저장, 상태 관리, URL 수정 등을 원활하게 처리하여 다중 로케일에 맞게 애플리케이션을 통합적으로 적응시킬 수 있는 접근 방식을 제공합니다.
