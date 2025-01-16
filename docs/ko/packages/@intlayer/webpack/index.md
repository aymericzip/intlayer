# @intlayer/webpack: NPM 패키지를 사용하여 애플리케이션에 Intlayer Webpack 플러그인을 추가하기

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React 및 Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/webpack`** 패키지는 Intlayer와 함께 Webpack 기반 애플리케이션 작업을 용이하게 하기 위한 Webpack 구성을 제공합니다. 이 패키지는 기존 Webpack 애플리케이션에 추가할 수 있는 플러그인도 제공합니다.

## 사용법

```ts
import { IntLayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntLayerPlugin({
      // 옵션
    }),
  ],
};
```

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
