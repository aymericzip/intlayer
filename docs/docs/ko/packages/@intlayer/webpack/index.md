---
docName: package__@intlayer_webpack
url: https://intlayer.org/doc/package/@intlayer_webpack
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/@intlayer/webpack/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Intlayer i18n용 Webpack 플러그인
description: Webpack 기반 애플리케이션과 Intlayer 국제화의 원활한 통합을 위한 Webpack 구성 및 플러그인을 제공하는 NPM 패키지입니다.
keywords:
  - intlayer
  - webpack
  - 플러그인
  - 구성
  - i18n
  - 자바스크립트
  - NPM
  - 번들러
---

# @intlayer/webpack: Intlayer Webpack 플러그인을 애플리케이션에 사용하기 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/webpack`** 패키지는 Intlayer와 함께 Webpack 기반 애플리케이션을 작업할 수 있도록 Webpack 구성을 제공합니다. 또한 기존 Webpack 애플리케이션에 추가할 수 있는 플러그인도 제공합니다.

## 사용법

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
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

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
