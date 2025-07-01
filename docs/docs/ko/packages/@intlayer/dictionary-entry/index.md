---
docName: package__@intlayer_dictionary-entry
url: https://intlayer.org/doc/package/@intlayer_dictionary-entry
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/@intlayer/dictionary-entry/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/dictionary-entry - Intlayer용 사전 관리
description: Intlayer에서 사전 항목을 관리하기 위한 NPM 패키지로, 번역 사전을 생성, 업데이트 및 구성하는 유틸리티를 제공합니다.
keywords:
  - intlayer
  - dictionary
  - entries
  - management
  - translation
  - i18n
  - JavaScript
  - NPM
---

# @intlayer/dictionary-entry: Intlayer 사전을 가져오기 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React Native, Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/dictionary-entry`** 패키지는 intlayer 사전의 진입 경로(entry path)만 반환하는 NPM 패키지입니다. 브라우저에서는 파일 시스템 검색이 불가능하기 때문에, Webpack이나 Rollup과 같은 번들러를 사용하여 사전의 진입 경로를 가져오는 것이 불가능합니다. 이 패키지는 별칭(alias)으로 사용되도록 설계되었습니다.

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install @intlayer/dictionary-entry
```

```bash packageManager="pnpm"
pnpm add @intlayer/dictionary-entry
```

```bash packageManager="yarn"
yarn add @intlayer/dictionary-entry
```

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
