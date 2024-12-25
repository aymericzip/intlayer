# Документация: Функция `t` в `react-intlayer`

Функция `t` в пакете `react-intlayer` является основным инструментом для инлайн интернационализации в вашем React приложении. Она позволяет вам определять переводы прямо в ваших компонентах, упрощая отображение локализованного контента в зависимости от текущей локали.

---

## Обзор

Функция `t` используется для предоставления переводов для разных локалей напрямую в ваших компонентах. Передавая объект, содержащий переводы для каждой поддерживаемой локали, `t` возвращает соответствующий перевод в зависимости от контекста текущей локали в вашем React приложении.

---

## Ключевые Функции

- **Инлайн Переводы**: Идеально подходит для быстрого, инлайн текста, который не требует отдельного объявления контента.
- **Автоматический Выбор Локали**: Автоматически возвращает перевод, соответствующий текущей локали.
- **Поддержка TypeScript**: Обеспечивает безопасность типов и автозаполнение при использовании с TypeScript.
- **Простая Интеграция**: Бесшовно работает в компонентах React.

---

## Подпись Функции

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметры

- `translations`: Объект, где ключи это коды локалей (например, `en`, `fr`, `es`), а значения — соответствующие переведенные строки.

### Возвращает

- Строку, представляющую переведенный контент для текущей локали.

---

## Примеры Использования

### Основное Использование `t` в Компоненте

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

### Инлайн Переводы в Атрибутах

Функция `t` особенно полезна для инлайн переводов в JSX атрибутах. При локализации атрибутов, таких как `alt`, `title`, `href` или `aria-label`, вы можете использовать `t` непосредственно внутри атрибута.

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

## Расширенные Темы

### Интеграция TypeScript

Функция `t` является безопасной по типам при использовании с TypeScript, что гарантирует, что все необходимые локали предоставлены.

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
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Обнаружение Локали и Контекст

В `react-intlayer` текущая локаль управляется через `IntlayerProvider`. Убедитесь, что этот провайдер обертывает ваши компоненты, и что пропс `locale` корректно передан.

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

## Общие Ошибки и Устранение Неполадок

### `t` Возвращает Неопределенный Или Неправильный Перевод

- **Причина**: Текущая локаль неправильно настроена, или перевод для текущей локали отсутствует.
- **Решение**:
  - Проверьте, что `IntlayerProvider` настроен правильно с соответствующей `locale`.
  - Убедитесь, что ваш объект переводов включает все необходимые локали.

### Недостающие Переводы в TypeScript

- **Причина**: Объект переводов не удовлетворяет требованиям, что приводит к ошибкам TypeScript.
- **Решение**: Используйте тип `IConfigLocales`, чтобы обеспечить полноту ваших переводов.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' приведет к ошибке TypeScript
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' приведет к ошибке TypeScript
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("react-intlayer");

/** @type {import('react-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' приведет к ошибке TypeScript
};

const text = t(translations);
```

---

## Советы для Эффективного Использования

1. **Используйте `t` для Простых Инлайн Переводов**: Идеально подходит для перевода небольших частей текста непосредственно внутри ваших компонентов.
2. **Предпочитайте `useIntlayer` для Структурированного Контента**: Для более сложных переводов и повторного использования контента определяйте контент в файлах объявлений и используйте `useIntlayer`.
3. **Последовательное Предоставление Локали**: Убедитесь, что ваша локаль последовательно предоставляется по всему приложению через `IntlayerProvider`.
4. **Используйте TypeScript**: Используйте типы TypeScript, чтобы ловить недостающие переводы и обеспечивать безопасность типов.

---

## Заключение

Функция `t` в `react-intlayer` является мощным и удобным инструментом для управления инлайн переводами в ваших React приложениях. Эффективно интегрируя ее, вы улучшаете возможности интернационализации вашего приложения, предоставляя лучший опыт для пользователей по всему миру.

Для более подробного использования и расширенных функций обратитесь к [документации react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

---

**Примечание**: Не забудьте правильно настроить ваш `IntlayerProvider`, чтобы убедиться, что текущая локаль правильно передается вашим компонентам. Это критично для того, чтобы функция `t` возвращала правильные переводы.
