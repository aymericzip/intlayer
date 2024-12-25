# React 통합: `useLocale` 훅 문서

이 섹션에서는 React 애플리케이션에서 로케일 관리를 위해 설계된 `react-intlayer` 라이브러리의 `useLocale` 훅에 대한 종합적인 세부 정보를 제공합니다.

## React에서 `useLocale` 가져오기

React 애플리케이션에 `useLocale` 훅을 통합하려면 해당 패키지에서 가져옵니다:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // 로케일 관리를 위한 React 컴포넌트에서 사용됨
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // 로케일 관리를 위한 React 컴포넌트에서 사용됨
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // 로케일 관리를 위한 React 컴포넌트에서 사용됨
```

## 개요

`useLocale` 훅은 React 컴포넌트 내에서 로케일 설정을 액세스하고 조작하는 간편한 방법을 제공합니다. 현재 로케일, 기본 로케일, 사용 가능한 모든 로케일 및 로케일 설정을 업데이트하는 함수에 대한 액세스를 제공합니다.

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

`useLocale` 훅을 호출하면 다음 속성을 포함하는 객체가 반환됩니다:

- **`locale`**: React 컨텍스트에 설정된 현재 로케일입니다.
- **`defaultLocale`**: 구성에서 정의된 기본 로케일입니다.
- **`availableLocales`**: 구성에서 정의된 모든 사용 가능한 로케일 목록입니다.
- **`setLocale`**: 애플리케이션의 컨텍스트 내에서 현재 로케일을 업데이트하는 함수입니다.

## 예시

이 예시는 `useLocale` 훅을 사용하여 로케일 선택기를 렌더링하는 컴포넌트를 보여주며, 사용자가 애플리케이션의 로케일을 동적으로 변경할 수 있게 합니다:

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

`react-intlayer`의 `useLocale` 훅은 React 애플리케이션에서 로케일을 관리하기 위한 필수 도구로, 애플리케이션을 다양한 국제적 청중에 효과적으로 적응시키기 위해 필요한 기능을 제공합니다.
