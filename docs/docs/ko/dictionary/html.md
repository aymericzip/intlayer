---
createdAt: 2026-01-20
updatedAt: 2026-01-22
title: HTML 콘텐츠
description: Intlayer에서 커스텀 컴포넌트를 사용하여 HTML 콘텐츠를 선언하고 사용하는 방법을 알아보세요. 이 문서를 따라 국제화된 프로젝트에서 동적인 컴포넌트 교체와 함께 풍부한 HTML 유사 콘텐츠를 임베드하세요.
keywords:
  - HTML
  - 커스텀 컴포넌트
  - 리치 콘텐츠
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - concept
  - content
  - html
history:
  - version: 8.0.0
    date: 2026-01-22
    changes: HTMLRenderer / useHTMLRenderer / renderHTML 유틸리티 추가
  - version: 8.0.0
    date: 2026-01-20
    changes: HTML 파싱 지원 추가
---

# HTML 콘텐츠 / Intlayer의 HTML

Intlayer는 HTML 콘텐츠를 지원하여 사전(dictionary) 내에 풍부하고 구조화된 콘텐츠를 포함할 수 있습니다. 이 콘텐츠는 표준 HTML 태그로 렌더링되거나 런타임에 커스텀 컴포넌트로 교체될 수 있습니다.

## HTML 작동 방식

Intlayer v8는 콘텐츠 문자열에서 HTML 태그를 지능적으로 감지합니다. 문자열이 HTML(태그를 포함하는 것으로)로 식별되면 자동으로 HTML 노드로 변환됩니다.

<Columns>
<Column title="v7 동작(수동 래핑)">

```typescript fileName="htmlDictionary.content.ts"
import { html } from "intlayer";

export default {
  key: "app",
  content: {
    text: html("<p>Hello <strong>World</strong></p>"),
  },
};
```

</Column>
<Column title="v8 동작(자동 감지)">

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    text: "<p>Hello <strong>World</strong></p>",
  },
};
```

</Column>
</Columns>

---

## HTML 콘텐츠 선언

HTML 콘텐츠는 `html` 함수를 사용하거나 단순 문자열로 선언할 수 있습니다.

<Tabs>
  <Tab label="수동 래핑">
    HTML 콘텐츠를 명시적으로 선언하려면 `html` 함수를 사용하세요. 자동 감지가 비활성화된 경우에도 표준 태그가 올바르게 매핑되도록 보장합니다.

    ```typescript fileName="htmlDictionary.content.ts"
    import { html, type Dictionary } from "intlayer";

    const htmlDictionary = {
      key: "app",
      content: {
        myHtmlContent: html("<p>Hello <strong>World</strong></p>"),
      },
    } satisfies Dictionary;

    export default htmlDictionary;
    ```

  </Tab>
  <Tab label="자동 감지">
문자열에 일반적인 HTML 태그(예: `<p>`, `<div>`, `<strong>` 등)가 포함되어 있으면 Intlayer가 자동으로 변환합니다.

```typescript fileName="htmlDictionary.content.ts"
export default {
  key: "app",
  content: {
    myHtmlContent: "<p>Hello <strong>World</strong></p>",
  },
};
```

</Tab>
<Tab label="외부 파일">
파일에서 HTML 콘텐츠를 가져옵니다. 현재 `file()` 함수는 문자열을 반환하며, 해당 문자열에 태그가 포함된 경우 HTML로 자동 감지됩니다.

````typescript fileName="htmlDictionary.content.ts"
import { html, file, t } from "intlayer";

export default {
  key: "app",
  content: {
    content: t({
      ko: html(file("./content.ko.html")),
      en: html(file("./content.en.html")),
      fr: html(file("./content.fr.html")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## HTML 렌더링

렌더링은 Intlayer의 콘텐츠 시스템을 통해 자동으로 처리하거나, 전문 도구를 사용해 수동으로 처리할 수 있습니다.

### 자동 렌더링 (`useIntlayer` 사용)

`useIntlayer`로 콘텐츠에 접근하면 HTML 노드는 이미 렌더링 준비가 되어 있습니다.

<Tabs group="framework">
  <Tab label="React / Next.js">
    HTML 노드는 JSX로 직접 렌더링할 수 있습니다. 표준 태그는 자동으로 작동합니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

    `.use()` 메서드를 사용하여 커스텀 컴포넌트를 제공하거나 태그를 오버라이드할 수 있습니다:

    ```tsx
    {myHtmlContent.use({
      p: (props) => <p className="prose" {...props} />,
      CustomLink: ({ children }) => <a href="/details">{children}</a>,
    })}
    ```

  </Tab>
  <Tab label="Vue">
    Vue에서는 HTML 콘텐츠를 내장된 `component`를 사용하여 렌더링할 수 있습니다.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myHtmlContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myHtmlContent" />
    </template>
    ```

    오버라이드를 적용하려면 `.use()`를 사용하세요:
    ```vue
    <component :is="myHtmlContent.use({ h1: 'h2' })" />
    ```

  </Tab>
  <Tab label="Svelte">
    Svelte는 HTML 노드를 문자열로 렌더링합니다. 이를 렌더링하려면 `{@html}`을 사용하세요.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myHtmlContent}
    ```

  </Tab>
  <Tab label="Preact">
    Preact는 JSX에서 HTML 노드를 직접 지원합니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myHtmlContent } = useIntlayer("app");
      return <div>{myHtmlContent}</div>;
    };
    ```

  </Tab>
</Tabs>

## `HTMLProvider`를 사용한 전역 구성

애플리케이션 전체에 대해 HTML 렌더링을 전역으로 구성할 수 있습니다. 이는 모든 HTML 콘텐츠에서 사용 가능해야 하는 커스텀 컴포넌트를 정의할 때 이상적입니다.

<Tabs group="framework">
  <Tab label="React / Next.js">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
          CustomLink: ({ children }) => <a href="/details">{children}</a>,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
  <Tab label="Vue">

    ```typescript fileName="main.ts"
    import { createApp, h } from "vue";
    import { installIntlayer, installIntlayerHTML } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerHTML, {
      components: {
        p: (props, { slots }) => h("p", { class: "prose", ...props }, slots.default?.()),
        CustomLink: (props, { slots }) => h("a", { href: "/details", ...props }, slots.default?.()),
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { HTMLProvider } from "svelte-intlayer";
      import MyCustomP from "./MyCustomP.svelte";
    </script>

    <HTMLProvider
      components={{
        p: MyCustomP,
      }}
    >
      <slot />
    </HTMLProvider>
    ```

  </Tab>
  <Tab label="Preact">

    ```tsx fileName="AppProvider.tsx"
    import { HTMLProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <HTMLProvider
        components={{
          p: (props) => <p className="prose" {...props} />,
        }}
      >
        {children}
      </HTMLProvider>
    );
    ```

  </Tab>
</Tabs>

---

### 수동 렌더링 및 고급 도구

원시 HTML 문자열을 렌더링하거나 컴포넌트 매핑을 더 세밀하게 제어해야 하는 경우, 다음 도구들을 사용하세요.

<Tabs group="framework">
  <Tab label="React / Next.js">
    #### `<HTMLRenderer />` 컴포넌트
    특정 컴포넌트로 HTML 문자열을 렌더링합니다.

    ```tsx
    import { HTMLRenderer } from "react-intlayer";

    <HTMLRenderer components={{ p: MyCustomP }}>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

    #### `useHTMLRenderer()` 훅

    미리 구성된 렌더러 함수를 얻습니다.

    ```tsx
    import { useHTMLRenderer } from "react-intlayer";

    const renderHTML = useHTMLRenderer({
      components: { strong: (props) => <strong {...props} className="text-red-500" /> }
    });

    return renderHTML("<p>Hello <strong>World</strong></p>");
    ```

    #### `renderHTML()` 유틸리티

    컴포넌트 외부에서 렌더링할 때 사용하는 독립 유틸리티입니다.

    ```tsx
    import { renderHTML } from "react-intlayer";

    const jsx = renderHTML("<p>Hello</p>", { components: { p: 'div' } });
    ```

  </Tab>
  <Tab label="Vue">

    #### `<HTMLRenderer />` 컴포넌트

    ```vue
    <script setup>
    import { HTMLRenderer } from "vue-intlayer";
    </script>

    <template>
      <HTMLRenderer content="<p>Hello World</p>" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte">

    #### `<HTMLRenderer />` 컴포넌트

    ```svelte
    <script lang="ts">
    import { HTMLRenderer } from "svelte-intlayer";
    </script>

    <HTMLRenderer value="<p>Hello World</p>" />
    ```

  </Tab>
  <Tab label="Preact">

    #### `<HTMLRenderer />` 컴포넌트

    ```tsx
    import { HTMLRenderer } from "preact-intlayer";

    <HTMLRenderer>
      {"<p>Hello World</p>"}
    </HTMLRenderer>
    ```

  </Tab>
</Tabs>

---

## 옵션 참조

이 옵션들은 `HTMLProvider`, `HTMLRenderer`, `useHTMLRenderer`, 및 `renderHTML`에 전달할 수 있습니다.

| 옵션         | 타입                  | 기본값   | 설명                                                                                                        |
| :----------- | :-------------------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `components` | `Record<string, any>` | `{}`    | HTML 태그 또는 커스텀 컴포넌트 이름을 컴포넌트에 매핑한 맵.                                                |
| `renderHTML` | `Function`            | `null`  | 기본 HTML 파서를 완전히 대체하는 커스텀 렌더링 함수 (Vue/Svelte 프로바이더에만 해당). |

> 참고: React 및 Preact의 경우 표준 HTML 태그가 자동으로 제공됩니다. 태그를 재정의하거나 커스텀 컴포넌트를 추가하려는 경우에만 `components` prop을 전달하면 됩니다.
````
