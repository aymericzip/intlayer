---
createdAt: 2024-08-11
updatedAt: 2026-10-08
priority: 8
title: "محتوى الترجمة: الدالة t()"
description: "عرّف الترجمات لكل لغة باستخدام الدالة t() في Intlayer، مع فحص أنواع ينبّه إلى اللغات الناقصة أثناء البناء."
keywords:
  - الترجمة
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - content
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "بداية السجل"
author: aymericzip
---

# الترجمة

## تعريف الترجمات

تسمح لك دالة `t` في `intlayer` بإعلان المحتوى بعدة لغات. تضمن هذه الدالة سلامة النوع، حيث ترفع خطأً إذا كانت هناك ترجمات مفقودة، وهو أمر مفيد بشكل خاص في بيئات TypeScript.

إليك مثالًا على كيفية إعلان المحتوى مع الترجمات.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## التهيئة للغات

لضمان التعامل الصحيح مع الترجمات، يمكنك تكوين اللغات المقبولة في `intlayer.config.ts`. يتيح لك هذا التكوين تحديد اللغات التي يدعمها تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## استخدام الترجمات في مكونات React

<Tabs group="framework">
  <Tab label="React" value="react">

باستخدام `react-intlayer`، يمكنك استخدام الترجمات في مكونات React. فيما يلي مثال:

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

يجلب هذا المكون الترجمة المقابلة بناءً على اللغة الحالية المحددة في تطبيقك.

  </Tab>
  <Tab label="Next.js" value="nextjs">

باستخدام `next-intlayer`، يمكنك استخدام الترجمات في مكونات خادم React أو مكونات العميل. فيما يلي مثال في مكون عميل:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Vue" value="vue">

باستخدام `vue-intlayer`، يمكنك استخدام الترجمات في مكونات Vue. فيما يلي مثال:

```vue fileName="**/*.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("multi_lang");
</script>

<template>
  <div>
    <p>{{ content.welcomeMessage }}</p>
  </div>
</template>
```

  </Tab>
  <Tab label="Svelte" value="svelte">

باستخدام `svelte-intlayer`، يمكنك استخدام الترجمات في مكونات Svelte. يُرجع الخطاف مخزن Svelte store. فيما يلي مثال:

```svelte fileName="**/*.svelte"
<script lang="ts">
import { useIntlayer } from "svelte-intlayer";

const content = useIntlayer("multi_lang");
</script>

<div>
  <p>{$content.welcomeMessage}</p>
</div>
```

  </Tab>
  <Tab label="Preact" value="preact">

باستخدام `preact-intlayer`، يمكنك استخدام الترجمات في مكونات Preact. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "preact";
import { useIntlayer } from "preact-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Solid" value="solid">

باستخدام `solid-intlayer`، يمكنك استخدام الترجمات في مكونات SolidJS. فيما يلي مثال:

```tsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { Component } from "solid-js";
import { useIntlayer } from "solid-intlayer";

const MyComponent: Component = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

  </Tab>
  <Tab label="Angular" value="angular">

باستخدام `angular-intlayer`، يمكنك استخدام الترجمات في مكونات Angular. فيما يلي مثال:

```typescript fileName="app.component.ts" codeFormat="typescript"
import { Component } from "@angular/core";
import { useIntlayer } from "angular-intlayer";

@Component({
  selector: "app-my-component",
  template: `
    <div>
      <p>{{ content().welcomeMessage }}</p>
    </div>
  `,
})
export class MyComponent {
  content = useIntlayer("multi_lang");
}
```

  </Tab>
  <Tab label="Vanilla JS" value="vanilla">

باستخدام `vanilla-intlayer`، يمكنك استخدام الترجمات من خلال الاشتراك في تغييرات المحتوى. فيما يلي مثال:

```typescript fileName="**/*.ts" codeFormat={["typescript", "esm"]}
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

const content = useIntlayer("multi_lang").onChange((newContent) => {
  document.getElementById("welcome-message")!.textContent = String(
    newContent.welcomeMessage
  );
});

// Initial render
document.getElementById("welcome-message")!.textContent = String(
  content.welcomeMessage
);
```

  </Tab>
</Tabs>
