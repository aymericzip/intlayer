---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: 패키지 문서 | react-native-intlayer
description: react-native-intlayer 패키지 사용 방법 보기
keywords:
  - Intlayer
  - React Native
  - react-native-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-native-intlayer
---

# react-native-intlayer: React Native 애플리케이션 국제화(i18n)

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`react-native-intlayer` 패키지**는 Vite 애플리케이션을 국제화할 수 있게 해줍니다. 이 패키지는 [Metro 번들러](https://docs.expo.dev/guides/customizing-metro/)에 환경 변수로 설정을 전달할 수 있는 Metro 플러그인을 포함하고 있습니다.

## React Native 애플리케이션을 국제화해야 하는 이유

React Native 애플리케이션을 국제화하는 것은 전 세계 사용자에게 효과적으로 서비스를 제공하기 위해 필수적입니다. 이를 통해 애플리케이션은 각 사용자가 선호하는 언어로 콘텐츠와 메시지를 전달할 수 있습니다. 이러한 기능은 사용자 경험을 향상시키고, 다양한 언어 배경을 가진 사람들에게 더 접근 가능하고 관련성 높은 애플리케이션으로 만들어 애플리케이션의 범위를 넓혀줍니다.

## 구성

`react-native-intlayer` 패키지는 [`react-intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md) 및 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/index.md)와 원활하게 작동합니다. 자세한 내용은 관련 문서를 참조하세요.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install react-native-intlayer
```

```bash packageManager="yarn"
yarn add react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add react-native-intlayer
```

## 사용 예시

vite 구성에 플러그인을 포함하는 방법의 예시를 확인하세요.

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

## Vite 애플리케이션의 국제화 마스터하기

Intlayer는 Vite 애플리케이션을 국제화하는 데 도움이 되는 다양한 기능을 제공합니다.

**이 기능들에 대해 더 알아보려면, React Native 애플리케이션을 위한 [Intlayer와 React Native를 이용한 React 국제화(i18n)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_react_native+expo.md) 가이드를 참고하세요.**

## Intlayer에 대해 알아보기

- [Intlayer 웹사이트](https://intlayer.org)
- [Intlayer 문서](https://intlayer.org/doc)
- [Intlayer GitHub](https://github.com/aymericzip/intlayer)

- [스마트 문서에 질문하기](https://intlayer.org/docchat)

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
