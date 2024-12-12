# Documentation: `t` 함수 in `react-intlayer`

`react-intlayer` 패키지의 `t` 함수는 React 애플리케이션 내에서 인라인 국제화를 위한 기본 도구입니다. 이 함수를 사용하면 컴포넌트 내에서 직접 번역을 정의할 수 있어 현재 로케일에 따라 로컬라이즈된 콘텐츠를 간단하게 표시할 수 있습니다.

---

## 개요

`t` 함수는 컴포넌트 내에서 직접 다양한 로케일에 대한 번역을 제공하는 데 사용됩니다. 지원되는 각 로케일에 대한 번역을 포함하는 객체를 전달하여 `t`는 React 애플리케이션의 현재 로케일 컨텍스트에 따라 적절한 번역을 반환합니다.

---

## 주요 기능

- **인라인 번역**: 별도의 콘텐츠 선언이 필요 없는 빠르고 인라인 텍스트에 적합합니다.
- **자동 로케일 선택**: 현재 로케일에 해당하는 번역을 자동으로 반환합니다.
- **TypeScript 지원**: TypeScript와 함께 사용할 때 타입 안전성과 자동 완성을 제공합니다.
- **쉬운 통합**: React 컴포넌트 내에서 원활하게 작동합니다.

---

## 함수 시그니처

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### 매개변수

- `translations`: 키가 로케일 코드(예: `en`, `fr`, `es`)이고 값이 해당 번역 문자열인 객체입니다.

### 반환 값

- 현재 로케일에 대한 번역된 콘텐츠를 나타내는 문자열입니다.

---

## 사용 예시

### 컴포넌트에서 `t`의 기본 사용법

```tsx
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
        })}
      </p>
    </div>
  );
};
```

### 속성 내 인라인 번역

`t` 함수는 JSX 속성 내 인라인 번역에 특히 유용합니다. `alt`, `title`, `href` 또는 `aria-label`과 같은 속성을 로컬라이즈할 때, 속성 내에서 직접 `t`를 사용할 수 있습니다.

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

`t` 함수는 TypeScript와 함께 사용할 때 타입 안전성을 보장하며, 모든 필수 로케일이 제공됨을 확인합니다.

```typescript
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### 로케일 감지 및 컨텍스트

`react-intlayer`에서는 현재 로케일이 `IntlayerProvider`를 통해 관리됩니다. 이 제공자가 컴포넌트를 감싸고 `locale` prop이 올바르게 전달되도록 해야 합니다.

#### 예시:

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* 여기에 컴포넌트 추가 */}
  </IntlayerProvider>
);
```

---

## 일반적인 오류 및 문제 해결

### `t`가 정의되지 않았거나 잘못된 번역을 반환함

- **원인**: 현재 로케일이 올바르게 설정되지 않았거나 현재 로케일에 대한 번역이 누락되었습니다.
- **해결 방법**:
  - `IntlayerProvider`가 적절한 `locale`로 올바르게 설정되었는지 검증합니다.
  - 번역 객체에 필요한 모든 로케일이 포함되어 있는지 확인합니다.

### TypeScript에서 번역 누락

- **원인**: 번역 객체가 필수 로케일을 충족하지 않아 TypeScript 오류가 발생합니다.
- **해결 방법**: `IConfigLocales` 타입을 사용하여 번역의 완전성을 보장합니다.

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

1. **간단한 인라인 번역에 `t` 사용하기**: 컴포넌트 내에서 작은 텍스트 조각을 번역하는 데 이상적입니다.
2. **구조화된 콘텐츠에는 `useIntlayer` 선호하기**: 더 복잡한 번역 및 콘텐츠 재사용을 위해 선언 파일에서 콘텐츠를 정의하고 `useIntlayer`를 사용하십시오.
3. **일관된 로케일 제공**: 애플리케이션 전체에 걸쳐 `IntlayerProvider`를 통해 로케일을 일관되게 제공하십시오.
4. **TypeScript 활용**: TypeScript 타입을 사용하여 누락된 번역을 포착하고 타입 안전성을 보장하십시오.

---

## 결론

`react-intlayer`의 `t` 함수는 React 애플리케이션 내 인라인 번역을 관리하기 위한 강력하고 편리한 도구입니다. 이를 효과적으로 통합함으로써 앱의 국제화 기능을 향상시켜 전 세계 사용자를 위한 더 나은 경험을 제공합니다.

더 자세한 사용법과 고급 기능은 [react-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/ko/intlayer_editor.md)을 참조하십시오.

---

**노트**: 현재 로케일이 올바르게 전달되도록 `IntlayerProvider`를 적절히 설정하는 것을 잊지 마십시오. 이는 `t` 함수가 올바른 번역을 반환하는 데 중요합니다.
