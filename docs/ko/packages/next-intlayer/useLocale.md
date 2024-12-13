# Next.js 통합: `useLocale` 훅 문서 for `next-intlayer`

이 섹션은 `next-intlayer` 라이브러리 내에서 Next.js 애플리케이션에 맞춤화된 `useLocale` 훅에 대한 자세한 문서를 제공합니다. 이는 로케일 변경 및 라우팅을 효율적으로 처리하도록 설계되었습니다.

## Next.js에서 `useLocale` 가져오기

Next.js 애플리케이션에서 `useLocale` 훅을 사용하려면 아래와 같이 가져옵니다:

```javascript
import { useLocale } from "next-intlayer"; // Next.js에서 로케일 및 라우팅을 관리하는 데 사용됨
```

## 사용법

Next.js 컴포넌트 내에서 `useLocale` 훅을 구현하는 방법은 다음과 같습니다:

```jsx
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

export default LocaleSwitcher;
```

## 매개변수 및 반환 값

`useLocale` 훅을 호출하면 다음 속성이 포함된 객체가 반환됩니다:

- **`locale`**: React 컨텍스트에 설정된 현재 로케일.
- **`defaultLocale`**: 구성에서 정의된 기본 로케일.
- **`availableLocales`**: 구성에서 정의된 모든 사용 가능한 로케일 목록.
- **`setLocale`**: 애플리케이션의 로케일을 변경하고 URL을 적절하게 업데이트하는 함수. 이는 경로에 로케일을 추가할지 여부를 기반으로 prefix 규칙을 처리합니다. `next/navigation`에서 `useRouter`를 활용하여 `push` 및 `refresh`과 같은 내비게이션 기능을 수행합니다.
- **`pathWithoutLocale`**: 로케일 없이 경로를 반환하는 계산된 속성. 이는 URL 비교에 유용합니다. 예를 들어, 현재 로케일이 `fr`이고 URL이 `fr/my_path`일 때, 로케일 없는 경로는 `/my_path`입니다. 현재 경로를 얻기 위해 `next/navigation`의 `usePathname`을 사용합니다.

## 결론

`next-intlayer`의 `useLocale` 훅은 Next.js 애플리케이션에서 로케일을 관리하는 중요한 도구입니다. 이는 로케일 저장소, 상태 관리, URL 수정을 원활하게 처리하여 여러 로케일에 맞게 애플리케이션을 조정하는 통합된 접근 방식을 제공합니다.
