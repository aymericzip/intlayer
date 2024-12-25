# Документация: Функция `t` в `next-intlayer`

Функция `t` в пакете `next-intlayer` является основным инструментом для встроенной интернационализации в вашем приложении Next.js. Она позволяет вам определять переводы непосредственно в ваших компонентах, упрощая отображение локализованного контента на основе текущей локали.

---

## Обзор

Функция `t` используется для предоставления переводов для различных локалей непосредственно в ваших компонентах. Передавая объект, содержащий переводы для каждой поддерживаемой локали, `t` возвращает соответствующий перевод на основе контекста текущей локали в вашем приложении Next.js.

---

## Ключевые функции

- **Встроенные переводы**: Идеально подходит для быстрого, встроенного текста, который не требует отдельного объявления контента.
- **Автоматический выбор локали**: Автоматически возвращает перевод, соответствующий текущей локали.
- **Поддержка TypeScript**: Обеспечивает безопасность типов и автозавершение при использовании с TypeScript.
- **Простая интеграция**: Работает без проблем как в клиентских, так и в серверных компонентах в Next.js.

---

## Подпись функции

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Параметры

- `translations`: Объект, где ключи - это коды локалей (например, `en`, `fr`, `es`), а значения - соответствующие переведенные строки.

### Возвращает

- Строку, представляющую переведенный контент для текущей локали.

---

## Примеры использования

### Использование `t` в клиентском компоненте

Убедитесь, что вы включили директиву `'use client';` в начале вашего файла компонента при использовании `t` в клиентском компоненте.

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

### Использование `t` в серверном компоненте

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

### Встроенные переводы в атрибутах

Функция `t` особенно полезна для встроенных переводов в атрибутах JSX. Когда локализуете атрибуты, такие как `alt`, `title`, `href` или `aria-label`, вы можете использовать `t` непосредственно в атрибуте.

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

Функция `t` безопасна по типам при использовании с TypeScript, что гарантирует, что все необходимые локали будут предоставлены.

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

### Обнаружение локали и контекст

В `next-intlayer` текущая локаль управляется через провайдеры контекста: `IntlayerClientProvider` и `IntlayerServerProvider`. Убедитесь, что эти провайдеры оборачивают ваши компоненты, и что параметр `locale` передается правильно.

#### Пример:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ваши компоненты здесь */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ваши компоненты здесь */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Ваши компоненты здесь */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Общие ошибки и устранение неполадок

### `t` Возвращает неопределенный или неправильный перевод

- **Причина**: Текущая локаль неправильно установлена, или перевод для текущей локали отсутствует.
- **Решение**:
  - Убедитесь, что `IntlayerClientProvider` или `IntlayerServerProvider` правильно настроены с соответствующей `locale`.
  - Убедитесь, что ваш объект переводов включает все необходимые локали.

### Отсутствие переводов в TypeScript

- **Причина**: Объект переводов не удовлетворяет необходимым локалям, что приводит к ошибкам TypeScript.
- **Решение**: Используйте тип `IConfigLocales`, чтобы обеспечить полноту ваших переводов.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Отсутствие 'es' вызовет ошибку TypeScript [!code error]
};

const text = t(translations);
```

---

## Советы по эффективному использованию

1. **Используйте `t` для простых встроенных переводов**: Идеально подходит для перевода небольших фрагментов текста непосредственно в ваших компонентах.
2. **Предпочитайте `useIntlayer` для структурированного контента**: Для более сложных переводов и повторного использования контента определите контент в декларационных файлах и используйте `useIntlayer`.
3. **Согласованное предоставление локали**: Убедитесь, что ваша локаль последовательно предоставляется во всех ваших приложениях через соответствующие провайдеры.
4. **Используйте TypeScript**: Используйте типы TypeScript, чтобы выявлять отсутствующие переводы и обеспечивать безопасность типов.

---

## Заключение

Функция `t` в `next-intlayer` является мощным и удобным инструментом для управления встроенными переводами в ваших приложениях Next.js. Эффективно интегрировав её, вы улучшите возможности интернационализации вашего приложения, предоставляя лучший опыт для пользователей по всему миру.

Для более подробного использования и расширенных функций обратитесь к [документации next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

---

**Примечание**: Не забудьте правильно настроить свои `IntlayerClientProvider` и `IntlayerServerProvider`, чтобы гарантировать, что текущая локаль правильно передается вашим компонентам. Это имеет решающее значение для того, чтобы функция `t` возвращала правильные переводы.
