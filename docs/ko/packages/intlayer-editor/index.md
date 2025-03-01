# intlayer-editor: Intlayer 시각적 편집기를 사용하기 위한 NPM 패키지

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React 및 Express.js와 같은 프레임워크와 호환됩니다.

**`intlayer-editor`** 패키지는 Intlayer 시각적 편집기를 React 프로젝트에 통합하는 NPM 패키지입니다.

## Intlayer Editor 작동 방식

intlayer 편집기는 Intlayer 원격 사전과 상호작용할 수 있게 합니다. 클라이언트 측에 설치할 수 있으며, 애플리케이션을 CMS와 같은 편집기로 변환하여 구성된 모든 언어로 사이트의 콘텐츠를 관리할 수 있습니다.

![Intlayer Editor 인터페이스](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하십시오:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### 설정

Intlayer 설정 파일에서 편집기 설정을 사용자 정의할 수 있습니다:

```typescript
const config: IntlayerConfig = {
  // ... 다른 설정
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false인 경우, 편집기는 비활성화되며 접근할 수 없습니다.
    // 클라이언트 ID와 클라이언트 비밀 키는 편집기를 활성화하기 위해 필요합니다.
    // 콘텐츠를 편집하는 사용자를 식별할 수 있게 합니다.
    // Intlayer 대시보드 - 프로젝트(https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> 클라이언트 ID와 클라이언트 비밀 키가 없는 경우, [Intlayer 대시보드 - 프로젝트](https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 보려면 [설정 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하십시오.

`intlayer-editor` 패키지는 Intlayer를 기반으로 하며, React(Create React App), Vite + React, Next.js와 같은 JavaScript 애플리케이션에서 사용할 수 있습니다.

패키지 설치 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하십시오:

### Next.js와 통합

Next.js와의 통합에 대해서는 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 참조하십시오.

### Create React App과 통합

Create React App과의 통합에 대해서는 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)를 참조하십시오.

### Vite + React와 통합

Vite + React와의 통합에 대해서는 [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)를 참조하십시오.

### 통합 예제

React 프로젝트에 Intlayer 시각적 편집기를 통합하려면 다음 단계를 따르십시오:

- React 애플리케이션에 Intlayer 편집기 컴포넌트를 가져옵니다:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* 여기에 앱 콘텐츠를 추가하세요 */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Next.js 애플리케이션에 Intlayer 편집기 스타일을 가져옵니다:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## 편집기 사용하기

편집기가 설치되고 활성화되며 시작되면, 커서를 콘텐츠 위로 이동하여 Intlayer에 의해 색인된 각 필드를 볼 수 있습니다.

![콘텐츠 위로 커서 이동](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

콘텐츠가 윤곽선으로 표시된 경우, 길게 눌러 편집 서랍을 표시할 수 있습니다.
