---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: 패키지 문서 | react-scripts-intlayer
description: react-scripts-intlayer 패키지 사용 방법 보기
keywords:
  - Intlayer
  - react-scripts-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-scripts-intlayer
---

# react-scripts-intlayer: React Create App 애플리케이션에서 Intlayer를 사용하기 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`react-scripts-intlayer` 패키지**는 Create React App 기반 애플리케이션에 Intlayer를 통합하기 위한 `react-scripts-intlayer` 명령어와 플러그인을 포함합니다. 이 플러그인들은 [craco](https://craco.js.org/)를 기반으로 하며, [Webpack](https://webpack.js.org/) 번들러에 대한 추가 구성을 포함합니다.

## 구성

`react-scripts-intlayer` 패키지는 [`react-intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/react-intlayer/index.md) 및 [`intlayer` 패키지](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer/index.md)와 원활하게 작동합니다. 자세한 내용은 관련 문서를 참조하세요.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add react-scripts-intlayer
```

## 사용법

### CLI 명령어

`react-scripts-intlayer` 패키지는 다음과 같은 CLI 명령어를 제공합니다:

- `npx react-scripts-intlayer build`: Intlayer 구성을 사용하여 React 애플리케이션을 빌드합니다.
- `npx react-scripts-intlayer start`: Intlayer 구성을 사용하여 개발 서버를 시작합니다.

### package.json 스크립트 교체

`react-scripts-intlayer` 패키지를 사용하려면, `package.json`의 스크립트를 다음 명령어로 교체해야 합니다:

```json fileName="package.json"
{
  "scripts": {
    "start": "react-scripts-intlayer start",
    "build": "react-scripts-intlayer build"
  }
}
```

## 사용자 정의 Webpack 구성 사용

`react-scripts-intlayer`는 Webpack 구성을 사용자 정의할 수 있는 [craco](https://craco.js.org/)를 기반으로 합니다.
Webpack 구성을 사용자 정의해야 하는 경우, intlayer craco 플러그인을 기반으로 자체 설정을 구현할 수도 있습니다. [여기에서 예제 보기](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

## React Create App용 전체 Intlayer 가이드 읽기

Intlayer는 React 애플리케이션의 국제화를 돕기 위한 다양한 기능을 제공합니다.
[Intlayer를 React Create App과 함께 사용하는 방법 보기](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md).

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
