# Documentation: `getHTMLTextDir` Function in `intlayer`

## Description:

`getHTMLTextDir` 함수는 제공된 로케일에 따라 텍스트 방향(`ltr`, `rtl`, 또는 `auto`)을 결정합니다. 이는 개발자가 HTML에서 적절한 텍스트 렌더링을 위해 `dir` 속성을 설정하는 데 도움을 주기 위해 설계되었습니다.

## Parameters:

- `locale?: Locales`

  - **Description**: 텍스트 방향을 결정하는 데 사용되는 로케일 문자열(예: `Locales.ENGLISH`, `Locales.ARABIC`).
  - **Type**: `Locales` (선택 사항)

## Returns:

- **Type**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description**: 로케일에 해당하는 텍스트 방향:
  - `'ltr'` 왼쪽에서 오른쪽으로 읽는 언어.
  - `'rtl'` 오른쪽에서 왼쪽으로 읽는 언어.
  - 로케일이 인식되지 않을 경우 `'auto'`.

## Example Usage:

### Determining Text Direction:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // 출력: "ltr"
getHTMLTextDir(Locales.FRENCH); // 출력: "ltr"
getHTMLTextDir(Locales.ARABIC); // 출력: "rtl"
```

## Edge Cases:

- **No Locale Provided:**

  - `locale`가 `undefined`일 경우 함수는 `'auto'`를 반환합니다.

- **Unrecognized Locale:**
  - 인식되지 않는 로케일의 경우 함수는 기본값으로 `'auto'`를 반환합니다.

## Usage in Components:

`getHTMLTextDir` 함수는 로케일에 따라 HTML 문서에서 적절한 텍스트 렌더링을 위해 `dir` 속성을 동적으로 설정하는 데 사용할 수 있습니다.

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

위의 예제에서, `dir` 속성은 로케일에 따라 동적으로 설정됩니다.
