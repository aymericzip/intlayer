---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 패키지 문서 | vite-intlayer
description: vite-intlayer 패키지 사용 방법 보기
keywords:
  - Intlayer
  - vite-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: Vite 애플리케이션을 국제화(i18n)하기 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`vite-intlayer` 패키지**는 Vite 애플리케이션을 국제화할 수 있게 해줍니다. 이 패키지는 환경 변수를 통해 설정을 적용할 수 있는 Vite 플러그인을 포함하고 있으며, 이는 [Vite 번들러](https://vitejs.dev/guide/why.html#why-bundle-for-production)에서 사용됩니다. 또한 사용자의 선호 로케일을 감지하고, [설정](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)에 명시된 대로 적절한 URL로 사용자를 리디렉션하는 미들웨어도 제공합니다.

## 왜 Vite 애플리케이션을 국제화해야 할까요?

Vite 애플리케이션을 국제화하는 것은 전 세계 사용자에게 효과적으로 서비스를 제공하는 데 필수적입니다. 이를 통해 애플리케이션은 각 사용자가 선호하는 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고, 다양한 언어 배경을 가진 사람들에게 더 접근 가능하고 관련성 있게 만들어 애플리케이션의 범위를 넓혀줍니다.

## 설정

`vite-intlayer` 패키지는 [`react-intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md) 및 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/index.md)와 원활하게 작동합니다. 자세한 내용은 관련 문서를 참조하세요.

## 설치

필요한 패키지를 선호하는 패키지 관리자를 사용하여 설치하세요:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## 사용 예시

vite 구성에 플러그인을 포함하는 방법의 예시를 확인하세요.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> `intlayerPlugin()` Vite 플러그인은 Intlayer를 Vite와 통합하는 데 사용됩니다. 이 플러그인은 콘텐츠 선언 파일을 빌드하고 개발 모드에서 이를 모니터링하는 기능을 보장합니다. 또한 Vite 애플리케이션 내에서 Intlayer 환경 변수를 정의하며, 성능 최적화를 위해 별칭(alias)을 제공합니다.

> `intLayerMiddlewarePlugin()`은 애플리케이션에 서버 사이드 라우팅을 추가합니다. 이 플러그인은 URL을 기반으로 현재 로케일을 자동으로 감지하고 적절한 로케일 쿠키를 설정합니다. 로케일이 지정되지 않은 경우, 사용자의 브라우저 언어 설정을 기반으로 가장 적합한 로케일을 결정합니다. 만약 로케일이 감지되지 않으면 기본 로케일로 리디렉션합니다.

## Vite 애플리케이션의 국제화 마스터하기

Intlayer는 Vite 애플리케이션의 국제화를 돕기 위한 다양한 기능을 제공합니다.

**이 기능들에 대해 더 자세히 알고 싶다면, Vite 및 React 애플리케이션용 [Intlayer와 Vite 및 React를 이용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md) 가이드를 참조하세요.**

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
