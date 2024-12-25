# 국제화 Intlayer 및 i18next 사용하기

i18next는 JavaScript 응용 프로그램을 위한 오픈 소스 국제화(i18n) 프레임워크입니다. 소프트웨어 프로젝트에서 번역, 지역화 및 언어 전환을 관리하는 데 널리 사용됩니다. 그러나 이는 확장성 및 개발을 복잡하게 만들 수 있는 몇 가지 제한 사항이 있습니다.

Intlayer는 이러한 제한 사항을 해결하는 또 다른 국제화 프레임워크로, 콘텐츠 선언 및 관리를 위한 보다 유연한 접근 방식을 제공합니다. i18next와 Intlayer의 주요 차이점을 살펴보고, 최적의 국제화를 위해 두 프레임워크를 구성하는 방법을 알아보겠습니다.

## Intlayer와 i18next: 주요 차이점

### 1. 콘텐츠 선언

i18next의 경우 번역 사전을 특정 폴더에 선언해야 하며, 이는 애플리케이션의 확장성을 복잡하게 만들 수 있습니다. 반면 Intlayer는 컴포넌트와 동일한 디렉토리 내에서 콘텐츠를 선언할 수 있게 해줍니다. 이는 몇 가지 장점을 제공합니다:

- **간소화된 콘텐츠 편집**: 사용자는 수정할 올바른 사전을 찾을 필요가 없어져 오류 가능성이 줄어듭니다.
- **자동 적응**: 만약 컴포넌트의 위치가 변경되거나 제거되면, Intlayer는 이를 자동으로 감지하여 적응합니다.

### 2. 구성 복잡성

i18next의 구성은 복잡할 수 있으며, 특히 서버 측 컴포넌트와 통합하거나 Next.js와 같은 프레임워크를 위한 미들웨어를 구성할 때 더욱 그렇습니다. Intlayer는 이 과정을 간소화하여 보다 직관적인 구성을 제공합니다.

### 3. 번역 사전의 일관성

i18next에서는 다양한 언어 간에 번역 사전의 일관성을 보장하는 것이 어려울 수 있습니다. 이러한 불일치는 적절히 관리되지 않으면 애플리케이션 충돌로 이어질 수 있습니다. Intlayer는 번역된 콘텐츠에 제약을 설정하여 모든 번역이 누락되지 않고 정확하게 이루어지도록 합니다.

### 4. TypeScript 통합

Intlayer는 TypeScript와의 더 나은 통합을 제공하여 코드 내에서 콘텐츠에 대한 자동 제안을 가능하게 하여 개발 효율성을 향상시킵니다.

### 5. 애플리케이션 간 콘텐츠 공유

Intlayer는 여러 애플리케이션 및 공유 라이브러리 간에 콘텐츠 선언 파일을 공유하는 것을 용이하게 합니다. 이 기능은 더 큰 코드베이스에 걸쳐 일관된 번역을 유지하는 데 도움이 됩니다.

## Intlayer로 i18next 사전 생성하기

### i18next 사전을 내보내기 위한 Intlayer 구성

> 중요 사항
> i18next 사전의 내보내기는 현재 베타 버전이며 다른 프레임워크와의 1:1 호환성을 보장하지 않습니다. 문제가 발생하지 않도록 Intlayer 기반 구성의 사용을 권장합니다.

i18next 사전을 내보내려면 Intlayer를 적절히 구성해야 합니다. 아래는 Intlayer를 설정하여 Intlayer 및 i18next 사전을 모두 내보내는 방법의 예입니다.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Intlayer가 Intlayer와 i18next 사전을 모두 내보낸다는 것을 나타냅니다.
    dictionaryOutput: ["intlayer", "i18next"],
    // i18n 사전이 내보낼 디렉토리까지의 프로젝트 루트에서의 상대 경로
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Intlayer가 Intlayer와 i18next 사전을 모두 내보낸다는 것을 나타냅니다.
    dictionaryOutput: ["intlayer", "i18next"],
    // i18n 사전이 내보낼 디렉토리까지의 프로젝트 루트에서의 상대 경로
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Intlayer가 Intlayer와 i18next 사전을 모두 내보낸다는 것을 나타냅니다.
    dictionaryOutput: ["intlayer", "i18next"],
    // i18n 사전이 내보낼 디렉토리까지의 프로젝트 루트에서의 상대 경로
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

module.exports = config;
```

' i18next'를 구성에 포함시킴으로써 Intlayer는 Intlayer 사전과 함께 전용 i18next 사전을 생성합니다. 'intlayer'를 구성에서 제거하면 React-Intlayer 또는 Next-Intlayer와의 호환성이 깨질 수 있습니다.

### i18next 구성으로 사전 가져오기

생성된 사전을 i18next 구성으로 가져오려면 'i18next-resources-to-backend'를 사용할 수 있습니다. 다음은 생성한 i18next 사전을 가져오는 방법의 예입니다.

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // 여기에 i18next 구성 작성
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // 여기에 i18next 구성 작성
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // 여기에 i18next 구성 작성
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```
