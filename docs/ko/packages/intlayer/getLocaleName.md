# Documentation: `getLocaleName` Function in `intlayer`

## Description:

`getLocaleName` 함수는 주어진 로케일(`targetLocale`)의 지역화된 이름을 표시 로케일(`displayLocale`)에서 반환합니다. `targetLocale`이 제공되지 않은 경우, 자신의 언어로 `displayLocale`의 이름을 반환합니다.

## Parameters:

- `displayLocale: Locales`

  - **Description**: 타겟 로케일의 이름이 표시될 로케일입니다.
  - **Type**: 유효한 로케일을 나타내는 Enum 또는 문자열입니다.

- `targetLocale?: Locales`
  - **Description**: 이름이 지역화될 로케일입니다.
  - **Type**: 선택적. 유효한 로케일을 나타내는 Enum 또는 문자열입니다.

## Returns:

- **Type**: `string`
- **Description**: `displayLocale`에서 `targetLocale`의 지역화된 이름이거나, `targetLocale`이 제공되지 않은 경우 `displayLocale`의 이름입니다. 번역이 발견되지 않은 경우 `"Unknown locale"`을 반환합니다.

## Example Usage:

```typescript
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

## Edge Cases:

- **타겟 로케일이 제공되지 않음:**
  - 함수는 기본적으로 `displayLocale`의 이름을 반환합니다.
- **번역 누락:**
  - `localeNameTranslations`에 `targetLocale` 또는 특정 `displayLocale`에 대한 항목이 없으면, 함수는 `ownLocalesName`으로 대체하거나 `"Unknown locale"`을 반환합니다.
