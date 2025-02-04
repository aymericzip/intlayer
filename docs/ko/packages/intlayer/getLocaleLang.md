# Documentation: `getLocaleLang` 함수 in `intlayer`

## 설명:

`getLocaleLang` 함수는 로케일 문자열에서 언어 코드를 추출합니다. 국가 코드가 포함된 로케일 또는 포함되지 않은 로케일을 지원합니다. 로케일이 제공되지 않으면 기본적으로 빈 문자열을 반환합니다.

## 매개변수:

- `locale?: Locales`

  - **설명**: 언어 코드가 추출되는 로케일 문자열(예: `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`).
  - **형식**: `Locales` (선택 사항)

## 반환값:

- **형식**: `string`
- **설명**: 로케일에서 추출된 언어 코드. 로케일이 제공되지 않으면 빈 문자열(`''`)을 반환합니다.

## 사용 예시:

### 언어 코드 추출:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

// 언어 코드 추출 예시
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 출력: "en"
getLocaleLang(Locales.ENGLISH); // 출력: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 출력: "fr"
getLocaleLang(Locales.FRENCH); // 출력: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

// 언어 코드 추출 예시
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 출력: "en"
getLocaleLang(Locales.ENGLISH); // 출력: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 출력: "fr"
getLocaleLang(Locales.FRENCH); // 출력: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

// 언어 코드 추출 예시
getLocaleLang(Locales.ENGLISH_UNITED_STATES); // 출력: "en"
getLocaleLang(Locales.ENGLISH); // 출력: "en"
getLocaleLang(Locales.FRENCH_CANADA); // 출력: "fr"
getLocaleLang(Locales.FRENCH); // 출력: "fr"
```

## 엣지 케이스:

- **로케일이 제공되지 않음:**

  - `locale`이 `undefined`일 때 함수는 빈 문자열을 반환합니다.

- **잘못된 로케일 문자열:**
  - `locale`이 `language-country` 형식을 따르지 않을 경우(예: `Locales.ENGLISH-US`), 함수는 안전하게 `'-'` 앞부분 또는 `'-'`가 없을 경우 전체 문자열을 반환합니다.
