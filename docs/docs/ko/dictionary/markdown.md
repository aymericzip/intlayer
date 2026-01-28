---
createdAt: 2025-02-07
updatedAt: 2026-01-22
title: Markdown
description: Intlayer를 사용하여 다국어 웹사이트에서 Markdown 콘텐츠를 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 프로젝트에 Markdown을 손쉽게 통합하세요.
keywords:
  - Markdown
  - 국제화
  - 문서
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
  - version: 8.0.0
    date: 2026-01-22
    changes: MarkdownRenderer / useMarkdownRenderer / renderMarkdown 유틸리티 및 forceInline 옵션 추가
  - version: 8.0.0
    date: 2026-01-18
    changes: 마크다운 콘텐츠의 자동 장식, MDX 및 SSR 지원
  - version: 5.5.10
    date: 2025-06-29
    changes: 히스토리 초기화
---

# 마크다운 / 리치 텍스트 콘텐츠

Intlayer는 마크다운 문법을 사용하여 정의된 리치 텍스트 콘텐츠를 지원합니다. 이를 통해 블로그, 기사 등과 같은 리치 포맷의 콘텐츠를 쉽게 작성하고 관리할 수 있습니다.

## 파트 1: 마크다운 콘텐츠 선언

마크다운 콘텐츠는 `md` 함수를 사용하거나 (마크다운 문법을 포함하는 경우) 단순히 문자열로 선언할 수 있습니다.

<Tabs>
  <Tab label="수동 래핑" value="manual-wrapping">
    마크다운 콘텐츠를 명시적으로 선언하려면 `md` 함수를 사용하세요. 명백한 문법이 포함되어 있지 않더라도 문자열이 마크다운으로 처리되도록 보장하고 싶을 때 유용합니다.

    ```typescript fileName="markdownDictionary.content.ts"
    import { md, type Dictionary } from "intlayer";

    const markdownDictionary = {
      key: "app",
      content: {
        myMarkdownContent: md("## My title \n\nLorem Ipsum"),
      },
    } satisfies Dictionary;

    export default markdownDictionary;
    ```

  </Tab>
  <Tab label="자동 감지" value="automatic-detection">
    문자열에 일반적인 마크다운 표시(예: 헤더, 리스트, 링크 등)가 포함되어 있으면 Intlayer가 자동으로 변환합니다.

    ```typescript fileName="markdownDictionary.content.ts"
    export default {
      key: "app",
      contentAutoTransformation: true, // 마크다운 콘텐츠 자동 감지 활성화 - intlayer.config.ts에서 전역 설정 가능
      content: {
        myMarkdownContent: "## My title \n\nLorem Ipsum",
      },
    };
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
          fr: md(file("./myMarkdown.fr.md")),
        }),
      },
    };
    ```

  </Tab>
</Tabs>

---

## 파트 2: 마크다운 렌더링

렌더링은 Intlayer의 콘텐츠 시스템을 통해 자동으로 처리하거나, 전문 도구를 사용해 수동으로 처리할 수 있습니다.

### 1. 자동 렌더링 (`useIntlayer` 사용)

`useIntlayer`로 콘텐츠에 접근하면 마크다운 노드는 이미 렌더링 준비가 되어 있습니다.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
    마크다운 노드는 JSX로 직접 렌더링할 수 있습니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "react-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

    `.use()` 메서드를 사용하여 특정 노드에 대해 로컬 오버라이드를 제공할 수도 있습니다:

    ```tsx
    {myMarkdownContent.use({
      h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
    })}
    ```

  </Tab>
  <Tab label="Vue" value="vue">
    Vue에서는 마크다운 콘텐츠를 내장된 `component`를 사용하거나 직접 노드로 렌더링할 수 있습니다.

    ```vue fileName="App.vue"
    <script setup>
    import { useIntlayer } from "vue-intlayer";
    const { myMarkdownContent } = useIntlayer("app");
    </script>

    <template>
      <component :is="myMarkdownContent" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">
    Svelte는 기본적으로 마크다운을 HTML 문자열로 렌더링합니다. 이를 렌더링하려면 `{@html}`을 사용하세요.

    ```svelte
    <script lang="ts">
    import { useIntlayer } from "svelte-intlayer";
    const content = useIntlayer("app");
    </script>

    {@html $content.myMarkdownContent}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    Preact는 JSX에서 마크다운 노드를 직접 지원합니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "preact-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    Solid는 JSX에서 마크다운 노드를 직접 지원합니다.

    ```tsx fileName="App.tsx"
    import { useIntlayer } from "solid-intlayer";

    const AppContent = () => {
      const { myMarkdownContent } = useIntlayer("app");
      return <div>{myMarkdownContent}</div>;
    };
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    Angular는 마크다운 콘텐츠를 렌더링하기 위해 `[innerHTML]` 디렉티브를 사용합니다.

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

    `.use()` 메서드를 사용하여 특정 노드에 대해 로컬 오버라이드를 제공할 수도 있습니다:

    ```typescript
    content().myMarkdownContent.use({
      h1: { class: "text-3xl font-bold" },
    })
    ```

  </Tab>
</Tabs>

### 2. 수동 렌더링 및 고급 도구

원시 마크다운 문자열을 렌더링하거나 렌더링 프로세스를 더 세밀하게 제어해야 하는 경우, 다음 도구들을 사용하세요.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">
  
    #### `<MarkdownRenderer />` 컴포넌트

    특정 옵션으로 마크다운 문자열을 렌더링합니다.

    ```tsx
    import { MarkdownRenderer } from "react-intlayer";

    <MarkdownRenderer forceBlock={true} tagfilter={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 훅

    미리 구성된 렌더러 함수를 얻습니다.

    ```tsx
    import { useMarkdownRenderer } from "react-intlayer";

    const renderMarkdown = useMarkdownRenderer({
      forceBlock: true,
      components: { h1: (props) => <h1 {...props} className="custom" /> }
    });

    return renderMarkdown("# My Title");
    ```

    #### `renderMarkdown()` 유틸리티
    컴포넌트 외부에서 렌더링할 때 사용하는 독립 유틸리티입니다.

    ```tsx
    import { renderMarkdown } from "react-intlayer";

    const jsx = renderMarkdown("# My Title", { forceBlock: true });
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    #### `<MarkdownRenderer />` 컴포넌트

    ```vue
    <script setup>
    import { MarkdownRenderer } from "vue-intlayer";
    </script>

    <template>
      <MarkdownRenderer :forceBlock="true" content="# My Title" />
    </template>
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    #### `<MarkdownRenderer />` 컴포넌트

    ```svelte
    <script lang="ts">
    import { MarkdownRenderer } from "svelte-intlayer";
    </script>

    <MarkdownRenderer forceBlock={true} value="# My Title" />
    ```

    #### `useMarkdownRenderer()` 훅

    ```svelte
    <script lang="ts">
    import { useMarkdownRenderer } from "svelte-intlayer";
    const render = useMarkdownRenderer();
    </script>

    {@html render("# My Title")}
    ```

    #### `renderMarkdown()` 유틸리티

    ```svelte
    <script lang="ts">
    import { renderMarkdown } from "svelte-intlayer";
    </script>

    {@html renderMarkdown("# My Title")}
    ```

  </Tab>
  <Tab label="Preact" value="preact">
    #### `<MarkdownRenderer />` 컴포넌트

    ```tsx
    import { MarkdownRenderer } from "preact-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 훅

    ```tsx
    import { useMarkdownRenderer } from "preact-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` 유틸리티

    ```tsx
    import { renderMarkdown } from "preact-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Solid" value="solid">
    #### `<MarkdownRenderer />` 컴포넌트

    ```tsx
    import { MarkdownRenderer } from "solid-intlayer";

    <MarkdownRenderer forceBlock={true}>
      {"# My Title"}
    </MarkdownRenderer>
    ```

    #### `useMarkdownRenderer()` 훅

    ```tsx
    import { useMarkdownRenderer } from "solid-intlayer";

    const render = useMarkdownRenderer();

    return <div>{render("# My Title")}</div>;
    ```

    #### `renderMarkdown()` 유틸리티

    ```tsx
    import { renderMarkdown } from "solid-intlayer";

    return <div>{renderMarkdown("# My Title")}</div>;
    ```

  </Tab>
  <Tab label="Angular" value="angular">
    #### `IntlayerMarkdownService` 서비스
    서비스를 사용하여 마크다운 문자열을 렌더링합니다.

    ```typescript
    import { IntlayerMarkdownService } from "angular-intlayer";

    export class MyComponent {
      constructor(private markdownService: IntlayerMarkdownService) {}

      renderMarkdown(markdown: string) {
        return this.markdownService.renderMarkdown(markdown);
      }
    }
    ```

  </Tab>
</Tabs>

---

## `MarkdownProvider`를 사용한 전역 구성

애플리케이션 전체에 대해 마크다운 렌더링을 전역으로 구성할 수 있습니다. 이를 통해 모든 렌더러에 동일한 프롭을 전달하는 번거로움을 피할 수 있습니다.

<Tabs group="framework">
  <Tab label="React / Next.js" value="react">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "react-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
          a: ({ href, children }) => <Link to={href}>{children}</Link>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Vue" value="vue">

    ```typescript fileName="main.ts"
    import { createApp } from "vue";
    import { installIntlayer, installIntlayerMarkdown } from "vue-intlayer";
    import App from "./App.vue";

    const app = createApp(App);

    app.use(installIntlayer);
    app.use(installIntlayerMarkdown, {
      forceBlock: true,
      tagfilter: true,
      components: {
        h1: {
          component: "h1",
          props: { class: "text-2xl font-bold" },
        },
      },
    });

    app.mount("#app");
    ```

  </Tab>
  <Tab label="Svelte" value="svelte">

    ```svelte fileName="App.svelte"
    <script lang="ts">
      import { MarkdownProvider } from "svelte-intlayer";
      import MyHeading from "./MyHeading.svelte";
    </script>

    <MarkdownProvider
      forceBlock={true}
      tagfilter={true}
      components={{
        h1: MyHeading,
      }}
    >
      <slot />
    </MarkdownProvider>
    ```

  </Tab>
  <Tab label="Preact" value="preact">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "preact-intlayer";

    export const AppProvider = ({ children }) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
        }}
      >
        {children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Solid" value="solid">

    ```tsx fileName="AppProvider.tsx"
    import { MarkdownProvider } from "solid-intlayer";

    export const AppProvider = (props) => (
      <MarkdownProvider
        forceBlock={true}
        tagfilter={true}
        components={{
          h1: (props) => <h1 className="text-2xl font-bold">{props.children}</h1>,
        }}
      >
        {props.children}
      </MarkdownProvider>
    );
    ```

  </Tab>
  <Tab label="Angular" value="angular">

    ```typescript fileName="app.config.ts"
    import { createIntlayerMarkdownProvider } from "angular-intlayer";

    export const appConfig: ApplicationConfig = {
      providers: [
        createIntlayerMarkdownProvider({
          components: {
            h1: { class: "text-2xl font-bold" },
          },
        }),
      ],
    };
    ```

  </Tab>
</Tabs>

---

## 옵션 참조

이 옵션들은 `MarkdownProvider`, `MarkdownRenderer`, `useMarkdownRenderer`, 및 `renderMarkdown`에 전달할 수 있습니다.

| 옵션                  | 타입        | 기본값  | 설명                                                                          |
| :-------------------- | :---------- | :------ | :---------------------------------------------------------------------------- |
| `forceBlock`          | `boolean`   | `false` | 출력을 블록 수준 요소(예: `<div>`)로 감싸도록 강제합니다.                     |
| `forceInline`         | `boolean`   | `false` | 출력을 인라인 요소(예: `<span>`)로 감싸도록 강제합니다.                       |
| `tagfilter`           | `boolean`   | `true`  | 위험한 HTML 태그를 제거하여 보안을 강화하는 GitHub Tag Filter를 활성화합니다. |
| `preserveFrontmatter` | `boolean`   | `false` | `true`인 경우 마크다운 문자열 시작 부분의 frontmatter가 제거되지 않습니다.    |
| `components`          | `Overrides` | `{}`    | HTML 태그를 커스텀 컴포넌트에 매핑하는 맵(예: `{ h1: MyHeading }`).           |
| `wrapper`             | `Component` | `null`  | 렌더링된 마크다운을 감싸는 커스텀 컴포넌트입니다.                             |
| `renderMarkdown`      | `Function`  | `null`  | 기본 마크다운 컴파일러를 완전히 대체하는 커스텀 렌더링 함수입니다.            |
