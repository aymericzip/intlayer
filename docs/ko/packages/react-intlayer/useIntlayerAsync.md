# React Integration: `useIntlayerAsync` 훅 문서

`useIntlayerAsync` 훅은 `useIntlayer`의 기능을 확장하여 사전 렌더링 된 사전을 반환할 뿐만 아니라 비동기적으로 업데이트를 가져와서, 초기 렌더 후 자주 로컬라이즈된 콘텐츠를 업데이트하는 애플리케이션에 적합합니다.

## 개요

- **비동기 사전 로딩:**  
  초기 마운트 시, `useIntlayerAsync`는 먼저 미리 가져온 또는 정적으로 번들링된 로케일 사전을 반환하며 (just like `useIntlayer` would), 이후 비동기적으로 새로 사용 가능한 원격 사전을 가져와 병합합니다.
- **진행 상태 관리:**  
  이 훅은 원격 사전을 가져오는 동안 `isLoading` 상태를 제공하여, 개발자가 로딩 인디케이터나 스켈레톤 상태를 표시할 수 있게 하여 더 부드러운 사용자 경험을 제공합니다.

## 환경 설정

Intlayer는 비개발자가 애플리케이션 콘텐츠를 매끄럽게 관리하고 업데이트할 수 있도록 지원하는 헤드리스 콘텐츠 소스 관리(CSM) 시스템을 제공합니다. Intlayer의 직관적인 대시보드를 사용하면 팀이 코드를 직접 수정하지 않고도 로컬라이즈된 텍스트, 이미지 및 기타 리소스를 편집할 수 있습니다. 이는 콘텐츠 관리 프로세스를 간소화하고 협업을 촉진하며, 업데이트를 신속하고 쉽게 수행할 수 있게 합니다.

Intlayer를 시작하려면:

1. **[https://intlayer.org/dashboard](https://intlayer.org/dashboard)에서 등록하고 액세스 토큰을 얻으세요.**
2. **구성 파일에 자격 증명을 추가하세요:**  
   React 프로젝트에서 Intlayer 클라이언트를 자격 증명으로 구성합니다:

   ```typescript fileName="intlayer.config.ts" codeFormat="typescript"
   import type { IntlayerConfig } from "intlayer";

   export default {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID, // 클라이언트 ID
       clientSecret: process.env.INTLAYER_CLIENT_SECRET, // 클라이언트 비밀
     },
   } satisfies IntlayerConfig;
   ```

   ```javascript fileName="intlayer.config.mjs" codeFormat="esm"
   import { type IntlayerConfig } from "intlayer";

   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID, // 클라이언트 ID
       clientSecret: process.env.INTLAYER_CLIENT_SECRET, // 클라이언트 비밀
     },
   };

   export default config;
   ```

   ```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
   const { type IntlayerConfig } = require("intlayer");

   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID, // 클라이언트 ID
       clientSecret: process.env.INTLAYER_CLIENT_SECRET, // 클라이언트 비밀
     },
   };

   module.exports = config;
   ```

3. **Intlayer에 새 로케일 사전을 푸시하세요:**

   ```bash
   npx intlayer push -d my-first-dictionary-key
   ```

   이 명령은 초기 콘텐츠 사전을 업로드하여 Intlayer 플랫폼을 통해 비동기적으로 가져오고 편집할 수 있도록 합니다.

## React에서 `useIntlayerAsync` 가져오기

React 컴포넌트에서 `useIntlayerAsync`를 가져옵니다:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## 매개변수

1. **`key`**:  
   **유형**: `DictionaryKeys`  
   로컬라이즈된 콘텐츠 블록을 식별하는 데 사용되는 사전 키입니다. 이 키는 콘텐츠 선언 파일에서 정의되어야 합니다.

2. **`locale`** (선택적):  
   **유형**: `Locales`  
   타겟으로 하려는 특정 로케일입니다. 생략할 경우, 훅은 현재 Intlayer 컨텍스트의 로케일을 사용합니다.

3. **`isRenderEditor`** (선택적, 기본값 `true`):  
   **유형**: `boolean`  
   로컬라이즈된 콘텐츠가 Intlayer
