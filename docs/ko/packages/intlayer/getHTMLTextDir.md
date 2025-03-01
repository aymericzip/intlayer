# Documentation: `getHTMLTextDir` 함수 in `intlayer`

## 설명

`getHTMLTextDir` 함수는 제공된 로케일에 따라 텍스트 방향(`ltr`, `rtl`, 또는 `auto`)을 결정합니다. 이 함수는 개발자가 HTML에서 텍스트 렌더링을 위해 `dir` 속성을 설정할 수 있도록 설계되었습니다.

## 매개변수

- `locale?: Locales`

  - **설명**: 텍스트 방향을 결정하기 위해 사용되는 로케일 문자열 (예: `Locales.ENGLISH`, `Locales.ARABIC`).
  - **유형**: `Locales` (선택 사항)

## 반환값

- **유형**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **설명**: 로케일에 해당하는 텍스트 방향:
  - `'ltr'`: 왼쪽에서 오른쪽으로 쓰는 언어.
  - `'rtl'`: 오른쪽에서 왼쪽으로 쓰는 언어.
  - `'auto'`: 로케일이 인식되지 않을 경우.

## 사용 예제

### 텍스트 방향 결정

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 출력: "ltr"
getHTMLTextDir(Locales.FRENCH); // 출력: "ltr"
getHTMLTextDir(Locales.ARABIC); // 출력: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 출력: "ltr"
getHTMLTextDir(Locales.FRENCH); // 출력: "ltr"
getHTMLTextDir(Locales.ARABIC); // 출력: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // 출력: "ltr"
getHTMLTextDir(Locales.FRENCH); // 출력: "ltr"
getHTMLTextDir(Locales.ARABIC); // 출력: "rtl"
```

## 엣지 케이스

- **로케일이 제공되지 않은 경우:**

  - `locale`이 `undefined`일 때 함수는 `'auto'`를 반환합니다.

- **인식되지 않는 로케일:**
  - 인식되지 않는 로케일의 경우 함수는 기본값으로 `'auto'`를 반환합니다.

## 컴포넌트에서의 사용:

`getHTMLTextDir` 함수는 로케일에 따라 HTML 문서에서 텍스트 렌더링을 위해 `dir` 속성을 동적으로 설정하는 데 사용할 수 있습니다.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

위 예제에서 `dir` 속성은 로케일에 따라 동적으로 설정됩니다.
