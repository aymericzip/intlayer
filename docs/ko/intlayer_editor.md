# Intlayer 편집기 문서

Intlayer 편집기는 애플리케이션을 시각적 편집기로 변환하는 도구입니다. Intlayer 편집기를 사용하면 팀이 구성된 모든 언어로 사이트의 콘텐츠를 관리할 수 있습니다.

![Intlayer 편집기 인터페이스](https://github.com/aymericzip/intlayer/blob/main/docs/ko/assets/intlayer_editor_ui.png)

`intlayer-editor` 패키지는 Intlayer를 기반으로 하며 React(Create React App), Vite + React 및 Next.js와 같은 JavaScript 애플리케이션에 사용할 수 있습니다.

## 통합

패키지를 설치하는 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하십시오.

### Next.js와 통합

Next.js와의 통합에 대한 내용은 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 참조하십시오.

### Create React App과 통합

Create React App과의 통합에 대한 내용은 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)를 참조하십시오.

### Vite + React와 통합

Vite + React와의 통합에 대한 내용은 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)를 참조하십시오.

## Intlayer 편집기 작동 방식

Intlayer 편집기를 사용하여 변경을 할 때마다 서버는 자동으로 변경 사항을 프로젝트의 [Intlayer 선언 파일](https://github.com/aymericzip/intlayer/blob/main/docs/ko/content_declaration/get_started.md)에 삽입합니다. 이러한 파일이 프로젝트에서 선언되는 곳 어디에서나 가능합니다.

이렇게 하면 파일이 어디에서 선언되었는지 또는 사전 컬렉션에서 키를 찾는 것에 대해 걱정할 필요가 없습니다.

## 설치

Intlayer가 프로젝트에 구성되면 `intlayer-editor`를 개발 종속성으로 간단히 설치합니다.

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## 구성

### 1. intlayer.config.ts 파일에서 편집기 활성화

Intlayer 구성 파일에서 편집기 설정을 사용자 정의할 수 있습니다.

```typescript
const config: IntlayerConfig = {
  // ... 다른 구성 설정
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false인 경우, 편집기가 비활성화되고 접근할 수 없습니다.
    // 클라이언트 ID와 클라이언트 비밀은 편집기를 활성화하는 데 필요합니다.
    // 이들은 콘텐츠를 편집하는 사용자를 식별할 수 있게 해줍니다.
    // Intlayer 대시보드에서 새 클라이언트를 생성하여 얻을 수 있습니다 - 프로젝트 (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> 클라이언트 ID와 클라이언트 비밀이 없는 경우 [Intlayer 대시보드 - 프로젝트](https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 보려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

### 2. 애플리케이션에 Intlayer 편집기 제공자 삽입

편집기를 활성화하려면 애플리케이션에 Intlayer 편집기 제공자를 삽입해야 합니다.

React JS 또는 Vite + React 애플리케이션의 예:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* 애플리케이션 */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Next.js 애플리케이션의 예:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* 애플리케이션 */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. 애플리케이션에 스타일시트를 추가

편집기 스타일을 표시하려면 애플리케이션에 스타일시트를 추가해야 합니다.

tailwind를 사용하는 경우 `tailwind.config.js` 파일에 스타일시트를 추가할 수 있습니다:

```js
// tailwind.config.js
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

그렇지 않으면 애플리케이션에 스타일시트를 가져올 수 있습니다:

```tsx
// app.tsx
import "intlayer-editor/css";
```

또는

```css
/* app.css */
@import "intlayer-editor/css";
```

## 편집기 사용

편집기가 설치되고 활성화되며 시작되면 커서를 콘텐츠 위에 올려 놓으면 Intlayer에 의해 인덱싱된 각 필드를 볼 수 있습니다.

![콘텐츠 위에 커서를 올림](https://github.com/aymericzip/intlayer/blob/main/docs/ko/assets/intlayer_editor_hover_content.png)

콘텐츠가 윤곽선으로 표시되면 길게 눌러 편집 서랍을 표시할 수 있습니다.
