---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: 콘텐츠 확장자 사용자 정의
description: 콘텐츠 선언 파일의 확장자를 사용자 정의하는 방법을 알아보세요. 이 문서를 따라 프로젝트에서 조건을 효율적으로 구현할 수 있습니다.
keywords:
  - 콘텐츠 확장자 사용자 정의
  - 문서
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# 콘텐츠 확장자 사용자 정의

## 콘텐츠 파일 확장자

Intlayer는 콘텐츠 선언 파일의 확장자를 사용자 정의할 수 있도록 합니다. 이러한 사용자 정의는 대규모 프로젝트 관리에 유연성을 제공하며, 다른 모듈과의 충돌을 방지하는 데 도움이 됩니다.

### 기본 확장자

기본적으로 Intlayer는 다음 확장자를 가진 모든 파일을 콘텐츠 선언용으로 감시합니다:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

이 기본 확장자는 대부분의 애플리케이션에 적합합니다. 그러나 특정 요구 사항이 있는 경우, 빌드 프로세스를 간소화하고 다른 구성 요소와의 충돌 위험을 줄이기 위해 사용자 정의 확장자를 정의할 수 있습니다.

### 콘텐츠 확장자 사용자 정의

Intlayer가 콘텐츠 선언 파일을 식별하는 데 사용하는 파일 확장자를 사용자 정의하려면 Intlayer 구성 파일에서 이를 지정할 수 있습니다. 이 방법은 감시 범위를 제한하여 빌드 성능을 향상시키는 대규모 프로젝트에 유용합니다.

다음은 구성에서 사용자 정의 콘텐츠 확장자를 정의하는 예입니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // 사용자 정의 확장자
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // 사용자 정의 확장자
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // 사용자 정의 확장자
  },
};

module.exports = config;
```

이 예제에서는 `.my_content.ts`와 `.my_content.tsx` 두 가지 사용자 정의 확장자를 지정했습니다. Intlayer는 이 확장자를 가진 파일만 감시하여 사전을 빌드합니다.

### 사용자 정의 확장자의 이점

- **빌드 성능**: 감시하는 파일 범위를 줄이면 대규모 프로젝트에서 빌드 성능이 크게 향상될 수 있습니다.
- **충돌 방지**: 커스텀 확장자는 프로젝트 내 다른 JavaScript 또는 TypeScript 파일과의 충돌을 방지하는 데 도움이 됩니다.
- **조직화**: 커스텀 확장자를 사용하면 프로젝트 요구에 맞게 콘텐츠 선언 파일을 체계적으로 관리할 수 있습니다.

### 커스텀 확장자 가이드라인

콘텐츠 파일 확장자를 커스터마이징할 때는 다음 가이드라인을 참고하세요:

- **고유성**: 프로젝트 내에서 충돌을 피하기 위해 고유한 확장자를 선택하세요.
- **일관된 명명법**: 코드 가독성과 유지보수를 위해 일관된 명명 규칙을 사용하세요.
- **일반 확장자 회피**: 다른 모듈이나 라이브러리와의 충돌을 방지하기 위해 `.ts`나 `.js` 같은 일반적인 확장자 사용을 피하세요.

## 결론

Intlayer에서 콘텐츠 파일 확장자를 사용자 정의하는 것은 대규모 애플리케이션에서 성능을 최적화하고 충돌을 방지하는 데 유용한 기능입니다. 이 문서에 설명된 지침을 따르면 콘텐츠 선언을 효과적으로 관리하고 프로젝트의 다른 부분과 원활하게 통합할 수 있습니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
