# Documentation: `getLocaleName` 함수 in `intlayer`

## 설명:

`getLocaleName` 함수는 주어진 로케일(`targetLocale`)의 로컬화된 이름을 표시 로케일(`displayLocale`)에서 반환합니다. `targetLocale`이 제공되지 않으면, `displayLocale`의 이름을 자신의 언어로 반환합니다.

## 매개변수:

- `displayLocale: Locales`

  - **설명**: 대상 로케일의 이름이 표시될 로케일입니다.
  - **타입**: 유효한 로케일을 나타내는 Enum 또는 문자열.

- `targetLocale?: Locales`
  - **설명**: 이름이 로컬화될 로케일입니다.
  - **타입**: 선택 사항입니다. 유효한 로케일을 나타내는 Enum 또는 문자열.

## 반환값:

- **타입**: `string`
- **설명**: `displayLocale`에서 `targetLocale`의 로컬화된 이름이거나, `targetLocale`이 제공되지 않은 경우 `displayLocale` 자신의 이름입니다. 번역을 찾을 수 없는 경우 `"Unknown locale"`을 반환합니다.

## 예시 사용법:

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 출력: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 출력: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 출력: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 출력: "English"

getLocaleName(Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 출력: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 출력: "French"

getLocaleName(Locales.CHINESE); // 출력: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 출력: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 출력: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 출력: "Chinese"

getLocaleName("unknown-locale"); // 출력: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // 출력: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 출력: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 출력: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 출력: "English"

getLocaleName(Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 출력: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 출력: "French"

getLocaleName(Locales.CHINESE); // 출력: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 출력: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 출력: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 출력: "Chinese"

getLocaleName("unknown-locale"); // 출력: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // 출력: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // 출력: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // 출력: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // 출력: "English"

getLocaleName(Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // 출력: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // 출력: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // 출력: "French"

getLocaleName(Locales.CHINESE); // 출력: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // 출력: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // 출력: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // 출력: "Chinese"

getLocaleName("unknown-locale"); // 출력: "Unknown locale"
```

## 엣지 케이스:

- **`targetLocale`이 제공되지 않는 경우:**
  - 함수는 기본적으로 `displayLocale`의 자신의 이름을 반환합니다.
- **누락된 번역:**
  - 만약 `localeNameTranslations`가 `targetLocale`이나 특정 `displayLocale`에 대한 항목을 포함하지 않는 경우, 함수는 `ownLocalesName`으로 돌아가거나 `"Unknown locale"`을 반환합니다.
