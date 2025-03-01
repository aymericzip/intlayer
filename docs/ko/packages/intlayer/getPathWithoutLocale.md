# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## 설명

주어진 URL 또는 경로명에서 로케일 세그먼트를 제거합니다(존재하는 경우). 절대 URL과 상대 경로명 모두에서 작동합니다.

## 매개변수

- `inputUrl: string`

  - **설명**: 처리할 전체 URL 문자열 또는 경로명입니다.
  - **유형**: `string`

- `locales: Locales[]`
  - **설명**: 지원되는 로케일의 선택적 배열입니다. 프로젝트에서 구성된 로케일이 기본값으로 설정됩니다.
  - **유형**: `Locales[]`

## 반환값

- **유형**: `string`
- **설명**: 로케일 세그먼트가 제거된 URL 문자열 또는 경로명입니다.

## 사용 예시

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 출력: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 출력: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // 출력: "https://example.com/dashboard"
```
