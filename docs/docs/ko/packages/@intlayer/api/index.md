---
docName: packages__intlayer__api
url: https://intlayer.org/doc/packages/intlayer/api
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/@intlayer/api/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/api - Intlayer API 통합용 SDK
description: 콘텐츠 감사, 조직, 프로젝트 및 사용자 관리를 위해 Intlayer API와 상호작용하는 소프트웨어 개발 키트(SDK)를 제공하는 NPM 패키지입니다.
keywords:
  - intlayer
  - API
  - SDK
  - 통합
  - 콘텐츠 감사
  - 조직
  - 프로젝트
  - JavaScript
---

# @intlayer/api: Intlayer API와 상호작용하는 NPM 패키지

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React Native, Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/api`** 패키지는 Intlayer API와 상호작용하기 위한 SDK(소프트웨어 개발 키트)입니다. 콘텐츠 선언을 감사하고, 조직, 프로젝트, 사용자와 상호작용하는 기능들을 제공합니다.

## 사용법

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
