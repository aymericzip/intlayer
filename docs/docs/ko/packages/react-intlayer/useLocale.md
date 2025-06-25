---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: useLocale 훅 문서 | react-intlayer
description: react-intlayer 패키지의 useLocale 훅을 사용하는 방법을 확인하세요
keywords:
  - useLocale
  - 사전
  - 키
  - Intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# React 통합: `useLocale` 훅 문서

이 섹션은 React 애플리케이션에서 로케일 관리를 위해 설계된 `react-intlayer` 라이브러리의 `useLocale` 훅에 대한 포괄적인 세부 정보를 제공합니다.

## React에서 `useLocale` 가져오기

React 애플리케이션에 `useLocale` 훅을 통합하려면 해당 패키지에서 가져옵니다:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // React 컴포넌트에서 로케일 관리를 위해 사용
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // React 컴포넌트에서 로케일 관리를 위해 사용
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // React 컴포넌트에서 로케일 관리를 위해 사용
```

## 개요

`useLocale` 훅은 React 컴포넌트 내에서 로케일 설정에 접근하고 이를 조작할 수 있는 간단한 방법을 제공합니다. 현재 로케일, 기본 로케일, 사용 가능한 모든 로케일 및 로케일 설정을 업데이트하는 기능에 접근할 수 있습니다.

## 사용법

다음은 React 컴포넌트 내에서 `useLocale` 훅을 사용하는 방법입니다:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## 매개변수 및 반환 값

`useLocale` 훅을 호출하면 다음 속성을 포함하는 객체를 반환합니다:

- **`locale`**: React 컨텍스트에 설정된 현재 로케일.
- **`defaultLocale`**: 구성에서 정의된 기본 로케일.
- **`availableLocales`**: 구성에서 정의된 모든 사용 가능한 로케일 목록.
- **`setLocale`**: 애플리케이션의 컨텍스트 내에서 현재 로케일을 업데이트하는 함수.

## 예제

다음 예제는 애플리케이션의 로케일을 동적으로 변경할 수 있는 로케일 스위처를 렌더링하기 위해 `useLocale` 훅을 사용하는 컴포넌트를 보여줍니다:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## 결론

`react-intlayer`의 `useLocale` 훅은 React 애플리케이션에서 로케일을 관리하기 위한 필수 도구로, 애플리케이션을 다양한 국제 관객에게 효과적으로 적응시키는 데 필요한 기능을 제공합니다.
