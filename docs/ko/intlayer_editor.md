# Intlayer Editor Documentation

Intlayer Editor는 애플리케이션을 시각적 편집기로 변환하는 도구입니다. Intlayer Editor를 사용하면 팀이 구성된 모든 언어로 사이트의 콘텐츠를 관리할 수 있습니다.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

`intlayer-editor` 패키지는 Intlayer를 기반으로 하며 React (Create React App), Vite + React 및 Next.js와 같은 JavaScript 애플리케이션에서 사용할 수 있습니다.

## 통합

패키지를 설치하는 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하십시오.

### Next.js와 통합하기

Next.js와 통합하려면 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 참조하십시오.

### Create React App과 통합하기

Create React App과 통합하려면 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)를 참조하십시오.

### Vite + React와 통합하기

Vite + React와 통합하려면 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)를 참조하십시오.

## Intlayer Editor의 작동 방식

Intlayer Editor를 사용하여 변경할 때마다 서버는 프로젝트에서 이러한 파일이 선언된 곳에 관계없이 변경 사항을 [Intlayer 선언 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)로 자동으로 삽입합니다.

이렇게 하면 파일이 어디에 선언되었는지 또는 사전 컬렉션에서 키를 찾는 것에 대해 걱정할 필요가 없습니다.

## 설치

Intlayer가 프로젝트에 구성되면 `intlayer-editor`를 개발 종속성으로 간단히 설치하십시오:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## 구성

### 1. intlayer.config.ts 파일에서 편집기 활성화

Intlayer 구성 파일에서 편집기 설정을 사용자 정의할 수 있습니다:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false인 경우, 편집기는 비활성화되며 접근할 수 없습니다.
    // 클라이언트 ID와 클라이언트 비밀번호는 편집기를 활성화하는 데 필요합니다.
    // 이는 콘텐츠를 편집하는 사용자 식별을 허용합니다.
    // Intlayer 대시보드 - 프로젝트에서 새 클라이언트를 생성하여 얻을 수 있습니다. (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기타 구성 설정
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false인 경우, 편집기는 비활성화되며 접근할 수 없습니다.
    // 클라이언트 ID와 클라이언트 비밀번호는 편집기를 활성화하는 데 필요합니다.
    // 이는 콘텐츠를 편집하는 사용자 식별을 허용합니다.
    // Intlayer 대시보드 - 프로젝트에서 새 클라이언트를 생성하여 얻을 수 있습니다. (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... 기타 구성 설정
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false인 경우, 편집기는 비활성화되며 접근할 수 없습니다.
    // 클라이언트 ID와 클라이언트 비밀번호는 편집기를 활성화하는 데 필요합니다.
    // 이는 콘텐츠를 편집하는 사용자 식별을 허용합니다.
    // Intlayer 대시보드 - 프로젝트에서 새 클라이언트를 생성하여 얻을 수 있습니다. (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> 클라이언트 ID 및 클라이언트 비밀번호가 없는 경우 [Intlayer 대시보드 - 프로젝트](https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 보려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

### 2. 애플리케이션에 Intlayer Editor Provider 삽입

편집기를 활성화하려면 애플리케이션에 Intlayer Editor Provider를 삽입해야 합니다.

React JS 또는 Vite + React 애플리케이션에 대한 예시:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* 당신의 애플리케이션 */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* 당신의 애플리케이션 */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* 당신의 애플리케이션 */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Next.js 애플리케이션에 대한 예시:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* 당신의 애플리케이션 */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* 당신의 애플리케이션 */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* 당신의 애플리케이션 */}
        </IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. 애플리케이션에 스타일시트를 추가하기

편집기 스타일을 표시하려면 애플리케이션에 스타일시트를 추가해야 합니다.

tailwind를 사용하는 경우 `tailwind.config.js` 파일에 스타일시트를 추가할 수 있습니다:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... 나머지 콘텐츠
  ],
  // ...
};
```

그렇지 않으면 애플리케이션에 스타일시트를 가져오면 됩니다:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

또는

```css fileName="app.css"
@import "intlayer-editor/css";
```

## 편집기 사용하기

편집기가 설치되고 활성화되며 시작되면, 콘텐츠 위에 커서를 올려놓으면 Intlayer에 의해 인덱싱된 각 필드를 볼 수 있습니다.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

콘텐츠가 윤곽선으로 표시되면, 편집 서랍을 표시하기 위해 길게 누를 수 있습니다.
