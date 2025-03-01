# Next.js 통합: `useLocale` 훅 문서 for `next-intlayer`

이 섹션은 `next-intlayer` 라이브러리 내에서 Next.js 애플리케이션을 위해 설계된 `useLocale` 훅에 대한 자세한 문서를 제공합니다. 이 훅은 로케일 변경 및 라우팅을 효율적으로 처리하도록 설계되었습니다.

## Next.js에서 `useLocale` 가져오기

Next.js 애플리케이션에서 `useLocale` 훅을 사용하려면 아래와 같이 가져옵니다:

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

## 매개변수 및 반환 값

`useLocale` 훅을 호출하면 다음 속성을 포함하는 객체를 반환합니다:

- **`locale`**: React 컨텍스트에 설정된 현재 로케일.
- **`defaultLocale`**: 구성에서 정의된 기본 로케일.
- **`availableLocales`**: 구성에서 정의된 사용 가능한 모든 로케일 목록.
- **`setLocale`**: 애플리케이션의 로케일을 변경하고 URL을 업데이트하는 함수. 구성에 따라 경로에 로케일을 추가할지 여부를 처리하는 접두사 규칙을 관리합니다. `next/navigation`의 `useRouter`를 사용하여 `push` 및 `refresh`와 같은 탐색 기능을 제공합니다.
- **`pathWithoutLocale`**: 로케일이 없는 경로를 반환하는 계산된 속성. URL을 비교하는 데 유용합니다. 예를 들어, 현재 로케일이 `fr`이고 URL이 `fr/my_path`인 경우, 로케일이 없는 경로는 `/my_path`입니다. `next/navigation`의 `usePathname`을 사용하여 현재 경로를 가져옵니다.

## 결론

`next-intlayer`의 `useLocale` 훅은 Next.js 애플리케이션에서 로케일을 관리하기 위한 중요한 도구입니다. 이 훅은 로케일 저장, 상태 관리 및 URL 수정 등을 원활하게 처리하여 애플리케이션을 여러 로케일에 적응할 수 있도록 통합된 접근 방식을 제공합니다.
