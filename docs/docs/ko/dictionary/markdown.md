---
createdAt: 2025-02-07
updatedAt: 2026-05-19
title: Markdown
description: Intlayer를 사용하여 다국어 웹사이트에서 Markdown 콘텐츠를 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 Markdown을 프로젝트에 원활하게 통합하세요.
keywords:
  - Markdown
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - markdown
history:
  - version: 8.10.0
    date: 2026-05-19
    changes: "`.content.md` 파일 지원 추가"
  - version: 8.5.0
    date: 2026-03-24
    changes: "`intlayerMarkdown` 플러그인 객체 추가; `app.use(installIntlayerMarkdown)` 대신 `app.use(intlayerMarkdown)` 사용"
  - version: 8.5.0
    date: 2026-03-24
    changes: "가져오기를 `{{framework}}-intlayer`에서 `{{framework}}-intlayer/markdown`으로 이동"
  - version: 8.0.0
    date: 2026-01-22
    changes: "MarkdownRenderer / useMarkdownRenderer / renderMarkdown 유틸리티 및 forceInline 옵션 추가"
  - version: 8.0.0
    date: 2026-01-18
    changes: "Markdown 콘텐츠의 자동 장식, MDX 및 SSR 지원"
  - version: 5.5.10
    date: 2025-06-29
    changes: "초기 기록 생성"
---

# Markdown / 서식 있는 텍스트 콘텐츠

Intlayer는 Markdown 구문을 사용하여 정의된 서식 있는 텍스트 콘텐츠를 지원합니다. 이를 통해 블로그, 기사 등과 같이 서식이 풍부한 콘텐츠를 쉽게 작성하고 유지 관리할 수 있습니다.

## Markdown 콘텐츠 선언

`md` 함수를 사용하거나 (Markdown 구문이 포함된 경우) 단순한 문자열로 Markdown 콘텐츠를 선언할 수 있습니다.

<Tabs>
  <Tab label=".content.md" value=".content.md">
    버전 `8.10.0`부터 `.content.md` 파일에서 직접 Markdown 콘텐츠를 선언할 수 있습니다. Intlayer가 Markdown 콘텐츠를 자동으로 감지하고 구문 분석합니다.

    ```md fileName="markdown-file.en.content.md"
    ---
    key: my-markdown-content
    description: 내 콘텐츠
    locale: en
    ---

    # 내 콘텐츠

    여기에 마크다운 콘텐츠 예시가 있습니다.
    ```

    `locale` 프런트매터 필드는 콘텐츠의 로캘을 정의하는 필드입니다. 선택 사항입니다. 제공되지 않으면 Intlayer는 기본 로캘을 사용하며, 특정 로캘에 대한 번역이 없을 때 대체 로캘로도 사용됩니다.

    파일 구조 예시:

    ```text
    content/
    ├── en/
    │   └── markdown-file.en.content.md
    ├── fr/
    │   └── markdown-file.fr.content.md
    └── es/
        └── markdown-file.es.content.md
    ```

    [사전 정의](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/dictionary/content_file.md)에 정의된 속성을 프런트매터에 추가할 수 있습니다.

  </Tab>
  <Tab label="수동 래핑" value="manual-wrapping">
    `md` 함수를 사용하여 Markdown 콘텐츠를 명시적으로 선언하세요. 이는 명백한 구문이 포함되어 있지 않더라도 문자열이 Markdown으로 처리되도록 하려는 경우에 유용합니다.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## 내 제목 \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="외부 파일" value="external-files">
    `file` 함수를 사용하여 `.md` 파일을 직접 가져옵니다.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, file, t } from "intlayer";

    export default {
      key: "app",
      content: {
        content: t({
          en: md(file("./myMarkdown.en.md")),
          ko: md(file("./myMarkdown.ko.md")),
        }),
      },
    };
    ```

  </Tab>

  <Tab label="자동 감지" value="automatic-detection">
    문자열에 일반적인 Markdown 표시기(예: 제목, 목록, 링크 등)가 포함된 경우 Intlayer가 자동으로 이를 변환합니다.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // Markdown 콘텐츠의 자동 감지 활성화 - intlayer.config.ts에서 전역으로 설정할 수 있습니다
      content: {
        myMarkdownContent: "## 내 제목 \n\nLorem Ipsum",
      },
    };
    ```

  </Tab>
</Tabs>

## Markdown 렌더링

Intlayer는 Markdown을 렌더링하는 두 가지 독립적인 방법을 제공합니다:

1. **`useIntlayer`를 통한 방식**
   — Intlayer는 프레임워크의 네이티브 출력(JSX, VNode, HTML 문자열)으로 `md` 노드를 자동으로 변환합니다.
   - 프런트매터는 분석되어 `.metadata`로 노출됩니다. 렌더링은 두 가지 수준에서 재정의할 수 있습니다. `MarkdownProvider`(또는 프레임워크 동등 기능)를 통한 전역 설정과 `.use()`를 통한 노드별 로컬 설정입니다. 두 가지를 결합할 수 있으며, `.use()`가 `MarkdownProvider`보다 우선하고, `MarkdownProvider`가 기본값보다 우선합니다.

2. **도우미 유틸리티** — `<MarkdownRenderer />`, `useMarkdownRenderer()`, 및 `renderMarkdown()`은 **순수 Markdown 문자열만** 허용하는 독립 실행형 도구입니다. 이들은 `useIntlayer`와 독립적이며 반환되는 장식된 노드와 작동하지 않습니다.

Markdown 렌더링은 **MDX**를 지원합니다 — Markdown 내에서 이름으로 직접 JSX/프레임워크 컴포넌트를 사용할 수 있습니다.

### 1. 자동 렌더링 (`useIntlayer`를 통한 방식)

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    Markdown 노드는 JSX로 직접 렌더링할 수 있습니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";
    import { MarkdownProvider } from "react-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");

      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX 컴포넌트
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider`가 없는 경우 Intlayer는 기본 Markdown to JSX 파서를 사용하여 마크다운을 렌더링합니다.

    `.use()` 메서드를 사용하여 특정 노드에 대한 로컬 재정의를 제공할 수도 있습니다:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    문자열로 Markdown을 가져올 수 있습니다:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    그리고 다음과 같이 마크다운 메타데이터에 접근할 수 있습니다:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vue에서 Markdown 콘텐츠는 내장 `component`를 사용하거나 노드로서 직접 렌더링될 수 있습니다.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

    `intlayerMarkdown` 플러그인을 통해 전역으로 구성합니다(MDX 사용자 지정 컴포넌트 지원):

    ```ts fileName="main.ts"
    import { intlayerMarkdown } from "vue-intlayer/markdown";

    app.use(intlayerMarkdown, {
      components: {
        h1: (props) => h('h1', { style: { color: 'green' } }, props.children),
        MyButton: (props) => h('button', props), // MDX 컴포넌트
      },
    });
    ```

    > `intlayerMarkdown` 플러그인이 설치되지 않은 경우 Intlayer는 기본 컴파일러를 사용하여 렌더링합니다.

    `.use()` 메서드를 사용하여 특정 노드에 대한 로컬 재정의를 제공할 수도 있습니다:

    ```vue
    <component :is="myMarkdownContent.use({
      h1: (props) => h('h1', { style: { color: 'red' } }, props.children),
    })" />
    ```

    문자열로 Markdown을 가져올 수 있습니다:

    ```vue
    {{ myMarkdownContent.value }}
    {{ String(myMarkdownContent) }}
    {{ myMarkdownContent.toString() }}
    ```

    그리고 다음과 같이 마크다운 메타데이터에 접근할 수 있습니다:

    ```vue
    <component :is="myMarkdownContent.metadata" />
    <component :is="myMarkdownContent.metadata.title" />
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte는 기본적으로 Markdown을 HTML 문자열로 렌더링합니다. 이를 렌더링하려면 `{@html}`을 사용하세요.

    ```svelte fileName="App.svelte"
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    import { MarkdownProvider } from "svelte-intlayer/markdown";
    import MyHeading from "./MyHeading.svelte";

    const content = useIntlayer("app");
    </script>

    <MarkdownProvider components={{ h1: MyHeading }}>
      {@html $content.myMarkdownContent}
    </MarkdownProvider>
    ```

    > `MarkdownProvider`가 없는 경우 Intlayer는 기본 컴파일러를 사용하여 마크다운을 렌더링합니다.

    `.use()` 메서드를 사용하여 특정 노드에 대한 로컬 재정의를 제공할 수도 있습니다:

    ```svelte
    {@html $content.myMarkdownContent.use({ ... })}
    ```

    문자열로 Markdown을 가져올 수 있습니다:

    ```svelte
    {$content.myMarkdownContent.value}
    {String($content.myMarkdownContent)}
    {$content.myMarkdownContent.toString()}
    ```

    그리고 다음과 같이 마크다운 메타데이터에 접근할 수 있습니다:

    ```svelte
    {$content.myMarkdownContent.metadata}
    {$content.myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact는 JSX에서 Markdown 노드를 직접 지원합니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";
    import { MarkdownProvider } from "preact-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX 컴포넌트
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider`가 없는 경우 Intlayer는 기본 Markdown to JSX 파서를 사용하여 마크다운을 렌더링합니다.

    `.use()` 메서드를 사용하여 특정 노드에 대한 로컬 재정의를 제공할 수도 있습니다:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
    })}
    ```

    문자열로 Markdown을 가져올 수 있습니다:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    그리고 다음과 같이 마크다운 메타데이터에 접근할 수 있습니다:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid는 JSX에서 Markdown 노드를 직접 지원합니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";
    import { MarkdownProvider } from "solid-intlayer/markdown";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };

    const App = () => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
          MyButton: (props) => <button {...props} />, // MDX 컴포넌트
        }}
      >
        <AppContent />
      </MarkdownProvider>
    );
    ```

    > `MarkdownProvider`가 없는 경우 Intlayer는 기본 Markdown to JSX 파서를 사용하여 마크다운을 렌더링합니다.

    `.use()` 메서드를 사용하여 특정 노드에 대한 로컬 재정의를 제공할 수도 있습니다:

    ```tsx
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }}>{props.children}</h1>,
    })}
    ```

    문자열로 Markdown을 가져올 수 있습니다:

    ```tsx
    {myMarkdownContent.value}
    {String(myMarkdownContent)}
    {myMarkdownContent.toString()}
    ```

    그리고 다음과 같이 마크다운 메타데이터에 접근할 수 있습니다:

    ```tsx
    {myMarkdownContent.metadata}
    {myMarkdownContent.metadata.title}
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular는 `[innerHTML]` 지시문을 사용하여 Markdown 콘텐츠를 렌더링합니다.

    ```typescript fileName="app.component.ts"
    import { Component } from "@angular/core";
    import { useIntlayer } from "angular-intlayer";

    @Component({
      selector: "app-root",
      template: `<div [innerHTML]="content().myMarkdownContent"></div>`,
    })
    export class AppComponent {
      content = useIntlayer("app");
    }
    ```

    > IntlayerMarkdown 공급자가 구성되지 않은 경우 Intlayer는 기본 컴파일러를 사용하여 렌더링합니다.

    `.use()` 메서드를 사용하여 특정 노드에 대한 로컬 재정의를 제공할 수도 있습니다:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

    문자열로 Markdown을 가져올 수 있습니다:

    ```typescript
    content().myMarkdownContent.value
    String(content().myMarkdownContent)
    content().myMarkdownContent.toString()
    ```

    그리고 다음과 같이 마크다운 메타데이터에 접근할 수 있습니다:

    ```typescript
    content().myMarkdownContent.metadata
    content().myMarkdownContent.metadata.title
    ```

  </Tab>
</Tabs>

### 2. 도우미 유틸리티 (Markdown 문자열 전용)

이러한 유틸리티는 **순수 Markdown 문자열만** 렌더링하며 `useIntlayer`와 독립적입니다. 사전 외의 출처에서 Markdown을 렌더링해야 할 때 사용하세요.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` 컴포넌트

    특정 옵션으로 Markdown 문자열을 렌더링합니다.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer/markdown";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# 내 제목"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 훅

    사전 구성된 렌더러 함수를 가져옵니다.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer/markdown";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# 내 제목");
    ```

    #### `renderMarkdown()` 유틸리티
    컴포넌트 외부 렌더링용 독립 실행형 유틸리티.

    ```tsx
    import { renderMarkdown } from "react-intlayer/markdown";

    const jsx = renderMarkdown("# 내 제목", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` 컴포넌트

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer/markdown";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# 내 제목" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### `<MarkdownRenderer />` 컴포넌트

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer/markdown";
    </script>

    <MarkdownRenderer forceBlock={true} value="# 내 제목" />
    ```

    #### `useMarkdownRenderer()` 훅

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer/markdown";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# 내 제목")}
    ```

    #### `renderMarkdown()` 유틸리티

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer/markdown";
    </script>

    {@html renderMarkdown("# 내 제목")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` 컴포넌트

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# 내 제목"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 훅

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# 내 제목")}</div>;
    ```

    #### `renderMarkdown()` 유틸리티

    ```tsx
    import { renderMarkdown } from "preact-intlayer/markdown";

    return <div>{renderMarkdown("# 내 제목")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` 컴포넌트

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer/markdown";

    <MarkdownRenderer forceBlock={true}>
      {"# 내 제목"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 훅

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer/markdown";

    const render = useMarkdownRenderer();

    return <div>{render("# 내 제목")}</div>;
    ```

    #### `renderMarkdown()` 유틸리티

    ```tsx
    import { renderMarkdown } from "solid-intlayer/markdown";

    return <div>{renderMarkdown("# 내 제목")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` 서비스
    서비스를 사용하여 Markdown 문자열을 렌더링합니다.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer/markdown";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

## `MarkdownProvider`를 통한 전역 구성

`MarkdownProvider`(또는 해당 프레임워크 기능)는 전체 애플리케이션의 Markdown 렌더링 파이프라인을 구성합니다. 이는 자동 `useIntlayer` 렌더링과 도우미 유틸리티 모두에 적용됩니다. 여기서 설정된 옵션이 기본값이며, `.use()`는 노드 수준에서 이를 덮어씁니다.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 style={{color: 'green'}} {...props} />,
          a: ({ href, ...props }) => <a style={{color: 'red'}} {...props} />,
          MyCustomJSXComponent: (props) => <span style={{color: 'red'}} {...props} />,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > MDX 지원 — Markdown 내부에서 사용된 모든 컴포넌트 이름(예: `<MyCustomJSXComponent />`)은 `components` 맵에서 확인됩니다.

    자체 마크다운 렌더러를 사용할 수도 있습니다:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          // Use dynamic import to reduce the bundle size of your application
          const { renderMarkdown } = await import('react-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Markdown 렌더러를 동적으로 가져오는 것은 애플리케이션 번들 크기를 줄이는 좋은 방법입니다.

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      components: {
        h1: (props) =>
        h('h1', { style: { color: 'orange' }, ...props }, props.children),
        ComponentDemo: () => h('div', { style: { background: 'grey' } }, 'DEMO'),
        bold: (props) => h('strong', props),
        code: (props) => h('code', props),
      },
    });

    app.mount("#app");
    ```

    자체 마크다운 렌더러를 사용할 수도 있습니다:

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { intlayer } from "vue-intlayer";
    import { intlayerMarkdown } from "vue-intlayer/markdown";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(intlayer);
    app.use(intlayerMarkdown, {
      renderMarkdown: async (md) => {
        const { renderMarkdown } = await import('vue-intlayer/markdown');
        return renderMarkdown(md);
      },
    });

    app.mount("#app");
    ```

    > Markdown 렌더러를 동적으로 가져오는 것은 애플리케이션 번들 크기를 줄이는 좋은 방법입니다.

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    자체 마크다운 렌더러를 사용할 수도 있습니다:

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer/markdown";
    </script>

    <MarkdownProvider
      renderMarkdown={async (md) => {
        const { renderMarkdown } = await import('svelte-intlayer/markdown');
        return renderMarkdown(md);
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

    > Markdown 렌더러를 동적으로 가져오는 것은 애플리케이션 번들 크기를 줄이는 좋은 방법입니다.

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    자체 마크다운 렌더러를 사용할 수도 있습니다:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer/markdown";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('preact-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

    > Markdown 렌더러를 동적으로 가져오는 것은 애플리케이션 번들 크기를 줄이는 좋은 방법입니다.

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    자체 마크다운 렌더러를 사용할 수도 있습니다:

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer/markdown";

    export const AppProvider = (props) => (
      <MarkdownProvider
        renderMarkdown={async (md) => {
          const { renderMarkdown } = await import('solid-intlayer/markdown');
          return renderMarkdown(md);
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

    > Markdown 렌더러를 동적으로 가져오는 것은 애플리케이션 번들 크기를 줄이는 좋은 방법입니다.

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.module.ts"
    import { NgModule } from '@angular/core';
    import { IntlayerMarkdownModule } from 'angular-intlayer/markdown';

    @NgModule({
      imports: [
        IntlayerMarkdownModule.forRoot({
          renderMarkdown: async (md) => {
            const { renderMarkdown } = await import('angular-intlayer/markdown');
            return renderMarkdown(md);
          }
        })
      ]
    })
    export class AppModule {}
    ```

    > Markdown 렌더러를 동적으로 가져오는 것은 애플리케이션 번들 크기를 줄이는 좋은 방법입니다.

  </Tab>
</Tabs>

## 서스펜스 (Suspense)

Intlayer Markdown 렌더러는 동적으로 로드됩니다. 최적화되어 있지만 기본 구문 분석기 청크는 약 55kb입니다. 이를 동기적으로 로드하면 초기 페이지 렌더링이 지연되고 FCP(First Contentful Paint)가 저하됩니다.

UI 차단을 방지하기 위해 Intlayer는 React의 Suspense API와 통합됩니다. 백그라운드에서 구문 분석기를 가져오고 다운로드하는 동안 Promise를 던집니다.

Intlayer Markdown을 렌더링하는 구성 요소를 `<Suspense>` 경계로 래핑하십시오. 이렇게 하면 청크가 다운로드되는 동안 현지화된 대체 상태가 표시되어 나머지 DOM이 즉시 렌더링될 수 있습니다.

경고: `<Suspense>` 경계를 제공하지 않으면 React는 55kb 청크가 완전히 로드될 때까지 루트 수준에서 일시 중지하거나 전체 구성 요소 트리의 렌더링을 차단합니다.

<Tabs>
  <Tab label="Next.js" value="nextjs">

Next.js 앱 라우터에서는 클라이언트 구성 요소에 대해 React `Suspense`를 사용하거나 서버 구성 요소에 대해 `loading.tsx` 파일을 사용할 수 있습니다.

**클라이언트 컴포넌트:**

```tsx fileName="components/MyComponent.tsx"
"use client";
import { useIntlayer } from "next-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

**`loading.tsx`가 있는 서버 컴포넌트:**

```tsx fileName="app/loading.tsx"
export default function Loading() {
  return <div>Loading...</div>;
}
```

```tsx fileName="app/page.tsx"
import { useIntlayer } from "next-intlayer/server";

const MyPage = () => {
  const markdownContent = useIntlayer("my-markdown");
  return <div>{markdownContent}</div>;
};

export default MyPage;
```

  </Tab>

  <Tab label="React" value="react">

```tsx
import { useIntlayer } from "react-intlayer";
import { Suspense } from "react";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
 
  <Tab label="Vue" value="vue">

Vue에는 내장 `<Suspense>` 구성 요소가 있습니다. Markdown 콘텐츠를 렌더링하는 구성 요소를 `<Suspense>` 경계로 래핑하십시오.

```vue fileName="MyComponent.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { markdownContent } = useIntlayer("my-markdown");
</script>

<template>
  <Suspense>
    <component :is="markdownContent" />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

Svelte에는 Suspense API에 해당하는 기능이 없습니다. Markdown 콘텐츠의 비동기 렌더링을 처리하려면 `{#await}` 블록을 사용하십시오.

```svelte fileName="MyComponent.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("my-markdown");
</script>

{#await $content.markdownContent}
  <div>Loading...</div>
{:then rendered}
  {@html rendered}
{/await}
```

  </Tab>
  <Tab label="Preact" value="preact">

Preact는 `preact/compat`를 통해 React의 Suspense API를 지원합니다.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "preact-intlayer";
import { Suspense } from "preact/compat";

const MyComponent = () => {
  const markdownContent = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Solid" value="solid">

Solid는 `solid-js`의 자체 `<Suspense>` 구성 요소를 가지고 있습니다.

```tsx fileName="MyComponent.tsx"
import { useIntlayer } from "solid-intlayer";
import { Suspense } from "solid-js";

const MyComponent = () => {
  const { markdownContent } = useIntlayer("my-markdown");

  return (
    <Suspense fallback={<div>Loading...</div>}>{markdownContent}</Suspense>
  );
};
```

  </Tab>
  <Tab label="Angular" value="angular">

Angular에는 Suspense API가 없습니다. 지연 로드된 Markdown 콘텐츠를 처리하려면 Angular의 지연된 보기(`@defer`)를 사용하십시오(Angular 17+ 필요).

```typescript fileName="my.component.ts"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my",
  template: `
    @defer {
      <div [innerHTML]="content().markdownContent"></div>
    } @loading {
      <div>Loading...</div>
    }
  `,
})
export class MyComponent {
  content = useIntlayer("my-markdown");
}
```

  </Tab>
</Tabs>

---

## 옵션 참조

이러한 옵션은 `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer` 및 `renderMarkdown`에 전달될 수 있습니다.

| Option                | Type        | Default | 설명                                                                              |
| :-------------------- | :---------- | :------ | :-------------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | 출력을 블록 수준 요소(예: `<div>`)로 래핑하도록 강제합니다.                       |
| `forceInline`         | `boolean`   | `false` | 출력을 인라인 요소(예: `<span>`)로 래핑하도록 강제합니다.                         |
| `tagfilter`           | `boolean`   | `true`  | 위험한 HTML 태그를 제거하여 보안을 강화하기 위해 GitHub 태그 필터를 활성화합니다. |
| `preserveFrontmatter` | `boolean`   | `false` | `true`인 경우 Markdown 문자열의 시작 부분에 있는 프런트매터가 제거되지 않습니다.  |
| `components`          | `Overrides` | `{}`    | HTML 태그를 사용자 정의 구성 요소에 매핑(예: `{ h1: MyHeading }`).                |
| `wrapper`             | `Component` | `null`  | 렌더링된 Markdown을 래핑하는 사용자 정의 구성 요소입니다.                         |
| `renderMarkdown`      | `Function`  | `null`  | 기본 Markdown 컴파일러를 완전히 교체하는 사용자 정의 렌더링 기능입니다.           |
