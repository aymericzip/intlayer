# @intlayer/config: NPM 패키지로 Intlayer 구성 정보를 가져옵니다

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React 및 Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/config`** 패키지는 Intlayer의 구성을 가져오고 현재 환경과 관련된 환경 변수를 정의할 수 있는 NPM 패키지입니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## 사용법

### 파일 시스템을 사용하여 Intlayer의 구성 읽기

예시:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// 출력:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> 이 함수는 `fs` 패키지를 사용하며 서버 측에서만 작동합니다.

### 환경 변수를 사용하여 Intlayer의 구성 읽기

예시:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// 출력:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> 이 함수는 환경 변수가 정의되지 않으면 아무것도 반환하지 않습니다.

### 환경 변수 정의하기

1. 구성 파일을 생성합니다.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> 자세한 내용은 [Intlayer 구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

2. 환경 변수를 정의합니다.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// 모든 구성 값을 환경 변수 형식으로 포맷
const env = formatEnvVariable();

// 각 포맷된 환경 변수를 process.env에 설정
Object.assign(process.env, env);
```

3. 구성 파일을 가져옵니다.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
