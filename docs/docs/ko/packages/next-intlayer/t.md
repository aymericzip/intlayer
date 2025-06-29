---
docName: package__next-intlayer__t
url: https://intlayer.org/doc/packages/next-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/t.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: t 함수 문서 | next-intlayer
description: next-intlayer 패키지의 t 함수 사용 방법을 확인하세요
keywords:
  - t
  - 번역
  - Intlayer
  - next-intlayer
  - 국제화
  - 문서
  - Next.js
  - JavaScript
  - React
---

# Documentation: `t` Function in `next-intlayer`

The `t` function in the `next-intlayer` package is a fundamental tool for inline internationalization within your Next.js application. It allows you to define translations directly within your components, making it simple to display localized content based on the current locale.

---

## 개요

`t` 함수는 컴포넌트 내에서 직접 다양한 로케일에 대한 번역을 제공하는 데 사용됩니다. 지원되는 각 로케일에 대한 번역이 포함된 객체를 전달하면, `t`는 Next.js 애플리케이션의 현재 로케일 컨텍스트에 따라 적절한 번역을 반환합니다.

---

## 주요 기능

- **인라인 번역**: 별도의 콘텐츠 선언이 필요 없는 빠르고 간단한 텍스트 번역에 이상적입니다.
- **자동 로케일 선택**: 현재 로케일에 해당하는 번역을 자동으로 반환합니다.
- **TypeScript 지원**: TypeScript와 함께 사용할 때 타입 안전성과 자동 완성을 제공합니다.
- **쉬운 통합**: Next.js의 클라이언트 및 서버 컴포넌트 모두에서 원활하게 작동합니다.

---

## 함수 시그니처

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 매개변수

- `translations`: 키가 로케일 코드(`en`, `fr`, `es` 등)이고 값이 해당 번역 문자열인 객체입니다.

### 반환값

- 현재 로케일에 대한 번역된 콘텐츠를 나타내는 문자열입니다.

---

## 사용 예제

### 클라이언트 컴포넌트에서 `t` 사용하기

클라이언트 측 컴포넌트에서 `t`를 사용할 때는 컴포넌트 파일 상단에 `'use client';` 지시문을 포함해야 합니다.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
      ko: "이것은 클라이언트 컴포넌트 예제의 내용입니다",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
      ko: "이것은 클라이언트 컴포넌트 예제의 내용입니다",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
      ko: "이것은 클라이언트 컴포넌트 예제의 내용입니다",
    })}
  </p>
);
```

### 서버 컴포넌트에서 `t` 사용하기

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      ko: "이것은 서버 컴포넌트 예제의 내용입니다",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      ko: "이것은 서버 컴포넌트 예제의 내용입니다",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
      ko: "이것은 서버 컴포넌트 예제의 내용입니다",
    })}
  </p>
);
```

### 속성에서 인라인 번역 사용하기

`t` 함수는 JSX 속성에서 인라인 번역을 수행할 때 특히 유용합니다. `alt`, `title`, `href`, `aria-label`과 같은 속성을 로컬라이징할 때 `t`를 속성 내에서 직접 사용할 수 있습니다.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ko: "제출",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ko: "제출",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
      ko: "아름다운 풍경",
    })}
  />
</button>
```

---

## 고급 주제

### TypeScript 통합

`t` 함수는 TypeScript와 함께 사용할 때 타입 안전성을 보장하며, 필요한 모든 로케일이 제공되었는지 확인합니다.

```typescript codeFormat="typescript"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ko: "환영합니다",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import type { IConfigLocales } from "intlayer";
import { t } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ko: "환영합니다",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ko: "환영합니다",
};

const greeting = t(translations);
```

### 로케일 감지 및 컨텍스트

`next-intlayer`에서는 `IntlayerClientProvider`와 `IntlayerServerProvider`를 통해 현재 로케일이 관리됩니다. 이 제공자들이 컴포넌트를 감싸고 `locale` 속성이 올바르게 전달되었는지 확인하세요.

#### 예제:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Your components here */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Your components here */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Your components here */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 일반적인 오류 및 문제 해결

### `t`가 정의되지 않거나 잘못된 번역 반환

- **원인**: 현재 로케일이 올바르게 설정되지 않았거나 현재 로케일에 대한 번역이 누락되었습니다.
- **해결 방법**:
  - `IntlayerClientProvider` 또는 `IntlayerServerProvider`가 적절한 `locale`로 올바르게 설정되었는지 확인하세요.
  - 번역 객체에 필요한 모든 로케일이 포함되어 있는지 확인하세요.

### TypeScript에서 번역 누락

- **원인**: 번역 객체가 필요한 로케일을 충족하지 않아 TypeScript 오류가 발생합니다.
- **해결 방법**: `IConfigLocales` 타입을 사용하여 번역의 완전성을 보장하세요.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' 누락 시 TypeScript 오류 발생 [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' 누락 시 TypeScript 오류 발생 [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es' 누락 시 TypeScript 오류 발생 [!code error]
};

const text = t(translations);
```

---

## 효과적인 사용을 위한 팁

1. **간단한 인라인 번역에 `t` 사용**: 컴포넌트 내에서 작은 텍스트를 번역하는 데 이상적입니다.
2. **구조화된 콘텐츠에는 `useIntlayer` 선호**: 더 복잡한 번역 및 콘텐츠 재사용을 위해 선언 파일에 콘텐츠를 정의하고 `useIntlayer`를 사용하세요.
3. **일관된 로케일 제공**: 적절한 제공자를 통해 애플리케이션 전반에 걸쳐 로케일이 일관되게 제공되도록 하세요.
4. **TypeScript 활용**: TypeScript 타입을 사용하여 누락된 번역을 잡고 타입 안전성을 보장하세요.

---

## 결론

`next-intlayer`의 `t` 함수는 Next.js 애플리케이션에서 인라인 번역을 관리하기 위한 강력하고 편리한 도구입니다. 이를 효과적으로 통합함으로써 애플리케이션의 국제화 기능을 향상시키고 전 세계 사용자에게 더 나은 경험을 제공합니다.

더 자세한 사용법과 고급 기능은 [next-intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/intlayer_visual_editor.md)를 참조하세요.

---

**참고**: `IntlayerClientProvider`와 `IntlayerServerProvider`를 올바르게 설정하여 현재 로케일이 컴포넌트에 올바르게 전달되도록 하세요. 이는 `t` 함수가 올바른 번역을 반환하는 데 필수적입니다.
