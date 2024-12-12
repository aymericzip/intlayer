# Documentation: `t` 함수 in `next-intlayer`

`next-intlayer` 패키지의 `t` 함수는 Next.js 애플리케이션 내에서 인라인 국제화를 위한 기본 도구입니다. 이는 구성 요소 내에서 직접 번역을 정의할 수 있게 하여 현재 로케일에 기반한 로컬라이즈된 콘텐츠를 쉽게 표시할 수 있습니다.

---

## 개요

`t` 함수는 구성 요소 내에서 직접 다양한 로케일에 대한 번역을 제공합니다. 각 지원되는 로케일에 대한 번역을 포함하는 객체를 전달함으로써, `t`는 Next.js 애플리케이션의 현재 로케일 컨텍스트에 따라 적절한 번역을 반환합니다.

---

## 주요 기능

- **인라인 번역**: 별도의 콘텐츠 선언이 필요 없는 빠른 인라인 텍스트에 이상적입니다.
- **자동 로케일 선택**: 현재 로케일에 해당하는 번역을 자동으로 반환합니다.
- **TypeScript 지원**: TypeScript와 함께 사용할 때 유형 안전성과 자동 완성을 제공합니다.
- **쉬운 통합**: Next.js의 클라이언트 및 서버 구성 요소에서 원활하게 작동합니다.

---

## 함수 시그니처

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 매개변수

- `translations`: 키가 로케일 코드(예: `en`, `fr`, `es`)이고 값이 해당하는 번역 문자열인 객체입니다.

### 반환

- 현재 로케일에 대한 번역된 콘텐츠를 나타내는 문자열입니다.

---

## 사용 예제

### 클라이언트 구성 요소에서 `t` 사용하기

클라이언트측 구성 요소에서 `t`를 사용할 때는 구성 요소 파일의 상단에 `'use client';` 지시문을 포함해야 합니다.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### 서버 구성 요소에서 `t` 사용하기

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### 속성 내 인라인 번역

`t` 함수는 JSX 속성 내에서 인라인 번역에 특히 유용합니다. `alt`, `title`, `href` 또는 `aria-label`과 같은 속성을 로컬라이즈할 때 속성 내에서 `t`를 직접 사용할 수 있습니다.

```tsx
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

`t` 함수는 TypeScript와 함께 사용할 때 유형 안전하며, 모든 필수 로케일이 제공되도록 보장합니다.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 로케일 감지 및 컨텍스트

`next-intlayer`에서는 현재 로케일이 컨텍스트 제공자를 통해 관리됩니다: `IntlayerClientProvider` 및 `IntlayerServerProvider`. 이러한 제공자가 구성 요소를 감싸고 `locale` prop가 올바르게 전달되도록 하십시오.

#### 예제:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* 이곳에 구성 요소 */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## 일반적인 오류 및 문제 해결

### `t`가 정의되지 않거나 잘못된 번역 반환

- **원인**: 현재 로케일이 제대로 설정되지 않았거나 현재 로케일에 대한 번역이 누락되었습니다.
- **해결책**:
  - `IntlayerClientProvider` 또는 `IntlayerServerProvider`가 적절한 `locale`로 올바르게 설정되었는지 확인하십시오.
  - 번역 객체가 필요한 모든 로케일을 포함하고 있는지 확인하십시오.

### TypeScript에서 누락된 번역

- **원인**: 번역 객체가 요구되는 로케일을 충족하지 않아 TypeScript 오류가 발생합니다.
- **해결책**: `IConfigLocales` 유형을 사용하여 번역의 완전성을 보장하십시오.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // 'es'가 누락되면 TypeScript 오류 발생
};

const text = t(translations);
```

---

## 효과적인 사용을 위한 팁

1. **간단한 인라인 번역을 위해 `t` 사용**: 구성 요소 내에서 직접 작은 텍스트 조각을 번역하는 데 이상적입니다.
2. **구조화된 콘텐츠에 `useIntlayer` 선호**: 더 복잡한 번역 및 콘텐츠 재사용을 위해 선언 파일에서 콘텐츠를 정의하고 `useIntlayer`를 사용하십시오.
3. **일관된 로케일 제공**: 애플리케이션 전반에 걸쳐 적절한 제공자를 통해 로케일을 일관되게 제공하십시오.
4. **TypeScript 활용**: 누락된 번역을 잡고 유형 안전성을 보장하기 위해 TypeScript 유형을 사용하십시오.

---

## 결론

`next-intlayer`의 `t` 함수는 Next.js 애플리케이션에서 인라인 번역을 관리하는 강력하고 편리한 도구입니다. 이를 효과적으로 통합함으로써 애플리케이션의 국제화 기능을 향상시켜 전 세계 사용자에게 더 나은 경험을 제공합니다.

자세한 사용법 및 고급 기능에 대한 내용은 [next-intlayer 문서](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)를 참조하십시오.

---

**참고**: 현재 로케일이 구성 요소에 올바르게 전달되도록 `IntlayerClientProvider`와 `IntlayerServerProvider`를 제대로 설정하는 것을 잊지 마십시오. 이는 `t` 함수가 올바른 번역을 반환하는 데 중요합니다.
