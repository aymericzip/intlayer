---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 로케일 목록을 어떻게 사용자 정의하나요?
description: 로케일 목록을 사용자 정의하는 방법을 알아보세요.
keywords:
  - 로케일
  - 목록
  - intlayer
  - 구성
  - availableLocales
  - defaultLocale
  - useLocale
  - 훅
  - 로케일
  - 목록
slugs:
  - frequent-questions
  - customized-locale-list
---

# 영어와 같은 특정 언어 유형을 차단할 수 있나요? 사전에 영어를 추가하고 있는데 웹사이트에서는 아직 영어를 사용 가능하게 하고 싶지 않습니다.

네, Intlayer 구성에서 `availableLocales` 옵션을 사용하여 영어와 같은 특정 언어 유형을 차단할 수 있습니다.

```ts
import { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  locales: [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH],
  availableLocales: [Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.FRENCH,
};
```

또는

```ts
import { IntlayerConfig } from "intlayer";

const locales = [Locales.FRENCH, Locales.SPANISH, Locales.ENGLISH];

const config: IntlayerConfig = {
  locales,
  availableLocales: locales.filter((locale) => locale !== Locales.ENGLISH),
  defaultLocale: Locales.FRENCH,
};
```

이 구성은 `t()` 함수의 타입을 사용 가능한 로케일만 포함하도록 변경합니다.

`availableLocales`는 선택 사항이며, 제공하지 않으면 모든 로케일이 사용 가능하게 됩니다.

주의할 점은, `availableLocales` 옵션에 포함된 모든 로케일은 반드시 `locales` 옵션에도 포함되어야 한다는 것입니다.

`useLocale` 훅을 사용하는 경우, `availableLocales` 옵션이 로케일 목록에 대한 접근 권한을 설정하는 데 사용된다는 점에 유의하세요.

```ts
import { useLocale } from "intlayer";

const { availableLocales } = useLocale();

console.log(availableLocales); // [Locales.FRENCH, Locales.SPANISH]
```
