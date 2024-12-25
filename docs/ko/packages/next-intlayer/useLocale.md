# Next.js 통합: `useLocale` 후크 문서 `next-intlayer`

이 섹션에서는 `next-intlayer` 라이브러리 내의 Next.js 애플리케이션용 `useLocale` 후크에 대한 상세 문서를 제공합니다. 이 후크는 지역 설정 변경 및 라우팅을 효율적으로 처리하도록 설계되었습니다.

## Next.js에서 `useLocale` 가져오기

Next.js 애플리케이션에서 `useLocale` 후크를 사용하려면 아래와 같이 가져오십시오:

```javascript
import { useLocale } from "next-intlayer"; // Next.js에서 지역 및 라우팅 관리를 위해 사용됨
```

## 사용법

Next.js 컴포넌트 내에서 `useLocale` 후크를 구현하는 방법은 다음과 같습니다:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>현재 지역: {locale}</h1>
      <p>기본 지역: {defaultLocale}</p>
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
      <h1>현재 지역: {locale}</h1>
      <p>기본 지역: {defaultLocale}</p>
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
      <h1>현재 지역: {locale}</h1>
      <p>기본 지역: {defaultLocale}</p>
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

## 매개변수 및 반환 값

`useLocale` 후크를 호출하면 다음 속성이 포함된 객체를 반환합니다:

- **`locale`**: React 컨텍스트에서 설정된 현재 지역.
- **`defaultLocale`**: 구성에서 정의된 기본 지역.
- **`availableLocales`**: 구성에서 정의된 모든 사용 가능한 지역의 목록.
- **`setLocale`**: 애플리케이션의 지역을 변경하고 URL을 업데이트하는 함수. 설정에 따라 지역을 경로에 추가할지 여부를 정하는 규칙을 처리합니다. `next/navigation`의 `useRouter`를 사용하여 `push` 및 `refresh`와 같은 내비게이션 기능을 활용합니다.
- **`pathWithoutLocale`**: 지역이 없는 경로를 반환하는 계산된 속성. URL 비교에 유용합니다. 예를 들어, 현재 지역이 `fr`이고, URL이 `fr/my_path`인 경우, 지역 없이 경로는 `/my_path`입니다. 현재 경로를 얻기 위해 `next/navigation`의 `usePathname`을 사용합니다.

## 결론

`next-intlayer`의 `useLocale` 후크는 Next.js 애플리케이션에서 지역 관리를 위한 중요한 도구입니다. 지역 스토리지, 상태 관리 및 URL 수정 처리를 통합된 방식으로 제공하여 여러 지역에 맞게 애플리케이션을 조정할 수 있도록 도와줍니다.
