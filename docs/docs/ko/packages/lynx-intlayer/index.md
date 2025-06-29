---
docName: package__lynx-intlayer
url: https://intlayer.org/doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 패키지 문서 | lynx-intlayer
description: lynx-intlayer 패키지 사용 방법을 확인하세요
keywords:
  - Intlayer
  - lynx-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

**Intlayer**는 JavaScript 개발자를 위해 설계된 패키지 모음입니다. React, React 및 Express.js와 같은 프레임워크와 호환됩니다.

**`lynx-intlayer` 패키지**는 Vite 애플리케이션을 국제화할 수 있도록 합니다. 환경 변수를 통해 [Lynx 번들러](https://lynxjs.org/index.html)에 설정을 적용하는 Metro 플러그인을 포함하고 있습니다.

## Lynx 애플리케이션을 국제화해야 하는 이유?

Lynx 애플리케이션을 국제화하는 것은 글로벌 사용자에게 효과적으로 서비스를 제공하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자의 선호 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고 애플리케이션의 접근성과 관련성을 높여 다양한 언어적 배경을 가진 사람들에게 더 널리 다가갈 수 있도록 합니다.

## 구성

`lynx-intlayer` 패키지는 [`react-intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md) 및 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/index.md)와 원활하게 작동합니다. 자세한 내용은 관련 문서를 참조하세요.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## 사용 예시

Vite 구성에 플러그인을 포함하는 방법의 예를 참조하세요.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... 다른 플러그인들
    pluginIntlayerLynx(),
  ],
});
```

## Vite 애플리케이션 국제화 마스터하기

Intlayer는 Vite 애플리케이션을 국제화하는 데 도움이 되는 다양한 기능을 제공합니다.

**이러한 기능에 대해 더 알아보려면 [Intlayer와 Lynx를 활용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_lynx+react.md) 가이드를 참조하세요.**

## Intlayer에 대해 읽어보기

- [Intlayer 웹사이트](https://intlayer.org)
- [Intlayer 문서](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [스마트 문서에 질문하기](https://intlayer.org/docchat)
