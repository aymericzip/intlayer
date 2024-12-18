# Documentation: `getConfiguration` 함수 in `intlayer`

## 설명:

`getConfiguration` 함수는 환경 변수를 추출하여 `intlayer` 애플리케이션의 전체 구성을 검색합니다. 이 함수는 클라이언트와 서버 양쪽에서 동일한 구성을 사용할 수 있는 유연성을 제공하여 애플리케이션 전반에 걸쳐 일관성을 보장합니다.

---

## 매개변수:

이 함수는 매개변수를 받지 않습니다. 대신 환경 변수를 구성에 사용합니다.

### 반환값:

- **타입**: `IntlayerConfig`
- **설명**: `intlayer`에 대한 전체 구성을 포함하는 객체입니다. 구성은 다음 섹션을 포함합니다:

  - `internationalization`: locales 및 strict mode와 관련된 설정입니다.
  - `middleware`: URL 및 쿠키 관리와 관련된 설정입니다.
  - `content`: 콘텐츠 파일, 디렉토리 및 패턴과 관련된 설정입니다.
  - `editor`: 편집기별 구성입니다.

자세한 내용은 [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

---

## 예제 사용법:

### 전체 구성 검색:

```typescript
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// 출력:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### `availableLocales` 및 `defaultLocale` 추출:

구성의 `internationalization` 섹션은 `locales`(사용 가능한 locales) 및 `defaultLocale`(예비 언어)과 같은 locale 관련 설정을 제공합니다.

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 출력 예제: ["en", "fr", "es"]
console.log(defaultLocale); // 출력 예제: "en"
console.log(cookieName); // 출력: "INTLAYER_LOCALE"
```

## 참고사항:

- 이 함수 호출 전에 모든 필수 환경 변수가 올바르게 설정되었는지 확인하세요. 누락된 변수는 초기화 중 오류를 발생시킵니다.
- 이 함수는 클라이언트와 서버 양쪽에서 사용할 수 있어 통합된 방식으로 구성을 관리하는 다용도 도구입니다.

## 애플리케이션 내 사용법:

`getConfiguration` 함수는 `intlayer` 애플리케이션의 구성 초기화 및 관리를 위한 핵심 유틸리티입니다. locales, middleware 및 콘텐츠 디렉토리와 같은 설정에 대한 액세스를 제공함으로써 다국어 및 콘텐츠 중심 애플리케이션 전반에 걸쳐 일관성과 확장성을 보장합니다.
