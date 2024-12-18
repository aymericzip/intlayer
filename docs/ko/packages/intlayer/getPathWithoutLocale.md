# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## 설명:

주어진 URL 또는 경로에서 로케일 항목을 제거합니다. 절대 URL과 상대 경로 모두에서 작동합니다.

## 매개변수:

- `inputUrl: string`

  - **설명**: 처리할 전체 URL 문자열 또는 경로.
  - **유형**: `string`

- `locales: Locales[]`
  - **설명**: 지원되는 로케일의 선택적 배열. 프로젝트에 구성된 로케일이 기본값입니다.
  - **유형**: `Locales[]`

## 반환값:

- **유형**: `string`
- **설명**: 로케일 항목이 없는 URL 문자열 또는 경로.

## 사용 예시:

```typescript
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/ko/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // 출력: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/ko/dashboard")); // 출력: "https://example.com/dashboard"
```
