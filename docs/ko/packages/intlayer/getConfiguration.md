# Documentation: `getConfiguration` 함수 in `intlayer`

## 설명:

`getConfiguration` 함수는 환경 변수를 추출하여 `intlayer` 애플리케이션의 전체 구성을 가져옵니다. 이 함수는 클라이언트와 서버 측에서 동일한 구성을 사용할 수 있는 유연성을 제공하여 애플리케이션 전반에 걸쳐 일관성을 보장합니다.

---

## 매개변수:

이 함수는 매개변수를 받지 않습니다. 대신 환경 변수를 사용하여 구성을 설정합니다.

### 반환값:

- **유형**: `IntlayerConfig`
- **설명**: `intlayer`에 대한 전체 구성을 포함하는 객체입니다. 구성에는 다음 섹션이 포함됩니다:

  - `internationalization`: 로케일 및 엄격 모드와 관련된 설정.
  - `middleware`: URL 및 쿠키 관리와 관련된 설정.
  - `content`: 콘텐츠 파일, 디렉터리 및 패턴과 관련된 설정.
  - `editor`: 편집기 전용 구성.

자세한 내용은 [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

---

## 예제 사용:

### 전체 구성 가져오기:

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

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

구성의 `internationalization` 섹션은 `locales`(사용 가능한 로케일) 및 `defaultLocale`(기본 언어)와 같은 로케일 관련 설정을 제공합니다.

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 출력 예: ["en", "fr", "es"]
console.log(defaultLocale); // 출력 예: "en"
console.log(cookieName); // 출력: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 출력 예: ["en", "fr", "es"]
console.log(defaultLocale); // 출력 예: "en"
console.log(cookieName); // 출력: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // 출력 예: ["en", "fr", "es"]
console.log(defaultLocale); // 출력 예: "en"
console.log(cookieName); // 출력: "INTLAYER_LOCALE"
```

## 참고 사항:

- 이 함수를 호출하기 전에 모든 필수 환경 변수가 올바르게 설정되었는지 확인하세요. 누락된 변수는 초기화 중 오류를 발생시킬 수 있습니다.
- 이 함수는 클라이언트와 서버 측 모두에서 사용할 수 있어, 통합된 방식으로 구성을 관리하는 다목적 도구입니다.

## 애플리케이션에서의 사용:

`getConfiguration` 함수는 `intlayer` 애플리케이션의 구성을 초기화하고 관리하는 중요한 유틸리티입니다. 로케일, 미들웨어 및 콘텐츠 디렉터리와 같은 설정에 대한 액세스를 제공하여 다국어 및 콘텐츠 중심 애플리케이션에서 일관성과 확장성을 보장합니다.
