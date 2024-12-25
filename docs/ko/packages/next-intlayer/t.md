# Documentation: `t` 함수 in `next-intlayer`

`next-intlayer` 패키지의 `t` 함수는 Next.js 애플리케이션 내에서 인라인 국제화를 위한 기본 도구입니다. 컴포넌트 내에서 직접 번역을 정의할 수 있게 하여, 현재 로케일에 기반하여 로컬라이즈된 콘텐츠를 간단하게 표시할 수 있도록 합니다.

---

## 개요

`t` 함수는 컴포넌트 내에서 직접 다양한 로케일에 대한 번역을 제공하는 데 사용됩니다. 각각의 지원되는 로케일에 대한 번역을 포함하는 객체를 전달하면, `t`는 Next.js 애플리케이션의 현재 로케일 컨텍스트에 따라 적절한 번역을 반환합니다.

---

## 주요 기능

- **인라인 번역**: 별도의 콘텐츠 선언이 필요 없는 빠르고 인라인 텍스트에 이상적입니다.
- **자동 로케일 선택**: 현재 로케일에 해당하는 번역을 자동으로 반환합니다.
- **TypeScript 지원**: TypeScript와 함께 사용할 때 타입 안전성과 자동 완성 기능을 제공합니다.
- **쉬운 통합**: Next.js의 클라이언트 및 서버 컴포넌트 내에서 원활하게 작동합니다.

---

## 함수 시그니처

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 매개변수

- `translations`: 키가 로케일 코드(예: `en`, `fr`, `es`)이고 값이 해당 번역된 문자열인 객체입니다.

### 반환값

- 현재 로케일에 대한 번역된 콘텐츠를 나타내는 문자열입니다.

---

## 사용 예제

### 클라이언트 컴포넌트에서 `t` 사용하기

클라이언트 측 컴포넌트에서 `t`를 사용할 때는 컴포넌트 파일의 맨 위에 `'use client';` 지시문을 포함해야 합니다.

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
      es: "Este es el contenido d un ejemplo de componente cliente",
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
    })}
  </p>
);
```

### 속성에서의 인라인 번역

`t` 함수는 JSX 속성에서 인라인 번역에 특히 유용합니다. `alt`, `title`, `href` 또는 `aria-label`과 같은 속성을 로컬라이즈할 때는 속성 내에서 직접 `t`를 사용할 수 있습니다.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## 고급 주제

### TypeScript 통합

`t` 함수는 TypeScript와 함께 사용할 때 타입 안전성이 보장되어 모든 필수 로케일이 제공됩니다.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 로케일 감지 및 컨텍스트

`next-intlayer`에서 현재 로케일은 컨텍스트 제공자를 통해 관리됩니다: `IntlayerClientProvider` 및 `IntlayerServerProvider`. 이 제공자들이 컴포넌트를 감쌀 때 `locale` prop이 올바르게 전달되었는지 확인해야 합니다.

#### 예시:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 여기에 컴포넌트를 배치하세요 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 여기에 컴포넌트를 배치하세요 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 여기에 컴포넌트를 배치하세요 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 일반적인 오류 및 문제 해결

### `t` 함수가 정의되지 않거나 잘못된 번역 반환

- **원인**: 현재 로케일이 제대로 설정되지 않았거나 현재 로케일에 대한 번역이 누락됨.
- **해결책**:
  - `IntlayerClientProvider` 또는 `IntlayerServerProvider`가 적절한 `locale`로 올바르게 설정되어 있는지 확인합니다.
  - 번역 객체에 필요한 모든 로케일이 포함되어 있는지 확인합니다.

### TypeScript에서 누락된 번역

- **원인**: 번역 객체가 필수 로케일을 충족하지 않아 TypeScript 오류가 발생함.
- **해결책**: `IConfigLocales` 타입을 사용하여 번역의 완전성을 강제합니다.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되어 TypeScript 오류 발생 [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되어 TypeScript 오류 발생 [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되어 TypeScript 오류 발생 [!code error]
};

const text = t(translations);
```

---

## 효과적인 사용을 위한 팁

1. **간단한 인라인 번역에 `t` 사용하기**: 컴포넌트 내에서 소규모 텍스트 번역에 이상적입니다.
2. **구조화된 콘텐츠에 `useIntlayer` 사용하기**: 더 복잡한 번역 및 콘텐츠 재사용을 위해 선언 파일에 콘텐츠를 정의하고 `useIntlayer`를 사용합니다.
3. **일관된 로케일 제공**: 적절한 제공자를 통해 애플리케이션 전반에 걸쳐 로케일이 일관되게 제공되도록 합니다.
4. **TypeScript 활용**: TypeScript 타입을 사용하여 누락된 번역을 잡고 타입 안전성을 확보합니다.

---

## 결론

`next-intlayer`의 `t` 함수는 Next.js 애플리케이션에서 인라인 번역을 관리하기 위한 강력하고 편리한 도구입니다. 효과적으로 통합함으로써 애플리케이션의 국제화 능력을 향상시켜 전 세계 사용자들에게 더 나은 경험을 제공합니다.

더 자세한 사용법 및 고급 기능에 대한 내용은 [next-intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)를 참조하세요.

---

**참고**: 현재 로케일이 컴포넌트에 올바르게 전달되도록 `IntlayerClientProvider` 및 `IntlayerServerProvider`를 적절히 설정해야 함을 기억하세요. 이는 `t` 함수가 올바른 번역을 반환하는 데 중요합니다.
