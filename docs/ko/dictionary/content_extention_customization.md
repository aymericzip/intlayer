# 콘텐츠 확장 커스터마이징

## 콘텐츠 파일 확장자

Intlayer는 콘텐츠 선언 파일의 확장자를 커스터마이징할 수 있는 기능을 제공합니다. 이 커스터마이징은 대규모 프로젝트를 관리하는 데 유연성을 제공하며, 다른 모듈과의 충돌을 방지하는 데 도움을 줍니다.

### 기본 확장자

기본적으로 Intlayer는 콘텐츠 선언을 위해 다음 확장자를 가진 모든 파일을 감시합니다:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.cintent.cjx`

이 기본 확장자는 대부분의 애플리케이션에 적합합니다. 그러나 특정 요구 사항이 있는 경우, 커스텀 확장자를 정의하여 빌드 프로세스를 간소화하고 다른 구성 요소와의 충돌 위험을 줄일 수 있습니다.

### 콘텐츠 확장자 커스터마이징

Intlayer가 콘텐츠 선언 파일을 식별하는 데 사용하는 파일 확장자를 커스터마이징하려면 Intlayer 설정 파일에서 이를 지정할 수 있습니다. 이 접근 방식은 감시 프로세스의 범위를 제한하여 빌드 성능을 향상시키는 대규모 프로젝트에 유용합니다.

다음은 설정에서 커스텀 콘텐츠 확장자를 정의하는 예제입니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // 커스텀 확장자
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // 커스텀 확장자
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // 커스텀 확장자
  },
};

module.exports = config;
```

이 예제에서 설정은 두 개의 커스텀 확장자 `.my_content.ts`와 `.my_content.tsx`를 지정합니다. Intlayer는 이러한 확장자를 가진 파일만 감시하여 딕셔너리를 빌드합니다.

### 커스텀 확장자의 이점

- **빌드 성능**: 감시 파일의 범위를 줄이면 대규모 프로젝트에서 빌드 성능이 크게 향상됩니다.
- **충돌 방지**: 커스텀 확장자는 프로젝트 내 다른 JavaScript 또는 TypeScript 파일과의 충돌을 방지합니다.
- **조직화**: 커스텀 확장자는 프로젝트 요구 사항에 따라 콘텐츠 선언 파일을 조직화할 수 있게 합니다.

### 커스텀 확장자에 대한 가이드라인

콘텐츠 파일 확장자를 커스터마이징할 때 다음 가이드라인을 준수하세요:

- **고유성**: 프로젝트 내에서 고유한 확장자를 선택하여 충돌을 방지하세요.
- **일관된 명명**: 코드 가독성과 유지 관리를 위해 일관된 명명 규칙을 사용하세요.
- **일반 확장자 피하기**: `.ts` 또는 `.js`와 같은 일반적인 확장자는 다른 모듈이나 라이브러리와의 충돌을 방지하기 위해 사용하지 마세요.

## 결론

Intlayer에서 콘텐츠 파일 확장자를 커스터마이징하는 것은 대규모 애플리케이션에서 성능을 최적화하고 충돌을 방지하는 데 유용한 기능입니다. 이 문서에서 설명한 가이드를 따르면 콘텐츠 선언을 효과적으로 관리하고 프로젝트의 다른 부분과 원활하게 통합할 수 있습니다.
