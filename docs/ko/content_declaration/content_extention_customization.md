# 콘텐츠 확장 사용자 정의

## 콘텐츠 파일 확장자

Intlayer는 콘텐츠 선언 파일에 대한 확장자를 사용자 정의할 수 있습니다. 이 사용자 정의는 대규모 프로젝트 관리에 유연성을 제공하며 다른 모듈과의 충돌을 피하는 데 도움을 줍니다.

### 기본 확장자

기본적으로 Intlayer는 다음 확장자를 가진 모든 파일을 콘텐츠 선언용으로 감시합니다:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

이 기본 확장자는 대부분의 애플리케이션에 적합합니다. 그러나 특정 요구 사항이 있는 경우, 빌드 프로세스를 간소화하고 다른 구성 요소와의 충돌 위험을 줄이기 위해 사용자 정의 확장자를 정의할 수 있습니다.

### 콘텐츠 확장자 사용자 정의

Intlayer가 콘텐츠 선언 파일을 식별하는 데 사용하는 파일 확장자를 사용자 정의하려면 Intlayer 구성 파일에 이를 지정할 수 있습니다. 이 접근 방식은 감시 프로세스의 범위를 제한하여 빌드 성능을 개선하는 대규모 프로젝트에 유익합니다.

구성에서 사용자 정의 콘텐츠 확장자를 정의하는 방법의 예는 다음과 같습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // 사용자 지정 확장자
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // 사용자 지정 확장자
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // 사용자 지정 확장자
  },
};

module.exports = config;
```

이 예제에서는 구성에서 두 개의 사용자 정의 확장자: `.my_content.ts`와 `.my_content.tsx`를 지정합니다. Intlayer는 이러한 확장자를 가진 파일만 감시하여 사전(dictionary)을 빌드합니다.

### 사용자 정의 확장자의 장점

- **빌드 성능**: 감시하는 파일의 범위를 줄이면 대규모 프로젝트에서 빌드 성능이 크게 향상될 수 있습니다.
- **충돌 회피**: 사용자 정의 확장자는 프로젝트의 다른 JavaScript 또는 TypeScript 파일과의 충돌을 예방하는 데 도움을 줍니다.
- **조직화**: 사용자 정의 확장자는 프로젝트의 필요에 따라 콘텐츠 선언 파일을 조직할 수 있습니다.

### 사용자 정의 확장자를 위한 지침

콘텐츠 파일 확장자를 사용자 정의할 때는 다음 지침을 염두에 두십시오:

- **유일성**: 충돌을 피하기 위해 프로젝트 내에서 유일한 확장자를 선택하십시오.
- **일관된 이름 지정**: 코드 가독성과 유지 관리를 위해 일관된 이름 지정 규칙을 사용하십시오.
- **일반 확장자 피하기**: 다른 모듈이나 라이브러리와의 충돌을 방지하기 위해 `.ts`나 `.js`와 같은 일반 확장자는 사용하지 마십시오.

## 결론

Intlayer에서 콘텐츠 파일 확장자를 사용자 정의하는 것은 성능 최적화 및 대규모 애플리케이션에서의 충돌 방지를 위한 귀중한 기능입니다. 이 문서에 설명된 지침을 따르면 콘텐츠 선언을 효과적으로 관리하고 프로젝트의 다른 부분과의 원활한 통합을 보장할 수 있습니다.
