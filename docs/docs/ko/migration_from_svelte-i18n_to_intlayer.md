---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 7
title: "svelte-i18n에서 Intlayer로 마이그레이션"
description: "Svelte 또는 SvelteKit 앱을 svelte-i18n에서 Intlayer로 단계별로 마이그레이션하세요. compat adapter @intlayer/svelte-i18n으로 $_, $date, $number 스토어가 그대로 동작합니다."
keywords:
  - svelte-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Svelte
  - SvelteKit
  - Vite
slugs:
  - doc
  - migration
  - svelte-i18n
history:
  - version: 9.8.5
    date: 2026-11-23
    changes: "Init history"
author: aymericzip
---

# svelte-i18n에서 Intlayer로 마이그레이션

## svelte-i18n에서 Intlayer로 마이그레이션하는 이유

<AccordionGroup>
<Accordion header="번들 크기">

svelte-i18n은 시작 시 로케일 파일 전체를 등록합니다. Intlayer는 각 페이지가 사용하는 사전만 전달하므로 **번들과 페이지 크기를 최대 50%까지 줄여 줍니다**.

</Accordion>
<Accordion header="유지보수성">

키는 사전에 대해 **타입이 지정**되어 있어 잘못된 키는 빌드 시 실패합니다. 콘텐츠는 이를 사용하는 컴포넌트 옆에 둘 수 있습니다.

</Accordion>
<Accordion header="AI 에이전트">

컴포넌트 옆에 있는 콘텐츠는 LLM에 **필요한 컨텍스트를 줄여 줍니다**. Intlayer는 누락된 번역을 검사하는 **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/lsp.md)**, **[MCP 서버](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/mcp_server.md)**, **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/agent_skills.md)**를 제공합니다.

</Accordion>
<Accordion header="자동화">

원하는 LLM으로 CI/CD 파이프라인에서 누락된 메시지를 번역하거나, [웹 플랫폼](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)에서 백그라운드로 번역하세요.

</Accordion>
<Accordion header="비개발자와 함께 확장">

Intlayer는 셀프 호스팅 **[비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)**와 **[완전한 CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_CMS.md)**를 제공하여 번역가와 카피라이터가 실시간으로 콘텐츠를 편집할 수 있습니다.

</Accordion>
</AccordionGroup>

> 이 라이브러리들이 어디서 왔는지 알고 싶다면 [JavaScript i18n의 역사](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ko/history_of_i18n.md)를 읽어 보세요.

## 마이그레이션 전략

1. **Compat adapter (기존 앱에 권장)**: `@intlayer/svelte-i18n`을 설치합니다. `svelte-i18n`과 동일한 API(`init`, `locale`, `$_` / `$t`, `$json`, `$date`, `$time`, `$number`, `getLocaleFromNavigator`…)를 노출하고 메시지를 Intlayer 사전에서 제공합니다. ICU MessageFormat은 이전처럼 동작합니다.
2. **전체 마이그레이션**: svelte-i18n 스토어를 `svelte-intlayer`의 `useIntlayer`와 컴포넌트 옆의 `.content.ts` 파일로 점진적으로 교체합니다.

## 목차

<TOC/>

## 빠른 마이그레이션

<Steps>
<Step number={1} title="의존성 설치">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> `--interactive` 플래그는 선택 사항입니다. AI 에이전트라면 `intlayer-cli init`을 사용하세요.

이 명령은 환경을 감지하고 필요한 package를 설치합니다. 예:

```bash packageManager="npm"
npm install intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/svelte-i18n @intlayer/sync-json-plugin
```

> `svelte-i18n`은 설치된 상태로 두세요. TypeScript 타입을 제공합니다.

</Step>
<Step number={2} title="Intlayer 설정">

`syncJSON` 플러그인이 기존 메시지 파일을 가리키도록 설정하세요. namespace당 파일 하나(`src/locales/en/home.json`)인 경우 각 파일이 하나의 사전이 됩니다.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // svelte-i18n uses ICU MessageFormat
      format: "icu",
      // ./src/locales/en/home.json → dictionary `home`
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> `$_('home.title')`은 `home` 사전의 `title` 필드로 해석됩니다. 로케일당 파일 하나(`src/locales/en.json`)에 중첩된 namespace를 쓰고 있다면 대신 `source: ({ locale }) => \`./src/locales/${locale}.json\``을 사용하세요. 최상위 키 각각이 사전이 됩니다.

</Step>
<Step number={3} title="Vite 플러그인 추가">

`svelteI18nVitePlugin()`은 Intlayer 빌드를 실행하고 `svelte-i18n`을 `@intlayer/svelte-i18n`으로 alias하므로 소스 파일을 수정할 필요가 없습니다.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteI18nVitePlugin } from "@intlayer/svelte-i18n/plugin";

export default defineConfig({
  plugins: [svelte(), svelteI18nVitePlugin()],
});
```

> SvelteKit에서는 같은 `plugins` 배열에서 `sveltekit()` 뒤에 `svelteI18nVitePlugin()`을 추가하세요.

</Step>
<Step number={4} title="i18n 설정 단순화">

`init()`은 유지하되 `register()`와 `addMessages()`는 제거하세요. 메시지는 Intlayer 사전에서 제공됩니다.

```typescript fileName="src/lib/i18n.ts"
import { getLocaleFromNavigator, init } from "svelte-i18n";

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});
```

</Step>
</Steps>

컴포넌트는 변경 없이 계속 동작합니다.

```svelte fileName="src/App.svelte"
<script lang="ts">
  import { _, date, number } from "svelte-i18n";
</script>

<h1>{$_("home.title")}</h1>
<p>{$_("home.greeting", { values: { name: "Ada" } })}</p>
<p>{$date(new Date(), { format: "long" })}</p>
<p>{$number(1234.5, { style: "currency", currency: "EUR" })}</p>
```

`$locale = 'fr'`을 설정하면 svelte-i18n 스토어와 `useIntlayer`의 언어가 함께 바뀝니다.

## 전체 마이그레이션

<Steps>
<Step number={5} title="명시적인 import 이름 변경 (선택)" isOptional={true}>

alias는 이미 Vite 플러그인이 처리합니다. 의존성을 명시적으로 드러내려면:

| 이전                                         | 이후                                                   |
| -------------------------------------------- | ------------------------------------------------------ |
| `import { _, t } from 'svelte-i18n'`         | `import { _, t } from '@intlayer/svelte-i18n'`         |
| `import { locale } from 'svelte-i18n'`       | `import { locale } from '@intlayer/svelte-i18n'`       |
| `import { init } from 'svelte-i18n'`         | `import { init } from '@intlayer/svelte-i18n'`         |
| `import { date, number } from 'svelte-i18n'` | `import { date, number } from '@intlayer/svelte-i18n'` |

</Step>
<Step number={6} title="콘텐츠를 .content.ts 파일로 옮기기" isOptional={true}>

새 컴포넌트는 기존 svelte-i18n 호출과 함께 네이티브 Intlayer 콘텐츠를 사용할 수 있습니다.

```typescript fileName="src/lib/home.content.ts"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({ en: "Welcome", fr: "Bienvenue", es: "Bienvenido" }),
  },
} satisfies Dictionary;

export default homeContent;
```

```svelte fileName="src/lib/Home.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("home");
</script>

<h1>{$content.title}</h1>
```

</Step>
<Step number={7} title="AI 기반 번역 활성화" isOptional={true}>

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

채워진 번역은 JSON 파일에 다시 기록됩니다. AI 설정은 [CLI 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/cli/index.md)를 참고하세요.

</Step>
</Steps>

## 마이그레이션 후 삭제할 수 있는 항목

| 파일 / 패턴                         | 더 이상 필요 없는 이유                              |
| ----------------------------------- | --------------------------------------------------- |
| `register()` / `addMessages()` 호출 | 사전은 Intlayer가 컴파일하고 로드합니다.            |
| 렌더링 전 `waitLocale()`            | 로케일이 설정되는 즉시 메시지를 사용할 수 있습니다. |

## TypeScript 설정

생성된 타입을 `tsconfig.json`에 포함하세요.

```json5 fileName="tsconfig.json"
{
  "include": [
    // ... your existing paths
    ".intlayer/**/*.ts",
  ],
}
```

## Git 설정

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Go Further

- [svelte-i18n compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/compat/svelte-i18n.md)
- [sync JSON 플러그인](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/plugins/sync-json.md)
- [Vite, Svelte와 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_vite+svelte.md)
- [SvelteKit과 Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_with_svelte_kit.md)
- [Intlayer 비주얼 에디터](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)
