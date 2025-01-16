# intlayer-editor: NPM 패키지로 Intlayer 비주얼 에디터 사용하기

**Intlayer**는 JavaScript 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React 및 Express.js와 같은 프레임워크와 호환됩니다.

**`intlayer-editor`** 패키지는 Intlayer 비주얼 에디터를 React 프로젝트에 통합하는 NPM 패키지입니다.

## Intlayer 에디터 사용 방법

Intlayer 에디터는 Intlayer 원격 사전과 상호작용할 수 있게 해줍니다. 클라이언트 측에 설치할 수 있으며, 귀하의 애플리케이션을 CMS와 유사한 에디터로 변환하여 모든 구성된 언어로 사이트의 콘텐츠를 관리할 수 있습니다.

![Intlayer 에디터 인터페이스](https://github.com/aymericzip/intlayer/blob/main/docs/ko/assets/intlayer_editor_ui.png)

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치합니다:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### 구성

Intlayer 구성 파일에서 에디터 설정을 사용자 정의할 수 있습니다:

```typescript
const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false인 경우, 에디터는 비활성화되며 접근할 수 없습니다.
    // 클라이언트 ID와 클라이언트 비밀번호는 에디터를 활성화하는 데 필요합니다.
    // 이들은 콘텐츠를 편집하는 사용자를 식별할 수 있게 해줍니다.
    // Intlayer 대시보드 - 프로젝트에서 새로운 클라이언트를 생성하여 얻을 수 있습니다. (https://intlayer.org/dashboard/projects)
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> 클라이언트 ID와 클라이언트 비밀번호가 없다면, [Intlayer 대시보드 - 프로젝트](https://intlayer.org/dashboard/projects)에서 새로운 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 보려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/configuration.md)를 참조하세요.

`intlayer-editor` 패키지는 Intlayer를 기반으로 하며, React (Create React App), Vite + React, Next.js와 같은 JavaScript 애플리케이션에서 사용할 수 있습니다.

패키지를 설치하는 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하세요:

### Next.js 통합

Next.js와의 통합에 대해서는 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_nextjs_15.md)를 참조하세요.

### Create React App 통합

Create React App과의 통합에 대해서는 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_create_react_app.md)를 참조하세요.

### Vite + React 통합

Vite + React와의 통합에 대해서는 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_with_vite+react.md)를 참조하세요.

### 통합 예제

Intlayer 비주얼 에디터를 React 프로젝트에 통합하려면 다음 단계를 따르세요:

- Intlayer 에디터 컴포넌트를 React 애플리케이션에 가져옵니다:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* 여기에서 앱 콘텐츠 */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Next.js 애플리케이션에 Intlayer 에디터 스타일을 가져옵니다:

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

## 에디터 사용하기

에디터가 설치되고 활성화되며 시작되면, 커서를 사용하여 콘텐츠 위로 마우스를 가져가면 Intlayer에 의해 색인이 생성된 각 필드를 볼 수 있습니다.

![콘텐츠 위로 마우스 가져가기](https://github.com/aymericzip/intlayer/blob/main/docs/ko/assets/intlayer_editor_hover_content.png)

콘텐츠가 강조 표시되면, 길게 눌러 편집 서랍이 표시됩니다.
