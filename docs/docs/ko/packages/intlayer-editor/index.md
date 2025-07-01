---
docName: package__intlayer-editor
url: https://intlayer.org/doc/package/intlayer-editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/packages/intlayer-editor/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - 시각적 번역 편집기 패키지
description: Intlayer를 위한 시각적 편집기 패키지로, 번역 관리와 AI 지원 협업 콘텐츠 편집을 위한 직관적인 인터페이스를 제공합니다.
keywords:
  - intlayer
  - 편집기
  - 시각적
  - 번역
  - 협업
  - AI
  - NPM
  - 인터페이스
---

# intlayer-editor: Intlayer 시각적 편집기를 사용하기 위한 NPM 패키지

**Intlayer**는 자바스크립트 개발자를 위해 특별히 설계된 패키지 모음입니다. React, React Native, Express.js와 같은 프레임워크와 호환됩니다.

**`intlayer-editor`** 패키지는 Intlayer 시각적 편집기를 React 프로젝트에 통합하는 NPM 패키지입니다.

## Intlayer 편집기 작동 방식

Intlayer 편집기는 Intlayer 원격 사전과 상호작용할 수 있게 해줍니다. 클라이언트 측에 설치할 수 있으며, 애플리케이션을 CMS와 유사한 편집기로 변환하여 구성된 모든 언어의 사이트 콘텐츠를 관리할 수 있습니다.

![Intlayer 편집기 인터페이스](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## 설치

선호하는 패키지 관리자를 사용하여 필요한 패키지를 설치하세요:

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

Intlayer 구성 파일에서 편집기 설정을 사용자 정의할 수 있습니다:

```typescript
const config: IntlayerConfig = {
  // ... 기타 구성 설정
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // false인 경우, 편집기가 비활성화되어 접근할 수 없습니다.
    // 편집기를 활성화하려면 클라이언트 ID와 클라이언트 시크릿이 필요합니다.
    // 이는 콘텐츠를 편집하는 사용자를 식별하는 데 사용됩니다.
    // Intlayer 대시보드 - 프로젝트(https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> 클라이언트 ID와 클라이언트 시크릿이 없는 경우, [Intlayer 대시보드 - 프로젝트](https://intlayer.org/dashboard/projects)에서 새 클라이언트를 생성하여 얻을 수 있습니다.

> 사용 가능한 모든 매개변수를 확인하려면 [구성 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/configuration.md)를 참조하세요.

`intlayer-editor` 패키지는 Intlayer를 기반으로 하며 React(Create React App), Vite + React, Next.js와 같은 JavaScript 애플리케이션에서 사용할 수 있습니다.

패키지 설치 방법에 대한 자세한 내용은 아래 관련 섹션을 참조하세요:

### Next.js와 통합하기

Next.js와의 통합에 대해서는 [설정 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_nextjs_15.md)를 참조하세요.

### Create React App과 통합하기

Create React App과 통합하려면, [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_create_react_app.md)를 참조하세요.

### Vite + React와 통합하기

Vite + React와 통합하려면, [설치 가이드](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+react.md)를 참조하세요.

### 통합 예제

Intlayer 시각 편집기를 React 프로젝트에 통합하려면 다음 단계를 따르세요:

- React 애플리케이션에 Intlayer 편집기 컴포넌트를 가져옵니다:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* 여기에 앱 콘텐츠를 작성하세요 */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Next.js 애플리케이션에 Intlayer 에디터 스타일을 임포트하세요:

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

에디터가 설치되고 활성화되어 시작되면, 커서를 콘텐츠 위에 올려놓아 Intlayer에 의해 인덱싱된 각 필드를 확인할 수 있습니다.

![콘텐츠 위에 커서 올리기](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

콘텐츠가 윤곽선으로 표시되면, 길게 눌러 편집 서랍을 표시할 수 있습니다.

## 문서 이력

- 5.5.10 - 2025-06-29: 초기 이력
