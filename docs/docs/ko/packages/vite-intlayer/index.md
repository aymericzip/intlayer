---
docName: package__vite-intlayer
url: https://intlayer.org/doc/packages/vite-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: 패키지 문서 | vite-intlayer
description: vite-intlayer 패키지 사용 방법을 확인하세요
keywords:
  - Intlayer
  - vite-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# vite-intlayer: Vite 애플리케이션을 국제화(i18n)하기 위한 NPM 패키지

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`vite-intlayer` 패키지**는 Vite 애플리케이션을 국제화할 수 있도록 합니다. 이 패키지는 환경 변수를 통해 [Vite 번들러](https://vitejs.dev/guide/why.html#why-bundle-for-production)에 설정을 적용하는 Vite 플러그인을 포함합니다. 또한 사용자의 선호 로케일을 감지하고, [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 지정된 URL로 사용자를 리디렉션하는 미들웨어를 제공합니다.

## Vite 애플리케이션을 국제화해야 하는 이유?

Vite 애플리케이션을 국제화하는 것은 글로벌 사용자에게 효과적으로 서비스를 제공하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자의 선호 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고, 다양한 언어적 배경을 가진 사람들에게 더 접근 가능하고 관련성 있는 애플리케이션으로 만들어 애플리케이션의 도달 범위를 넓힙니다.

## 설정

`vite-intlayer` 패키지는 [`react-intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md) 및 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/index.md)와 원활하게 작동합니다. 자세한 내용은 관련 문서를 참조하세요.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## 사용 예제

플러그인을 Vite 설정에 포함하는 방법의 예를 참조하세요.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의합니다. 추가적으로 성능 최적화를 위한 별칭을 제공합니다.

> `intLayerMiddlewarePlugin()`은 애플리케이션에 서버 측 라우팅을 추가합니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 사용자의 브라우저 언어 설정을 기반으로 가장 적합한 로케일을 결정합니다. 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

## Vite 애플리케이션 국제화 마스터하기

Intlayer는 Vite 애플리케이션을 국제화하는 데 도움이 되는 다양한 기능을 제공합니다.

**이러한 기능에 대해 더 알아보려면 [Intlayer와 Vite 및 React를 사용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md) 가이드를 참조하세요.**
