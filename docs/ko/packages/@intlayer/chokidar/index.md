# @intlayer/chokidar: NPM 패키지를 사용하여 Intlayer 선언 파일을 사전으로 스캔하고 빌드하기

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React 및 Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/chokidar`** 패키지는 [chokidar](https://github.com/paulmillr/chokidar)를 사용하여 Intlayer 선언 파일을 사전으로 스캔하고 빌드하는 데 사용되며, [Intlayer 구성](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)에 따라 작동합니다.

## 사용법

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Intlayer 사전 빌드하기

// 또는

watch({ persistent: true }); // 감시 모드
```

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
