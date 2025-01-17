# @intlayer/api: NPM 패키지로 Intlayer API와 상호 작용하기

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. 이는 React, React, 및 Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/api`** 패키지는 Intlayer API와 상호 작용하기 위한 SDK(소프트웨어 개발 키트)입니다. 이는 콘텐츠 선언 감사, 조직, 프로젝트 및 사용자와의 상호 작용 등을 위한 함수 집합을 제공합니다.

## 사용법

```ts
import { intlayerAPI } from "@intlayer/api";

// 사용자 API 호출
intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```

You are trained on data up to October 2023.
