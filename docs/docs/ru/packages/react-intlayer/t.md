---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документация функции t | react-intlayer
description: Узнайте, как использовать функцию t в пакете react-intlayer
keywords:
  - t
  - перевод
  - Intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - t
---

# Документация: функция `t` в `react-intlayer`

Функция `t` в пакете `react-intlayer` является основным инструментом для встроенной интернационализации в вашем React-приложении. Она позволяет определять переводы непосредственно внутри компонентов, что упрощает отображение локализованного контента в зависимости от текущей локали.

---

## Обзор

Функция `t` используется для предоставления переводов для разных локалей непосредственно в ваших компонентах. Передавая объект, содержащий переводы для каждой поддерживаемой локали, `t` возвращает соответствующий перевод на основе текущего контекста локали в вашем React-приложении.

---

## Основные возможности

- **Встроенные переводы**: Идеально подходит для быстрого, встроенного текста, который не требует отдельного объявления контента.
- **Автоматический выбор локали**: Автоматически возвращает перевод, соответствующий текущей локали.
- **Поддержка TypeScript**: Обеспечивает типовую безопасность и автодополнение при использовании с TypeScript.
- **Простая интеграция**: Бесшовно работает внутри React-компонентов.

---

## Сигнатура функции

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметры

- `translations`: Объект, где ключи - коды локалей (например, `en`, `fr`, `es`), а значения - соответствующие переведённые строки.

### Возвращает

- Строку, представляющую переведённый контент для текущей локали.

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
        })}
      </p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { t } = require("react-intlayer");

// Пример компонента с использованием функции t для локализации
const ComponentExample = () => {
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

### Встроенные переводы в атрибутах

Функция `t` особенно полезна для встроенных переводов в атрибутах JSX. При локализации таких атрибутов, как `alt`, `title`, `href` или `aria-label`, вы можете использовать `t` непосредственно внутри атрибута.

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

## Расширенные темы

### Интеграция с TypeScript

Функция `t` является типобезопасной при использовании с TypeScript, что гарантирует предоставление всех необходимых локалей.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "react-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
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
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
// Определение переводов с типами для локалей
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Определение локали и контекст

В `react-intlayer` текущая локаль управляется через `IntlayerProvider`. Убедитесь, что этот провайдер оборачивает ваши компоненты и проп `locale` передается корректно.

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

## Распространённые ошибки и устранение неполадок

### `t` возвращает undefined или неправильный перевод

- **Причина**: Текущая локаль неправильно установлена или отсутствует перевод для текущей локали.
- **Решение**:
  - Проверьте, что `IntlayerProvider` правильно настроен с соответствующей `locale`.
  - Убедитесь, что ваш объект переводов включает все необходимые локали.

### Отсутствие переводов в TypeScript

- **Причина**: Объект переводов не соответствует требуемым локалям, что приводит к ошибкам TypeScript.
- **Решение**: Используйте тип `IConfigLocales` для обеспечения полноты ваших переводов.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Текст",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Текст",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript
};

const text = t(translations);
```

---

## Советы по эффективному использованию

1. **Используйте `t` для простых встроенных переводов**: Идеально подходит для перевода небольших фрагментов текста непосредственно в ваших компонентах.
2. **Предпочитайте `useIntlayer` для структурированного контента**: Для более сложных переводов и повторного использования контента определяйте содержимое в декларативных файлах и используйте `useIntlayer`.
3. **Последовательное предоставление локали**: Убедитесь, что локаль последовательно передается по всему вашему приложению через `IntlayerProvider`.
4. **Использование TypeScript**: Используйте типы TypeScript для обнаружения отсутствующих переводов и обеспечения типобезопасности.

---

## Заключение

Функция `t` в `react-intlayer` - это мощный и удобный инструмент для управления встроенными переводами в ваших React-приложениях. Эффективно интегрируя её, вы улучшаете возможности интернационализации вашего приложения, обеспечивая лучший опыт для пользователей по всему миру.

Для более подробного использования и продвинутых возможностей обратитесь к [документации react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

---

**Примечание**: Не забудьте правильно настроить ваш `IntlayerProvider`, чтобы текущая локаль корректно передавалась вашим компонентам. Это важно для того, чтобы функция `t` возвращала правильные переводы.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
