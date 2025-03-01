# Документация: Функция `t` в `react-intlayer`

Функция `t` в пакете `react-intlayer` является основным инструментом для встроенной интернационализации в вашем React-приложении. Она позволяет определять переводы непосредственно в компонентах, что упрощает отображение локализованного контента в зависимости от текущей локали.

---

## Обзор

Функция `t` используется для предоставления переводов для различных локалей непосредственно в компонентах. Передавая объект, содержащий переводы для каждой поддерживаемой локали, `t` возвращает соответствующий перевод на основе текущего контекста локали в вашем React-приложении.

---

## Основные особенности

- **Встроенные переводы**: Идеально подходит для быстрого перевода текста, который не требует отдельного объявления контента.
- **Автоматический выбор локали**: Автоматически возвращает перевод, соответствующий текущей локали.
- **Поддержка TypeScript**: Обеспечивает безопасность типов и автозаполнение при использовании с TypeScript.
- **Простая интеграция**: Легко интегрируется в компоненты React.

---

## Сигнатура функции

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметры

- `translations`: Объект, где ключи — это коды локалей (например, `en`, `fr`, `es`), а значения — соответствующие переведенные строки.

### Возвращаемое значение

- Строка, представляющая переведенный контент для текущей локали.

---

## Примеры использования

### Базовое использование `t` в компоненте

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { t } from "react-intlayer";

export const ComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
          ru: "Это пример компонента",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { t } from "react-intlayer";

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
          ru: "Это пример компонента",
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

const ComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is an example of a component",
          fr: "Ceci est un exemple de composant",
          es: "Este es un ejemplo de componente",
          ru: "Это пример компонента",
        })}
      </p>
    </div>
  );
};
```

### Встроенные переводы в атрибутах

Функция `t` особенно полезна для встроенных переводов в атрибутах JSX. При локализации атрибутов, таких как `alt`, `title`, `href` или `aria-label`, вы можете использовать `t` непосредственно в атрибуте.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ru: "Отправить",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
    ru: "Отправить",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
      ru: "Красивый пейзаж",
    })}
  />
</button>
```

---

## Продвинутые темы

### Интеграция с TypeScript

Функция `t` безопасна для типов при использовании с TypeScript, что гарантирует предоставление всех необходимых локалей.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ru: "Добро пожаловать",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "react-intlayer";

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ru: "Добро пожаловать",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
  ru: "Добро пожаловать",
};

const greeting = t(translations);
```

### Определение локали и контекста

В `react-intlayer` текущая локаль управляется через `IntlayerProvider`. Убедитесь, что этот провайдер оборачивает ваши компоненты, и проп `locale` передается правильно.

#### Пример:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerProvider } from "react-intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ваши компоненты здесь */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ваши компоненты здесь */}
  </IntlayerProvider>
);
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");

const App = ({ locale }) => (
  <IntlayerProvider locale={locale}>
    {/* Ваши компоненты здесь */}
  </IntlayerProvider>
);
```

---

## Частые ошибки и их устранение

### `t` возвращает undefined или неправильный перевод

- **Причина**: Текущая локаль не установлена правильно, или перевод для текущей локали отсутствует.
- **Решение**:
  - Убедитесь, что `IntlayerProvider` настроен правильно с соответствующей локалью.
  - Убедитесь, что ваш объект переводов включает все необходимые локали.

### Отсутствие переводов в TypeScript

- **Причина**: Объект переводов не удовлетворяет требованиям всех локалей, что приводит к ошибкам TypeScript.
- **Решение**: Используйте тип `IConfigLocales`, чтобы обеспечить полноту переводов.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  es: "Texto",
  ru: "Текст",
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  es: "Texto",
  ru: "Текст",
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  es: "Texto",
  ru: "Текст",
};

const text = t(translations);
```

---

## Советы по эффективному использованию

1. **Используйте `t` для простых встроенных переводов**: Идеально подходит для перевода небольших текстов непосредственно в компонентах.
2. **Предпочитайте `useIntlayer` для структурированного контента**: Для более сложных переводов и повторного использования контента определяйте контент в файлах деклараций и используйте `useIntlayer`.
3. **Обеспечьте согласованное предоставление локали**: Убедитесь, что локаль последовательно передается через `IntlayerProvider`.
4. **Используйте TypeScript**: Используйте типы TypeScript, чтобы выявлять отсутствующие переводы и обеспечивать безопасность типов.

---

## Заключение

Функция `t` в `react-intlayer` — это мощный и удобный инструмент для управления встроенными переводами в ваших React-приложениях. Эффективная интеграция этой функции улучшает возможности интернационализации вашего приложения, предоставляя лучший опыт для пользователей по всему миру.

Для более детального использования и продвинутых функций обратитесь к [документации react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md).

---

**Примечание**: Не забудьте правильно настроить ваш `IntlayerProvider`, чтобы текущая локаль корректно передавалась вашим компонентам. Это важно для того, чтобы функция `t` возвращала правильные переводы.
