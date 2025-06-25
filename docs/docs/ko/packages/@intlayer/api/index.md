# @intlayer/api: Intlayer API와 상호작용하기 위한 NPM 패키지

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React, Express.js와 같은 프레임워크와 호환됩니다.

**`@intlayer/api`** 패키지는 Intlayer API와 상호작용하기 위한 SDK(Software Development Kit)입니다. 콘텐츠 선언을 감사하고, 조직, 프로젝트, 사용자와 상호작용하는 등의 기능을 제공합니다.

## 사용법

```ts
import { intlayerAPI } from "@intlayer/api";

intlayerAPI.user.getUser({
  ids: ["user-id-1", "user-id-2"],
});
```

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하십시오:

```bash packageManager="npm"
npm install @intlayer/api
```

```bash packageManager="pnpm"
pnpm add @intlayer/api
```

```bash packageManager="yarn"
yarn add @intlayer/api
```
